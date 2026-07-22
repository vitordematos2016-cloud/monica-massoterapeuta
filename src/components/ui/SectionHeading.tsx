interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-4 ${alignment} max-w-2xl`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold text-olive-dark leading-tight">{title}</h2>
      {description && <p className="text-base sm:text-lg text-ink-soft leading-relaxed">{description}</p>}
    </div>
  )
}
