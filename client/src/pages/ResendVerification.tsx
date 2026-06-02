import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'

import { api, getErrorMessage } from '@/api/http'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton'
import { AuthTextInput } from '@/components/auth/AuthTextInput'
import { buildAuthPath, getSafeReturnTo } from '@/utils/redirect'

export function ResendVerification() {
  const [searchParams] = useSearchParams()
  const initialEmail = searchParams.get('email') ?? ''
  const returnTo = getSafeReturnTo(searchParams.get('returnTo'))
  const [lastEmail, setLastEmail] = useState(initialEmail)
  const [message, setMessage] = useState<string | null>(null)
  const [devCode, setDevCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const verifyPath = buildAuthPath('/verify-email', returnTo, {
    email: lastEmail,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setDevCode(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const email = String(formData.get('email') ?? '')
      setLastEmail(email)
      const response = await api.post(
        '/auth/resend-verification',
        Object.fromEntries(formData),
      )
      setMessage(response.data.message)
      setDevCode(response.data.devVerificationCode ?? null)
    } catch (resendError) {
      setError(getErrorMessage(resendError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Verify Email"
      title="Resend verification code."
      copy="Request a fresh 6-digit code for your email address."
    >
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
        {message ? (
          <AuthFeedback type="info">
            <p>{message}</p>
            <Link
              to={verifyPath}
              className="mt-3 inline-flex text-gold-200 underline-offset-4 hover:underline"
            >
              Enter verification code
            </Link>
          </AuthFeedback>
        ) : null}
        {devCode ? (
          <AuthFeedback type="info">
            Development verification code:{' '}
            <span className="font-semibold tracking-[0.3em] text-gold-200">
              {devCode}
            </span>
          </AuthFeedback>
        ) : null}
        {error ? <AuthFeedback type="error">{error}</AuthFeedback> : null}
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Sending code...' : 'Send verification code'}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  )
}
