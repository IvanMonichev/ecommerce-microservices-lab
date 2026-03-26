import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/ui/section'
import { Text } from '@/shared/ui/text'
import { SectionAboutWords } from '@/modules/landing/section-about-words'

const { Accent } = Text

export function SectionAbout() {
  const { t } = useTranslation()

  return (
    <Section color="white">
      <Section.Title>{t('home.about.title')}</Section.Title>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Text.Paragraph>
            {t('home.about.paragraph1Start')}{' '}
            <Accent>{t('home.about.paragraph1Accent')}</Accent>.
          </Text.Paragraph>
          <Text.Paragraph className="mt-6">
            {t('home.about.paragraph2')}
          </Text.Paragraph>
        </div>
        <SectionAboutWords />
      </div>
    </Section>
  )
}
