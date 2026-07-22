interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

// [CONFIRMAR LOGOTIPO] Nenhum arquivo de logotipo foi encontrado no site atual.
// Esta é uma assinatura tipográfica temporária até que a arte final seja definida.
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const color = variant === 'light' ? 'text-cream' : 'text-olive-dark'
  const subColor = variant === 'light' ? 'text-cream/70' : 'text-ink-soft/70'
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className={`font-serif text-xl sm:text-2xl tracking-wide ${color}`}>
        Mônica <span className="text-terracotta italic">Nunes</span>
      </span>
      <span className={`mt-1 text-[10px] font-medium uppercase tracking-[0.2em] sm:text-xs ${subColor}`}>
        Massoterapeuta
      </span>
    </span>
  )
}
