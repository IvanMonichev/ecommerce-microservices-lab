import webHero from '@/assets/web-hero.svg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavigationLink } from '@/shared/constants/navigation.constant'
import { AppButtonOutline } from '@/shared/ui/app-button-outline'
import { AppButton } from '@/shared/ui/app-button'

export function SectionHero() {
  const { t } = useTranslation()

  return (
    <section className="bg-mist">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-xl text-3xl font-bold tracking-tight">
              {t('home.hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text-black">
              {t('home.hero.description')}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={NavigationLink.Methodology}>
                <AppButtonOutline>{t('home.hero.methodologyCta')}</AppButtonOutline>
              </Link>
              <Link to={`${NavigationLink.Reports}/get-all-orders-grpc`}>
                <AppButton>{t('home.hero.reportsCta')}</AppButton>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] rounded-full border border-line bg-[radial-gradient(circle_at_center,_rgba(122,52,243,0.12),_rgba(122,52,243,0)_62%)] md:h-[380px] md:w-[380px]">
              <img
                src={webHero}
                alt={t('home.hero.imageAlt')}
                className="absolute inset-[7%] h-[86%] w-[86%] object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
