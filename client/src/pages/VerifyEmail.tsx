import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FiHash, FiMail } from 'react-icons/fi'

import { api, getErrorMessage } from '@/api/http'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthSuccessPopup } from '@/components/auth/AuthSuccessPopup'
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton'
import { AuthTextInput } from '@/components/auth/AuthTextInput'
import { buildAuthPath, getSafeReturnTo } from '@/utils/redirect'

const successRedirectDelayMs = 1400

type VerifyEmailState = {
  message?: string
  devVerificationCode?: string
}

export function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const locationState = location.state as VerifyEmailState | null
  const initialEmail = searchParams.get('email') ?? ''
  const returnTo = getSafeReturnTo(searchParams.get('returnTo'))
  const loginPath = buildAuthPath('/login', returnTo)
  const resendPath = buildAuthPath('/resend-verification', returnTo, {
    email: initialEmail,
  })
  const [message, setMessage] = useState<string | null>(
    locationState?.message ?? 'Enter the 6-digit code sent to your email.',
  )
  const [devCode] = useState<string | null>(
    locationState?.devVerificationCode ?? null,
  )
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await api.post(
        '/auth/verify-email',
        Object.fromEntries(formData),
      )
      setMessage(response.data.message ?? 'Email verified successfully')
      setSuccessMessage('Email verified successfully. Redirecting to login...')
      window.setTimeout(() => {
        navigate(loginPath)
      }, successRedirectDelayMs)
    } catch (verifyError) {
      setError(getErrorMessage(verifyError))
      setMessage(null)
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Email Verification"
      title="Enter your code."
      copy="Use the 6-digit code sent to your email address to finish verification."
    >
      <AuthSuccessPopup message={successMessage} />
      <form onSubmit={handleSubmit} className="grid gap-5">
        <AuthTextInput
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<FiMail />}
          autoComplete="email"
          defaultValue={initialEmail}
          required
        />
        <AuthTextInput
          name="code"
          label="Verification code"
          placeholder="123456"
          icon={<FiHash />}
          autoComplete="one-time-code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
        />
        {message ? <AuthFeedback type="info">{message}</AuthFeedback> : null}
        {devCode ? (
          <AuthFeedback type="info">
            Development verification code:{' '}
            <span className="font-semibold tracking-[0.3em] text-gold-200">
              {devCode}
            </span>
          </AuthFeedback>
        ) : null}
        {error ? (
          <AuthFeedback type="error">
            <p>{error}</p>
            <Link
              to={resendPath}
              className="mt-3 inline-flex text-gold-200 underline-offset-4 hover:underline"
            >
              Resend verification code
            </Link>
          </AuthFeedback>
        ) : null}
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify email'}
        </AuthSubmitButton>
      </form>
      <p className="mt-6 text-sm text-stone-400">
        Already verified?{' '}
        <Link to={loginPath} className="text-gold-300">
          Go to login
        </Link>
      </p>
    </AuthLayout>
  )
}
