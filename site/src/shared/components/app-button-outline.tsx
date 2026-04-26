import type { ButtonHTMLAttributes, ReactNode } from 'react'

type AppButtonOutlineProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function AppButtonOutline({
  children,
  className = '',
  type = 'button',
  ...props
}: AppButtonOutlineProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md border border-ink bg-transparent px-5 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
