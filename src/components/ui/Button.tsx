import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-olive text-cream hover:bg-olive-dark shadow-sm hover:shadow-md',
  secondary:
    'bg-transparent border border-olive text-olive-dark hover:bg-olive hover:text-cream',
  ghost: 'bg-terracotta text-cream hover:bg-terracotta-soft',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button'
  variant?: Variant
  children: ReactNode
}

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a'
  variant?: Variant
  children: ReactNode
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = `${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`

  if (rest.as === 'a') {
    const { as: _as, ...anchorProps } = rest
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { as: _as, ...buttonProps } = rest as ButtonAsButtonProps
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
