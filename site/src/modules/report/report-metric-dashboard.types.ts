import type { ReportMetricDefinition } from '@/modules/report/report-metric-config'

export type StackKey = 'go' | 'ts'

export type ScenarioColumn = {
  id: string
  title: string
  valuesByRunId: Map<string, number>
  average: number
}

export type ScenarioTrendCardProps = {
  title: string
  runIds: string[]
  goValues: Array<number | null>
  tsValues: Array<number | null>
  isRu: boolean
  unit: string
  scenarios: string[]
  activeScenarioId: string
  onScenarioChange: (scenarioId: string) => void
}

export type TechnologyTableProps = {
  title: string
  stack: StackKey
  runIds: string[]
  columns: ScenarioColumn[]
  unit: string
  isRu: boolean
  hoveredRunId: string | null
  onHoverRunId: (runId: string | null) => void
}

export type ReportMetricDashboardProps = {
  metric: ReportMetricDefinition
  reports: Array<{ id: string; title: string }>
  isRu: boolean
}
