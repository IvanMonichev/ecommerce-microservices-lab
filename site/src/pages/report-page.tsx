import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  defaultReportMetricId,
  getReportMetricDefinition,
} from '@/modules/report/report-metric-config'
import { ReportMetricDashboard } from '@/modules/report/report-metric-dashboard'
import { useSiteContent } from '@/shared/hooks/use-site-content'

export function ReportPage() {
  const { i18n } = useTranslation()
  const { reports, reportDetailContent } = useSiteContent()
  const [searchParams] = useSearchParams()
  const metricId = searchParams.get('metric') ?? defaultReportMetricId
  const activeMetric = useMemo(
    () => getReportMetricDefinition(metricId),
    [metricId],
  )
  const isRu = i18n.language.startsWith('ru')

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <section className="mb-10 overflow-hidden rounded-sm border border-line bg-white shadow-panel">
        <div className="border-b border-line bg-[linear-gradient(135deg,rgba(239,239,237,0.78),rgba(255,255,255,0.98))] px-8 py-6">
          <div className="mb-3 h-1 w-16 rounded-full bg-accent/80" />
          <h2 className="text-2xl font-semibold">
            {isRu
              ? 'Сводка по нагрузочным сценариям'
              : 'Load scenario overview'}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-black/60">
            {isRu
              ? 'Ниже кратко описаны все сценарии, используемые в сравнительном эксперименте. Каждый сценарий соответствует отдельному маршруту нагрузки и отражает свой тип межсервисного взаимодействия.'
              : 'Below is a short overview of all scenarios used in the comparative experiment. Each scenario represents a distinct load path and interaction pattern between services.'}
          </p>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
          {reports.map((report, index) => {
            const detail = reportDetailContent[report.id]

            return (
              <article
                key={report.id}
                className={[
                  'bg-white px-6 py-6',
                  index % 2 === 1 ? 'md:bg-panel' : '',
                ].join(' ')}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  {report.id}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink">
                  {report.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/60">
                  {detail?.lead ?? report.summary}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mb-10 overflow-hidden rounded-sm border border-line bg-white shadow-panel">
        <div className="border-b border-line bg-[linear-gradient(135deg,rgba(239,239,237,0.7),rgba(255,255,255,0.95))] px-8 py-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
            {isRu ? 'Выбранный раздел' : 'Selected section'}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-ink">
            {isRu ? activeMetric.label.ru : activeMetric.label.en}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-black/60">
            {isRu ? activeMetric.description.ru : activeMetric.description.en}
          </p>
        </div>
      </section>

      <ReportMetricDashboard
        metric={activeMetric}
        reports={reports}
        isRu={isRu}
      />
    </div>
  )
}
