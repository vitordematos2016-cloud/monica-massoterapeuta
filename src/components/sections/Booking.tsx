import { X } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { BookingForm } from '../forms/BookingForm'
import { useSelection } from '../../context/SelectionContext'
import { getServiceBySlug } from '../../data/services'

function scrollToServices() {
  document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Booking() {
  const { selectedSlugs, removeService } = useSelection()
  const services = selectedSlugs.map((slug) => getServiceBySlug(slug)).filter((s) => s !== undefined)
  const hasSelection = services.length > 0

  return (
    <section id="agendamento" className="bg-cream py-20 sm:py-28">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Agendamento"
          title="Revise sua experiência"
          description="Seu pedido será enviado para a Mônica, que confirmará a disponibilidade do horário."
        />

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-sand p-6 sm:p-9">
            {hasSelection ? (
              <>
                <ul className="mb-6 flex flex-col gap-2.5">
                  {services.map((service) => (
                    <li
                      key={service.slug}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-4"
                    >
                      <span className="font-serif text-olive-dark">{service.name}</span>
                      <button
                        type="button"
                        onClick={() => removeService(service.slug, service.name)}
                        aria-label={`Remover ${service.name} da seleção`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft/60 transition hover:bg-sand hover:text-terracotta"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={scrollToServices}
                  className="mb-8 text-sm font-medium text-olive-dark underline decoration-dotted underline-offset-4 transition hover:text-olive"
                >
                  Voltar aos serviços
                </button>

                <BookingForm services={services} />
              </>
            ) : (
              <div className="flex flex-col items-center gap-5 py-10 text-center">
                <p className="text-ink-soft">
                  Você ainda não selecionou nenhuma experiência. Escolha ao menos uma para
                  continuar com o agendamento.
                </p>
                <Button onClick={scrollToServices}>Ver experiências</Button>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
