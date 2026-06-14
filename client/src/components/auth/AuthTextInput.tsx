import type { InputHTMLAttributes, ReactNode } from 'react'

type AuthTextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  label: string
  variant?: 'default' | 'entry'
}

export function AuthTextInput({
  icon,
  label,
  className,
  variant = 'default',
  ...props
}: AuthTextInputProps) {
  const isEntry = variant === 'entry'

  return (
    <label className={isEntry ? 'grid gap-2.5' : 'grid gap-2'}>
      <span
        className={
          isEntry
            ? 'text-xs font-semibold uppercase tracking-[0.24em] text-stone-300'
            : 'text-xs font-medium uppercase tracking-[0.22em] text-stone-500'
        }
      >
        {label}
      </span>
      <span className="relative block">
        {icon ? (
          <span
            className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
              isEntry ? 'text-gold-300/75' : 'text-stone-500'
            }`}
          >
            {icon}
          </span>
        ) : null}
        <input
          {...props}
          className={`${icon ? 'auth-input-with-icon' : ''} ${
            isEntry
              ? 'h-12 rounded-2xl border-white/12 bg-black/35 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition placeholder:text-stone-600 hover:border-white/20 focus:border-gold-300 focus:bg-black/50 focus:ring-2 focus:ring-gold-300/15 disabled:cursor-not-allowed disabled:opacity-60'
              : ''
          } ${className ?? ''}`}
        />
      </span>
    </label>
  )
}
