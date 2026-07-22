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
