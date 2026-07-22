import { MapPin, ChevronDown } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { siteConfig } from '../../data/siteConfig'

// [INSERIR FOTO PROFISSIONAL OU DO AMBIENTE] Nenhuma fotografia de qualidade adequada foi
// encontrada no site atual (apenas um vídeo de banco de imagens genérico). A composição
// abaixo é temporária — orgânica e elegante — e deve ser substituída por uma fotografia
// real antes da publicação. Ver PENDENCIAS_CLIENTE.md.
export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-olive-dark pt-24 sm:min-h-screen"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-olive/40 blob-shape animate-float-slow" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-terracotta/20 blob-shape animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-dark/10 via-olive-dark/40 to-olive-dark" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-cream/85 backdrop-blur-sm">
            Massoterapia &amp; Estética
          </span>

          <h1 className="mt-6 font-serif text-4xl leading-[1.15] text-cream sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
            {siteConfig.subtitle}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-cream/70">
            <MapPin size={16} />
            <span>
              Atendimento em {siteConfig.city} – {siteConfig.state}
            </span>
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button onClick={() => scrollTo('agendamento')}>Agendar meu momento</Button>
            <Button variant="secondary" className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-olive-dark" onClick={() => scrollTo('experiencias')}>
              Conhecer os cuidados
            </Button>
          </div>
        </div>
      </Container>

      <button
        type="button"
        onClick={() => scrollTo('cuidado')}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-cream/60 transition hover:text-cream sm:flex"
      >
        <span className="text-[11px] uppercase tracking-widest">Descubra</span>
        <ChevronDown className="animate-bounce" size={20} />
      </button>
    </section>
  )
}
