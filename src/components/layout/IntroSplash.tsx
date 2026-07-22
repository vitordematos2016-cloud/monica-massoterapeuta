import { useEffect, useState } from 'react'

const SESSION_KEY = 'monica-nunes-intro-shown'

export function IntroSplash() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem(SESSION_KEY)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!alreadyShown && !prefersReducedMotion) {
      setShouldRender(true)
      window.sessionStorage.setItem(SESSION_KEY, 'true')
      const timer = setTimeout(() => setShouldRender(false), 1300)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      className="intro-splash fixed inset-0 z-[100] flex items-center justify-center bg-olive-dark"
      aria-hidden="true"
    >
      <span className="intro-name font-serif text-3xl sm:text-4xl text-cream tracking-wide">
        Mônica <span className="text-terracotta-soft italic">Nunes</span>
      </span>
    </div>
  )
}
