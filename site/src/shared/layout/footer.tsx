import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { ExternalLink } from '@/shared/ui/external-link'

export function Footer() {
  const { t } = useTranslation()
  const navigation = [
    { label: t('navigation.home'), to: NavigationLink.Home },
    { label: t('navigation.aboutAuthor'), to: NavigationLink.AboutAuthor },
    { label: t('navigation.methodology'), to: NavigationLink.Methodology },
    { label: t('navigation.reports'), to: NavigationLink.Reports },
  ]

  return (
    <footer className="border-t border-black/5 bg-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 text-sm text-black/50 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          © 2026,{' '}
          <ExternalLink href="https://itmo.ru/">ITMO University</ExternalLink>,{' '}
          <ExternalLink href="https://vk.com/ivan_monichev">
            Ivan Monichev
          </ExternalLink>
          , {t('footer.city')}
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
