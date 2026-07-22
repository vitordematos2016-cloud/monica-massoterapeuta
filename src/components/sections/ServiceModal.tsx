import { Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import type { Service } from '../../types'
import { useSelection } from '../../context/SelectionContext'

interface ServiceModalProps {
  service: Service | null
  onClose: () => void
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { isSelected, toggleService } = useSelection()
  const selected = service ? isSelected(service.slug) : false

  return (
    <Modal isOpen={!!service} onClose={onClose} labelledBy="service-modal-title">
      {service && (
        <div className="p-7 sm:p-9">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Experiência
          </span>
          <h3 id="service-modal-title" className="mt-2 font-serif text-2xl text-olive-dark sm:text-3xl">
            {service.name}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-ink-soft">{service.fullDescription}</p>

          <div className="mt-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-olive-dark">
              Benefícios
            </h4>
            <ul className="mt-3 space-y-2.5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Check size={16} className="mt-0.5 shrink-0 text-olive" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-sand p-4 text-sm text-ink-soft">
            <strong className="text-olive-dark">Indicação geral: </strong>
            {service.indicatedFor}
          </div>

          <p className="mt-4 text-xs text-ink-soft/70">
            Os resultados podem variar de pessoa para pessoa. Em caso de condições de saúde
            específicas, converse com a Mônica antes de agendar.
          </p>

          {selected && (
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-olive-dark">
              <Check size={16} className="text-gold" />
              Este serviço está na sua seleção.
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              variant={selected ? 'secondary' : 'primary'}
              onClick={() => toggleService(service.slug, service.name)}
            >
              {selected ? 'Remover da seleção' : 'Selecionar para agendamento'}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
