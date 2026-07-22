import { useState, type FormEvent, type ReactNode } from 'react'
import { Copy, Check, Send } from 'lucide-react'
import { getTodayIsoDate, isValidFutureOrTodayDate } from '../../utils/dateValidation'
import { buildBookingMessage, buildWhatsAppUrl } from '../../utils/whatsapp'
import { isValidBrazilianPhone, isValidName } from '../../utils/formatters'
import { copyToClipboard } from '../../utils/clipboard'
import { BookingSummary } from '../booking/BookingSummary'
import type { BookingFormData, Service } from '../../types'

const PERIOD_OPTIONS: { value: Exclude<BookingFormData['preferredPeriod'], ''>; label: string }[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Fim de tarde/noite' },
]

type Phase = 'idle' | 'success' | 'failed'

interface FieldErrors {
  name?: string
  phone?: string
  date?: string
  period?: string
}

type TouchedFields = Record<'name' | 'phone' | 'date' | 'period', boolean>

interface BookingFormProps {
  services: Service[]
  onBack: () => void
}

export function BookingForm({ services, onBack }: BookingFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredDay, setPreferredDay] = useState('')
  const [preferredPeriod, setPreferredPeriod] = useState<BookingFormData['preferredPeriod']>('')
  const [preferredTime, setPreferredTime] = useState('')
  const [notes, setNotes] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    phone: false,
    date: false,
    period: false,
  })
  const [phase, setPhase] = useState<Phase>('idle')
  const [pendingMessage, setPendingMessage] = useState('')
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')

  const serviceNames = services.map((service) => service.name)

  const currentData: BookingFormData = {
    name,
    phone,
    preferredDay,
    preferredPeriod,
    preferredTime,
    notes,
    consent,
  }

  function validate(): FieldErrors {
    const errors: FieldErrors = {}
    if (!isValidName(name)) errors.name = 'Informe seu nome.'
    if (!isValidBrazilianPhone(phone)) errors.phone = 'Informe um telefone válido, com DDD.'
    if (!isValidFutureOrTodayDate(preferredDay)) errors.date = 'Escolha uma data válida, a partir de hoje.'
    if (!preferredPeriod) errors.period = 'Escolha um período.'
    return errors
  }

  const liveErrors = validate()
  const canSubmit = Object.keys(liveErrors).length === 0 && consent && services.length > 0

  function markTouched(field: keyof TouchedFields) {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  function shownError(field: keyof FieldErrors, touchedField: keyof TouchedFields): string | undefined {
    return touched[touchedField] || submitAttempted ? liveErrors[field] : undefined
  }

  function openWhatsApp(message: string): boolean {
    // Precisa ser chamado de forma síncrona, sem nenhum await/setTimeout antes,
    // como reação direta ao clique — do contrário os navegadores (Chrome, Safari,
    // Firefox) deixam de reconhecer isso como resultado de um gesto do usuário e
    // bloqueiam a abertura como pop-up, silenciosamente.
    const win = window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    return Boolean(win)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitAttempted(true)
    const errors = validate()
    if (Object.keys(errors).length > 0 || !consent || services.length === 0) return

    const message = buildBookingMessage(
      { ...currentData, name: name.trim(), phone: phone.trim(), notes: notes.trim() },
      serviceNames,
    )
    setPendingMessage(message)

    const opened = openWhatsApp(message)
    setPhase(opened ? 'success' : 'failed')
  }

  function handleRetry() {
    const opened = openWhatsApp(pendingMessage)
    setPhase(opened ? 'success' : 'failed')
  }

  async function handleCopyMessage() {
    const ok = await copyToClipboard(pendingMessage)
    if (ok) {
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2500)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <FormSection title="Dados pessoais">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Nome completo"
            htmlFor="booking-name"
            required
            error={shownError('name', 'name')}
          >
            <input
              id="booking-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => markTouched('name')}
              required
              autoComplete="name"
              placeholder="Ex: Juliana Ferreira"
              aria-invalid={Boolean(shownError('name', 'name'))}
              className="form-input"
            />
          </Field>

          <Field
            label="Telefone com WhatsApp"
            htmlFor="booking-phone"
            required
            error={shownError('phone', 'phone')}
          >
            <input
              id="booking-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => markTouched('phone')}
              required
              autoComplete="tel"
              placeholder="(19) 99999-9999"
              aria-invalid={Boolean(shownError('phone', 'phone'))}
              className="form-input"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Preferência de atendimento">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label="Data de preferência"
            htmlFor="booking-day"
            required
            error={shownError('date', 'date')}
          >
            <input
              id="booking-day"
              type="date"
              value={preferredDay}
              min={getTodayIsoDate()}
              onChange={(e) => setPreferredDay(e.target.value)}
              onBlur={() => markTouched('date')}
              required
              aria-invalid={Boolean(shownError('date', 'date'))}
              className="form-input"
            />
          </Field>

          <Field
            label="Período"
            htmlFor="booking-period"
            required
            error={shownError('period', 'period')}
          >
            <select
              id="booking-period"
              value={preferredPeriod}
              onChange={(e) => setPreferredPeriod(e.target.value as BookingFormData['preferredPeriod'])}
              onBlur={() => markTouched('period')}
              required
              aria-invalid={Boolean(shownError('period', 'period'))}
              className="form-input"
            >
              <option value="">Selecione um período</option>
              {PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Horário aproximado" htmlFor="booking-time">
            <input
              id="booking-time"
              type="time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="form-input"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Observações">
        <Field label="Observações (opcional)" htmlFor="booking-notes">
          <textarea
            id="booking-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="form-input resize-none"
            placeholder="Alguma necessidade ou dúvida que queira compartilhar"
          />
        </Field>
      </FormSection>

      <FormSection title="Confirmação e envio">
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 h-4 w-4 shrink-0 accent-olive"
          />
          Autorizo o contato pelo WhatsApp para confirmação do meu pedido de agendamento.
        </label>

        <div className="mt-5">
          <BookingSummary serviceNames={serviceNames} data={currentData} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-olive px-6 text-sm font-medium text-cream transition-all duration-300 hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            Enviar solicitação pelo WhatsApp
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex min-h-14 flex-1 items-center justify-center rounded-full border border-olive px-6 text-sm font-medium text-olive-dark transition hover:bg-olive hover:text-cream sm:flex-none"
          >
            Voltar aos serviços
          </button>
        </div>

        <div role="status" aria-live="polite" className="mt-4 text-center text-sm">
          {phase === 'success' && (
            <p className="text-olive-dark">Solicitação preparada com sucesso.</p>
          )}
          {phase === 'failed' && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-terracotta">
                Não conseguimos abrir o WhatsApp automaticamente. Tente novamente ou copie a
                mensagem abaixo.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-olive-dark"
                >
                  Tentar novamente
                </button>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex items-center justify-center gap-2 rounded-full border border-olive px-5 py-2.5 text-sm font-medium text-olive-dark transition hover:bg-olive hover:text-cream"
                >
                  {copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
                  {copyState === 'copied' ? 'Mensagem copiada' : 'Copiar mensagem'}
                </button>
              </div>
            </div>
          )}
          {phase === 'idle' && (
            <p className="text-ink-soft/70">
              Seu pedido será enviado pelo WhatsApp. Nenhum horário é confirmado automaticamente.
            </p>
          )}
        </div>
      </FormSection>
    </form>
  )
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-sand-dark/60 pt-6 first:border-t-0 first:pt-0">
      <h3 className="mb-4 font-serif text-lg text-olive-dark">{title}</h3>
      {children}
    </div>
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
  const errorId = `${htmlFor}-error`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-olive-dark">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-terracotta">
          {error}
        </p>
      )}
    </div>
  )
}
