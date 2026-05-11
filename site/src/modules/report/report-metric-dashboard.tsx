import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'
import { benchmarkData } from '@/data/benchmark-data.generated'
import { STACK_META } from '@/modules/report/report-config'
import { ScenarioTrendCard } from '@/modules/report/report-metric-dashboard-scenario-trend-card'
import { TechnologyTable } from '@/modules/report/report-metric-dashboard-technology-table'
import type {
  ReportMetricDashboardProps,
  ScenarioColumn,
} from '@/modules/report/report-metric-dashboard.types'
import { getReportMetricChartOptions } from '@/modules/report/report-metric-dashboard.utils'
import { useMediaQuery } from '@/shared/hooks/use-media-query'

function formatScenarioChartLabel(scenarioId: string, compact: boolean) {
  if (!compact) {
    return scenarioId
  }

  return scenarioId
    .replace('get-all-orders-', 'get ')
    .replace('update-order-status', 'status')
    .replace('create-order', 'create')
}

export function ReportMetricDashboard({
  metric,
  reports,
  isRu,
}: ReportMetricDashboardProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    reports.find((report) => report.id in benchmarkData.scenarios)?.id ??
      'get-all-orders-http',
  )
  const [hoveredRunId, setHoveredRunId] = useState<string | null>(null)
  const isCompactChart = useMediaQuery('(max-width: 640px)')
  const unit = isRu ? metric.unit.ru : metric.unit.en
  const scenarios = reports
    .filter((report) => report.id in benchmarkData.scenarios)
    .map((report) => ({
      id: report.id,
      title: report.title,
      data: benchmarkData.scenarios[
        report.id as keyof typeof benchmarkData.scenarios
      ],
    }))

  const runIds = Array.from(
    new Set(
      scenarios.flatMap((scenario) => [
        ...scenario.data.go.runSeries.map((run) => run.runId),
        ...scenario.data.ts.runSeries.map((run) => run.runId),
      ]),
    ),
  ).sort()

  const goColumns: ScenarioColumn[] = scenarios.map((scenario) => ({
    id: scenario.id,
    title: scenario.id,
    valuesByRunId: new Map(
      scenario.data.go.runSeries.map((run) => [
        run.runId,
        metric.getRunValue(run),
      ]),
    ),
    average: metric.getValue(scenario.data, 'go'),
  }))

  const tsColumns: ScenarioColumn[] = scenarios.map((scenario) => ({
    id: scenario.id,
    title: scenario.id,
    valuesByRunId: new Map(
      scenario.data.ts.runSeries.map((run) => [
        run.runId,
        metric.getRunValue(run),
      ]),
    ),
    average: metric.getValue(scenario.data, 'ts'),
  }))

  const aggregatedChartData: ChartData<'bar', number[], string> = {
    labels: scenarios.map((scenario) =>
      formatScenarioChartLabel(scenario.id, isCompactChart),
    ),
    datasets: [
      {
        label: STACK_META.go.label,
        data: goColumns.map((column) => column.average),
        backgroundColor: STACK_META.go.accent,
        borderRadius: 8,
      },
      {
        label: STACK_META.ts.label,
        data: tsColumns.map((column) => column.average),
        backgroundColor: STACK_META.ts.accent,
        borderRadius: 8,
      },
    ],
  }
  const activeScenario =
    scenarios.find((scenario) => scenario.id === activeScenarioId) ??
    scenarios[0]

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-sm border border-ink bg-white">
        <div className="border-b border-ink bg-[linear-gradient(135deg,rgba(239,239,237,0.82),rgba(255,255,255,0.98))] px-5 py-5 sm:px-8 sm:py-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {isRu ? metric.label.ru : metric.label.en}
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/60">
              {isRu ? metric.description.ru : metric.description.en}
            </p>
          </div>
        </div>
        <div className="min-w-0 bg-panel px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
          <div className="grid min-w-0 gap-4">
            <div className="min-w-0">
              <ScenarioTrendCard
                title={activeScenario.id}
                runIds={runIds}
                goValues={runIds.map((runId) => {
                  const value = activeScenario.data.go.runSeries.find(
                    (run) => run.runId === runId,
                  )

                  return value ? metric.getRunValue(value) : null
                })}
                tsValues={runIds.map((runId) => {
                  const value = activeScenario.data.ts.runSeries.find(
                    (run) => run.runId === runId,
                  )

                  return value ? metric.getRunValue(value) : null
                })}
                isRu={isRu}
                unit={unit}
                scenarios={scenarios.map((scenario) => scenario.id)}
                activeScenarioId={activeScenario.id}
                onScenarioChange={setActiveScenarioId}
              />
            </div>
            <div className="min-w-0 overflow-hidden rounded-sm border border-ink bg-white">
              <div className="border-b border-ink px-4 py-4 text-sm font-semibold text-ink">
                {isRu ? 'Усреднение по сценариям' : 'Scenario averages'}
              </div>
              <div className="p-3 sm:p-4">
                <div className="relative h-[280px] min-w-0 sm:h-[380px]">
                  <Bar
                    data={aggregatedChartData}
                    options={getReportMetricChartOptions({
                      compact: isCompactChart,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6">
        <TechnologyTable
          title={STACK_META.go.label}
          stack="go"
          runIds={runIds}
          columns={goColumns}
          unit={unit}
          isRu={isRu}
          hoveredRunId={hoveredRunId}
          onHoverRunId={setHoveredRunId}
        />
        <TechnologyTable
          title={STACK_META.ts.label}
          stack="ts"
          runIds={runIds}
          columns={tsColumns}
          unit={unit}
          isRu={isRu}
          hoveredRunId={hoveredRunId}
          onHoverRunId={setHoveredRunId}
        />
      </div>
    </div>
  )
}
