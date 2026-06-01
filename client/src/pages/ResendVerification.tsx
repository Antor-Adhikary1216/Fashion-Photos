import { useState, type FormEvent } from 'react'

import { api, getErrorMessage } from '@/api/http'
import { AuthLayout } from '@/pages/AuthLayout'

export function ResendVerification() {
  const [message, setMessage] = useState<string | null>(null)
  const [devLink, setDevLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setDevLink(null)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await api.post(
        '/auth/resend-verification',
        Object.fromEntries(formData),
      )
      setMessage(response.data.message)
      setDevLink(response.data.devVerificationUrl ?? null)
    } catch (resendError) {
      setError(getErrorMessage(resendError))
    }
  }

  return (
    <AuthLayout eyebrow="Verify Email" title="Resend verification.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="email" type="email" placeholder="Email" required />
        {message ? <p className="text-sm text-gold-200">{message}</p> : null}
        {devLink ? (
          <a className="break-all text-sm text-gold-300" href={devLink}>
            Development verification link
          </a>
        ) : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
          Send verification email
        </button>
      </form>
    </AuthLayout>
  )
}
