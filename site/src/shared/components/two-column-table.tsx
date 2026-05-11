type TwoColumnTableRow = {
  id: string
  left: string
  right: string
}

type TwoColumnTableProps = {
  leftHeader: string
  rightHeader: string
  rows: TwoColumnTableRow[]
  className?: string
}

export function TwoColumnTable({
  leftHeader,
  rightHeader,
  rows,
  className,
}: TwoColumnTableProps) {
  return (
    <section
      className={[
        'overflow-hidden rounded-sm border border-ink bg-white',
        className ?? '',
      ].join(' ')}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm leading-7 text-black/75">
          <thead className="bg-accentSoft/70">
            <tr>
              <th className="border-b border-ink px-4 py-3 text-left font-semibold text-accent sm:px-5">
                {leftHeader}
              </th>
              <th className="border-b border-ink px-4 py-3 text-left font-semibold text-accent sm:px-5">
                {rightHeader}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-accentSoft/70"
              >
                <td
                  className={[
                    'px-4 py-3 sm:px-5',
                    index === rows.length - 1 ? '' : 'border-b border-ink',
                  ].join(' ')}
                >
                  {row.left}
                </td>
                <td
                  className={[
                    'px-4 py-3 sm:px-5',
                    index === rows.length - 1 ? '' : 'border-b border-ink',
                  ].join(' ')}
                >
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
