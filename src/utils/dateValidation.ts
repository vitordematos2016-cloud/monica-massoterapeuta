export function getTodayIsoDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isPastDate(isoDate: string): boolean {
  if (!isoDate) return false
  return isoDate < getTodayIsoDate()
}

export function formatIsoDateToPtBr(isoDate: string): string {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

/** Exige uma data preenchida, válida e não anterior a hoje (comparação em horário local). */
export function isValidFutureOrTodayDate(isoDate: string): boolean {
  if (!isoDate) return false
  const selectedDate = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(selectedDate.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return selectedDate >= today
}
