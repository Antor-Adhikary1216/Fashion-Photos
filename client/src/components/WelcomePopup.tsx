import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiCamera, FiCheckCircle } from 'react-icons/fi'

const welcomeStorageKey = 'fashion_photos_welcome_seen'

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      setIsOpen(localStorage.getItem(welcomeStorageKey) !== 'true')
    } catch {
      setIsOpen(true)
    }
  }, [])

  function handleClose() {
    try {
      localStorage.setItem(welcomeStorageKey, 'true')
    } catch {
      // The popup can still close if storage is unavailable.
    }

    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            aria-describedby="welcome-popup-copy"
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-gold-300/25 bg-neutral-950 text-white shadow-2xl shadow-black/70"
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="border-b border-white/10 bg-gradient-to-br from-gold-400/20 via-white/[0.03] to-transparent p-6">
              <span className="inline-grid h-12 w-12 place-items-center rounded-full border border-gold-300/35 bg-gold-300/10 text-gold-200">
                <FiCamera aria-hidden="true" />
              </span>
              <h2
                id="welcome-popup-title"
                className="mt-5 font-serif text-3xl text-white"
              >
                Welcome to Fashion-Photos
              </h2>
              <p
                id="welcome-popup-copy"
                className="mt-3 leading-7 text-stone-300"
              >
                Explore cinematic galleries, curated albums, photography
                services, booking requests, and a secure client account
                experience in one place.
              </p>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-3 text-sm text-stone-300">
                <Feature text="Browse featured photography stories and albums." />
                <Feature text="Request a shoot and receive booking updates." />
                <Feature text="Log in for protected galleries and account tools." />
              </div>
              <button
                type="button"
                onClick={handleClose}
                autoFocus
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 font-semibold text-black transition hover:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-200"
              >
                <FiCheckCircle aria-hidden="true" />
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-300" />
      <span>{text}</span>
    </div>
  )
}
