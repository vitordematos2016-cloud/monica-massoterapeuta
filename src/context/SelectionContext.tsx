import { createContext, useContext, useState, type ReactNode } from 'react'

interface SelectionContextValue {
  selectedServiceSlug: string
  selectService: (slug: string, scrollToBooking?: boolean) => void
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('')

  function selectService(slug: string, scrollToBooking = false) {
    setSelectedServiceSlug(slug)
    if (scrollToBooking) {
      requestAnimationFrame(() => {
        document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <SelectionContext.Provider value={{ selectedServiceSlug, selectService }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection deve ser usado dentro de um SelectionProvider')
  return ctx
}
