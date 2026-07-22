export function formatPhoneDisplay(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return rawPhone.trim()
}

export function isValidBrazilianPhone(rawPhone: string): boolean {
  const digits = rawPhone.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

export function isValidFullName(rawName: string): boolean {
  const trimmed = rawName.trim()
  return trimmed.length >= 3 && trimmed.includes(' ')
}

export function formatApproximateTime(time: string): string {
  const [hours, minutes] = time.split(':')
  if (!hours) return time
  return minutes && minutes !== '00' ? `${hours}h${minutes}` : `${hours}h`
}
