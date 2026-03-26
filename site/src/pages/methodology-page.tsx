import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import { SectionHeading } from '@/shared/ui/section-heading'

export function MethodologyPage() {
  const { t } = useTranslation()
  const { methodologyDetails, methodologySteps } = useSiteContent()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow={t('methodologyPage.eyebrow')}
        title={t('methodologyPage.title')}
        description={t('methodologyPage.description')}
      />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
        <div className="grid gap-px border border-line bg-line">
          {methodologySteps.map((item) => (
            <article key={item.step} className="bg-white px-7 py-8">
              <div className="text-sm font-semibold text-accent">
                {item.step}
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
