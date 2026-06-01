import { useEffect, useState } from 'react'

import { api } from '@/api/http'
import type { Booking, DashboardStats } from '@/types'
import { formatDate } from '@/utils/format'

const emptyStats: DashboardStats = {
  totalPhotos: 0,
  totalAlbums: 0,
  totalBookings: 0,
  pendingBookings: 0,
  totalServices: 0,
  totalTestimonials: 0,
  totalBlogs: 0,
}

export function DashboardHome() {
  const [stats, setStats] = useState(emptyStats)
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get('/admin/stats')
        setStats(response.data.stats)
        setRecentBookings(response.data.recentBookings)
      } catch {
        setStats(emptyStats)
      }
    }

    void loadStats()
  }, [])

  return (
    <div>
      <h1 className="font-serif text-5xl text-white">Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => (
          <article
            key={key}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-sm capitalize text-stone-500">
              {key.replace(/([A-Z])/g, ' $1')}
            </p>
            <p className="mt-3 font-serif text-4xl text-gold-300">{value}</p>
          </article>
        ))}
      </div>
      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="font-serif text-3xl text-white">Recent inquiries</h2>
        <div className="mt-5 grid gap-3">
          {recentBookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-2xl border border-white/10 p-4 text-sm text-stone-300"
            >
              <p className="font-semibold text-white">{booking.name}</p>
              <p>{booking.serviceType}</p>
              <p>{formatDate(booking.createdAt)}</p>
            </div>
          ))}
          {!recentBookings.length ? (
            <p className="text-stone-500">No recent inquiries yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
