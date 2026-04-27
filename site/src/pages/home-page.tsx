import { SectionHero } from '@/modules/home/section-hero'
import { SectionAbout } from '@/modules/home/section-about'
import { SectionTechnologies } from '@/modules/home/section-technologies'
import { SectionMethodology } from '@/modules/home/section-methodology'
import { SectionNavigation } from '@/modules/home/section-navigation'

export function HomePage() {
  return (
    <>
      <SectionHero />
      <SectionAbout />
      <SectionMethodology />
      <SectionTechnologies />
      <SectionNavigation />
    </>
  )
}
