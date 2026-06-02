import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiLock, FiMail } from 'react-icons/fi'

import { getErrorMessage } from '@/api/http'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthSuccessPopup } from '@/components/auth/AuthSuccessPopup'
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton'
import { AuthTextInput } from '@/components/auth/AuthTextInput'
import { PasswordInput } from '@/components/PasswordInput'
import { useAuth } from '@/context/AuthContext'
import {
  buildAuthPath,
  getProtectedReturnMessage,
  getSafeReturnTo,
} from '@/utils/redirect'

const successRedirectDelayMs = 1400

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = getSafeReturnTo(searchParams.get('returnTo'))
  const registerPath = buildAuthPath('/register', returnTo)
  const protectedReturnMessage = getProtectedReturnMessage(returnTo)
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
      const response = await login(Object.fromEntries(formData) as never)

      if (response.requiresEmailVerification) {
        navigate(buildAuthPath('/verify-email', returnTo, {
          email: response.email,
        }), {
          state: {
            message: response.message,
            devVerificationCode: response.devVerificationCode,
          },
        })
        return
      }

      if (response.requiresMfa) {
        navigate(buildAuthPath('/mfa-verify', returnTo), {
          state: { mfaToken: response.mfaToken },
        })
        return
      }

      setSuccessMessage('Logged in successfully. Redirecting...')
      window.setTimeout(() => {
        navigate(returnTo)
      }, successRedirectDelayMs)
    } catch (loginError) {
      setError(getErrorMessage(loginError))
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Secure Login"
      title="Welcome back."
      copy="Log in to manage shoots, protected galleries, bookings, and dashboard access."
      sideTitle="Step back into your photography workspace."
      sideCopy="A cinematic sign-in flow with short-lived access tokens, refresh cookies, and MFA support for sensitive admin access."
    >
      <AuthSuccessPopup message={successMessage} />
      <form onSubmit={handleSubmit} className="grid gap-5">
        {protectedReturnMessage ? (
          <AuthFeedback type="info">{protectedReturnMessage}</AuthFeedback>
        ) : null}
        <AuthTextInput
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<FiMail />}
          autoComplete="email"
          required
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
          autoComplete="current-password"
          icon={<FiLock />}
          required
        />
        {error ? <AuthFeedback type="error">{error}</AuthFeedback> : null}
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </AuthSubmitButton>
      </form>
      <div className="mt-7 flex flex-col justify-between gap-3 text-sm text-stone-400 sm:flex-row">
        <Link to="/forgot-password" className="text-gold-300">
          Forgot password?
        </Link>
        <span>
          Need an account?{' '}
          <Link to={registerPath} className="text-gold-300">
            Register
          </Link>
        </span>
      </div>
    </AuthLayout>
  )
}
