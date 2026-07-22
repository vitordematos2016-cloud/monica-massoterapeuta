export const FLOATING_UI_SUPPRESS_EVENT = 'floating-ui-suppress'

export function setFloatingUiSuppressed(source: string, suppressed: boolean): void {
  window.dispatchEvent(new CustomEvent(FLOATING_UI_SUPPRESS_EVENT, { detail: { source, suppressed } }))
}
