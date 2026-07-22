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

export function buildBookingMessage(data: BookingFormData, serviceNames: string[]): string {
  const serviceLines =
    serviceNames.length > 0 ? serviceNames.map((name) => `• ${name}`).join('\n') : '• A combinar'

  const lines = [
    `Olá, Mônica! Meu nome é ${data.name || '[nome]'}.`,
    '',
    'Gostaria de solicitar um horário para os seguintes serviços:',
    '',
    serviceLines,
    '',
    `Data de preferência: ${data.preferredDay ? formatIsoDateToPtBr(data.preferredDay) : 'A combinar'}`,
    `Período de preferência: ${PERIOD_LABELS[data.preferredPeriod]}`,
    `Telefone para contato: ${data.phone || '[telefone]'}`,
    `Observações: ${data.notes || 'Nenhuma'}`,
    '',
    'Sei que o horário ainda depende da confirmação de disponibilidade.',
  ]
  return lines.join('\n')
}

export function buildSimpleContactMessage(): string {
  return 'Olá, Mônica! Gostaria de saber mais sobre os seus atendimentos.'
}
