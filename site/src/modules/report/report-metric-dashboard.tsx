import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'
import { benchmarkData } from '@/data/benchmark-data.generated'
import { STACK_META } from '@/modules/report/report-config'
import { formatMetric } from '@/modules/report/report-format'
import { ScenarioTrendCard } from '@/modules/report/report-metric-dashboard-scenario-trend-card'
import { TechnologyTable } from '@/modules/report/report-metric-dashboard-technology-table'
import type {
  ReportMetricDashboardProps,
  ScenarioColumn,
} from '@/modules/report/report-metric-dashboard.types'
import {
  averageValues,
  getReportMetricChartOptions,
} from '@/modules/report/report-metric-dashboard.utils'

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
    labels: scenarios.map((scenario) => scenario.id),
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

  const overallSummary = {
    go: averageValues(goColumns.map((column) => column.average)),
    ts: averageValues(tsColumns.map((column) => column.average)),
  }
  const activeScenario =
    scenarios.find((scenario) => scenario.id === activeScenarioId) ??
    scenarios[0]

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-sm border border-line bg-white shadow-panel">
        <div className="border-b border-line bg-[linear-gradient(135deg,rgba(239,239,237,0.82),rgba(255,255,255,0.98))] px-8 py-6">
          <div className="mb-3 h-1 w-16 rounded-full bg-accent/80" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold">
                {isRu ? metric.label.ru : metric.label.en}
              </h2>
              <p className="mt-3 text-sm leading-7 text-black/60">
                {isRu ? metric.description.ru : metric.description.en}
              </p>
            </div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-white px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  {STACK_META.go.label}
                </div>
                <div className="mt-2 text-xl font-semibold">
                  {formatMetric(overallSummary.go, unit)}
                </div>
              </div>
              <div className="bg-white px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  {STACK_META.ts.label}
                </div>
                <div className="mt-2 text-xl font-semibold">
                  {formatMetric(overallSummary.ts, unit)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-panel px-5 py-5 lg:px-6 lg:py-6">
          <div className="grid gap-4">
            <div>
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
            <div className="rounded-sm border border-line/70 bg-white p-4">
              <div className="mb-3 text-sm font-semibold text-ink">
                {isRu ? 'Усреднение по сценариям' : 'Scenario averages'}
              </div>
              <div className="h-[380px]">
                <Bar
                  data={aggregatedChartData}
                  options={getReportMetricChartOptions()}
                />
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
