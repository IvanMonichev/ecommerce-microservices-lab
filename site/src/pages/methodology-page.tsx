import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import { SectionHeading } from '@/shared/components/section-heading'
import {
  BarChart3,
  ClipboardList,
  FlaskConical,
  Gauge,
  Search,
} from 'lucide-react'

type MethodologyCard = {
  title: string
  text: string
}

const methodologyStepIcons = [
  ClipboardList,
  Gauge,
  BarChart3,
  FlaskConical,
  Search,
]

export function MethodologyPage() {
  const { t } = useTranslation()
  const { methodologyDetails, methodologySteps } = useSiteContent()
  const methodologyPrinciples = t('content.methodologyPrinciples', {
    returnObjects: true,
  }) as MethodologyCard[]
  const methodologyScenarios = t('content.methodologyScenarios', {
    returnObjects: true,
  }) as MethodologyCard[]
  const methodologyMetrics = t('content.methodologyMetrics', {
    returnObjects: true,
  }) as MethodologyCard[]
  const methodologyEnvironment = t('content.methodologyEnvironment', {
    returnObjects: true,
  }) as MethodologyCard[]

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow={t('methodologyPage.eyebrow')}
        title={t('methodologyPage.title')}
        description={t('methodologyPage.description')}
      />
      <div className="space-y-10">
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-sm border border-line bg-panel p-8">
            <h3 className="text-xl font-semibold">
              {t('methodologyPage.fixedTitle')}
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-7 text-black/65">
              {methodologyDetails.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <Link
              to={`${NavigationLink.Reports}/get-all-orders-grpc`}
              className="mt-8 inline-flex rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
            >
              {t('common.reportRoute')}
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line">
            {methodologyPrinciples.map((item) => (
              <article key={item.title} className="bg-white px-7 py-7">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {t('methodologyPage.stagesTitle')}
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/65">
              {t('methodologyPage.stagesDescription')}
            </p>
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line">
            {methodologySteps.map((item, index) => {
              const Icon = methodologyStepIcons[index]

              return (
                <article key={item.step} className="bg-white px-7 py-8">
                  <div className="flex items-center gap-4 text-accent">
                    <span className="h-px flex-1 bg-ink" />
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="h-px flex-1 bg-ink" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">
                    {item.step} {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-black/60">
                    {item.text}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-sm border border-line bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {t('methodologyPage.scenariosTitle')}
            </h2>
            <div className="mt-6 space-y-5">
              {methodologyScenarios.map((item) => (
                <article key={item.title}>
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-black/65">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-line bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {t('methodologyPage.metricsTitle')}
            </h2>
            <div className="mt-6 space-y-5">
              {methodologyMetrics.map((item) => (
                <article key={item.title}>
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-black/65">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-line bg-panel p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {t('methodologyPage.environmentTitle')}
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/65">
              {t('methodologyPage.environmentDescription')}
            </p>
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-2">
            {methodologyEnvironment.map((item) => (
              <article key={item.title} className="bg-white px-7 py-7">
                <h3 className="text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-black/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
