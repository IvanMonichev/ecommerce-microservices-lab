import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle } from 'lucide-react'
import authorPhoto from '@/assets/ivan-monichev.jpg'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { useSiteContent } from '@/shared/hooks/use-site-content'
import { AppButton } from '@/shared/components/app-button'
import { AppButtonOutline } from '@/shared/components/app-button-outline'
import { Text } from '@/shared/components/text'
import { Divider } from '@/shared/components/divider'

export function AboutAuthorPage() {
  const { t } = useTranslation()
  const { authorProfile } = useSiteContent()
  const emailContact = authorProfile.contacts[0]
  const vkContact = authorProfile.contacts[1]

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <section className="h-full rounded-sm border border-line bg-white px-7 py-8 md:px-8 md:py-9">
          <Text.H2>{authorProfile.name}</Text.H2>

          <Text.Paragraph className="mt-3">
            <Text.Accent type="font-semibold">
              {authorProfile.education}
            </Text.Accent>
          </Text.Paragraph>

          <Text.Paragraph>
            <Text.Accent type="font-semibold">
              {authorProfile.position}
            </Text.Accent>
          </Text.Paragraph>

          <Text.Paragraph>{authorProfile.description}</Text.Paragraph>

          <Text.H3 className="mt-6">{t('common.skills')}</Text.H3>
          <Divider />
          <div className="mt-5 flex flex-wrap gap-3">
            {authorProfile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-ink bg-mist px-4 py-2 text-sm font-medium text-ink"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link to={NavigationLink.Method} className="block">
              <AppButtonOutline className="w-full">
                {t('navigation.methodology')}
              </AppButtonOutline>
            </Link>
            <Link
              to={`${NavigationLink.Reports}/get-all-orders-grpc`}
              className="block"
            >
              <AppButton className="w-full">
                {t('aboutPage.reportsCta')}
              </AppButton>
            </Link>
          </div>
        </section>

        <aside className="h-full">
          <div className="flex h-full flex-col rounded-sm border border-line bg-white p-5 md:p-6">
            <div className="relative h-[320px] flex-1 overflow-hidden rounded-sm border border-line bg-mist md:h-auto">
              <img
                src={authorPhoto}
                alt={authorProfile.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-ink bg-ink sm:grid-cols-2">
              <a
                href={emailContact.href}
                className="bg-white px-5 py-5 transition hover:bg-accentSoft"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{emailContact.label}</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">
                  {emailContact.value}
                </div>
              </a>

              <a
                href={vkContact.href}
                className="bg-white px-5 py-5 transition hover:bg-accentSoft"
                target="_blank"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>{vkContact.label}</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">
                  {vkContact.value}
                </div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
