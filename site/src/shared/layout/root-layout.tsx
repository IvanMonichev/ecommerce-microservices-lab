import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { label: 'Главная', to: '/' },
  { label: 'Автор', to: '/about' },
  { label: 'Методика', to: '/methodology' },
  { label: 'Отчёты', to: '/reports/get-all-orders-grpc' },
]

export function RootLayout() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-mist/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-extrabold text-white">
              C
            </span>
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
                Microservices Benchmark
              </div>
            </div>
          </NavLink>
          <nav className="hidden items-center gap-7 text-sm text-black/60 md:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'text-ink' : 'transition hover:text-ink'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
