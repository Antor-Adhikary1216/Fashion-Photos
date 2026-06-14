import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  icon?: ReactNode
  label?: string
  variant?: 'default' | 'entry'
}

export function PasswordInput({
  autoComplete,
  className,
  icon,
  label,
  variant = 'default',
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? FiEyeOff : FiEye
  const isEntry = variant === 'entry'

  const input = (
    <div className="relative">
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
        autoComplete={autoComplete}
        type={isVisible ? 'text' : 'password'}
        className={`${icon ? 'auth-input-with-icon' : ''} password-input ${
          isEntry
            ? 'h-12 rounded-2xl border-white/12 bg-black/35 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition placeholder:text-stone-600 hover:border-white/20 focus:border-gold-300 focus:bg-black/50 focus:ring-2 focus:ring-gold-300/15 disabled:cursor-not-allowed disabled:opacity-60'
            : ''
        } ${className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setIsVisible((value) => !value)}
        className={`absolute right-4 top-1/2 -translate-y-1/2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 ${
          isEntry
            ? 'text-stone-500 hover:text-gold-200'
            : 'text-stone-400 hover:text-gold-300'
        }`}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
      >
        <Icon aria-hidden="true" />
      </button>
    </div>
  )

  if (!label) {
    return input
  }

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
      {input}
    </label>
  )
}
