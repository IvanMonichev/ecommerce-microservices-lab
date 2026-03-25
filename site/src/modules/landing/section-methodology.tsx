import { methodologySteps } from '@/data/site-content'
import { Section } from '@/shared/ui/section'
import classNames from 'classnames'

export function SectionMethodology() {
  return (
    <Section color="gray">
      <Section.Title>Этапы методики</Section.Title>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        {methodologySteps.map((item, index) => (
          <article
            key={item.step}
            className={classNames(
              'rounded-sm border border-ink bg-white px-7 py-8 xl:col-span-2',
              {
                'xl:col-start-2': index === 3,
                'xl:col-start-4': index === 4,
              },
            )}
          >
            <div className="text-sm font-semibold text-accent">{item.step}</div>
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-black/60">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
