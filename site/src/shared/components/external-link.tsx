import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function ExternalLink({
  children,
  className = '',
  rel,
  target = '_blank',
  ...props
}: ExternalLinkProps) {
  const resolvedRel = rel ?? (target === '_blank' ? 'noreferrer' : undefined)

  return (
    <a
      target={target}
      rel={resolvedRel}
      className={`transition hover:text-ink ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}
