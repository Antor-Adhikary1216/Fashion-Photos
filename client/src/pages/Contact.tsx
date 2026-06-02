import { useState, type FormEvent } from 'react'

import { api, getErrorMessage } from '@/api/http'
import { PageHeader } from '@/components/PageHeader'

const serviceTypes = [
  'Wedding Photography',
  'Portrait Photography',
  'Event Photography',
  'Product Photography',
  'Fashion Photography',
  'Travel Photography',
]

export function Contact() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      await api.post('/bookings', Object.fromEntries(formData))
      event.currentTarget.reset()
      setMessage('Your booking request was received. We will reply soon.')
    } catch (bookingError) {
      setError(getErrorMessage(bookingError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <PageHeader
        eyebrow="Booking"
        title="Tell us what you are planning."
        copy="Share a few details and Fashion-Photos will respond with availability, approach, and next steps."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gold-300">
            Studio Contact
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white">
            Premium coverage, clear planning, thoughtful delivery.
          </h2>
          <p className="mt-6 leading-8 text-stone-400">
            Available for India-based and destination assignments. Typical
            response time is within one business day.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="phone" placeholder="Phone" required />
            <select name="serviceType" defaultValue={serviceTypes[0]} required>
              {serviceTypes.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
            <input name="shootDate" type="date" />
            <input name="location" placeholder="Location" required />
            <input name="budget" placeholder="Budget" />
          </div>
          <textarea name="message" rows={6} placeholder="Message" required />
          {message ? <p className="text-sm text-gold-200">{message}</p> : null}
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-black disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit booking request'}
          </button>
        </form>
      </section>
    </main>
  )
}
