import type { ReactNode } from 'react'

type HeroAtmosphereProps = {
  children: ReactNode
  className?: string
}

export default function HeroAtmosphere({
  children,
  className,
}: HeroAtmosphereProps) {
  return (
    <section
      className={['hero-atmosphere', className].filter(Boolean).join(' ')}
    >
      <div className="hero-atmosphere__canvas" aria-hidden="true">
        <div className="hero-atmosphere__glow" />
        <div className="hero-atmosphere__grid" />
      </div>
      {children}
    </section>
  )
}