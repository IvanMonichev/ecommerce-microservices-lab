import classNames from 'classnames'
import { ReactNode } from 'react'

interface ParagraphProps {
  children: ReactNode
  className?: string
}

interface AccentProps {
  children: ReactNode
  className?: string
}

export function Accent({ children, className }: AccentProps) {
  return (
    <span
      className={classNames(
        'underline decoration-1 underline-offset-4',
        className,
      )}
    >
      {children}
    </span>
  )
}

function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p
      className={classNames(
        'max-w-3xl text-base leading-8 text-ink',
        className,
      )}
    >
      {children}
    </p>
  )
}

export const Text = {
  Paragraph,
  Accent,
}
