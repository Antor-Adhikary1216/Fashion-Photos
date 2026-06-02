import type { InputHTMLAttributes, ReactNode } from 'react'

type AuthTextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  label: string
}

export function AuthTextInput({
  icon,
  label,
  className,
  ...props
}: AuthTextInputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
        {label}
      </span>
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
            {icon}
          </span>
        ) : null}
        <input
          {...props}
          className={`${icon ? 'auth-input-with-icon' : ''} ${className ?? ''}`}
        />
      </span>
    </label>
  )
}
