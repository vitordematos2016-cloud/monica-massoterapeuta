import { useState } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { objectives } from '../../data/objectives'
import { getServiceBySlug } from '../../data/services'
import { useSelection } from '../../context/SelectionContext'
import { buildSimpleContactMessage, buildWhatsAppUrl } from '../../utils/whatsapp'

export function ObjectivePicker() {
  const [activeObjectiveId, setActiveObjectiveId] = useState<string | null>(null)
  const { selectService } = useSelection()

  const activeObjective = objectives.find((o) => o.id === activeObjectiveId) ?? null

  return (
    <section id="beneficios" className="bg-sand py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Para você"
          title="Escolha pelo que você precisa sentir"
          description="Não é um diagnóstico — é um caminho para te ajudar a encontrar a experiência ideal para este momento."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {objectives.map((objective) => (
            <button
              key={objective.id}
              onClick={() => setActiveObjectiveId(objective.id)}
              aria-pressed={activeObjectiveId === objective.id}
              className={`rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                activeObjectiveId === objective.id
                  ? 'bg-olive text-cream shadow-md'
                  : 'bg-cream text-ink-soft hover:bg-olive/10'
              }`}
            >
              {objective.label}
            </button>
          ))}
        </div>

        {activeObjective && (
          <Reveal className="mt-10">
            <div className="mx-auto max-w-3xl rounded-3xl bg-cream p-7 shadow-[0_4px_24px_rgba(43,43,38,0.06)] sm:p-9">
              <p className="text-ink-soft">{activeObjective.description}</p>

              {activeObjective.isFallback ? (
                <a
                  href={buildWhatsAppUrl(buildSimpleContactMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-terracotta-soft"
                >
                  Conversar com a Mônica pelo WhatsApp
                </a>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {activeObjective.serviceSlugs.map((slug) => {
                    const service = getServiceBySlug(slug)
                    if (!service) return null
                    return (
                      <div key={slug} className="flex items-center justify-between gap-3 rounded-2xl bg-sand p-4">
                        <span className="font-serif text-olive-dark">{service.name}</span>
                        <button
                          onClick={() => selectService(service.slug, true)}
                          className="shrink-0 rounded-full border border-olive px-4 py-2 text-xs font-medium text-olive-dark transition hover:bg-olive hover:text-cream"
                        >
                          Selecionar
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
