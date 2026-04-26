import classNames from 'classnames'
import { ReactNode, HTMLAttributes, DetailedHTMLProps } from 'react'

interface ParagraphProps {
  children: ReactNode
  className?: string
}

interface AccentProps {
  children: ReactNode
  className?: string
  type?: 'underline' | 'font-semibold'
}

type H2NativeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type H3NativeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

interface H2Props extends H2NativeProps {
  children: ReactNode
  className?: string
}

interface H3Props extends H3NativeProps {
  children: ReactNode
  className?: string
}

function Accent({ children, className, type = 'underline' }: AccentProps) {
  return (
    <span
      className={classNames('decoration-1 underline-offset-4', className, type)}
    >
      {children}
    </span>
  )
}

function H3({ children, className, ...props }: H3Props) {
  return (
    <h3
      {...props}
      className={classNames(
        'max-w-3xl font-semibold text-ink text-base',
        className,
      )}
    >
      {children}
    </h3>
  )
}

function H2({ children, ...props }: H2Props) {
  return (
    <h2
      {...props}
      className={classNames(
        'max-w-3xl text-2xl font-semibold text-ink',
        classNames,
      )}
    >
      {children}
    </h2>
  )
}

function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p className={classNames('text-base leading-8 text-ink m-0', className)}>
      {children}
    </p>
  )
}

export const Text = {
  Paragraph,
  Accent,
  H2,
  H3,
}
