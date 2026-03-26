import { SectionHero } from '@/modules/landing/section-hero'
import { SectionAbout } from '@/modules/landing/section-about'
import { SectionTechnologies } from '@/modules/landing/section-technologies'
import { SectionMethodology } from '@/modules/landing/section-methodology'
import { SectionNavigation } from '@/modules/landing/section-navigation'
import { Footer } from '@/shared/layout/footer'

export function HomePage() {
  return (
    <>
      <SectionHero />
      <SectionAbout />
      <SectionMethodology />
      <SectionTechnologies />
      <SectionNavigation />
      <Footer />
    </>
  )
}
