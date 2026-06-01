import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getErrorMessage } from '@/api/http'
import { useAuth } from '@/context/AuthContext'
import { AuthLayout } from '@/pages/AuthLayout'

export function MfaVerify() {
  const location = useLocation()
  const navigate = useNavigate()
  const { verifyMfaLogin } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const mfaToken = (location.state as { mfaToken?: string } | null)?.mfaToken

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!mfaToken) {
      setError('MFA challenge is missing. Please log in again.')
      return
    }

    try {
      const formData = new FormData(event.currentTarget)
      await verifyMfaLogin({
        mfaToken,
        code: String(formData.get('code') ?? ''),
      })
      navigate('/dashboard')
    } catch (mfaError) {
      setError(getErrorMessage(mfaError))
    }
  }

  return (
    <AuthLayout eyebrow="MFA" title="Enter your authenticator code.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="code" placeholder="123456" inputMode="numeric" required />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
          Verify and continue
        </button>
      </form>
    </AuthLayout>
  )
}
