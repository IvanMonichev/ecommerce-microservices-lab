import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/components/section'
import { NavigationLink } from '@/shared/constants/navigation.constant'

export function SectionFourthFifthStage() {
  const { t } = useTranslation()

  return (
    <Section id="stage-04-05" color="gray">
      <Section.Title>
        {t('methodologyPage.selectedStagePrefix')} 04-05.{' '}
        {t('methodologyPage.stageFourFive.title')}
      </Section.Title>

      <article>
        <div className="overflow-hidden rounded-sm border border-ink bg-white">
          <div className="border-b border-ink bg-[linear-gradient(135deg,rgba(122,52,243,0.08),rgba(255,255,255,0.95))] px-6 py-6">
            <div className="mb-3 h-1 w-16 rounded-full bg-accent/80" />
            <p className="text-sm leading-7 text-black/70">
              {t('methodologyPage.stageFourFive.intro')}
            </p>
          </div>

          <div className="grid gap-px bg-ink lg:grid-cols-2">
            <article className="bg-white px-6 py-6">
              <h3 className="text-base font-semibold text-ink">
                {t('methodologyPage.stageFourFive.executionTitle')}
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/70">
                {t('methodologyPage.stageFourFive.executionText')}
              </p>
            </article>
            <article className="bg-white px-6 py-6">
              <h3 className="text-base font-semibold text-ink">
                {t('methodologyPage.stageFourFive.analysisTitle')}
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/70">
                {t('methodologyPage.stageFourFive.analysisText')}
              </p>
            </article>
          </div>

          <div className="border-t border-ink px-6 py-5">
            <p className="text-sm leading-7 text-black/70">
              {t('methodologyPage.stageFourFive.resultsLead')}
            </p>
            <Link
              to={NavigationLink.Reports}
              className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
            >
              {t('methodologyPage.stageFourFive.resultsCta')}
            </Link>
          </div>
        </div>
      </article>
    </Section>
  )
}
