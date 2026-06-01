import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { api, getErrorMessage } from '@/api/http'
import { AuthLayout } from '@/pages/AuthLayout'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      await api.post('/auth/reset-password', {
        ...Object.fromEntries(formData),
        token: searchParams.get('token'),
      })
      setMessage('Password reset successfully.')
      event.currentTarget.reset()
    } catch (resetError) {
      setError(getErrorMessage(resetError))
    }
  }

  return (
    <AuthLayout eyebrow="New Password" title="Choose a stronger password.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="password" type="password" placeholder="New password" required />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          required
        />
        {message ? <p className="text-sm text-gold-200">{message}</p> : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
          Reset password
        </button>
      </form>
      <Link to="/login" className="mt-6 inline-flex text-sm text-gold-300">
        Back to login
      </Link>
    </AuthLayout>
  )
}
