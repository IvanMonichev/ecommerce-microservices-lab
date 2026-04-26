import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/components/section'
import { Text } from '@/shared/components/text'

const { Accent } = Text

export function SectionAbout() {
  const { t } = useTranslation()

  return (
    <Section color="white">
      <Section.Title>{t('home.about.title')}</Section.Title>
      <div>
        <Text.Paragraph>
          {t('home.about.paragraph1Start')}{' '}
          <Accent>{t('home.about.paragraph1Accent')}</Accent>.
        </Text.Paragraph>
        <Text.Paragraph className="mt-6">
          {t('home.about.paragraph2')}
        </Text.Paragraph>
      </div>
    </Section>
  )
}
