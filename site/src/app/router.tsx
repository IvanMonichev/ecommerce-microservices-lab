import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/shared/layout/root-layout'
import { AboutAuthorPage } from '@/pages/about-author-page'
import { HomePage } from '@/pages/home-page'
import { MethodologyPage } from '@/pages/methodology-page'
import { ReportPage } from '@/pages/report-page'
import { NavigationLink } from '@/shared/constants/navigation.constant'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: NavigationLink.Methodology, element: <MethodologyPage /> },
        { path: NavigationLink.Reports, element: <ReportPage /> },
        { path: `${NavigationLink.Reports}/:id`, element: <ReportPage /> },
        { path: NavigationLink.AboutAuthor, element: <AboutAuthorPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
