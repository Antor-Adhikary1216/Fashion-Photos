import { useState, type FormEvent, type ReactNode } from 'react'

import { api, getErrorMessage } from '@/api/http'

export function AddPhoto() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      await api.post('/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setMessage('Photo created.')
      event.currentTarget.reset()
    } catch (photoError) {
      setError(getErrorMessage(photoError))
    }
  }

  return (
    <AdminForm title="Add Photo" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <input name="category" placeholder="Category" required />
      <input name="location" placeholder="Location" />
      <input name="camera" placeholder="Camera" />
      <input name="lens" placeholder="Lens" />
      <input name="image" type="file" accept="image/*" />
      <input name="imageUrl" placeholder="Image URL fallback" />
      <textarea name="description" placeholder="Description" rows={4} />
      <label className="flex items-center gap-2 text-sm text-stone-300">
        <input name="isFeatured" type="checkbox" value="true" className="w-auto" />
        Featured photo
      </label>
      <Status message={message} error={error} />
    </AdminForm>
  )
}

export function AdminForm({
  title,
  onSubmit,
  children,
}: {
  title: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6"
    >
      <h1 className="font-serif text-4xl text-white">{title}</h1>
      {children}
      <button className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black">
        Save
      </button>
    </form>
  )
}

export function Status({
  message,
  error,
}: {
  message: string | null
  error: string | null
}) {
  return (
    <>
      {message ? <p className="text-sm text-gold-200">{message}</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </>
  )
}
