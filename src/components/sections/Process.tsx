import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { processSteps } from '../../data/process'

export function Process() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Como funciona" title="A experiência do atendimento" />

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div
            aria-hidden="true"
            className="absolute left-6 top-2 h-[calc(100%-2.5rem)] w-px bg-sand-dark"
          />
          <ol className="flex flex-col gap-10">
            {processSteps.map((step) => (
              <Reveal key={step.id} delayMs={step.order * 60}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-olive font-serif text-cream shadow-sm">
                    {step.order}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-serif text-lg text-olive-dark">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
