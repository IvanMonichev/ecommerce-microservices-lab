import type { ButtonHTMLAttributes, ReactNode } from 'react'

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function AppButton({
  children,
  className = '',
  type = 'button',
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
