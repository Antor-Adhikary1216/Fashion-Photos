import type { ButtonHTMLAttributes } from 'react'

type AuthSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string
  variant?: 'default' | 'entry'
}

export function AuthSubmitButton({
  children,
  className,
  variant = 'default',
  ...props
}: AuthSubmitButtonProps) {
  return (
    <button
      {...props}
      className={`${
        variant === 'entry'
          ? 'inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-[0_18px_44px_rgba(201,154,46,0.24)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:brightness-100'
          : 'rounded-full bg-gold-400 px-6 py-3 font-semibold text-black shadow-[0_18px_40px_rgba(201,154,46,0.22)] transition hover:-translate-y-0.5 hover:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-gold-400'
      } ${className ?? ''}`}
    >
      {children}
    </button>
  )
}
