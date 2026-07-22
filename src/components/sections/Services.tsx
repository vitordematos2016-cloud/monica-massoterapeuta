import { useState } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { ServiceCard } from './ServiceCard'
import { ServiceModal } from './ServiceModal'
import { services } from '../../data/services'
import type { Service } from '../../types'

export function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null)

  return (
    <section id="experiencias" className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Experiências"
          title="Experiências pensadas para o seu bem-estar"
          description="Cada experiência é uma oportunidade de desacelerar e reconectar com o seu corpo."
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delayMs={(index % 3) * 90}>
              <ServiceCard service={service} onOpenDetails={setActiveService} />
            </Reveal>
          ))}
        </div>
      </Container>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </section>
  )
}
