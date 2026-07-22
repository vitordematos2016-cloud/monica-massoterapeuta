import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { BookingForm } from '../forms/BookingForm'

export function Booking() {
  return (
    <section id="agendamento" className="bg-cream py-20 sm:py-28">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Agendamento"
          title="Vamos agendar o seu momento?"
          description="Preencha os campos abaixo. Seu pedido será enviado diretamente pelo WhatsApp para a Mônica confirmar a disponibilidade."
        />

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-sand p-6 sm:p-9">
            <BookingForm />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
