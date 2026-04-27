import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  defaultReportMetricId,
  getReportMetricDefinition,
  reportMetricDefinitions,
} from '@/modules/report/report-metric-config'
import { ReportMetricDashboard } from '@/modules/report/report-metric-dashboard'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { useSiteContent } from '@/shared/hooks/use-site-content'

export function ReportPage() {
  const { i18n } = useTranslation()
  const { reports, reportDetailContent } = useSiteContent()
  const [searchParams, setSearchParams] = useSearchParams()
  const metricId = searchParams.get('metric') ?? defaultReportMetricId
  const activeMetric = useMemo(
    () => getReportMetricDefinition(metricId),
    [metricId],
  )
  const isRu = i18n.language.startsWith('ru')

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-start">
        <div className="min-w-0">
          <details className="group mb-8 overflow-hidden rounded-sm border border-ink bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-[linear-gradient(135deg,rgba(239,239,237,0.82),rgba(255,255,255,0.98))] px-6 py-5 marker:hidden">
              <h2 className="text-lg font-semibold text-ink">
                {isRu ? 'Сценарии' : 'Scenario'}
              </h2>
              <span className="text-lg leading-none text-black/45 transition group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="border-t border-ink">
              {reports.map((report) => {
                const detail = reportDetailContent[report.id]

                return (
                  <details
                    key={report.id}
                    className="group border-b border-ink last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:hidden transition hover:bg-mist">
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                          {report.id}
                        </span>
                        <span className="mt-2 block text-sm font-semibold text-ink">
                          {report.title}
                        </span>
                      </span>
                      <span className="mt-1 text-lg leading-none text-black/45 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="border-t border-ink px-5 py-4 text-sm leading-7 text-black/60">
                      {detail?.lead ?? report.summary}
                    </div>
                  </details>
                )
              })}
            </div>
          </details>

          <ReportMetricDashboard
            metric={activeMetric}
            reports={reports}
            isRu={isRu}
          />
        </div>

        <aside className="xl:sticky xl:top-28 xl:w-full">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-sm border border-ink bg-white">
              <div>
                {reportMetricDefinitions.map((metric) => {
                  const isActive = metric.id === activeMetric.id

                  return (
                    <button
                      key={metric.id}
                      type="button"
                      onClick={() => {
                        const nextParams = new URLSearchParams(searchParams)
                        nextParams.set('metric', metric.id)
                        setSearchParams(nextParams)
                      }}
                      className={[
                        'flex w-full items-center justify-between border-b px-3 py-3 text-left transition last:border-b-0',
                        isActive
                          ? 'border-ink bg-mist text-ink'
                          : 'border-ink text-black/60 hover:bg-mist hover:text-ink',
                      ].join(' ')}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {isRu ? metric.tabLabel.ru : metric.tabLabel.en}
                        </span>
                        <span
                          className={[
                            'mt-0.5 block text-xs',
                            isActive ? 'text-black/55' : 'text-black/45',
                          ].join(' ')}
                        >
                          {isRu ? metric.label.ru : metric.label.en}
                        </span>
                      </span>
                      <span
                        className={[
                          'ml-3 h-3 w-3 shrink-0 rounded-full border border-ink transition',
                          isActive ? 'bg-[#7a34f3]' : 'bg-transparent',
                        ].join(' ')}
                      />
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="overflow-hidden rounded-sm border border-ink bg-white">
              <div className="p-4">
                <Link
                  to={NavigationLink.Method}
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-[#7a34f3] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
                >
                  {isRu ? 'Перейти к методике' : 'Go to methodology'}
                </Link>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  )
}
