import { MapPin, ChevronDown } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { siteConfig } from '../../data/siteConfig'
import monicaHeroPhoto from '../../assets/professional/monica-hero.webp'

export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-olive-dark pt-28 pb-14 sm:min-h-screen sm:pb-0"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-olive/40 blob-shape animate-float-slow" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-terracotta/20 blob-shape animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-dark/10 via-olive-dark/40 to-olive-dark" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-cream/85 backdrop-blur-sm">
              Massoterapia &amp; Estética
            </span>

            <h1 className="mt-5 font-serif text-[clamp(2.2rem,9vw,4.25rem)] leading-[1.05] text-cream">
              Mônica Nunes
            </h1>
            <p className="mt-1.5 text-[clamp(0.75rem,3vw,0.95rem)] font-medium uppercase tracking-[0.25em] text-terracotta-soft">
              Massoterapeuta
            </p>

            <h2 className="mt-6 font-serif text-2xl italic leading-snug text-cream sm:text-3xl">
              {siteConfig.tagline}
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
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
              <Button
                variant="secondary"
                className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-olive-dark"
                onClick={() => scrollTo('experiencias')}
              >
                Conhecer os cuidados
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-xs lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-terracotta/15 blob-shape animate-breathe" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img
                src={monicaHeroPhoto}
                alt="Mônica Nunes, massoterapeuta"
                width={1000}
                height={1250}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/35 via-transparent to-transparent" />
            </div>
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
