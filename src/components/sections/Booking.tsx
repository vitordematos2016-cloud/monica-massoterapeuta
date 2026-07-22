import { useEffect, useRef } from 'react'
import { CalendarClock } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { BookingForm } from '../forms/BookingForm'
import { SelectedServicesList } from '../booking/SelectedServicesList'
import { useSelection } from '../../context/SelectionContext'
import { getServiceBySlug } from '../../data/services'
import { setFloatingUiSuppressed } from '../../utils/floatingUiSuppression'

const BOOKING_STEP_SOURCE = 'booking-step'

function scrollToServices() {
  document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Booking() {
  const { selectedSlugs, removeService } = useSelection()
  const services = selectedSlugs.map((slug) => getServiceBySlug(slug)).filter((s) => s !== undefined)
  const hasSelection = services.length > 0
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setFloatingUiSuppressed(BOOKING_STEP_SOURCE, entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      setFloatingUiSuppressed(BOOKING_STEP_SOURCE, false)
    }
  }, [])

  return (
    <section id="agendamento" ref={sectionRef} className="bg-cream py-20 sm:py-28">
      <Container className="max-w-5xl">
        <SectionHeading
          eyebrow="Agendamento"
          title="Revise e solicite seu horário"
          description="Confira os serviços escolhidos e preencha seus dados. A Mônica entrará em contato para confirmar a disponibilidade."
        />

        {hasSelection ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10">
            <Reveal className="flex flex-col gap-5 rounded-3xl bg-sand p-6 sm:p-7 lg:sticky lg:top-28">
              <SelectedServicesList services={services} onRemove={removeService} />

              <div className="flex items-start gap-3 rounded-2xl bg-olive/8 p-4 text-sm text-ink-soft">
                <CalendarClock size={18} className="mt-0.5 shrink-0 text-olive-dark" />
                O horário só é confirmado depois do retorno da Mônica pelo WhatsApp.
              </div>
            </Reveal>

            <Reveal delayMs={100} className="rounded-3xl bg-sand p-6 sm:p-7">
              <BookingForm services={services} onBack={scrollToServices} />
            </Reveal>
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="flex flex-col items-center gap-5 rounded-3xl bg-sand px-6 py-14 text-center">
              <p className="max-w-sm text-ink-soft">
                Você ainda não selecionou nenhuma experiência. Escolha ao menos uma para
                continuar com o agendamento.
              </p>
              <Button onClick={scrollToServices}>Ver experiências</Button>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
