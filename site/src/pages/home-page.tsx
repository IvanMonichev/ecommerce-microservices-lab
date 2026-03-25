import { Link } from 'react-router-dom'
import {
  reports,
  goals,
  architecturePillars,
  navigationCards,
} from '@/data/site-content'

import { SectionHeading } from '@/shared/ui/section-heading'
import { SectionHero } from '@/modules/landing/section-hero'
import { SectionAbout } from '@/modules/landing/section-about'
import { SectionMethodology } from '@/modules/landing/section-methodology'

export function HomePage() {
  return (
    <>
      <SectionHero />
      <SectionAbout />
      <SectionMethodology />
      <section className="bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="О проекте"
            title="Сайт фиксирует исследование как воспроизводимый инженерный артефакт."
            description="Вместо презентационного лендинга здесь собрана карта исследования: зачем был собран стенд, как выполняются прогоны и где смотреть результаты."
          />
          <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
            {goals.map((goal) => (
              <article key={goal.title} className="bg-white px-7 py-8">
                <h3 className="text-lg font-semibold">{goal.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">
                  {goal.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Архитектура стенда"
            title="Эксперимент строится вокруг e-commerce системы с несколькими каналами взаимодействия."
            description="Gateway координирует доступ к доменным сервисам, а отдельные сценарии позволяют сравнивать HTTP, gRPC и событийный контур."
          />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-sm border border-line bg-white shadow-panel">
              <img
                src={`${import.meta.env.BASE_URL}architecture.png`}
                alt="Схема архитектуры экспериментального стенда"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-px border border-line bg-line">
              {architecturePillars.map((pillar) => (
                <article key={pillar.name} className="bg-panel px-6 py-7">
                  <h3 className="text-lg font-semibold">{pillar.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/60">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Результаты"
            title="Отчёты группируются по сценариям и сразу показывают ключевые различия между реализациями."
            description="Ниже собраны опорные карточки для перехода к подробным страницам отчётов и будущим графикам."
          />
          <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
            {reports.map((report) => (
              <article key={report.id} className="bg-white px-7 py-8">
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{report.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">
                  {report.summary}
                </p>
                <div className="mt-7 grid grid-cols-2 gap-px border border-line bg-line">
                  {report.metrics.map((metric) => (
                    <div key={metric.label} className="bg-panel px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-black/45">
                        {metric.label}
                      </div>
                      <div className="mt-2 text-lg font-semibold">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/reports/${report.id}`}
                  className="mt-7 inline-flex items-center text-sm font-semibold text-ink underline decoration-black/20 underline-offset-4 transition hover:decoration-black"
                >
                  Открыть страницу отчёта
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Навигация"
            title="Главная страница выступает точкой входа в остальные разделы сайта."
          />
          <div className="grid gap-px border border-line bg-line md:grid-cols-3">
            {navigationCards.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group bg-white px-7 py-8 transition hover:bg-panel"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">
                  {item.description}
                </p>
                <span className="mt-8 inline-flex text-sm font-semibold">
                  Перейти
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-mist">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 text-sm text-black/50 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            © 2026{' '}
            <a
              href="https://itmo.ru/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-ink"
            >
              Университет ИТМО
            </a>
            , Иван Моничев, Санкт-Петербург
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/methodology" className="transition hover:text-ink">
              Methodology
            </Link>
            <Link
              to="/reports/get-all-orders-grpc"
              className="transition hover:text-ink"
            >
              Reports
            </Link>
            <Link to="/about" className="transition hover:text-ink">
              About
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
