import { benchmarkData } from '@/data/benchmark-data.generated'

export type StackKey = 'go' | 'ts'
export type TabKey = 'metrics' | 'details' | 'checks' | 'containers'
export type ScenarioKey = keyof typeof benchmarkData.scenarios
export type BenchmarkScenario = (typeof benchmarkData.scenarios)[ScenarioKey]

export type ReportCopy = {
  benchmarkLabel: string
  averagedSection: string
  runSeriesSection: string
  compareTitle: string
  compareDescription: string
  latencyChart: string
  throughputChart: string
  requestsChart: string
  resourceChart: string
  runLatencyChart: string
  runP95Chart: string
  runThroughputChart: string
  runResourcesChart: string
  avgLatencyDelta: string
  p95LatencyDelta: string
  throughputDelta: string
  runCoverage: string
  tabs: Record<TabKey, string>
  trendMetrics: string
  rates: string
  checksTitle: string
  artifactsTitle: string
  containersTitle: string
  runDetails: string
  htmlPath: string
  jsonPath: string
  dockerPath: string
  checksCard: string
  virtualUsers: string
  iterations: string
  path: string
  run: string
  avg: string
  min: string
  med: string
  max: string
  p90: string
  p95: string
  ratePct: string
  passCount: string
  failCount: string
  metric: string
  checkName: string
  passes: string
  failures: string
  passPct: string
  container: string
  avgCpu: string
  maxCpu: string
  avgMem: string
  maxMem: string
  requestsAvg: string
  requestsRate: string
  dataReceived: string
  dataSent: string
  cpuTime: string
  duration: string
  chartUnits: {
    latency: string
    throughput: string
    cpu: string
    memory: string
    requests: string
  }
}
