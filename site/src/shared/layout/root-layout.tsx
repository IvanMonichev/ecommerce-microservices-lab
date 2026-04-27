import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { Header } from '@/shared/layout/header'
import { Footer } from '@/shared/layout/footer'

function HashScrollHandler() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      return
    }

    const element = document.getElementById(hash.slice(1))

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return null
}

export function RootLayout() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <Header />
      <HashScrollHandler />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
