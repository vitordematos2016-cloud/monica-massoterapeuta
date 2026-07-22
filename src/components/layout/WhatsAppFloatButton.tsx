import { buildSimpleContactMessage, buildWhatsAppUrl } from '../../utils/whatsapp'
import { useFloatingUiSuppressed } from '../../hooks/useFloatingUiSuppressed'

export function WhatsAppFloatButton() {
  const suppressed = useFloatingUiSuppressed()

  return (
    <a
      href={buildWhatsAppUrl(buildSimpleContactMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      aria-hidden={suppressed}
      tabIndex={suppressed ? -1 : undefined}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#2f6b4f] text-cream shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7 ${
        suppressed ? 'pointer-events-none translate-y-3 scale-75 opacity-0' : 'opacity-100'
      }`}
    >
      <WhatsAppIcon />
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.548 4.16 1.591 5.967L0 24l6.259-1.626a11.86 11.86 0 005.783 1.474h.005c6.582 0 11.941-5.362 11.944-11.945a11.88 11.88 0 00-3.47-8.454zm-8.475 18.34h-.004a9.905 9.905 0 01-5.043-1.38l-.362-.214-3.714.965.992-3.622-.235-.373a9.877 9.877 0 01-1.516-5.271c0-5.462 4.448-9.909 9.914-9.909 2.648 0 5.135 1.03 7.005 2.902a9.847 9.847 0 012.897 7.012c-.003 5.462-4.451 9.91-9.934 9.91z" />
    </svg>
  )
}
