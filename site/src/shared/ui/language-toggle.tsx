import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '@/shared/i18n/resources'

const languageMeta: Record<AppLanguage, { flag: string; label: string }> = {
  ru: { flag: '🇷🇺', label: 'RU' },
  en: { flag: '🇬🇧', label: 'EN' },
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
      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/70 transition hover:text-ink"
      aria-label={`Switch language to ${label}`}
      title={`Switch language to ${label}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current/15 bg-current/5 text-xs leading-none">
        {flag}
      </span>
      <span>{label}</span>
    </button>
  )
}
