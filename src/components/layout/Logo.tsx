interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

// [CONFIRMAR LOGOTIPO] Nenhum arquivo de logotipo foi encontrado no site atual.
// Esta é uma assinatura tipográfica temporária até que a arte final seja definida.
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const color = variant === 'light' ? 'text-cream' : 'text-olive-dark'
  return (
    <span className={`font-serif text-xl sm:text-2xl tracking-wide ${color} ${className}`}>
      Mônica <span className="text-terracotta italic">Nunes</span>
    </span>
  )
}
