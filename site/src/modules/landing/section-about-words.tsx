import { useTranslation } from 'react-i18next'

export function SectionAboutWords() {
  const { t } = useTranslation()
  const keywords = t('home.about.keywords', { returnObjects: true }) as string[]

  return (
    <div className="rounded-sm border border-ink bg-panel p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink">
        {t('home.about.keywordsTitle')}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  )
}
