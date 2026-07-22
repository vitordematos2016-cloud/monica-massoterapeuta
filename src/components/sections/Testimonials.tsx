import { useRef } from 'react'
import { MessageCircleHeart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { testimonials } from '../../data/testimonials'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={15}
          className={index < rating ? 'fill-terracotta text-terracotta' : 'text-sand-dark'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]') as HTMLElement | null
    const amount = (card?.offsetWidth ?? 320) + 20
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  if (testimonials.length === 0) {
    return (
      <section id="avaliacoes" className="bg-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Avaliações"
            title="Feedbacks que amamos receber"
            description="Estamos reunindo depoimentos reais de clientes, com autorização de uso, para compartilhar aqui em breve."
          />
          <Reveal>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-sand-dark bg-sand/60 py-16 text-ink-soft/70">
              <MessageCircleHeart size={28} strokeWidth={1.25} />
              <p className="text-sm">Depoimentos em preparação</p>
            </div>
          </Reveal>
        </Container>
      </section>
    )
  }

  return (
    <section id="avaliacoes" className="bg-cream py-20 sm:py-28">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Avaliações"
            title="Feedbacks que amamos receber"
            description="5,0 de média em 70 avaliações reais no Google."
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Depoimento anterior"
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-dark text-olive-dark transition hover:bg-sand"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Próximo depoimento"
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-dark text-olive-dark transition hover:bg-sand"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
          role="region"
          aria-label="Carrossel de depoimentos"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              data-card
              className="flex w-[85%] shrink-0 flex-col rounded-3xl bg-sand p-6 sm:w-[380px]"
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-3 flex-1 text-ink-soft leading-relaxed">"{testimonial.text}"</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <p className="font-serif text-olive-dark">{testimonial.authorName}</p>
                {testimonial.source === 'google' && (
                  <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-ink-soft/50">
                    Google
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
