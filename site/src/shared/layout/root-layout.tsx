import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/shared/layout/header'
import { Footer } from '@/shared/layout/footer'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
