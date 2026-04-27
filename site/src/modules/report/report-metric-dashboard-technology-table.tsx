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
    <section className="overflow-hidden rounded-sm border border-ink bg-white">
      <div className={`border-b border-ink px-6 py-5 ${accent}`}>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full table-fixed border-collapse text-[12px] leading-5 lg:text-[13px]">
          <thead className="bg-ink text-white">
            <tr>
              <th className="sticky left-0 w-[90px] bg-ink px-3 py-3 text-left font-semibold lg:w-[108px]">
                {isRu ? 'Прогон' : 'Run'}
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-3 py-3 text-left font-semibold"
                >
                  <span className="block truncate">{column.id}</span>
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
                <td className="sticky left-0 border-r border-ink bg-inherit px-3 py-2.5 font-semibold transition-colors">
                  <span className="block truncate">
                    {formatReportRunLabel(runId)}
                  </span>
                </td>
                {columns.map((column) => {
                  const value = column.valuesByRunId.get(runId)

                  return (
                    <td
                      key={`${column.id}-${runId}`}
                      className="px-3 py-2.5 transition-colors"
                    >
                      <span className="block truncate">
                        {value === undefined ? '—' : formatMetric(value, unit)}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="border-t border-ink bg-accentSoft/55">
              <td className="sticky left-0 border-r border-ink bg-accentSoft/55 px-3 py-2.5 font-semibold">
                {isRu ? 'Среднее' : 'Average'}
              </td>
              {columns.map((column) => (
                <td
                  key={`${column.id}-average`}
                  className="px-3 py-2.5 font-semibold"
                >
                  <span className="block truncate">
                    {formatMetric(column.average, unit)}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
