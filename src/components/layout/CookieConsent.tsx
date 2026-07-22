import { useEffect, useState } from 'react'

const STORAGE_KEY = 'monica-nunes-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleChoice(choice: 'accepted' | 'declined') {
    window.localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-sand-dark bg-cream/98 p-5 shadow-xl backdrop-blur sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <p className="text-sm text-ink-soft leading-relaxed">
        Usamos cookies essenciais para melhorar sua experiência de navegação neste site.{' '}
        <a href="/politica-de-cookies.html" className="underline text-olive-dark">
          Saiba mais
        </a>
        .
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleChoice('declined')}
          className="flex-1 rounded-full border border-sand-dark px-4 py-2 text-sm text-ink-soft transition hover:bg-sand"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => handleChoice('accepted')}
          className="flex-1 rounded-full bg-olive px-4 py-2 text-sm text-cream transition hover:bg-olive-dark"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
