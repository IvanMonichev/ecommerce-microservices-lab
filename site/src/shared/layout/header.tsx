import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { LanguageToggle } from '@/shared/components/language-toggle'

export function Header() {
  const { t } = useTranslation()
  const navigation = [
    { label: t('navigation.home'), to: NavigationLink.Home },
    { label: t('navigation.methodology'), to: NavigationLink.Method },
    { label: t('navigation.reports'), to: NavigationLink.Reports },
    { label: t('navigation.aboutAuthor'), to: NavigationLink.AboutAuthor },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-mist/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 py-5">
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

          <div className="flex items-center justify-end gap-3">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
