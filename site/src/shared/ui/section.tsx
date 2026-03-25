import classNames from 'classnames'
import { ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}

function Title({ children }: TitleProps) {
  return (
    <div className="mb-10">
      <h2 className="max-w-3xl text-2xl font-semibold text-ink">{children}</h2>
      <div className="mt-6 h-px w-full bg-ink" />
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  color?: 'gray' | 'white'
}

export function Section({ children, color = 'gray' }: SectionProps) {
  return (
    <section
      className={classNames({
        'bg-mist': color === 'gray',
        'bg-white': color === 'white',
      })}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-8 lg:px-10">
        {children}
      </div>
    </section>
  )
}

Section.Title = Title
