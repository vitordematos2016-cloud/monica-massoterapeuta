import { useEffect, useState } from 'react'
import { FLOATING_UI_SUPPRESS_EVENT } from '../utils/floatingUiSuppression'

interface SuppressDetail {
  source: string
  suppressed: boolean
}

/** True whenever any section (map, booking step, ...) has asked floating UI to hide. */
export function useFloatingUiSuppressed(): boolean {
  const [sources, setSources] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    function handleSuppress(event: Event) {
      const detail = (event as CustomEvent<SuppressDetail>).detail
      if (!detail) return
      setSources((current) => {
        const next = new Set(current)
        if (detail.suppressed) {
          next.add(detail.source)
        } else {
          next.delete(detail.source)
        }
        return next
      })
    }

    window.addEventListener(FLOATING_UI_SUPPRESS_EVENT, handleSuppress)
    return () => window.removeEventListener(FLOATING_UI_SUPPRESS_EVENT, handleSuppress)
  }, [])

  return sources.size > 0
}
