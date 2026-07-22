import { Leaf, Check } from 'lucide-react'
import type { Service } from '../../types'
import { useSelection } from '../../context/SelectionContext'

interface ServiceCardProps {
  service: Service
  onOpenDetails: (service: Service) => void
}

export function ServiceCard({ service, onOpenDetails }: ServiceCardProps) {
  const { isSelected, toggleService } = useSelection()
  const selected = isSelected(service.slug)

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_4px_24px_rgba(43,43,38,0.06)] outline outline-2 outline-offset-2 transition-[box-shadow,outline-color] duration-300 hover:shadow-[0_8px_32px_rgba(43,43,38,0.1)] ${
        selected ? 'outline-gold' : 'outline-transparent'
      }`}
    >
      {selected && (
        <span className="animate-select-in absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-medium text-cream shadow">
          <Check size={12} />
          Selecionado
        </span>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-sand-dark">
        {/* [INSERIR FOTO REAL] placeholder orgânico até a foto do serviço ser recebida */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-olive/20 via-sand-dark to-terracotta/15 transition-transform duration-500 group-hover:scale-105">
          <Leaf size={36} strokeWidth={1.25} className="text-olive-dark/40" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg text-olive-dark">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{service.shortSummary}</p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => onOpenDetails(service)}
            className="flex-1 rounded-full border border-olive px-4 py-2.5 text-sm font-medium text-olive-dark transition hover:bg-olive hover:text-cream"
          >
            Conhecer experiência
          </button>
          <button
            type="button"
            onClick={() => toggleService(service.slug, service.name)}
            aria-pressed={selected}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
              selected
                ? 'bg-olive-dark text-cream hover:bg-terracotta'
                : 'bg-terracotta text-cream hover:bg-terracotta-soft'
            }`}
          >
            {selected ? 'Remover da seleção' : 'Selecionar serviço'}
          </button>
        </div>
      </div>
    </article>
  )
}
