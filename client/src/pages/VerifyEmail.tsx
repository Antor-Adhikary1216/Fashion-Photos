import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { api, getErrorMessage } from '@/api/http'
import { AuthLayout } from '@/pages/AuthLayout'

export function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Verifying your email...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function verify() {
      const token = searchParams.get('token')

      if (!token) {
        setError('Verification token is missing.')
        setMessage('')
        return
      }

      try {
        const response = await api.get(`/auth/verify-email?token=${token}`)
        setMessage(response.data.message)
      } catch (verifyError) {
        setError(getErrorMessage(verifyError))
        setMessage('')
      }
    }

    void verify()
  }, [searchParams])

  return (
    <AuthLayout eyebrow="Email Verification" title="Confirm your email.">
      {message ? <p className="text-stone-300">{message}</p> : null}
      {error ? <p className="text-red-300">{error}</p> : null}
      <Link
        to="/login"
        className="mt-6 inline-flex rounded-full bg-gold-400 px-6 py-3 font-semibold text-black"
      >
        Go to login
      </Link>
    </AuthLayout>
  )
}
