import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '@/shared/i18n/resources'
import russiaFlagIcon from '@/assets/russia-flag-icon.svg'
import unitedKingdomFlagIcon from '@/assets/united-kingdom-flag-icon.svg'

const languageMeta: Record<AppLanguage, { flag: string; label: string }> = {
  ru: { flag: russiaFlagIcon, label: 'RU' },
  en: { flag: unitedKingdomFlagIcon, label: 'EN' },
}

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? 'ru') as AppLanguage
  const nextLanguage: AppLanguage = currentLanguage === 'ru' ? 'en' : 'ru'
  const { flag, label } = languageMeta[nextLanguage]

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
      className="inline-flex items-center gap-2 px-1 py-1 pr-2"
      aria-label={`Switch language to ${label}`}
      title={`Switch language to ${label}`}
    >
      <span className="inline-flex h-5 w-5 overflow-hidden rounded-full border border-black">
        <img src={flag} alt="" className="h-full w-full object-cover" />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black">
        {label}
      </span>
    </button>
  )
}
