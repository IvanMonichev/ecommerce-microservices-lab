import { Section } from '@/shared/ui/section'
import { Text } from '@/shared/ui/text'
import { useTranslation } from 'react-i18next'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import {
  Binary,
  Box,
  Braces,
  Database,
  PackageCheck,
  Rabbit,
  TestTubeDiagonal,
  Workflow,
} from 'lucide-react'

const technologyIcons = {
  Go: Binary,
  TypeScript: Braces,
  Fiber: Workflow,
  Express: Box,
  MongoDB: Database,
  Postgres: Database,
  Docker: PackageCheck,
  k6: TestTubeDiagonal,
  RabbitMQ: Rabbit,
} as const

const { Paragraph } = Text

export function SectionTechnologies() {
  const { t } = useTranslation()
  const { technologies } = useSiteContent()

  return (
    <Section color="white">
      <Section.Title>{t('home.technologies.title')}</Section.Title>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-2 pt-6 text-center">
        <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-4xl">
          {t('home.technologies.count', { count: technologies.length })}
        </h3>
        <Paragraph className="mt-6 max-w-2xl text-center text-black/60">
          {t('home.technologies.description')}
        </Paragraph>

        <div className="mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-3 md:gap-4">
          {technologies.map((item) => {
            const Icon =
              technologyIcons[item.name as keyof typeof technologyIcons]

            return (
              <div
                key={item.name}
                className="inline-flex min-w-[148px] items-center justify-center gap-2 rounded-sm border border-line bg-mist px-5 py-4 text-sm font-medium text-ink"
                title={item.description}
              >
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
