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
  id?: string
}

export function Section({ children, color = 'gray', id }: SectionProps) {
  return (
    <section
      id={id}
      className={classNames({
        'bg-mist': color === 'gray',
        'bg-white': color === 'white',
      })}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-6 md:px-8 md:py-20 lg:px-10">
        {children}
      </div>
    </section>
  )
}

Section.Title = Title
