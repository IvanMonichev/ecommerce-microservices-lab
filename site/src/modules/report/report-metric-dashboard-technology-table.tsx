import { formatMetric } from '@/modules/report/report-format'
import type {
  TechnologyTableProps,
} from '@/modules/report/report-metric-dashboard.types'
import { formatReportRunLabel } from '@/modules/report/report-metric-dashboard.utils'

export function TechnologyTable({
  title,
  stack,
  runIds,
  columns,
  unit,
  isRu,
  hoveredRunId,
  onHoverRunId,
}: TechnologyTableProps) {
  const accent =
    stack === 'go'
      ? 'bg-[linear-gradient(135deg,rgba(25,101,111,0.08),rgba(255,255,255,0.98))]'
      : 'bg-[linear-gradient(135deg,rgba(122,52,243,0.08),rgba(255,255,255,0.98))]'

  return (
    <section className="overflow-hidden rounded-sm border border-line bg-white shadow-panel">
      <div className={`border-b border-line px-6 py-5 ${accent}`}>
        <div className="mb-3 h-1 w-14 rounded-full bg-accent/80" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-black/60">
          {isRu
            ? 'Строки таблицы соответствуют прогонам, столбцы — сценариям; внизу показано среднее значение по каждому сценарию.'
            : 'Table rows represent runs, columns represent scenarios, and the last row shows the average for each scenario.'}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-ink text-white">
            <tr>
              <th className="sticky left-0 bg-ink px-4 py-4 text-left font-semibold">
                {isRu ? 'Прогон' : 'Run'}
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="min-w-[220px] px-4 py-4 text-left font-semibold"
                >
                  {column.id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runIds.map((runId, index) => (
              <tr
                key={runId}
                onMouseEnter={() => onHoverRunId(runId)}
                onMouseLeave={() => onHoverRunId(null)}
                className={[
                  'transition-colors',
                  hoveredRunId === runId
                    ? 'bg-accentSoft/80'
                    : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-panel',
                ].join(' ')}
              >
                <td className="sticky left-0 border-r border-line bg-inherit px-4 py-3 font-semibold transition-colors">
                  {formatReportRunLabel(runId)}
                </td>
                {columns.map((column) => {
                  const value = column.valuesByRunId.get(runId)

                  return (
                    <td
                      key={`${column.id}-${runId}`}
                      className="px-4 py-3 transition-colors"
                    >
                      {value === undefined ? '—' : formatMetric(value, unit)}
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="border-t border-line bg-accentSoft/55">
              <td className="sticky left-0 border-r border-line bg-accentSoft/55 px-4 py-3 font-semibold">
                {isRu ? 'Среднее' : 'Average'}
              </td>
              {columns.map((column) => (
                <td
                  key={`${column.id}-average`}
                  className="px-4 py-3 font-semibold"
                >
                  {formatMetric(column.average, unit)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
