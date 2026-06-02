import type { ButtonHTMLAttributes } from 'react'

type AuthSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string
}

export function AuthSubmitButton({
  children,
  className,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-full bg-gold-400 px-6 py-3 font-semibold text-black shadow-[0_18px_40px_rgba(201,154,46,0.22)] transition hover:-translate-y-0.5 hover:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-gold-400 ${className ?? ''}`}
    >
      {children}
    </button>
  )
}
