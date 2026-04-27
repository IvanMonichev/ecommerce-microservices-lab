import { useTranslation } from 'react-i18next'
import schemeSvg from '@/assets/arch-application-scheme.svg'
import { Section } from '@/shared/components/section'
import { Text } from '@/shared/components/text'
import { TwoColumnTable } from '@/shared/components/two-column-table'

type TwoColumnRow = {
  id: string
  left: string
  right: string
}

type StageOneContent = {
  title: string
  intro: string
  diagramText: string
  diagramAlt: string
  platformLead: string
  platformTable: {
    leftHeader: string
    rightHeader: string
    rows: TwoColumnRow[]
  }
  technologyTable: {
    leftHeader: string
    rightHeader: string
    rows: TwoColumnRow[]
  }
}

export function SectionFirstStage() {
  const { t } = useTranslation()
  const stageOne = t('methodologyPage.stageOne', {
    returnObjects: true,
  }) as StageOneContent
  const technologyRowsSplitIndex = Math.ceil(
    stageOne.technologyTable.rows.length / 2,
  )
  const technologyRowsLeft = stageOne.technologyTable.rows.slice(
    0,
    technologyRowsSplitIndex,
  )
  const technologyRowsRight = stageOne.technologyTable.rows.slice(
    technologyRowsSplitIndex,
  )

  return (
    <Section color="white">
      <Section.Title>
        {t('methodologyPage.selectedStagePrefix')} 01. {stageOne.title}
      </Section.Title>

      <article>
        <Text.Paragraph className="text-muted">{stageOne.intro}</Text.Paragraph>
        <Text.Paragraph className="text-muted">{stageOne.diagramText}</Text.Paragraph>
        <figure className="mt-5 overflow-hidden rounded-sm border border-ink p-3">
          <img
            src={schemeSvg}
            alt={stageOne.diagramAlt}
            className="mx-auto w-full max-w-[660px]"
            loading="lazy"
          />
        </figure>
        <Text.Paragraph className="mt-5 text-muted">
          {stageOne.platformLead}
        </Text.Paragraph>
        <TwoColumnTable
          className="mt-5"
          leftHeader={stageOne.platformTable.leftHeader}
          rightHeader={stageOne.platformTable.rightHeader}
          rows={stageOne.platformTable.rows}
        />
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
          <TwoColumnTable
            leftHeader={stageOne.technologyTable.leftHeader}
            rightHeader={stageOne.technologyTable.rightHeader}
            rows={technologyRowsLeft}
          />
          <TwoColumnTable
            leftHeader={stageOne.technologyTable.leftHeader}
            rightHeader={stageOne.technologyTable.rightHeader}
            rows={technologyRowsRight}
          />
        </div>
      </article>
    </Section>
  )
}
