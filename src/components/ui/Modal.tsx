import { useRef, type ReactNode } from 'react'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  labelledBy: string
}

export function Modal({ isOpen, onClose, children, labelledBy }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollLock(isOpen)
  useFocusTrap(containerRef, isOpen, onClose)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-cream shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar experiência"
          className="sticky top-4 float-right mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-sand text-ink-soft transition hover:bg-sand-dark focus-visible:outline focus-visible:outline-2"
        >
          <CloseIcon />
        </button>
        <div className="clear-both">{children}</div>
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
