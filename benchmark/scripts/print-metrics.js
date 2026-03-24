const fs = require("fs");
const path = require("path");

const DEFAULT_RESULTS_DIR = path.resolve(
  __dirname,
  "..",
  "results",
  "update-order-status",
  "ts",
  "exp-001"
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getRunNumber(fileName) {
  const match = fileName.match(/^run-(\d+)-summary\.json$/);

  if (!match) {
    throw new Error(`Unexpected summary file name: ${fileName}`);
  }

  return Number(match[1]);
}

function sumContainerMetric(containers, metricName) {
  return Object.values(containers).reduce((sum, container) => {
    return sum + Number(container[metricName] || 0);
  }, 0);
}

function buildRow(resultsDir, fileName) {
  const run = getRunNumber(fileName);
  const summaryPath = path.join(resultsDir, fileName);
  const dockerSummaryPath = path.join(
    resultsDir,
    fileName.replace("-summary.json", "-docker-stats-summary.json")
  );

  const summary = readJson(summaryPath);
  const dockerSummary = readJson(dockerSummaryPath);
  const metrics = summary.metrics || {};
  const containers = dockerSummary.containers || {};

  return {
    run,
    http_reqs_rate: metrics.http_reqs?.rate ?? "",
    http_req_duration_avg: metrics.http_req_duration?.avg ?? "",
    http_req_duration_p95: metrics.http_req_duration?.["p(95)"] ?? "",
    avg_cpu_pct: sumContainerMetric(containers, "avg_cpu_pct"),
    avg_mem_mib: sumContainerMetric(containers, "avg_mem_mib"),
  };
}

function toCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return typeof value === "number" ? String(value).replace(".", ",") : String(value);
}

function getColumns() {
  return [
    "run",
    "http_reqs_rate",
    "http_req_duration_avg",
    "http_req_duration_p95",
    "avg_cpu_pct",
    "avg_mem_mib",
  ];
}

function buildTsv(rows) {
  const columns = getColumns();
  const lines = [columns.join("\t")];

  for (const row of rows) {
    lines.push(columns.map((column) => toCsvValue(row[column])).join("\t"));
  }

  return `${lines.join("\n")}\n`;
}

function printCsv(rows) {
  process.stdout.write(buildTsv(rows));
}

function saveTsv(rows, resultsDir) {
  const scenarioName = path.basename(path.resolve(resultsDir, "..", ".."));
  const outputDir = path.resolve(__dirname, "..", "tmp", scenarioName);
  const outputPath = path.join(outputDir, "metrics.tsv");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, buildTsv(rows), "utf8");

  return outputPath;
}

function main() {
  const resultsDir = path.resolve(process.argv[2] || DEFAULT_RESULTS_DIR);

  if (!fs.existsSync(resultsDir)) {
    throw new Error(`Results directory does not exist: ${resultsDir}`);
  }

  const rows = fs
    .readdirSync(resultsDir)
    .filter((fileName) => fileName.endsWith("-summary.json"))
    .filter((fileName) => !fileName.endsWith("-docker-stats-summary.json"))
    .sort()
    .map((fileName) => buildRow(resultsDir, fileName));

  printCsv(rows);
  saveTsv(rows, resultsDir);
}

main();
