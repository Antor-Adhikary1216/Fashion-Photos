import { NavLink, Outlet } from 'react-router-dom'

const links = [
  ['Overview', '/dashboard'],
  ['Photos', '/dashboard/photos'],
  ['Add Photo', '/dashboard/photos/new'],
  ['Albums', '/dashboard/albums'],
  ['Add Album', '/dashboard/albums/new'],
  ['Bookings', '/dashboard/bookings'],
  ['Services', '/dashboard/services'],
  ['Testimonials', '/dashboard/testimonials'],
  ['Blogs', '/dashboard/blogs'],
]

export function DashboardLayout() {
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-5 pb-20 pt-32 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-4 px-3 text-sm uppercase tracking-[0.3em] text-gold-300">
          Admin
        </p>
        <nav className="grid gap-1">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm ${
                  isActive
                    ? 'bg-gold-400 text-black'
                    : 'text-stone-300 hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section>
        <Outlet />
      </section>
    </main>
  )
}
