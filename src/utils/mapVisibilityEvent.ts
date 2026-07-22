export const LOCATION_MAP_VISIBILITY_EVENT = 'location-map-visibility'

export function dispatchLocationMapVisibility(visible: boolean): void {
  window.dispatchEvent(new CustomEvent(LOCATION_MAP_VISIBILITY_EVENT, { detail: { visible } }))
}
