import { Section } from '@/shared/ui/section'
import { Text } from '@/shared/ui/text'
import { SectionAboutWords } from '@/modules/landing/section-about-words'

const { Accent } = Text

export function SectionAbout() {
  return (
    <Section color="white">
      <Section.Title>О проекте</Section.Title>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Text.Paragraph>
            Проект базируется на разработанной воспроизводимой методике
            сравнительной оценки производительности микросервисного
            взаимодействия. Исследование ориентировано на выбор технологической
            платформы для микросервисных систем в условиях{' '}
            <Accent>реальной нагрузки</Accent>.
          </Text.Paragraph>
          <Text.Paragraph className="mt-6">
            В текущей версии проекта сопоставляются две реализации одного
            экспериментального e-commerce приложения: на Express для
            TypeScript-стека и на Fiber для Go-стека. Сравнение выполняется по
            метрикам среднего времени отклика, p95 времени отклика, пропускной
            способности, загрузки CPU и потребления памяти. Нагрузочное
            тестирование проводится в контейнеризированной среде Docker с
            использованием k6, а сбор ресурсных метрик выполняется при
            фиксированных условиях эксперимента.
          </Text.Paragraph>
        </div>
        <SectionAboutWords />
      </div>
    </Section>
  )
}
