import { Outlet } from 'react-router-dom'
import { Header } from '@/shared/layout/header'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
