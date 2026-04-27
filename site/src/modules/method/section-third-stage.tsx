import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/components/section'
import { Text } from '@/shared/components/text'

type MethodologyCard = {
  title: string
  text: string
}

export function SectionThirdStage() {
  const { t } = useTranslation()
  const methodologyMetrics = t('content.methodologyMetrics', {
    returnObjects: true,
  }) as MethodologyCard[]
  const stageThree = t('methodologyPage.stageThree', {
    returnObjects: true,
  }) as { title: string; intro: string }

  return (
    <Section color="white">
      <Section.Title>
        {t('methodologyPage.selectedStagePrefix')} 03. {stageThree.title}
      </Section.Title>

      <article>
        <Text.Paragraph className="text-muted">{stageThree.intro}</Text.Paragraph>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {methodologyMetrics.map((metric) => (
            <article
              key={metric.title}
              className="rounded-sm border border-ink bg-white px-5 py-5"
            >
              <h3 className="text-base font-semibold text-ink">
                {metric.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-black/70">
                {metric.text}
              </p>
            </article>
          ))}
        </div>
      </article>
    </Section>
  )
}
