import { useEffect, useState } from 'react'

import { api, getErrorMessage } from '@/api/http'
import type { Booking } from '@/types'
import { formatDate } from '@/utils/format'

const statuses = ['pending', 'confirmed', 'completed', 'cancelled'] as const

export function ManageBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [error, setError] = useState<string | null>(null)

  async function loadBookings() {
    try {
      const response = await api.get('/bookings')
      setBookings(response.data.bookings)
    } catch (bookingError) {
      setError(getErrorMessage(bookingError))
    }
  }

  useEffect(() => {
    void loadBookings()
  }, [])

  async function updateStatus(id: string, status: Booking['status']) {
    await api.patch(`/bookings/${id}`, { status })
    await loadBookings()
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-white">Manage Bookings</h1>
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      <div className="mt-6 grid gap-4">
        {bookings.map((booking) => (
          <article
            key={booking._id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <p className="font-semibold text-white">{booking.name}</p>
                <p className="text-sm text-stone-400">
                  {booking.email} / {booking.phone}
                </p>
                <p className="mt-2 text-sm text-stone-300">
                  {booking.serviceType} in {booking.location}
                </p>
                <p className="text-sm text-stone-500">
                  {formatDate(booking.shootDate)}
                </p>
              </div>
              <select
                value={booking.status}
                onChange={(event) =>
                  void updateStatus(booking._id, event.target.value as Booking['status'])
                }
                className="md:w-48"
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">
              {booking.message}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
