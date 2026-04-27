import { useSiteContent } from '@/shared/hooks/use-site-content'
import { useTranslation } from 'react-i18next'

export function SectionMethodStages() {
  const { t } = useTranslation()
  const { methodologySteps } = useSiteContent()

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink text-center">
          {t('methodologyPage.stagesTitle')}
        </h2>
        <p className="mt-2 text-sm text-black/65 text-center">
          {t('methodologyPage.stagesDescription')}
        </p>
      </div>
      <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-ink bg-ink">
        {methodologySteps.map((item, index) => {
          return (
            <article key={item.step} className="bg-white px-7 py-8">
              <div className="flex items-center gap-4 text-accent">
                <span className="h-px flex-1 bg-muted" />
                <span
                  className="shrink-0 text-2xl font-semibold leading-none text-accent"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-muted" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-center">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/60">
                {item.text}
              </p>
            </article>
          )
        })}
      </div>
    </>
  )
}
