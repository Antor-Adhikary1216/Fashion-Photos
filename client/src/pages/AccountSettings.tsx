import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import {
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiSave,
  FiShield,
  FiUser,
  FiX,
} from 'react-icons/fi'

import { getErrorMessage } from '@/api/http'
import { PageHeader } from '@/components/PageHeader'
import { useAuth } from '@/context/AuthContext'

export function AccountSettings() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name ?? '')
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setName(user?.name ?? '')
  }, [user?.name])

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  if (!user) {
    return null
  }

  const avatarUrl = previewUrl ?? user.profileImageUrl
  const initials = getUserInitials(user.name)

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setSelectedPhoto(file)
    setError(null)

    if (!file) {
      setPreviewUrl(null)
      return
    }

    setPreviewUrl(URL.createObjectURL(file))
  }

  function handleCancel() {
    if (!user) {
      return
    }

    setIsEditing(false)
    setName(user.name)
    setSelectedPhoto(null)
    setPreviewUrl(null)
    setMessage(null)
    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.set('name', name)

      if (selectedPhoto) {
        formData.set('profilePhoto', selectedPhoto)
      }

      await updateProfile(formData)
      setMessage('Profile updated successfully.')
      setSelectedPhoto(null)
      setPreviewUrl(null)
      setIsEditing(false)
    } catch (profileError) {
      setError(getErrorMessage(profileError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <PageHeader
        eyebrow="Account"
        title="Profile and security."
        copy="Manage your public profile details and account protection status."
      />
      <section className="mx-auto grid max-w-5xl gap-5 px-5 pb-20">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border border-gold-300/35 bg-gold-300/15 text-2xl font-bold uppercase text-gold-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
                  {user.role}
                </p>
                <h1 className="font-serif text-3xl text-white">{user.name}</h1>
                <p className="mt-1 text-sm text-stone-400">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsEditing(true)
                setMessage(null)
                setError(null)
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isEditing}
            >
              <FiEdit2 aria-hidden="true" />
              Edit profile
            </button>
          </div>

          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-5 border-t border-white/10 pt-5"
            >
              <label className="grid gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
                  Name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  required
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
                  Profile photo
                </span>
                <span className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-gold-300 hover:text-gold-100">
                    <FiCamera aria-hidden="true" />
                    Choose photo
                  </span>
                  <span className="text-sm text-stone-400">
                    {selectedPhoto?.name ?? 'No file selected'}
                  </span>
                </span>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </label>
              {message ? (
                <p className="rounded-lg border border-gold-300/25 bg-gold-300/10 px-4 py-3 text-sm text-gold-100">
                  {message}
                </p>
              ) : null}
              {error ? (
                <p className="rounded-lg border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              ) : null}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiSave aria-hidden="true" />
                  {isSubmitting ? 'Saving...' : 'Save changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-gold-300 hover:text-gold-100"
                >
                  <FiX aria-hidden="true" />
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          {!isEditing && message ? (
            <p className="mt-5 rounded-lg border border-gold-300/25 bg-gold-300/10 px-4 py-3 text-sm text-gold-100">
              {message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <AccountPanel
            icon={<FiCheckCircle aria-hidden="true" />}
            label="Email"
            value={user.isEmailVerified ? 'Verified' : 'Not verified'}
          />
          <AccountPanel
            icon={<FiShield aria-hidden="true" />}
            label="MFA"
            value={user.mfaEnabled ? 'Enabled' : 'Disabled'}
            action={
              !user.mfaEnabled ? (
                <Link
                  to="/mfa-setup"
                  className="mt-4 inline-flex rounded-full border border-gold-300/45 px-4 py-2 text-sm font-semibold text-gold-100 transition hover:bg-gold-300/10"
                >
                  Enable MFA
                </Link>
              ) : null
            }
          />
          <AccountPanel
            icon={<FiClock aria-hidden="true" />}
            label="Last login"
            value={formatDate(user.lastLoginAt)}
          />
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3 text-stone-300">
            <FiUser aria-hidden="true" className="text-gold-300" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              Account created
            </span>
          </div>
          <p className="mt-3 text-lg text-white">{formatDate(user.createdAt)}</p>
        </div>
      </section>
    </main>
  )
}

function AccountPanel({
  icon,
  label,
  value,
  action,
}: {
  icon: ReactNode
  label: string
  value: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3 text-stone-300">
        <span className="text-gold-300">{icon}</span>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
          {label}
        </span>
      </div>
      <p className="mt-3 text-lg text-white">{value}</p>
      {action}
    </div>
  )
}

function getUserInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return initials || 'U'
}

function formatDate(value?: string) {
  if (!value) {
    return 'Not recorded'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
