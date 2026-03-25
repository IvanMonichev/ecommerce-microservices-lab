import { Link } from 'react-router-dom'
import {
  reports,
  goals,
  heroStats,
  architecturePillars,
  methodologySteps,
  navigationCards,
} from '@/data/site-content'
import { SectionHeading } from '@/shared/ui/section-heading'
import { AppButtonOutline } from '@/shared/ui/app-button-outline'
import { AppButton } from '@/shared/ui/app-button'

export function HomePage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] w-full max-w-6xl gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-xl text-2xl leading-[1.03] tracking-tight md:text-4xl">
              Исследование методов взаимодействия между микросервисами в
              веб-приложениях
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
              Исследование посвящено сравнению способов взаимодействия между
              микросервисами в составе веб-приложения. В рамках проекта
              анализируются HTTP, gRPC и событийная модель обмена сообщениями, а
              также оценивается их влияние на задержки, пропускную способность,
              устойчивость системы и потребление ресурсов в условиях
              нагрузочного тестирования. Листайте ниже, чтобы узнать больше про
              этот проект и его создателя.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <AppButtonOutline>Перейти к методике</AppButtonOutline>
              <AppButton>Открыть отчёты</AppButton>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] rounded-full border border-line bg-[radial-gradient(circle_at_center,_rgba(122,52,243,0.12),_rgba(122,52,243,0)_62%)] md:h-[380px] md:w-[380px]">
              <div className="absolute inset-[14%] rounded-full border border-black/8" />
              <div className="absolute inset-[24%] rounded-full border border-black/8" />
              <div className="absolute inset-[35%] rounded-full border border-black/8" />
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-black/45">
                    Lab focus
                  </div>
                  <div className="mt-4 text-3xl font-semibold">
                    HTTP / gRPC / Events
                  </div>
                  <div className="mt-3 text-sm text-black/55">
                    Latency, throughput, CPU, RAM
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:col-span-2 md:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="bg-panel px-6 py-7">
                <div className="text-4xl font-semibold tracking-tight">
                  {item.value}
                </div>
                <div className="mt-2 text-sm text-black/55">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Методика"
            title="Нагрузочная методика описана как последовательность воспроизводимых шагов."
            description="Структура сценариев, профили нагрузки и формат артефактов берутся из benchmark-модуля репозитория."
          />
          <div className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {methodologySteps.map((item) => (
              <article key={item.step} className="bg-white px-7 py-8">
                <div className="text-sm font-semibold text-accent">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/60">
                  {item.text}
                </p>
              </article>
            ))}
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
          <div>© 2026 Microservices Benchmark</div>
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
