import { SectionMethodStages } from '@/modules/method/section-method-stages'
import { SectionFirstStage } from '@/modules/method/section-first-stage'
import { SectionSecondStage } from '@/modules/method/section-second-stage'
import { SectionThirdStage } from '@/modules/method/section-third-stage'
import { SectionFourthFifthStage } from '@/modules/method/section-fourth-fifth-stage'
import { Section } from '@/shared/components/section'

export function MethodPage() {
  return (
    <>
      <Section color="gray">
        <SectionMethodStages />
      </Section>

      <SectionFirstStage />

      <SectionSecondStage />

      <SectionThirdStage />
      <SectionFourthFifthStage />
    </>
  )
}
