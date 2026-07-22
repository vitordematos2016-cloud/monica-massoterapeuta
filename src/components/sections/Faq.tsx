import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { faqItems } from '../../data/faq'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)

  return (
    <section id="duvidas" className="bg-sand py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Dúvidas"
          title="Perguntas frequentes"
          description="Se você não encontrar a resposta que procura, envie uma mensagem — estamos aqui para ajudar."
        />

        <div className="mt-12 divide-y divide-sand-dark rounded-3xl bg-cream px-2 sm:px-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id
            return (
              <Reveal key={item.id} delayMs={Math.min(index * 40, 240)}>
                <div>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      id={`faq-question-${item.id}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="font-serif text-base text-olive-dark sm:text-lg">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-terracotta transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
