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
        backgroundColor: 'rgba(25, 101, 111, 0.14)',
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
        backgroundColor: 'rgba(122, 52, 243, 0.12)',
        pointBackgroundColor: STACK_META.ts.accent,
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.28,
        fill: true,
      },
    ],
  }

  return (
    <div className="rounded-sm border border-line/70 bg-white p-4">
      <div className="mb-4 flex flex-col gap-4">
        <div className="text-center text-sm font-semibold text-ink">
          {title}
        </div>
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
                    ? "text-ink after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent after:content-['']"
                    : 'hover:text-ink',
                ].join(' ')}
              >
                {scenarioId}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs text-black/50">
          <span>{isRu ? 'Динамика по прогонам' : 'Run-based trend'}</span>
          <span className="uppercase tracking-[0.16em] text-black/45">
            {unit}
          </span>
        </div>
      </div>
      <div className="h-[320px]">
        <Line data={chartData} options={getReportMetricChartOptions()} />
      </div>
    </div>
  )
}
