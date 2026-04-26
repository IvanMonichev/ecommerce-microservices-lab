import classNames from 'classnames'
import { ReactNode } from 'react'
import { Text as AppText } from '@/shared/components/text'
import { Divider } from '@/shared/components/divider'

interface TitleProps {
  children: ReactNode
}

function Title({ children }: TitleProps) {
  return (
    <div className="mb-10">
      <AppText.H2>{children}</AppText.H2>
      <Divider />
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
