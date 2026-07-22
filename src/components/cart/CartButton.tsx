import { useEffect, useState } from 'react'
import { ClipboardList } from 'lucide-react'
import { useSelection } from '../../context/SelectionContext'

export function CartButton() {
  const { selectedSlugs, isCartOpen, openCart } = useSelection()
  const count = selectedSlugs.length
  const [bump, setBump] = useState(false)

  useEffect(() => {
    if (count === 0) return
    setBump(true)
    const timer = setTimeout(() => setBump(false), 400)
    return () => clearTimeout(timer)
  }, [count])

  if (count === 0 || isCartOpen) return null

  return (
    <button
      type="button"
      onClick={openCart}
      className={`fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-olive px-5 py-3.5 text-sm font-medium text-cream shadow-lg transition-transform duration-300 hover:bg-olive-dark sm:bottom-7 sm:left-7 ${
        bump ? 'animate-cart-bump' : ''
      }`}
    >
      <ClipboardList size={18} />
      Minha seleção · {count}
    </button>
  )
}
