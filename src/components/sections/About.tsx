import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import monicaAboutPhoto from '../../assets/professional/monica-about.webp'

// Texto reescrito a partir do depoimento real publicado em monicanunes.com.br,
// preservando o significado original. Nenhuma formação, especialização ou tempo de
// experiência foi inventado — apenas o que já constava no site da cliente.
export function About() {
  function scrollToServices() {
    document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="sobre" className="bg-sand py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Sobre
            </span>
            <h2 className="mt-4 font-serif text-3xl text-olive-dark sm:text-4xl">Mônica Nunes</h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>Oi! Sou Mônica Nunes, mãe, mulher e terapeuta.</p>
              <p>
                Com experiência e dedicação, transformei meu aprendizado em um caminho de acolhimento
                e bem-estar.
              </p>
              <p>
                O sonho de criar meu próprio espaço nasceu do desejo de cuidar e acolher, oferecendo
                um lugar feito de afeto e propósito.
              </p>
            </div>

            <p className="mt-6 font-serif text-lg italic text-olive-dark">
              "Será um prazer te receber com todo meu carinho."
            </p>

            <div className="mt-8">
              <Button variant="secondary" onClick={scrollToServices}>
                Conhecer os serviços
              </Button>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div className="absolute inset-0 blob-shape bg-olive/15" aria-hidden="true" />
              <div className="absolute inset-4 overflow-hidden blob-shape shadow-xl">
                <img
                  src={monicaAboutPhoto}
                  alt="Mônica Nunes, massoterapeuta, sorrindo em seu espaço de atendimento"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full bg-terracotta/25 blob-shape animate-breathe" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
