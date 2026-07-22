import { HeartHandshake, Clock, Sparkles, UserRound, Sofa, Leaf } from 'lucide-react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

const highlights = [
  {
    icon: UserRound,
    title: 'Atendimento personalizado',
    description: 'Cada sessão é pensada a partir do que você precisa naquele momento.',
  },
  {
    icon: HeartHandshake,
    title: 'Cuidado com corpo e mente',
    description: 'Um equilíbrio entre técnica e acolhimento em cada toque.',
  },
  {
    icon: Sparkles,
    title: 'Sessões adaptadas',
    description: 'Técnicas ajustadas às necessidades individuais de cada pessoa.',
  },
  {
    icon: Sofa,
    title: 'Ambiente acolhedor',
    description: 'Um espaço construído com afeto para você se sentir em casa.',
  },
  {
    icon: Clock,
    title: 'Horários flexíveis',
    description: 'Agendamento pensado para caber na sua rotina.',
  },
  {
    icon: Leaf,
    title: 'Foco no bem-estar',
    description: 'Experiências voltadas ao relaxamento e ao equilíbrio.',
  },
]

export function Highlights() {
  return (
    <section id="cuidado" className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Cuidado que vai até você
            </span>
            <h2 className="mt-4 font-serif text-3xl text-olive-dark sm:text-4xl">
              Cuidado que se adapta a você
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Em sintonia com o seu momento, levo bem-estar onde seu coração quiser repousar.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-olive-dark">
                  <item.icon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-olive-dark">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
