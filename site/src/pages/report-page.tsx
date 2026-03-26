import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import { SectionHeading } from '@/shared/ui/section-heading'

export function ReportPage() {
  const { t } = useTranslation()
  const { reportDetailContent, reports } = useSiteContent()
  const { id = 'get-all-orders-grpc' } = useParams()
  const report = reports.find((item) => item.id === id) ?? reports[1]
  const detail = reportDetailContent[report.id]

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow={t('reportsPage.eyebrow')}
        title={report.title}
        description={detail.lead}
      />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-sm border border-line bg-white p-8 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            {t('reportsPage.scenario')}
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
            <h3 className="text-xl font-semibold">{t('reportsPage.nextTitle')}</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-black/60">
              {(t('reportsPage.nextItems', { returnObjects: true }) as string[]).map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-sm border border-line bg-panel p-8">
            <h3 className="text-xl font-semibold">
              {t('reportsPage.otherScenarios')}
            </h3>
            <div className="mt-5 space-y-3">
              {reports
                .filter((item) => item.id !== report.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`${NavigationLink.Reports}/${item.id}`}
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
