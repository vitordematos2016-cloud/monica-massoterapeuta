import { useEffect, useRef, useState } from 'react'
import { X, Leaf, ArrowRight } from 'lucide-react'
import { useSelection } from '../../context/SelectionContext'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { getServiceBySlug } from '../../data/services'

const TRANSITION_MS = 320

export function CartPanel() {
  const { selectedSlugs, removeService, clearSelection, isCartOpen, closeCart } = useSelection()
  const [rendered, setRendered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const services = selectedSlugs.map((slug) => getServiceBySlug(slug)).filter((s) => s !== undefined)

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    if (isCartOpen) {
      setRendered(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      return () => cancelAnimationFrame(raf)
    }
    setVisible(false)
    setConfirmingClear(false)
    hideTimer = setTimeout(() => setRendered(false), TRANSITION_MS)
    return () => hideTimer && clearTimeout(hideTimer)
  }, [isCartOpen])

  useFocusTrap(containerRef, isCartOpen, closeCart)

  if (!rendered) return null

  function handleReviewAndBook() {
    closeCart()
    requestAnimationFrame(() => {
      document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function handleClearClick() {
    if (services.length > 1 && !confirmingClear) {
      setConfirmingClear(true)
      return
    }
    clearSelection()
    setConfirmingClear(false)
  }

  return (
    <>
      <button
        type="button"
        aria-label="Fechar minha seleção"
        onClick={closeCart}
        className={`fixed inset-0 z-[64] bg-ink/40 transition-opacity duration-300 lg:bg-transparent ${
          visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-panel-title"
        className={`fixed inset-x-0 bottom-0 z-[65] flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-cream shadow-2xl transition-transform duration-300 ease-out lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:bottom-auto lg:h-full lg:max-h-none lg:w-[400px] lg:rounded-l-3xl lg:rounded-tr-none ${
          visible ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-x-full lg:translate-y-0'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-sand-dark px-6 py-5">
          <div>
            <h2 id="cart-panel-title" className="font-serif text-xl text-olive-dark">
              Minha seleção
            </h2>
            <p className="text-xs text-ink-soft/70">
              {services.length} {services.length === 1 ? 'serviço selecionado' : 'serviços selecionados'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition hover:bg-sand"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {services.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-soft/70">
              Você ainda não selecionou nenhum serviço.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li
                  key={service.slug}
                  className="flex items-start gap-3 rounded-2xl bg-sand p-3.5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream text-olive-dark/50">
                    <Leaf size={18} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-sm text-olive-dark">{service.name}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft/80">{service.shortSummary}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeService(service.slug, service.name)}
                    aria-label={`Remover ${service.name} da seleção`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft/60 transition hover:bg-cream hover:text-terracotta"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-sand-dark px-6 py-5">
          {confirmingClear ? (
            <div className="flex items-center justify-between gap-3 rounded-xl bg-sand px-4 py-3 text-sm text-ink-soft">
              <span>Limpar toda a seleção?</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmingClear(false)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-cream"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleClearClick}
                  className="rounded-full bg-terracotta px-3 py-1.5 text-xs font-medium text-cream hover:bg-terracotta-soft"
                >
                  Sim, limpar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClearClick}
              disabled={services.length === 0}
              className="text-sm font-medium text-ink-soft underline decoration-dotted underline-offset-4 transition hover:text-terracotta disabled:pointer-events-none disabled:opacity-40"
            >
              Limpar seleção
            </button>
          )}

          <button
            type="button"
            onClick={handleReviewAndBook}
            disabled={services.length === 0}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-olive px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Revisar e agendar
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
