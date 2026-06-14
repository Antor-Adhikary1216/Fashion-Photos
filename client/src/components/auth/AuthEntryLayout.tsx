import type { ReactNode } from 'react'
import { FiCalendar, FiCamera, FiImage, FiLock } from 'react-icons/fi'

const studioAccessItems = [
  {
    icon: <FiImage aria-hidden="true" />,
    title: 'Private galleries',
    copy: 'Review curated albums and protected client collections.',
  },
  {
    icon: <FiCalendar aria-hidden="true" />,
    title: 'Booking desk',
    copy: 'Keep shoot requests, schedules, and updates in one place.',
  },
  {
    icon: <FiLock aria-hidden="true" />,
    title: 'Account access',
    copy: 'Continue securely with your verified studio profile.',
  },
]

type AuthEntryLayoutProps = {
  eyebrow: string
  title: string
  copy: string
  sideTitle: string
  children: ReactNode
}

export function AuthEntryLayout({
  eyebrow,
  title,
  copy,
  sideTitle,
  children,
}: AuthEntryLayoutProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050505] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#050505_0%,#090806_48%,#171107_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-300/45 to-transparent" />

      <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/55 shadow-2xl shadow-black/50 backdrop-blur lg:grid-cols-[1.03fr_0.97fr]">
        <aside className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_18%,rgba(231,191,92,0.18),transparent_18rem),linear-gradient(145deg,rgba(14,12,9,0.96),rgba(5,5,5,0.98))] p-6 sm:p-8 lg:min-h-[44rem] lg:border-b-0 lg:border-r lg:p-10">
          <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-gold-300/20" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gold-400/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between gap-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-300/35 bg-gold-300/10 text-gold-200 shadow-[0_0_30px_rgba(231,191,92,0.16)]">
                  <FiCamera aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-2xl text-white">
                    Fashion-Photos
                  </p>
                  <p className="text-xs uppercase tracking-[0.38em] text-gold-200">
                    Client Studio
                  </p>
                </div>
              </div>

              <div className="mt-12 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.42em] text-gold-200">
                  Studio access
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                  {sideTitle}
                </h2>
                <p className="mt-5 text-sm leading-6 text-stone-300">
                  A quiet command center for bookings, gallery reviews, and
                  every detail that keeps your photography experience moving.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {studioAccessItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  <div className="flex gap-3">
                    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-300/10 text-gold-200">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-stone-400">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gold-300/20 bg-gold-300/[0.07] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-200">
                Ready when you are
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-300">
                Sign in or create your account to continue from the same
                polished workspace.
              </p>
            </div>
          </div>
        </aside>

        <div className="flex items-center px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold-300">
                {eyebrow}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-stone-300">
                {copy}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-7">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
