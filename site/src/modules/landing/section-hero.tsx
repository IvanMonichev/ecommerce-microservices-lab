import webHero from '@/assets/web-hero.svg'
import { AppButtonOutline } from '@/shared/ui/app-button-outline'
import { AppButton } from '@/shared/ui/app-button'

export function SectionHero() {
  return (
    <section className="bg-mist">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-xl text-3xl font-bold tracking-tight">
              Исследование методов взаимодействия между микросервисами в
              веб-приложениях
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text-black">
              Выпускная квалификационная работа посвящена сравнению способов
              взаимодействия между микросервисами в веб-приложении. В работе
              рассматриваются HTTP, gRPC и событийная модель обмена, а также их
              влияние на задержки, пропускную способность и потребление
              ресурсов при нагрузочном тестировании.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <AppButtonOutline>Перейти к методике</AppButtonOutline>
              <AppButton>Открыть отчёты</AppButton>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] rounded-full border border-line bg-[radial-gradient(circle_at_center,_rgba(122,52,243,0.12),_rgba(122,52,243,0)_62%)] md:h-[380px] md:w-[380px]">
              <img
                src={webHero}
                alt="web-hero"
                aria-hidden="true"
                className="absolute inset-[7%] h-[86%] w-[86%] object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
