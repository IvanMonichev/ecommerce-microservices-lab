import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/shared/layout/root-layout'
import { AboutPage } from '@/pages/about-page'
import { HomePage } from '@/pages/home-page'
import { MethodologyPage } from '@/pages/methodology-page'
import { ReportPage } from '@/pages/report-page'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'methodology', element: <MethodologyPage /> },
        { path: 'reports/:id', element: <ReportPage /> },
        { path: 'about', element: <AboutPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
