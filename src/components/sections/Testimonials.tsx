import { useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { MessageCircleHeart, ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { testimonials } from '../../data/testimonials'
import { siteConfig } from '../../data/siteConfig'

const SWIPE_THRESHOLD_PX = 50

function GoogleReviewsButton() {
  return (
    <a
      href={siteConfig.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-olive px-6 py-3 text-sm font-medium text-olive-dark transition hover:bg-olive hover:text-cream"
    >
      <Star size={16} className="fill-terracotta text-terracotta" />
      Ver todas as avaliações no Google
      <ExternalLink size={14} />
    </a>
  )
}

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

interface LeafNavButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}

function LeafNavButton({ direction, onClick, label }: LeafNavButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  const shapeClass = direction === 'prev' ? 'leaf-btn-prev' : 'leaf-btn-next'
  const nudgeClass = direction === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group flex h-12 w-12 shrink-0 items-center justify-center bg-sand text-olive-dark shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive hover:text-cream hover:shadow-md active:translate-y-0 active:scale-95 ${shapeClass}`}
    >
      <Icon size={20} className={`transition-transform duration-300 ${nudgeClass}`} />
    </button>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const touchStartXRef = useRef<number | null>(null)

  function goPrev() {
    setIndex((current) => (current - 1 + total) % total)
  }

  function goNext() {
    setIndex((current) => (current + 1) % total)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartXRef.current
    touchStartXRef.current = null
    if (startX === null) return

    const endX = event.changedTouches[0]?.clientX ?? startX
    const delta = endX - startX
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return

    if (delta > 0) {
      goPrev()
    } else {
      goNext()
    }
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
          <div className="mt-8 flex justify-center">
            <GoogleReviewsButton />
          </div>
        </Container>
      </section>
    )
  }

  const current = testimonials[index]

  return (
    <section id="avaliacoes" className="bg-cream py-20 sm:py-28">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Avaliações"
          title="Feedbacks que amamos receber"
          description="5,0 de média em 70 avaliações reais no Google."
        />

        <div
          role="group"
          aria-roledescription="carrossel"
          aria-label={`Avaliação ${index + 1} de ${total}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="mt-12 rounded-3xl bg-sand p-7 outline-none focus-visible:ring-2 focus-visible:ring-olive sm:p-9"
        >
          <div key={current.id} className="testimonial-fade">
            <StarRating rating={current.rating} />
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">"{current.text}"</p>
            <div className="mt-5 flex items-center justify-between gap-2">
              <p className="font-serif text-olive-dark">{current.authorName}</p>
              {current.source === 'google' && (
                <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-ink-soft/50">
                  Google
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm tracking-wide text-ink-soft/60" aria-live="polite">
          {index + 1} de {total}
        </p>

        {total > 1 && (
          <div className="mt-5 flex items-center justify-center gap-6">
            <LeafNavButton direction="prev" onClick={goPrev} label="Ver avaliação anterior" />
            <LeafNavButton direction="next" onClick={goNext} label="Ver próxima avaliação" />
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <GoogleReviewsButton />
        </div>
      </Container>
    </section>
  )
}
