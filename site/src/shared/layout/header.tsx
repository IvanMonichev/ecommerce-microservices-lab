import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { LanguageToggle } from '@/shared/ui/language-toggle'

export function Header() {
  const { t } = useTranslation()
  const navigation = [
    { label: t('navigation.home'), to: NavigationLink.Home },
    { label: t('navigation.aboutAuthor'), to: NavigationLink.AboutAuthor },
    { label: t('navigation.methodology'), to: NavigationLink.Methodology },
    { label: t('navigation.reports'), to: NavigationLink.Reports },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-mist/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-extrabold text-white">
            C
          </span>
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
              {t('brand.title')}
            </div>
          </div>
        </NavLink>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-7 text-sm text-black/60 md:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'text-ink' : 'transition hover:text-ink'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
