import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { api, getErrorMessage } from '@/api/http'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { PasswordInput } from '@/components/PasswordInput'

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
        <PasswordInput
          name="password"
          placeholder="New password"
          autoComplete="new-password"
          required
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm new password"
          autoComplete="new-password"
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
