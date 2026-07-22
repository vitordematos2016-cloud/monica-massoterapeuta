import { createContext, useContext, useRef, useState, type ReactNode } from 'react'

interface SelectionContextValue {
  selectedSlugs: string[]
  isSelected: (slug: string) => boolean
  toggleService: (slug: string, serviceName: string) => void
  removeService: (slug: string, serviceName?: string) => void
  clearSelection: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  announcement: string
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const hasAutoOpenedRef = useRef(false)

  function isSelected(slug: string): boolean {
    return selectedSlugs.includes(slug)
  }

  function openCart() {
    setIsCartOpen(true)
  }

  function closeCart() {
    setIsCartOpen(false)
  }

  function toggleService(slug: string, serviceName: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        setAnnouncement(`${serviceName} removido da sua seleção.`)
        return current.filter((item) => item !== slug)
      }

      setAnnouncement(`${serviceName} adicionado à sua seleção.`)
      if (current.length === 0 && !hasAutoOpenedRef.current) {
        hasAutoOpenedRef.current = true
        requestAnimationFrame(() => setIsCartOpen(true))
      }
      return [...current, slug]
    })
  }

  function removeService(slug: string, serviceName?: string) {
    setSelectedSlugs((current) => current.filter((item) => item !== slug))
    if (serviceName) {
      setAnnouncement(`${serviceName} removido da sua seleção.`)
    }
  }

  function clearSelection() {
    setSelectedSlugs([])
    setAnnouncement('Seleção limpa.')
  }

  return (
    <SelectionContext.Provider
      value={{
        selectedSlugs,
        isSelected,
        toggleService,
        removeService,
        clearSelection,
        isCartOpen,
        openCart,
        closeCart,
        announcement,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection deve ser usado dentro de um SelectionProvider')
  return ctx
}
