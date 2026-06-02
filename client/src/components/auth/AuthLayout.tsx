import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type AuthLayoutProps = {
  eyebrow: string
  title: string
  copy?: string
  sideTitle?: string
  sideCopy?: string
  children: ReactNode
}

const authHighlights = [
  ['30m', 'Secure email links'],
  ['MFA', 'Optional account protection'],
  ['JWT', 'Modern session flow'],
]

export function AuthLayout({
  eyebrow,
  title,
  copy = 'Access your account with secure email verification, protected sessions, and optional multi-factor authentication.',
  sideTitle = 'A polished client portal for every visual story.',
  sideCopy = 'Manage bookings, galleries, and secure account access from a refined photography experience.',
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-5 py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(201,154,46,0.18),transparent_28rem),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_24rem),#050505]" />
      <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-[0.95fr_1.05fr]">
        <motion.aside
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative hidden min-h-[720px] overflow-hidden md:block"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85"
            alt="Fashion portrait session"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.08, x: -18 }}
            animate={{ scale: [1.08, 1.14, 1.1], x: [-18, 12, -6] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/85" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(231,191,92,0.18),transparent_18rem)]"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: 'easeOut' }}
            className="absolute inset-x-0 bottom-0 p-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="text-sm uppercase tracking-[0.35em] text-gold-200"
            >
              Fashion-Photos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.55 }}
              className="mt-4 font-serif text-5xl leading-tight text-white"
            >
              {sideTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.55 }}
              className="mt-5 max-w-md text-sm leading-6 text-stone-300"
            >
              {sideCopy}
            </motion.p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {authHighlights.map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.72 + index * 0.08,
                    duration: 0.45,
                    ease: 'easeOut',
                  }}
                  whileHover={{ y: -4, borderColor: 'rgba(231,191,92,0.45)' }}
                  className="rounded-2xl border border-white/10 bg-black/35 p-4"
                >
                  <p className="font-serif text-2xl text-gold-200">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-400">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.aside>

        <div className="flex items-center px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-gold-300">
                {eyebrow}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-stone-400">
                {copy}
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}
