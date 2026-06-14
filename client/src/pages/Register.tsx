import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'

import { getErrorMessages } from '@/api/http'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton'
import { AuthTextInput } from '@/components/auth/AuthTextInput'
import { PasswordInput } from '@/components/PasswordInput'
import { useAuth } from '@/context/AuthContext'
import { buildAuthPath, getSafeReturnTo } from '@/utils/redirect'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = getSafeReturnTo(searchParams.get('returnTo'))
  const loginPath = buildAuthPath('/login', returnTo)
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    setErrorMessages([])
    setIsSubmitting(true)

    try {
      const formData = new FormData(form)
      const response = await register(Object.fromEntries(formData) as never)
      form.reset()
      navigate(buildAuthPath('/verify-email', returnTo, {
        email: response.email,
      }), {
        state: {
          message: response.message,
          devVerificationCode: response.devVerificationCode,
        },
      })
    } catch (registerError) {
      setErrorMessages(getErrorMessages(registerError))
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Join Fashion-Photos."
      copy="Create a verified account for protected galleries, booking updates, and secure dashboard access."
      sideTitle="Start with a secure account, then build the story."
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <AuthTextInput
          name="name"
          label="Full name"
          placeholder="Your name"
          icon={<FiUser />}
          autoComplete="name"
          required
        />
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
          autoComplete="new-password"
          icon={<FiLock />}
          required
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          placeholder="Confirm password"
          autoComplete="new-password"
          icon={<FiLock />}
          required
        />
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-5 text-stone-400">
          Passwords need 8 characters with uppercase, lowercase, number, and
          special character.
        </p>
        {errorMessages.length > 0 ? (
          <AuthFeedback type="error">
            {errorMessages.length === 1 ? (
              errorMessages[0]
            ) : (
              <ul className="list-disc space-y-1 pl-4">
                {errorMessages.map((errorMessage) => (
                  <li key={errorMessage}>{errorMessage}</li>
                ))}
              </ul>
            )}
          </AuthFeedback>
        ) : null}
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </AuthSubmitButton>
      </form>
      <p className="mt-6 text-sm text-stone-400">
        Already registered?{' '}
        <Link to={loginPath} className="text-gold-300">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
