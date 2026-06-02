import type { ReactNode } from 'react'

type AuthFeedbackProps = {
  type: 'success' | 'error' | 'info'
  children: ReactNode
}

const styles = {
  success: 'border-gold-300/25 bg-gold-300/10 text-gold-100',
  error: 'border-red-300/25 bg-red-500/10 text-red-200',
  info: 'border-white/10 bg-white/[0.04] text-stone-300',
}

export function AuthFeedback({ type, children }: AuthFeedbackProps) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${styles[type]}`}>
      {children}
    </div>
  )
}
