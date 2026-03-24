import { SectionHeading } from "../shared/ui/section-heading";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        eyebrow="About"
        title="О проекте"
        description="Страница задаёт базовый контур раздела about: назначение, стек, публикация и происхождение данных."
      />
      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        <article className="bg-white px-7 py-8">
          <h3 className="text-xl font-semibold">Назначение</h3>
          <p className="mt-4 text-sm leading-7 text-black/60">
            Проект представляет экспериментальный стенд для сравнения
            микросервисных взаимодействий и производительности реализаций
            gateway.
          </p>
        </article>
        <article className="bg-white px-7 py-8">
          <h3 className="text-xl font-semibold">Технологии сайта</h3>
          <p className="mt-4 text-sm leading-7 text-black/60">
            Vite, React, TypeScript, React Router и Tailwind CSS, как указано в
            спецификации `site/spec.md`.
          </p>
        </article>
        <article className="bg-white px-7 py-8">
          <h3 className="text-xl font-semibold">Публикация</h3>
          <p className="mt-4 text-sm leading-7 text-black/60">
            Сайт рассчитан на дальнейший деплой в GitHub Pages и расширение
            через CI/CD pipeline в GitHub Actions.
          </p>
        </article>
      </div>
    </div>
  );
}
