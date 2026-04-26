import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..', '..')
const benchmarkRoot = path.join(projectRoot, 'benchmark', 'results')
const outputFile = path.join(
  projectRoot,
  'site',
  'src',
  'data',
  'benchmark-data.generated.ts',
)

const STACKS = ['go', 'ts']

function listDirectories(targetPath) {
  return readdirSync(targetPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

function round(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return 0
  }

  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

function average(values) {
  if (values.length === 0) {
    return 0
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0)
}

function formatMetricName(metricName) {
  if (metricName.includes('{')) {
    return metricName.slice(0, metricName.indexOf('{'))
  }

  return metricName
}

function extractTrendMetrics(metricsByRun) {
  const metricNames = new Set()

  for (const run of metricsByRun) {
    for (const [metricName, value] of Object.entries(run.metrics)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)'].some(
          (key) => key in value,
        )
      ) {
        metricNames.add(formatMetricName(metricName))
      }
    }
  }

  return [...metricNames].sort().map((metricName) => {
    const rows = metricsByRun
      .map((run) => {
        const sourceEntry = Object.entries(run.metrics).find(
          ([entryName]) => formatMetricName(entryName) === metricName,
        )?.[1]

        if (!sourceEntry || typeof sourceEntry !== 'object') {
          return null
        }

        return sourceEntry
      })
      .filter(Boolean)

    return {
      name: metricName,
      avg: round(average(rows.map((row) => row.avg ?? 0))),
      min: round(average(rows.map((row) => row.min ?? 0))),
      med: round(average(rows.map((row) => row.med ?? 0))),
      max: round(average(rows.map((row) => row.max ?? 0))),
      p90: round(average(rows.map((row) => row['p(90)'] ?? 0))),
      p95: round(average(rows.map((row) => row['p(95)'] ?? 0))),
    }
  })
}

function extractRateMetrics(metricsByRun) {
  const metricNames = new Set()

  for (const run of metricsByRun) {
    for (const [metricName, value] of Object.entries(run.metrics)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        'value' in value &&
        'passes' in value &&
        'fails' in value
      ) {
        metricNames.add(formatMetricName(metricName))
      }
    }
  }

  return [...metricNames].sort().map((metricName) => {
    const rows = metricsByRun
      .map((run) => {
        const sourceEntry = Object.entries(run.metrics).find(
          ([entryName]) => formatMetricName(entryName) === metricName,
        )?.[1]

        if (!sourceEntry || typeof sourceEntry !== 'object') {
          return null
        }

        return sourceEntry
      })
      .filter(Boolean)

    return {
      name: metricName,
      ratePct: round(average(rows.map((row) => (row.value ?? 0) * 100))),
      passCount: round(average(rows.map((row) => row.passes ?? 0))),
      failCount: round(average(rows.map((row) => row.fails ?? 0))),
    }
  })
}

function aggregateChecks(metricsByRun) {
  const checks = new Map()

  for (const run of metricsByRun) {
    for (const [checkName, checkStats] of Object.entries(
      run.root_group.checks ?? {},
    )) {
      const current = checks.get(checkName) ?? {
        name: checkName,
        passes: 0,
        fails: 0,
      }
      current.passes += checkStats.passes ?? 0
      current.fails += checkStats.fails ?? 0
      checks.set(checkName, current)
    }
  }

  return [...checks.values()].map((check) => {
    const total = check.passes + check.fails
    return {
      ...check,
      passPct: total > 0 ? round((check.passes / total) * 100) : 0,
    }
  })
}

