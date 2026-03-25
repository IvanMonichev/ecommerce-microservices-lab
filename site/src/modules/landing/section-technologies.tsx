import { technologies } from '@/data/site-content'
import { Section } from '@/shared/ui/section'
import { Text } from '@/shared/ui/text'
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
  return (
    <Section color="white">
      <Section.Title>Технологии</Section.Title>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-2 pt-6 text-center">
        <h3 className="text-6xl font-semibold tracking-tight text-ink md:text-7xl">
          {technologies.length} технологий
        </h3>
        <Paragraph className="mt-6 max-w-2xl text-center text-black/60">
          В проекте используются технологии для реализации микросервисов,
          хранения данных, контейнеризации и нагрузочного тестирования.
        </Paragraph>

        <div className="mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-3 md:gap-4">
          {technologies.map((item) => {
            const Icon = technologyIcons[item.name as keyof typeof technologyIcons]

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
