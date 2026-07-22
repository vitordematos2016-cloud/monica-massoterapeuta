import { Phone, Mail, Wallet } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { siteConfig } from '../../data/siteConfig'
import { buildSimpleContactMessage, buildWhatsAppUrl } from '../../utils/whatsapp'

export function Contact() {
  return (
    <section id="contato" className="bg-sand py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Contato" title="Fale com a Mônica" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-cream p-7">
              <Phone size={22} className="text-terracotta" />
              <div>
                <h3 className="font-serif text-lg text-olive-dark">Telefone / WhatsApp</h3>
                <a
                  href={buildWhatsAppUrl(buildSimpleContactMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-ink-soft hover:text-olive-dark"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-cream p-7">
              <Mail size={22} className="text-terracotta" />
              <div>
                <h3 className="font-serif text-lg text-olive-dark">E-mail</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block break-all text-sm text-ink-soft hover:text-olive-dark"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={160}>
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-cream p-7 sm:col-span-2 lg:col-span-1">
              <Wallet size={22} className="text-terracotta" />
              <div>
                <h3 className="font-serif text-lg text-olive-dark">Formas de pagamento</h3>
                <p className="mt-1 text-sm text-ink-soft">{siteConfig.paymentMethods.join(' · ')}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={200}>
          <div className="mt-8 overflow-hidden rounded-3xl bg-cream">
            <table className="w-full text-sm">
              <caption className="px-7 pt-6 text-left font-serif text-lg text-olive-dark">
                Horário de atendimento
              </caption>
              <tbody>
                {siteConfig.hours.map((entry) => (
                  <tr key={entry.day} className="border-t border-sand-dark/60 first:border-t-0">
                    <th scope="row" className="px-7 py-3 text-left font-normal text-ink-soft">
                      {entry.day}
                    </th>
                    <td className="px-7 py-3 text-right text-ink-soft">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-7 pb-6 pt-3 text-xs text-ink-soft/60">
              Horário sujeito à confirmação da cliente antes da publicação.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
