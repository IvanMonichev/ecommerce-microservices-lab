import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { ExternalLink } from '@/shared/components/external-link'

export function Footer() {
  const { t } = useTranslation()
  const navigation = [
    { label: t('navigation.home'), to: NavigationLink.Home },
    { label: t('navigation.aboutAuthor'), to: NavigationLink.AboutAuthor },
    { label: t('navigation.methodology'), to: NavigationLink.Method },
    { label: t('navigation.reports'), to: NavigationLink.Reports },
  ]

  return (
    <footer className="border-t border-black/5 bg-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 text-sm text-black/50 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <div>
            © 2026,{' '}
            <ExternalLink href="https://itmo.ru/">ITMO University</ExternalLink>
            ,{' '}
            <ExternalLink href="https://vk.com/ivan_monichev">
              Ivan Monichev
            </ExternalLink>
            , {t('footer.city')}
          </div>
          <ExternalLink
            href="https://github.com/ivanmonichev"
            className="mt-3 inline-flex items-center gap-2 text-black/60"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.83c.85 0 1.71.12 2.51.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.11 2.71.64.72 1.02 1.63 1.02 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
            </svg>
            <span>GitHub</span>
          </ExternalLink>
        </div>
        <div className="flex flex-wrap gap-6">
          {navigation.map((n) => (
            <Link key={n.to} to={n.to} className="transition hover:text-ink">
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
