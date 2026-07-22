import { useState } from 'react'
import { MapPin, Copy, Check, ExternalLink, CalendarClock } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { siteConfig } from '../../data/siteConfig'
import { copyToClipboard } from '../../utils/clipboard'

const mapsQuery = encodeURIComponent(siteConfig.address.full)
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&output=embed`

export function Location() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyToClipboard(siteConfig.address.full)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Localização" title="Ou melhor, venha nos visitar" align="left" />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-sand p-7 sm:p-9">
              <div>
                <div className="flex items-start gap-3">
                  <MapPin size={22} className="mt-1 shrink-0 text-terracotta" />
                  <div>
                    <p className="font-serif text-lg text-olive-dark">{siteConfig.address.full}</p>
                    <p className="mt-1 text-sm text-ink-soft/70">
                      Ponto de referência a confirmar com a cliente.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-cream/70 p-4 text-sm text-ink-soft">
                  <CalendarClock size={18} className="mt-0.5 shrink-0 text-olive-dark" />
                  Atendimento somente com agendamento prévio.
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-olive px-5 py-3 text-sm font-medium text-olive-dark transition hover:bg-olive hover:text-cream"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Endereço copiado' : 'Copiar endereço'}
                </button>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-medium text-cream transition hover:bg-olive-dark"
                >
                  <ExternalLink size={16} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <div className="h-72 w-full overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(43,43,38,0.08)] lg:h-full lg:min-h-[320px]">
              <iframe
                title={`Mapa de localização — ${siteConfig.address.full}`}
                src={mapsEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
