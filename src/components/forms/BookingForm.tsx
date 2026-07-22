import { useState, type FormEvent, type ReactNode } from 'react'
import { Send } from 'lucide-react'
import { services, getServiceBySlug } from '../../data/services'
import { useSelection } from '../../context/SelectionContext'
import { getTodayIsoDate, isPastDate } from '../../utils/dateValidation'
import { buildBookingMessage, buildWhatsAppUrl } from '../../utils/whatsapp'
import type { BookingFormData } from '../../types'

const PERIOD_OPTIONS: { value: BookingFormData['preferredPeriod']; label: string }[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Fim de tarde/noite' },
]

export function BookingForm() {
  const { selectedServiceSlug, selectService } = useSelection()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredDay, setPreferredDay] = useState('')
  const [preferredPeriod, setPreferredPeriod] = useState<BookingFormData['preferredPeriod']>('')
  const [notes, setNotes] = useState('')
  const [consent, setConsent] = useState(false)
  const [dateError, setDateError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = name.trim().length > 1 && phone.trim().length >= 8 && consent && !dateError

  function handleDayChange(value: string) {
    setPreferredDay(value)
    setDateError(isPastDate(value) ? 'Escolha uma data a partir de hoje.' : '')
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSubmit) return

    const data: BookingFormData = {
      name: name.trim(),
      phone: phone.trim(),
      serviceSlug: selectedServiceSlug,
      preferredDay,
      preferredPeriod,
      notes: notes.trim(),
      consent,
    }

    const serviceName = getServiceBySlug(selectedServiceSlug)?.name
    const message = buildBookingMessage(data, serviceName)
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" htmlFor="booking-name" required>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="form-input"
            placeholder="Seu nome completo"
          />
        </Field>

        <Field label="Telefone" htmlFor="booking-phone" required>
          <input
            id="booking-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className="form-input"
            placeholder="(19) 99999-9999"
          />
        </Field>
      </div>

      <Field label="Experiência desejada" htmlFor="booking-service">
        <select
          id="booking-service"
          value={selectedServiceSlug}
          onChange={(e) => selectService(e.target.value)}
          className="form-input"
        >
          <option value="">Selecione uma experiência (opcional)</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Dia de preferência" htmlFor="booking-day" error={dateError}>
          <input
            id="booking-day"
            type="date"
            value={preferredDay}
            min={getTodayIsoDate()}
            onChange={(e) => handleDayChange(e.target.value)}
            className="form-input"
          />
        </Field>

        <Field label="Período de preferência" htmlFor="booking-period">
          <select
            id="booking-period"
            value={preferredPeriod}
            onChange={(e) => setPreferredPeriod(e.target.value as BookingFormData['preferredPeriod'])}
            className="form-input"
          >
            <option value="">Sem preferência</option>
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Observações" htmlFor="booking-notes">
        <textarea
          id="booking-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="form-input resize-none"
          placeholder="Alguma informação que queira compartilhar antes do atendimento"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-olive"
        />
        Autorizo o contato pelo WhatsApp para tratar sobre este pedido de agendamento.
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-olive px-6 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={16} />
        Solicitar horário pelo WhatsApp
      </button>

      <p className="text-center text-xs text-ink-soft/70" role="status">
        {submitted
          ? 'Seu pedido foi enviado ao WhatsApp. Aguarde a confirmação da Mônica.'
          : 'Seu pedido será enviado à Mônica para confirmação. Nenhum horário fica confirmado automaticamente.'}
      </p>
    </form>
  )
}

interface FieldProps {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: ReactNode
}

function Field({ label, htmlFor, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-olive-dark">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-terracotta">
          {error}
        </p>
      )}
    </div>
  )
}
