import { navigationCards } from '@/data/site-content'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/shared/ui/section'

export function SectionNavigation() {
  return (
    <Section color="gray">
      <Section.Title>Навигация по исследованию</Section.Title>

      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
          {navigationCards.map((item) => {
            const isAnchor = item.to.startsWith('/#')
            const cardClassName =
              'group flex min-h-[220px] flex-col justify-between bg-white px-7 py-8 transition hover:bg-accentSoft'

            return isAnchor ? (
              <a key={item.to} href={item.to} className={cardClassName}>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-black/35 transition group-hover:text-accent" />
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-black/60">
                    {item.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex text-sm font-semibold text-ink">
                  Открыть раздел
                </span>
              </a>
            ) : (
              <Link key={item.to} to={item.to} className={cardClassName}>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-black/35 transition group-hover:text-accent" />
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-black/60">
                    {item.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex text-sm font-semibold text-ink">
                  Открыть раздел
                </span>
              </Link>
            )
          })}
      </div>
    </Section>
  )
}
