import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import {
  defaultReportMetricId,
  reportMetricDefinitions,
} from '@/modules/report/report-metric-config'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { LanguageToggle } from '@/shared/components/language-toggle'

export function Header() {
  const { t, i18n } = useTranslation()
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const reportsMenuRef = useRef<HTMLDivElement | null>(null)
  const [isReportsMenuOpen, setIsReportsMenuOpen] = useState(false)
  const isReportsRoute = pathname.startsWith(NavigationLink.Reports)
  const isRu = i18n.language.startsWith('ru')
  const activeMetric =
    new URLSearchParams(search).get('metric') ?? defaultReportMetricId
  const navigation = [
    { label: t('navigation.home'), to: NavigationLink.Home },
    { label: t('navigation.methodology'), to: NavigationLink.Methodology },
    { label: t('navigation.reports'), to: NavigationLink.Reports },
    { label: t('navigation.aboutAuthor'), to: NavigationLink.AboutAuthor },
  ]

  useEffect(() => {
    setIsReportsMenuOpen(false)
  }, [pathname, search])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        reportsMenuRef.current &&
        !reportsMenuRef.current.contains(event.target as Node)
      ) {
        setIsReportsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-mist/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto] items-center gap-6 py-5">
          <nav className="hidden items-center justify-center gap-7 text-sm text-black/55 md:flex">
            {navigation.map((item) => {
              if (item.to === NavigationLink.Reports) {
                return (
                  <div key={item.to} ref={reportsMenuRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsReportsMenuOpen((open) => !open)}
                      className={[
                        'relative inline-flex items-center gap-2 pb-1 font-semibold tracking-[0.04em] transition',
                        isReportsRoute
                          ? "text-ink after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent after:content-['']"
                          : 'hover:text-ink',
                      ].join(' ')}
                      aria-haspopup="menu"
                      aria-expanded={isReportsMenuOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={[
                          'h-4 w-4 text-black/45 transition',
                          isReportsMenuOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>

                    {isReportsMenuOpen ? (
                      <div className="absolute left-1/2 top-[calc(100%+0.9rem)] z-30 w-72 -translate-x-1/2 overflow-hidden rounded-sm border border-line bg-white shadow-panel">
                        <div className="border-b border-line bg-[linear-gradient(135deg,rgba(239,239,237,0.7),rgba(255,255,255,0.95))] px-4 py-3">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                            {isRu ? 'Разделы отчёта' : 'Report sections'}
                          </div>
                        </div>
                        <div className="py-1">
                          {reportMetricDefinitions.map((metric) => {
                            const isActive = metric.id === activeMetric

                            return (
                              <button
                                key={metric.id}
                                type="button"
                                onClick={() => {
                                  navigate(
                                    `${NavigationLink.Reports}?metric=${metric.id}`,
                                  )
                                  setIsReportsMenuOpen(false)
                                }}
                                className={[
                                  'flex w-full items-center justify-between px-4 py-3 text-left transition',
                                  isActive
                                    ? 'bg-panel text-ink'
                                    : 'text-black/60 hover:bg-panel hover:text-ink',
                                ].join(' ')}
                              >
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold">
                                    {isRu
                                      ? metric.tabLabel.ru
                                      : metric.tabLabel.en}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-black/45">
                                    {isRu ? metric.label.ru : metric.label.en}
                                  </span>
                                </span>
                                {isActive ? (
                                  <span className="ml-3 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                                ) : null}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )
              }

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
