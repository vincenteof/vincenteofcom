import { createElement, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'span' | 'div'
}

export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  return createElement(
    as,
    {
      className: ['reveal-item', className].filter(Boolean).join(' '),
      style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
    },
    children,
  )
}