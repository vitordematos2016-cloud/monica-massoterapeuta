import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { NAV_LINKS } from '../../data/siteConfig'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useFocusTrap } from '../../hooks/useFocusTrap'

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  useScrollLock(isMenuOpen)
  useFocusTrap(menuPanelRef, isMenuOpen, () => setIsMenuOpen(false))

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleNavClick(id: string) {
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const useSolidStyle = isScrolled || isMenuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        useSolidStyle ? 'bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(43,43,38,0.06)]' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-20 items-center justify-between py-4">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('inicio')
          }}
        >
          <Logo variant={useSolidStyle ? 'dark' : 'light'} />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                useSolidStyle ? 'text-ink-soft hover:text-olive-dark' : 'text-cream/90 hover:text-cream'
              } ${activeSection === link.id ? (useSolidStyle ? '!text-olive-dark font-semibold' : '!text-cream font-semibold') : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button onClick={() => handleNavClick('agendamento')} className="!px-5 !py-2.5 text-sm">
            Agendar
          </Button>
        </div>

        <button
          type="button"
          className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            useSolidStyle ? 'text-olive-dark' : 'text-cream'
          }`}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {isMenuOpen &&
        createPortal(
          <div
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-x-0 top-20 bottom-0 z-[90] flex flex-col overscroll-contain bg-cream lg:hidden"
          >
            <nav
              className="flex flex-col gap-1 overflow-y-auto px-6 py-8"
              aria-label="Navegação mobile"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-4 text-lg font-serif border-b border-sand-dark transition-colors ${
                    activeSection === link.id ? 'text-terracotta' : 'text-ink'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto px-6 pb-10 pt-4">
              <Button onClick={() => handleNavClick('agendamento')} className="w-full">
                Agendar meu momento
              </Button>
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}
