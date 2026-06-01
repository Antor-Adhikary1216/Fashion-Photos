import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { getErrorMessage } from '@/api/http'
import { useAuth } from '@/context/AuthContext'
import { AuthLayout } from '@/pages/AuthLayout'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await login(Object.fromEntries(formData) as never)

      if (response.requiresMfa) {
        navigate('/mfa-verify', { state: { mfaToken: response.mfaToken } })
        return
      }

      const from = (location.state as { from?: { pathname?: string } })?.from
        ?.pathname
      navigate(from ?? '/dashboard')
    } catch (loginError) {
      setError(getErrorMessage(loginError))
    }
  }

  return (
    <AuthLayout eyebrow="Secure Login" title="Welcome back.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
          Login
        </button>
      </form>
      <div className="mt-6 grid gap-2 text-sm text-stone-400">
        <Link to="/forgot-password" className="text-gold-300">
          Forgot password?
        </Link>
        <span>
          Need an account? <Link to="/register" className="text-gold-300">Register</Link>
        </span>
      </div>
    </AuthLayout>
  )
}
