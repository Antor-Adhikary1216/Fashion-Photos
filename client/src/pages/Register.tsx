import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { getErrorMessage } from '@/api/http'
import { useAuth } from '@/context/AuthContext'
import { AuthLayout } from '@/pages/AuthLayout'

export function Register() {
  const { register } = useAuth()
  const [message, setMessage] = useState<string | null>(null)
  const [devLink, setDevLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setDevLink(null)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const response = (await register(Object.fromEntries(formData) as never)) as {
        message: string
        devVerificationUrl?: string
      }
      setMessage(response.message)
      setDevLink(response.devVerificationUrl ?? null)
      event.currentTarget.reset()
    } catch (registerError) {
      setError(getErrorMessage(registerError))
    }
  }

  return (
    <AuthLayout eyebrow="Create Account" title="Join FrameStory.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
        />
        <p className="text-xs leading-5 text-stone-500">
          Passwords need 8 characters with uppercase, lowercase, number, and
          special character.
        </p>
        {message ? <p className="text-sm text-gold-200">{message}</p> : null}
        {devLink ? (
          <a className="break-all text-sm text-gold-300" href={devLink}>
            Development verification link
          </a>
        ) : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
          Register
        </button>
      </form>
      <p className="mt-6 text-sm text-stone-400">
        Already registered? <Link to="/login" className="text-gold-300">Login</Link>
      </p>
    </AuthLayout>
  )
}
