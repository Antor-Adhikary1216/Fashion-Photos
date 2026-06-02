import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  icon?: ReactNode
  label?: string
}

export function PasswordInput({
  autoComplete,
  className,
  icon,
  label,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? FiEyeOff : FiEye

  const input = (
    <div className="relative">
      {icon ? (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
          {icon}
        </span>
      ) : null}
      <input
        {...props}
        autoComplete={autoComplete}
        type={isVisible ? 'text' : 'password'}
        className={`${icon ? 'auth-input-with-icon' : ''} password-input ${className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setIsVisible((value) => !value)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
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
    <label className="grid gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
        {label}
      </span>
      {input}
    </label>
  )
}
