import { siteConfig } from '../data/siteConfig'
import type { BookingFormData } from '../types'
import { formatIsoDateToPtBr } from './dateValidation'
import { formatApproximateTime, formatPhoneDisplay } from './formatters'

const PERIOD_LABELS: Record<Exclude<BookingFormData['preferredPeriod'], ''>, string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  noite: 'Fim de tarde/noite',
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`
}

export function buildBookingMessage(data: BookingFormData, serviceNames: string[]): string {
  const blocks: string[] = []

  blocks.push('Olá, Mônica! Tudo bem?')
  blocks.push(`Meu nome é ${data.name.trim()} e gostaria de solicitar um horário de atendimento.`)

  if (serviceNames.length > 0) {
    const serviceLines = serviceNames.map((name) => `• ${name}`).join('\n')
    blocks.push(`*Serviços escolhidos:*\n${serviceLines}`)
  }

  const preferenceLines: string[] = []
  if (data.preferredDay) {
    preferenceLines.push(`• Data: ${formatIsoDateToPtBr(data.preferredDay)}`)
  }
  if (data.preferredPeriod) {
    preferenceLines.push(`• Período: ${PERIOD_LABELS[data.preferredPeriod]}`)
  }
  if (data.preferredTime) {
    preferenceLines.push(`• Horário aproximado: ${formatApproximateTime(data.preferredTime)}`)
  }
  if (preferenceLines.length > 0) {
    blocks.push(`*Preferência de atendimento:*\n${preferenceLines.join('\n')}`)
  }

  blocks.push(`*Contato:*\n• Telefone: ${formatPhoneDisplay(data.phone)}`)

  if (data.notes.trim()) {
    blocks.push(`*Observações:*\n${data.notes.trim()}`)
  }

  blocks.push('Entendo que o horário ainda depende da confirmação de disponibilidade.')
  blocks.push('Aguardo seu retorno. Obrigado(a)!')

  return blocks.join('\n\n')
}

export function buildSimpleContactMessage(): string {
  return 'Olá, Mônica! Gostaria de saber mais sobre os seus atendimentos.'
}
