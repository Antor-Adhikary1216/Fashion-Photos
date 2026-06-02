import { useState, type FormEvent } from 'react'

import { api, getErrorMessage } from '@/api/http'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { useAuth } from '@/context/AuthContext'

export function MfaSetup() {
  const { refreshUser } = useAuth()
  const [setup, setSetup] = useState<{
    qrCodeDataUrl: string
    manualEntryKey: string
  } | null>(null)
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  async function startSetup() {
    setError(null)

    try {
      const response = await api.post('/auth/mfa/setup')
      setSetup(response.data)
    } catch (setupError) {
      setError(getErrorMessage(setupError))
    }
  }

  async function verifySetup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await api.post('/auth/mfa/verify-setup', {
        code: formData.get('code'),
      })
      setBackupCodes(response.data.backupCodes)
      await refreshUser()
    } catch (verifyError) {
      setError(getErrorMessage(verifyError))
    }
  }

  return (
    <AuthLayout eyebrow="MFA Setup" title="Secure your account.">
      {!setup ? (
        <button
          type="button"
          onClick={() => void startSetup()}
          className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black"
        >
          Generate MFA QR code
        </button>
      ) : (
        <div className="grid gap-5">
          <img
            src={setup.qrCodeDataUrl}
            alt="MFA QR code"
            className="mx-auto rounded-2xl bg-white p-4"
          />
          <p className="break-all text-sm text-stone-400">
            Manual key: {setup.manualEntryKey}
          </p>
          <form onSubmit={verifySetup} className="grid gap-4">
            <input name="code" placeholder="Authenticator code" required />
            <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
              Verify setup
            </button>
          </form>
        </div>
      )}
      {backupCodes.length ? (
        <div className="mt-6 rounded-2xl border border-gold-300/30 p-4">
          <p className="mb-3 text-sm text-gold-200">
            Store these backup codes. They are shown only once.
          </p>
          <div className="grid gap-2 text-sm text-stone-300">
            {backupCodes.map((code) => (
              <code key={code}>{code}</code>
            ))}
          </div>
        </div>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </AuthLayout>
  )
}
