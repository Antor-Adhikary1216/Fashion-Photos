import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { getErrorMessage } from '@/api/http'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthSuccessPopup } from '@/components/auth/AuthSuccessPopup'
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton'
import { useAuth } from '@/context/AuthContext'
import { getSafeReturnTo } from '@/utils/redirect'

const successRedirectDelayMs = 1400

export function MfaVerify() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { verifyMfaLogin } = useAuth()
  const returnTo = getSafeReturnTo(searchParams.get('returnTo'))
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mfaToken = (location.state as { mfaToken?: string } | null)?.mfaToken

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    if (!mfaToken) {
      setError('MFA challenge is missing. Please log in again.')
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData(event.currentTarget)
      await verifyMfaLogin({
        mfaToken,
        code: String(formData.get('code') ?? ''),
      })
      setSuccessMessage('Logged in successfully. Redirecting...')
      window.setTimeout(() => {
        navigate(returnTo)
      }, successRedirectDelayMs)
    } catch (mfaError) {
      setError(getErrorMessage(mfaError))
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout eyebrow="MFA" title="Enter your authenticator code.">
      <AuthSuccessPopup message={successMessage} />
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="code" placeholder="123456" inputMode="numeric" required />
        {error ? <AuthFeedback type="error">{error}</AuthFeedback> : null}
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify and continue'}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  )
}
