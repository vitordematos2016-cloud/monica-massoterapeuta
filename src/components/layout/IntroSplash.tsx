import { useEffect, useState } from 'react'

const SPLASH_DURATION_MS = 2000

export function IntroSplash() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    setShouldRender(true)
    const timer = setTimeout(() => setShouldRender(false), SPLASH_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!shouldRender) return null

  return (
    <div
      className="intro-splash fixed inset-0 z-[100] flex items-center justify-center bg-olive-dark"
      aria-hidden="true"
    >
      <span className="intro-name flex flex-col items-center gap-2">
        <span className="font-serif text-3xl sm:text-4xl text-cream tracking-wide">
          Mônica <span className="text-terracotta-soft italic">Nunes</span>
        </span>
        <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-cream/60">
          Massoterapeuta
        </span>
      </span>
    </div>
  )
}
