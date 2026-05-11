import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { LanguageToggle } from '@/shared/components/language-toggle'

export function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigation = [
    { label: t('navigation.home'), to: NavigationLink.Home },
    { label: t('navigation.methodology'), to: NavigationLink.Method },
    { label: t('navigation.reports'), to: NavigationLink.Reports },
    { label: t('navigation.aboutAuthor'), to: NavigationLink.AboutAuthor },
  ]

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-mist/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 md:grid-cols-[1fr_auto] md:gap-6 md:py-5">
          <NavLink
            to={NavigationLink.Home}
            className="text-sm font-extrabold uppercase tracking-[0.16em] text-ink md:hidden"
          >
            EML
          </NavLink>

          <nav className="hidden items-center justify-center gap-7 text-sm text-black/55 md:flex">
            {navigation.map((item) => {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'relative whitespace-nowrap pb-1 font-semibold tracking-[0.04em] transition',
                      isActive
                        ? "text-ink after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent after:content-['']"
                        : 'hover:text-ink',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink bg-white text-ink transition hover:bg-accentSoft md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className={[
            'grid border-t border-black/10 pb-4 pt-2 text-sm text-black/65 md:hidden',
            isMenuOpen ? 'grid' : 'hidden',
          ].join(' ')}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex min-h-11 items-center justify-between border-b border-black/10 py-3 font-semibold transition last:border-b-0',
                  isActive ? 'text-ink' : 'hover:text-ink',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
