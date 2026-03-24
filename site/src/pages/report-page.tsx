import { Link, useParams } from 'react-router-dom'
import { reportDetailContent, reports } from '@/data/site-content'
import { SectionHeading } from '@/shared/ui/section-heading'

export function ReportPage() {
  const { id = 'get-all-orders-grpc' } = useParams()
  const report = reports.find((item) => item.id === id) ?? reports[1]
  const detail =
    reportDetailContent[report.id as keyof typeof reportDetailContent]

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow="Reports"
        title={report.title}
        description={detail.lead}
      />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-sm border border-line bg-white p-8 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            Сценарий
          </p>
          <h3 className="mt-4 text-3xl font-semibold">{detail.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60">
            {report.summary}
          </p>
          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-2">
            {report.metrics.map((metric) => (
              <div key={metric.label} className="bg-panel px-5 py-5">
                <div className="text-xs uppercase tracking-[0.18em] text-black/45">
                  {metric.label}
                </div>
                <div className="mt-2 text-xl font-semibold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-sm border border-line bg-panel p-8">
            <h3 className="text-xl font-semibold">Что добавить дальше</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-black/60">
              <li>Графики latency и throughput по сериям запусков.</li>
              <li>Ссылки на HTML и JSON артефакты из `benchmark/results`.</li>
              <li>Сводные выводы по bottleneck сервисам и ресурсным пикам.</li>
            </ul>
          </div>
          <div className="rounded-sm border border-line bg-panel p-8">
            <h3 className="text-xl font-semibold">Другие сценарии</h3>
            <div className="mt-5 space-y-3">
              {reports
                .filter((item) => item.id !== report.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/reports/${item.id}`}
                    className="block rounded-sm border border-line bg-white px-4 py-4 text-sm font-semibold transition hover:border-accent hover:text-accent"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
