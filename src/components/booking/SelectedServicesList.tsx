import { Leaf, X } from 'lucide-react'
import type { Service } from '../../types'

interface SelectedServicesListProps {
  services: Service[]
  onRemove: (slug: string, name: string) => void
}

export function SelectedServicesList({ services, onRemove }: SelectedServicesListProps) {
  const count = services.length
  const countLabel = count === 1 ? '1 serviço selecionado' : `${count} serviços selecionados`

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg text-olive-dark">Serviços selecionados</h3>
        <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-ink-soft/60">
          {countLabel}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {services.map((service) => (
          <li
            key={service.slug}
            className="flex items-center gap-3 rounded-2xl bg-cream p-3 sm:p-3.5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-olive/20 via-sand-dark to-terracotta/15">
              <Leaf size={18} strokeWidth={1.5} className="text-olive-dark/50" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base text-olive-dark">{service.name}</p>
              <p className="hidden truncate text-xs text-ink-soft/70 sm:block">{service.shortSummary}</p>
            </div>

            <button
              type="button"
              onClick={() => onRemove(service.slug, service.name)}
              aria-label={`Remover ${service.name} da seleção`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft/60 transition hover:bg-sand hover:text-terracotta"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