function aggregateStackData(runItems) {
  const metricsByRun = runItems.map((item) => item.summary)
  const dockerByRun = runItems.map((item) => item.docker)

  const overview = {
    runs: runItems.length,
    avgLatencyMs: round(
      average(
        metricsByRun.map((run) => run.metrics.http_req_duration?.avg ?? 0),
      ),
    ),
    p95LatencyMs: round(
      average(
        metricsByRun.map(
          (run) => run.metrics.http_req_duration?.['p(95)'] ?? 0,
        ),
      ),
    ),
    throughputRps: round(
      average(metricsByRun.map((run) => run.metrics.http_reqs?.rate ?? 0)),
    ),
    requestsTotal: Math.round(
      average(metricsByRun.map((run) => run.metrics.http_reqs?.count ?? 0)),
    ),
    failureRatePct: round(
      average(
        metricsByRun.map(
          (run) => (run.metrics.http_req_failed?.value ?? 0) * 100,
        ),
      ),
    ),
    avgCpuPct: round(
      average(dockerByRun.map((run) => run.totals?.avg_cpu_pct ?? 0)),
    ),
    avgMemMib: round(
      average(dockerByRun.map((run) => run.totals?.avg_mem_mib ?? 0)),
    ),
  }

  const runSeries = runItems.map((item) => ({
    runId: item.runId,
    avgLatencyMs: round(item.summary.metrics.http_req_duration?.avg ?? 0),
    p95LatencyMs: round(item.summary.metrics.http_req_duration?.['p(95)'] ?? 0),
    throughputRps: round(item.summary.metrics.http_reqs?.rate ?? 0),
    requestsTotal: Math.round(item.summary.metrics.http_reqs?.count ?? 0),
    avgCpuPct: round(item.docker.totals?.avg_cpu_pct ?? 0),
    avgMemMib: round(item.docker.totals?.avg_mem_mib ?? 0),
    failureRatePct: round(
      (item.summary.metrics.http_req_failed?.value ?? 0) * 100,
    ),
  }))

  const containers = new Map()

  for (const item of runItems) {
    for (const [containerName, values] of Object.entries(
      item.docker.containers ?? {},
    )) {
      const current = containers.get(containerName) ?? {
        name: containerName,
        avgCpuPct: [],
        maxCpuPct: [],
        avgMemMib: [],
        maxMemMib: [],
      }

      current.avgCpuPct.push(values.avg_cpu_pct ?? 0)
      current.maxCpuPct.push(values.max_cpu_pct ?? 0)
      current.avgMemMib.push(values.avg_mem_mib ?? 0)
      current.maxMemMib.push(values.max_mem_mib ?? 0)
      containers.set(containerName, current)
    }
  }

  const containerStats = [...containers.values()]
    .map((container) => ({
      name: container.name,
      avgCpuPct: round(average(container.avgCpuPct)),
      maxCpuPct: round(average(container.maxCpuPct)),
      avgMemMib: round(average(container.avgMemMib)),
      maxMemMib: round(average(container.maxMemMib)),
    }))
    .sort((left, right) => right.avgCpuPct - left.avgCpuPct)

  return {
    overview,
    runSeries,
    trendMetrics: extractTrendMetrics(metricsByRun),
    rateMetrics: extractRateMetrics(metricsByRun),
    checks: aggregateChecks(metricsByRun),
    testRunDetails: {
      checksPassedAvg: Math.round(
        average(metricsByRun.map((run) => run.metrics.checks?.passes ?? 0)),
      ),
      checksFailedAvg: Math.round(
        average(metricsByRun.map((run) => run.metrics.checks?.fails ?? 0)),
      ),
      iterationsAvg: Math.round(
        average(metricsByRun.map((run) => run.metrics.iterations?.count ?? 0)),
      ),
      iterationsRateAvg: round(
        average(metricsByRun.map((run) => run.metrics.iterations?.rate ?? 0)),
      ),
      vusMinAvg: Math.round(
        average(metricsByRun.map((run) => run.metrics.vus?.min ?? 0)),
      ),
      vusMaxAvg: Math.round(
        average(metricsByRun.map((run) => run.metrics.vus?.max ?? 0)),
      ),
      requestsAvg: Math.round(
        average(metricsByRun.map((run) => run.metrics.http_reqs?.count ?? 0)),
      ),
      requestsRateAvg: round(
        average(metricsByRun.map((run) => run.metrics.http_reqs?.rate ?? 0)),
      ),
      dataReceivedMbAvg: round(
        average(
          metricsByRun.map(
            (run) => (run.metrics.data_received?.count ?? 0) / 1_000_000,
          ),
        ),
      ),
      dataReceivedRateMbAvg: round(
        average(
          metricsByRun.map(
            (run) => (run.metrics.data_received?.rate ?? 0) / 1_000_000,
          ),
        ),
      ),
      dataSentMbAvg: round(
        average(
          metricsByRun.map(
            (run) => (run.metrics.data_sent?.count ?? 0) / 1_000_000,
          ),
        ),
      ),
      dataSentRateMbAvg: round(
        average(
          metricsByRun.map(
            (run) => (run.metrics.data_sent?.rate ?? 0) / 1_000_000,
          ),
        ),
      ),
      avgCpuPct: round(
        average(dockerByRun.map((run) => run.totals?.avg_cpu_pct ?? 0)),
      ),
      maxCpuPct: round(
        average(dockerByRun.map((run) => run.totals?.max_cpu_pct ?? 0)),
      ),
      avgMemMib: round(
        average(dockerByRun.map((run) => run.totals?.avg_mem_mib ?? 0)),
      ),
      maxMemMib: round(
        average(dockerByRun.map((run) => run.totals?.max_mem_mib ?? 0)),
      ),
      cpuTimeSecondsAvg: round(
        average(dockerByRun.map((run) => run.totals?.cpu_time_seconds ?? 0)),
      ),
      durationSecondsAvg: round(
        average(dockerByRun.map((run) => run.duration_seconds ?? 0)),
      ),
    },
    containers: containerStats,
    artifacts: runItems.map((item) => ({
      runId: item.runId,
      html: item.relativeHtmlPath,
      summaryJson: item.relativeSummaryPath,
      dockerJson: item.relativeDockerPath,
    })),
  }
}

