import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { Container } from '../ui/Container'
import { Logo } from './Logo'
import { siteConfig, NAV_LINKS } from '../../data/siteConfig'

export function Footer() {
  const year = new Date().getFullYear()

  function handleNavClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-olive-dark text-cream/90">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-cream/70">
              Massoterapia e cuidado personalizado em {siteConfig.city} - {siteConfig.state}.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Mônica Nunes"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition hover:bg-cream/10"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Mônica Nunes"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition hover:bg-cream/10"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">Navegação</h3>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-sm text-cream/80 transition hover:text-cream w-fit"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">Contato</h3>
            <a
              href={`tel:+${siteConfig.whatsappNumber}`}
              className="flex items-start gap-2 text-sm text-cream/80 hover:text-cream"
            >
              <Phone size={16} className="mt-0.5 shrink-0" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-start gap-2 text-sm text-cream/80 hover:text-cream break-all"
            >
              <Mail size={16} className="mt-0.5 shrink-0" /> {siteConfig.email}
            </a>
            <p className="flex items-start gap-2 text-sm text-cream/80">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {siteConfig.address.full}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/60">Institucional</h3>
            <a href="/politica-de-privacidade.html" className="text-sm text-cream/80 hover:text-cream w-fit">
              Política de Privacidade
            </a>
            <a href="/politica-de-cookies.html" className="text-sm text-cream/80 hover:text-cream w-fit">
              Política de Cookies
            </a>
            <a href="/termos-de-uso.html" className="text-sm text-cream/80 hover:text-cream w-fit">
              Termos de Uso
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.businessFullName}. Todos os direitos reservados.</p>
          <p>Desenvolvido por Matos Soluções</p>
        </div>
      </Container>
    </footer>
  )
}
