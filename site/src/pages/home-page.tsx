import { Link } from 'react-router-dom'
import { SectionHero } from '@/modules/landing/section-hero'
import { SectionAbout } from '@/modules/landing/section-about'
import { SectionTechnologies } from '@/modules/landing/section-technologies'
import { SectionMethodology } from '@/modules/landing/section-methodology'
import { SectionNavigation } from '@/modules/landing/section-navigation'

export function HomePage() {
  return (
    <>
      <SectionHero />
      <SectionAbout />
      <SectionMethodology />
      <SectionTechnologies />

      <SectionNavigation />

      <footer className="border-t border-black/5 bg-mist">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 text-sm text-black/50 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            © 2026{' '}
            <a
              href="https://itmo.ru/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-ink"
            >
              Университет ИТМО
            </a>
            , Иван Моничев, Санкт-Петербург
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/about" className="transition hover:text-ink">
              Author
            </Link>
            <Link to="/methodology" className="transition hover:text-ink">
              Methodology
            </Link>
            <Link
              to="/reports/get-all-orders-grpc"
              className="transition hover:text-ink"
            >
              Reports
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
