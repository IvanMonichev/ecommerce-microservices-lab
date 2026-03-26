import { useTranslation } from 'react-i18next'

type HeroStat = {
  label: string
  value: string
}

type NamedContent = {
  name: string
  description: string
}

type MethodologyStep = {
  step: string
  title: string
  text: string
}

type ReportMetric = {
  label: string
  value: string
}

type Report = {
  id: string
  title: string
  summary: string
  tags: string[]
  metrics: ReportMetric[]
}

type NavigationCard = {
  title: string
  description: string
  to: string
}

type Contact = {
  label: string
  value: string
  href: string
}

type AuthorProfile = {
  name: string
  education: string
  age: string
  position: string
  description: string
  contacts: Contact[]
  skills: string[]
}

type ReportDetail = {
  title: string
  lead: string
}

type ReportDetailContent = Record<string, ReportDetail>

export function useSiteContent() {
  const { t } = useTranslation()

  return {
    heroStats: t('content.heroStats', { returnObjects: true }) as HeroStat[],
    goals: t('content.goals', { returnObjects: true }) as Array<{
      title: string
      text: string
    }>,
    architecturePillars: t('content.architecturePillars', {
      returnObjects: true,
    }) as NamedContent[],
    methodologySteps: t('content.methodologySteps', {
      returnObjects: true,
    }) as MethodologyStep[],
    technologies: t('content.technologies', {
      returnObjects: true,
    }) as NamedContent[],
    reports: t('content.reports', { returnObjects: true }) as Report[],
    navigationCards: t('content.navigationCards', {
      returnObjects: true,
    }) as NavigationCard[],
    methodologyDetails: t('content.methodologyDetails', {
      returnObjects: true,
    }) as string[],
    authorProfile: t('content.authorProfile', {
      returnObjects: true,
    }) as AuthorProfile,
    reportDetailContent: t('content.reportDetailContent', {
      returnObjects: true,
    }) as ReportDetailContent,
  }
}
