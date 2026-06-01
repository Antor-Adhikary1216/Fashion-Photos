import { useState, type FormEvent } from 'react'

import { api, getErrorMessage } from '@/api/http'
import { AdminForm, Status } from '@/dashboard/AddPhoto'

export function AddAlbum() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      await api.post('/albums', Object.fromEntries(formData))
      setMessage('Album created.')
      event.currentTarget.reset()
    } catch (albumError) {
      setError(getErrorMessage(albumError))
    }
  }

  return (
    <AdminForm title="Add Album" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <input name="category" placeholder="Category" required />
      <input name="coverImage" placeholder="Cover image URL" required />
      <input name="date" type="date" />
      <input name="location" placeholder="Location" />
      <textarea name="description" placeholder="Description" rows={5} />
      <Status message={message} error={error} />
    </AdminForm>
  )
}
