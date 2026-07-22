import { useEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { MapPin, Copy, Check, Navigation, CalendarClock } from 'lucide-react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { siteConfig } from '../../data/siteConfig'
import { copyToClipboard } from '../../utils/clipboard'
import { dispatchLocationMapVisibility } from '../../utils/mapVisibilityEvent'

const mapsQuery = encodeURIComponent(siteConfig.address.full)
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&output=embed`

type CopyState = 'idle' | 'copied' | 'error'

export function Location() {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [mapActive, setMapActive] = useState(false)
  const mobileMapRef = useRef<HTMLDivElement>(null)
  const desktopMapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (copyState === 'idle') return
    const timer = setTimeout(() => setCopyState('idle'), 2500)
    return () => clearTimeout(timer)
  }, [copyState])

  useEffect(() => {
    const nodes = [mobileMapRef.current, desktopMapRef.current].filter(
      (node): node is HTMLDivElement => node !== null,
    )
    if (nodes.length === 0) return

    const visibility = new Map<Element, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting))
        const anyVisible = Array.from(visibility.values()).some(Boolean)
        dispatchLocationMapVisibility(anyVisible)
      },
      { threshold: 0.1 },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
      dispatchLocationMapVisibility(false)
    }
  }, [])

  async function handleCopy() {
    const ok = await copyToClipboard(siteConfig.address.full)
    setCopyState(ok ? 'copied' : 'error')
  }

  const copyLabel =
    copyState === 'copied'
      ? 'Endereço copiado'
      : copyState === 'error'
        ? 'Selecione e copie manualmente'
        : 'Copiar endereço'

  const label = (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Localização</span>
  )

  const title = (
    <h2 className="text-balance font-serif text-3xl leading-tight text-olive-dark sm:text-4xl">
      Venha nos visitar
    </h2>
  )

  const welcomeText = (
    <p className="max-w-md text-base leading-relaxed text-ink-soft">
      Um espaço preparado para proporcionar acolhimento, tranquilidade e cuidado em cada detalhe.
    </p>
  )

  const addressBlock = (
    <div className="flex w-full max-w-md items-start gap-3 rounded-2xl bg-cream p-4 text-left shadow-[0_2px_16px_rgba(43,43,38,0.05)] lg:max-w-full">
      <MapPin size={20} className="mt-0.5 shrink-0 text-terracotta" />
      <p className="font-serif text-base leading-snug text-olive-dark sm:text-lg">{siteConfig.address.full}</p>
    </div>
  )

  const infoNote = (
    <div className="flex w-full max-w-md items-start gap-3 rounded-2xl bg-olive/8 p-4 text-left lg:max-w-full">
      <CalendarClock size={20} className="mt-0.5 shrink-0 text-olive-dark" />
      <p className="text-sm leading-relaxed text-ink-soft">
        Atendimento realizado somente mediante agendamento prévio.
      </p>
    </div>
  )

  const buttons = (
    <div className="flex w-full max-w-md flex-col gap-3 lg:max-w-full">
      <a
        href={mapsSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-olive px-5 text-sm font-medium text-cream transition hover:bg-olive-dark active:scale-[0.98]"
      >
        <Navigation size={18} />
        Abrir no Google Maps
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-olive px-5 text-sm font-medium text-olive-dark transition hover:bg-olive hover:text-cream active:scale-[0.98]"
      >
        {copyState === 'copied' ? <Check size={18} /> : <Copy size={18} />}
        {copyLabel}
      </button>
    </div>
  )

  return (
    <section className="relative overflow-hidden bg-sand py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-olive/10 blob-shape"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-terracotta/10 blob-shape"
      />

      <Container className="relative">
        {/* Mobile-first: ordem exata exigida em uma única coluna */}
        <Reveal className="flex flex-col items-center gap-5 text-center lg:hidden">
          {label}
          {title}
          {welcomeText}
          {addressBlock}
          {buttons}
          <MapCard
            ref={mobileMapRef}
            mapActive={mapActive}
            onActivate={() => setMapActive(true)}
            heightClass="h-[300px]"
          />
          {infoNote}
        </Reveal>

        {/* Desktop/tablet: duas colunas equilibradas */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal className="flex flex-col items-start gap-5 text-left">
            {label}
            {title}
            {welcomeText}
            {addressBlock}
            {infoNote}
            {buttons}
          </Reveal>

          <Reveal delayMs={100}>
            <MapCard
              ref={desktopMapRef}
              mapActive={mapActive}
              onActivate={() => setMapActive(true)}
              heightClass="h-full min-h-[420px]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

interface MapCardProps {
  mapActive: boolean
  onActivate: () => void
  heightClass: string
  ref: Ref<HTMLDivElement>
}

function MapCard({ mapActive, onActivate, heightClass, ref }: MapCardProps): ReactNode {
  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(43,43,38,0.1)] ${heightClass}`}
    >
      <iframe
        title={`Mapa de localização — ${siteConfig.address.full}`}
        src={mapsEmbedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ pointerEvents: mapActive ? 'auto' : 'none' }}
      />
      {!mapActive && (
        <button
          type="button"
          onClick={onActivate}
          className="absolute inset-0 flex items-center justify-center bg-ink/10 backdrop-blur-[1px] transition-colors hover:bg-ink/15"
        >
          <span className="rounded-full bg-cream/95 px-5 py-2.5 text-sm font-medium text-olive-dark shadow-md">
            Toque para interagir com o mapa
          </span>
        </button>
      )}
    </div>
  )
}