function collectScenarioData() {
  const scenarioIds = listDirectories(benchmarkRoot)
  const scenarios = {}

  for (const scenarioId of scenarioIds) {
    scenarios[scenarioId] = {}

    for (const stackId of STACKS) {
      const stackRoot = path.join(benchmarkRoot, scenarioId, stackId)
      const experiments = listDirectories(stackRoot)
      const runItems = []

      for (const experimentId of experiments) {
        const experimentRoot = path.join(stackRoot, experimentId)
        const runSummaryFiles = readdirSync(experimentRoot)
          .filter(
            (name) =>
              name.endsWith('-summary.json') && !name.includes('docker-stats'),
          )
          .sort()

        for (const summaryFile of runSummaryFiles) {
          const runId = summaryFile.replace('-summary.json', '')
          const summaryPath = path.join(experimentRoot, summaryFile)
          const dockerPath = path.join(
            experimentRoot,
            `${runId}-docker-stats-summary.json`,
          )
          const htmlPath = path.join(experimentRoot, `${runId}-summary.html`)

          runItems.push({
            runId,
            summary: readJson(summaryPath),
            docker: readJson(dockerPath),
            relativeSummaryPath: path.relative(projectRoot, summaryPath),
            relativeDockerPath: path.relative(projectRoot, dockerPath),
            relativeHtmlPath: path.relative(projectRoot, htmlPath),
          })
        }
      }

      scenarios[scenarioId][stackId] = aggregateStackData(runItems)
    }

    const goRuns = scenarios[scenarioId].go.runSeries
    const tsRuns = scenarios[scenarioId].ts.runSeries

    scenarios[scenarioId].comparison = {
      avgLatencyDeltaMs: round(
        scenarios[scenarioId].ts.overview.avgLatencyMs -
          scenarios[scenarioId].go.overview.avgLatencyMs,
      ),
      p95LatencyDeltaMs: round(
        scenarios[scenarioId].ts.overview.p95LatencyMs -
          scenarios[scenarioId].go.overview.p95LatencyMs,
      ),
      throughputDeltaRps: round(
        scenarios[scenarioId].go.overview.throughputRps -
          scenarios[scenarioId].ts.overview.throughputRps,
      ),
      requestsDelta: Math.round(
        scenarios[scenarioId].go.overview.requestsTotal -
          scenarios[scenarioId].ts.overview.requestsTotal,
      ),
      totalRuns: {
        go: goRuns.length,
        ts: tsRuns.length,
      },
    }
  }

  return scenarios
}

const generatedAt = new Date().toISOString()
const benchmarkData = {
  generatedAt,
  scenarios: collectScenarioData(),
}

mkdirSync(path.dirname(outputFile), { recursive: true })
writeFileSync(
  outputFile,
  [
    '/* eslint-disable */',
    '// This file is generated by site/scripts/generate-benchmark-data.mjs',
    `export const benchmarkData = ${JSON.stringify(benchmarkData, null, 2)} as const`,
    '',
  ].join('\n'),
)

console.log(`Wrote ${path.relative(projectRoot, outputFile)}`)
