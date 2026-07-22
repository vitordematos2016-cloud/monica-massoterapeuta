import { siteConfig } from '../data/siteConfig'
import type { BookingFormData } from '../types'
import { formatIsoDateToPtBr } from './dateValidation'

const PERIOD_LABELS: Record<BookingFormData['preferredPeriod'], string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  noite: 'Fim de tarde/noite',
  '': 'Sem preferência',
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`
}

export function buildBookingMessage(data: BookingFormData, serviceName: string | undefined): string {
  const lines = [
    `Olá, Mônica! Meu nome é ${data.name || '[nome]'}.`,
    '',
    'Gostaria de solicitar um horário.',
    '',
    `Experiência escolhida: ${serviceName ?? 'A combinar'}`,
    `Dia de preferência: ${data.preferredDay ? formatIsoDateToPtBr(data.preferredDay) : 'A combinar'}`,
    `Período: ${PERIOD_LABELS[data.preferredPeriod]}`,
    `Observações: ${data.notes || 'Nenhuma'}`,
    '',
    'Aguardo a confirmação da disponibilidade.',
  ]
  return lines.join('\n')
}

export function buildSimpleContactMessage(): string {
  return 'Olá, Mônica! Gostaria de saber mais sobre os seus atendimentos.'
}
