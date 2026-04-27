import { Line } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'
import { STACK_META } from '@/modules/report/report-config'
import {
  formatReportRunLabel,
  getReportMetricChartOptions,
} from '@/modules/report/report-metric-dashboard.utils'
import type { ScenarioTrendCardProps } from '@/modules/report/report-metric-dashboard.types'

export function ScenarioTrendCard({
  title,
  runIds,
  goValues,
  tsValues,
  isRu,
  unit,
  scenarios,
  activeScenarioId,
  onScenarioChange,
}: ScenarioTrendCardProps) {
  const chartData: ChartData<'line', Array<number | null>, string> = {
    labels: runIds.map((runId) => formatReportRunLabel(runId)),
    datasets: [
      {
        label: STACK_META.go.label,
        data: goValues,
        borderColor: STACK_META.go.accent,
        backgroundColor: STACK_META.go.soft,
        pointBackgroundColor: STACK_META.go.accent,
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.28,
        fill: true,
      },
      {
        label: STACK_META.ts.label,
        data: tsValues,
        borderColor: STACK_META.ts.accent,
        backgroundColor: STACK_META.ts.soft,
        pointBackgroundColor: STACK_META.ts.accent,
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.28,
        fill: true,
      },
    ],
  }

  return (
    <div className="overflow-hidden rounded-sm border border-ink bg-white">
      <div className="border-b border-ink px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 text-xs text-black/50">
            <div>
              <div className="text-sm font-semibold text-ink">
                {isRu ? 'Динамика по прогонам' : 'Run-based trend'}
              </div>
              <div className="mt-1 text-xs text-black/45">{title}</div>
            </div>
            <span className="uppercase tracking-[0.16em] text-black/45">
              {unit}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-ink px-4 py-3">
        <div className="flex justify-center overflow-x-auto">
          <div className="flex gap-4 text-sm text-black/55">
            {scenarios.map((scenarioId) => (
              <button
                key={scenarioId}
                type="button"
                onClick={() => onScenarioChange(scenarioId)}
                className={[
                  'relative whitespace-nowrap pb-1 font-semibold tracking-[0.04em] transition',
                  activeScenarioId === scenarioId
                    ? 'text-ink'
                    : 'hover:text-ink',
                ].join(' ')}
              >
                {scenarioId}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="h-[320px]">
          <Line data={chartData} options={getReportMetricChartOptions()} />
        </div>
      </div>
    </div>
  )
}
