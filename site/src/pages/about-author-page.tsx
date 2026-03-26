import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle } from 'lucide-react'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import { AppButton } from '@/shared/ui/app-button'
import { AppButtonOutline } from '@/shared/ui/app-button-outline'

function getContactIcon(label: string, href: string) {
  const normalizedLabel = label.toLowerCase()
  const normalizedHref = href.toLowerCase()

  if (normalizedLabel.includes('mail') || normalizedHref.startsWith('mailto:')) {
    return Mail
  }

  if (normalizedLabel.includes('vk') || normalizedHref.includes('vk.com')) {
    return MessageCircle
  }

  return MessageCircle
}

export function AboutAuthorPage() {
  const { t } = useTranslation()
  const { authorProfile } = useSiteContent()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <section className="rounded-sm border border-line bg-white px-7 py-8 md:px-8 md:py-9">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {authorProfile.name}
          </h2>

          <p className="mt-6 text-lg font-semibold leading-8 text-ink">
            {authorProfile.education}
          </p>

          <p className="mt-6 text-lg font-semibold leading-8 text-ink">
            {authorProfile.position}
          </p>

          <p className="mt-3 text-base leading-8 text-black/65">
            {authorProfile.age}
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-black/65">
            {authorProfile.description}
          </p>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
              {t('common.contacts')}
            </p>
            <div className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {authorProfile.contacts.map((contact) => {
                const Icon = getContactIcon(contact.label, contact.href)

                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="bg-white px-5 py-5 transition hover:bg-accentSoft"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{contact.label}</span>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-ink">
                      {contact.value}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
              {t('common.skills')}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {authorProfile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-sm border border-line bg-white p-5 md:p-6">
            <div className="relative flex min-h-[420px] items-end overflow-hidden rounded-sm border border-line bg-[linear-gradient(160deg,_rgba(122,52,243,0.16),_rgba(255,255,255,0.92)_52%,_rgba(221,222,227,0.95)_100%)] p-6">
              <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-ink/15 bg-white/55 blur-[2px]" />
              <div className="absolute right-8 top-10 h-16 w-16 rounded-full border border-accent/20 bg-accent/10" />
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-[0.26em] text-black/45">
                  {t('common.photo')}
                </div>
                <div className="mt-4 text-5xl font-semibold tracking-tight text-ink">
                  ИМ
                </div>
                <p className="mt-4 max-w-xs text-sm leading-7 text-black/60">
                  {t('aboutPage.imagePlaceholder')}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-line bg-white px-7 py-6">
            <div className="flex flex-wrap gap-3">
              <Link to={NavigationLink.Methodology}>
                <AppButtonOutline>{t('navigation.methodology')}</AppButtonOutline>
              </Link>
              <Link to={`${NavigationLink.Reports}/get-all-orders-grpc`}>
                <AppButton>{t('aboutPage.reportsCta')}</AppButton>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
