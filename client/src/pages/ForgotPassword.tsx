import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHash, FiLock, FiMail } from 'react-icons/fi'

import { api, getErrorMessage } from '@/api/http'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton'
import { AuthTextInput } from '@/components/auth/AuthTextInput'
import { PasswordInput } from '@/components/PasswordInput'

type ResetStep = 'email' | 'code' | 'password' | 'success'

export function ForgotPassword() {
  const [step, setStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [devCode, setDevCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleRequestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setDevCode(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const nextEmail = String(formData.get('email') ?? '').trim()
      const response = await api.post('/auth/forgot-password', {
        email: nextEmail,
      })

      setEmail(nextEmail)
      setCode('')
      setMessage(response.data.message)
      setDevCode(response.data.devResetCode ?? null)
      setStep('code')
    } catch (forgotError) {
      setError(getErrorMessage(forgotError))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const nextCode = String(formData.get('code') ?? '').trim()
      const response = await api.post('/auth/verify-password-reset-code', {
        email,
        code: nextCode,
      })

      setCode(nextCode)
      setMessage(response.data.message ?? 'Code verified. Enter a new password.')
      setStep('password')
    } catch (verifyError) {
      setError(getErrorMessage(verifyError))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await api.post('/auth/reset-password', {
        email,
        code,
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
      })

      setDevCode(null)
      setMessage(response.data.message ?? 'Password reset successfully.')
      setStep('success')
      event.currentTarget.reset()
    } catch (resetError) {
      setError(getErrorMessage(resetError))
    } finally {
      setIsSubmitting(false)
    }
  }

  function resetToEmailStep() {
    setStep('email')
    setEmail('')
    setCode('')
    setMessage(null)
    setDevCode(null)
    setError(null)
  }

  return (
    <AuthLayout
      eyebrow="Password Help"
      title="Reset your password."
      copy="Use your email and reset code to choose a new password."
    >
      <Link
        to="/login"
        className="mb-5 inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-gold-300"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to login
      </Link>

      {step === 'email' ? (
        <form onSubmit={handleRequestCode} className="grid gap-5">
          <AuthTextInput
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            icon={<FiMail />}
            autoComplete="email"
            defaultValue={email}
            required
          />
          {error ? <AuthFeedback type="error">{error}</AuthFeedback> : null}
          <AuthSubmitButton disabled={isSubmitting}>
            {isSubmitting ? 'Sending code...' : 'Send reset code'}
          </AuthSubmitButton>
        </form>
      ) : null}

      {step === 'code' ? (
        <form onSubmit={handleVerifyCode} className="grid gap-5">
          <AuthTextInput
            name="code"
            label="Reset code"
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
              Development reset code:{' '}
              <span className="font-semibold tracking-[0.3em] text-gold-200">
                {devCode}
              </span>
            </AuthFeedback>
          ) : null}
          {error ? <AuthFeedback type="error">{error}</AuthFeedback> : null}
          <AuthSubmitButton disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify code'}
          </AuthSubmitButton>
          <button
            type="button"
            onClick={resetToEmailStep}
            className="text-sm text-stone-400 transition hover:text-gold-300"
          >
            Use a different email
          </button>
        </form>
      ) : null}

      {step === 'password' ? (
        <form onSubmit={handleResetPassword} className="grid gap-5">
          {message ? <AuthFeedback type="success">{message}</AuthFeedback> : null}
          <PasswordInput
            name="password"
            label="New password"
            placeholder="New password"
            autoComplete="new-password"
            icon={<FiLock />}
            required
          />
          <PasswordInput
            name="confirmPassword"
            label="Confirm new password"
            placeholder="Confirm new password"
            autoComplete="new-password"
            icon={<FiLock />}
            required
          />
          {error ? <AuthFeedback type="error">{error}</AuthFeedback> : null}
          <AuthSubmitButton disabled={isSubmitting}>
            {isSubmitting ? 'Resetting...' : 'Reset password'}
          </AuthSubmitButton>
        </form>
      ) : null}

      {step === 'success' ? (
        <AuthFeedback type="success">
          <p>{message}</p>
          <Link
            to="/login"
            className="mt-3 inline-flex text-gold-200 underline-offset-4 hover:underline"
          >
            Go to login
          </Link>
        </AuthFeedback>
      ) : null}
    </AuthLayout>
  )
}
