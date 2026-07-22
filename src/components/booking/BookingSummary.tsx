import { formatIsoDateToPtBr } from '../../utils/dateValidation'
import { formatApproximateTime, formatPhoneDisplay } from '../../utils/formatters'
import type { BookingFormData } from '../../types'

const PERIOD_LABELS: Record<Exclude<BookingFormData['preferredPeriod'], ''>, string> = {
  manha: 'Manhã',
  tarde: 'Tarde',
  noite: 'Fim de tarde/noite',
}

interface BookingSummaryProps {
  serviceNames: string[]
  data: BookingFormData
}

export function BookingSummary({ serviceNames, data }: BookingSummaryProps) {
  const rows: { label: string; value: string }[] = []

  if (data.preferredDay) {
    rows.push({ label: 'Data de preferência', value: formatIsoDateToPtBr(data.preferredDay) })
  }
  if (data.preferredPeriod) {
    rows.push({ label: 'Período', value: PERIOD_LABELS[data.preferredPeriod] })
  }
  if (data.preferredTime) {
    rows.push({ label: 'Horário aproximado', value: formatApproximateTime(data.preferredTime) })
  }
  if (data.phone.trim()) {
    rows.push({ label: 'Contato', value: formatPhoneDisplay(data.phone) })
  }

  return (
    <div className="rounded-2xl border border-sand-dark bg-cream p-5">
      <h3 className="font-serif text-base text-olive-dark">Resumo da solicitação</h3>

      <div className="mt-3 space-y-3 text-sm text-ink-soft">
        {serviceNames.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft/60">Serviços</p>
            <ul className="mt-1">
              {serviceNames.map((name) => (
                <li key={name}>• {name}</li>
              ))}
            </ul>
          </div>
        )}

        {rows.map((row) => (
          <div key={row.label}>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft/60">{row.label}</p>
            <p>{row.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-soft/70">
        Este pedido não representa uma confirmação automática. A Mônica verificará a
        disponibilidade e responderá pelo WhatsApp.
      </p>
    </div>
  )
}
