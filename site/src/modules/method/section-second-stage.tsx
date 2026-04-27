import { useTranslation } from 'react-i18next'
import scenarioSchemeSvg from '@/assets/scheme-scenarios-for-experiment.svg'
import { Section } from '@/shared/components/section'
import { Text } from '@/shared/components/text'
import { TwoColumnTable } from '@/shared/components/two-column-table'

type TwoColumnRow = {
  id: string
  left: string
  right: string
}

type ScenarioCard = {
  id: string
  title: string
  text: string
}

type StageTwoContent = {
  title: string
  intro: string
  scenariosLead: string
  diagramAlt: string
  scenarios: ScenarioCard[]
  generatorTable: {
    leftHeader: string
    rightHeader: string
    rows: TwoColumnRow[]
  }
  profileParagraphs: string[]
}

export function SectionSecondStage() {
  const { t } = useTranslation()
  const stageTwo = t('methodologyPage.stageTwo', {
    returnObjects: true,
  }) as StageTwoContent

  return (
    <Section id="stage-02" color="gray">
      <Section.Title>
        {t('methodologyPage.selectedStagePrefix')} 02. {stageTwo.title}
      </Section.Title>

      <article>
        <Text.Paragraph className="mt-5 text-muted">
          {stageTwo.intro}
        </Text.Paragraph>
        <Text.Paragraph className="mt-5 text-muted">
          {stageTwo.scenariosLead}
        </Text.Paragraph>
        <figure className="mt-5 mx-auto overflow-hidden rounded-sm border border-ink bg-white p-3">
          <img
            src={scenarioSchemeSvg}
            alt={stageTwo.diagramAlt}
            className="mx-auto w-full max-w-[960px]"
            loading="lazy"
          />
        </figure>

        <section className="py-5">
          <div className="mt-4 space-y-4">
            {stageTwo.scenarios.map((scenario) => (
              <article
                key={scenario.id}
                className="rounded-sm border border-ink bg-panel px-4 py-4"
              >
                <h5 className="text-sm font-semibold leading-6 text-ink">
                  {scenario.title}
                </h5>
                <p className="mt-2 text-sm leading-7 text-black/70">
                  {scenario.text}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="py-5">
          <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
            <TwoColumnTable
              leftHeader={stageTwo.generatorTable.leftHeader}
              rightHeader={stageTwo.generatorTable.rightHeader}
              rows={stageTwo.generatorTable.rows}
            />
            <div className="space-y-3 text-sm leading-7 text-black/70">
              {stageTwo.profileParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </article>
    </Section>
  )
}
