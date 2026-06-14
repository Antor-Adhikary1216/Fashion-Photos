import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'

import { getErrorMessages } from '@/api/http'
import { AuthEntryLayout } from '@/components/auth/AuthEntryLayout'
import { AuthFeedback } from '@/components/auth/AuthFeedback'
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
    <AuthEntryLayout
      eyebrow="Create Client Access"
      title="Join Fashion-Photos."
      copy="Create your verified client account for gallery access, booking updates, and private studio notes."
      sideTitle="Begin your next visual story with a refined client account."
    >
      <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
        <AuthTextInput
          name="name"
          label="Full name"
          placeholder="Your name"
          icon={<FiUser />}
          autoComplete="name"
          variant="entry"
          required
        />
        <AuthTextInput
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<FiMail />}
          autoComplete="email"
          variant="entry"
          required
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
          autoComplete="new-password"
          icon={<FiLock />}
          variant="entry"
          required
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          placeholder="Confirm password"
          autoComplete="new-password"
          icon={<FiLock />}
          variant="entry"
          required
        />
        <p className="rounded-2xl border border-gold-300/15 bg-gold-300/[0.06] px-4 py-3 text-xs leading-5 text-gold-100/85">
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
        <AuthSubmitButton variant="entry" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </AuthSubmitButton>
      </form>
      <p className="mt-6 border-t border-white/10 pt-5 text-sm text-stone-400">
        Already registered?{' '}
        <Link
          to={loginPath}
          className="font-medium text-gold-200 underline-offset-4 transition hover:text-gold-100 hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthEntryLayout>
  )
}
