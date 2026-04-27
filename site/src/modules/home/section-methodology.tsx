import { Section } from '@/shared/components/section'
import { useTranslation } from 'react-i18next'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import classNames from 'classnames'

export function SectionMethodology() {
  const { t } = useTranslation()
  const { methodologySteps } = useSiteContent()

  return (
    <Section color="gray">
      <Section.Title>{t('home.methodology.title')}</Section.Title>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        {methodologySteps.map((item, index) => {
          return (
            <article
              key={item.step}
              className={classNames(
                'rounded-sm border border-ink bg-white px-7 py-8 xl:col-span-2',
                {
                  'xl:col-start-2': index === 3,
                  'xl:col-start-4': index === 4,
                },
              )}
            >
              <div className="flex items-center gap-4 text-accent">
                <span className="h-px flex-1 bg-ink" />
                <span
                  className="shrink-0 text-2xl font-semibold leading-none text-accent"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-ink" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-center">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/60">
                {item.text}
              </p>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
