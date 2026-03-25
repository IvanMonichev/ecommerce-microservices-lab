export function SectionAboutWords() {
  return (
    <div className="rounded-sm border border-ink bg-panel p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink">
        Ключевые слова
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          'Микросервисная архитектура',
          'Веб-фреймворки',
          'Производительность',
          'Нагрузочное тестирование',
          'Контролируемый эксперимент',
          'Воспроизводимость',
        ].map((keyword) => (
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
