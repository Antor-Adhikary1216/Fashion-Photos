import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

type AuthSuccessPopupProps = {
  message: string | null
}

export function AuthSuccessPopup({ message }: AuthSuccessPopupProps) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed left-1/2 top-24 z-50 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl border border-gold-300/30 bg-black/90 px-5 py-4 text-gold-100 shadow-2xl shadow-black/50 backdrop-blur"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 rounded-full bg-gold-300/15 p-2 text-gold-300">
              <FiCheckCircle aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-white">Success</p>
              <p className="mt-1 text-sm leading-5 text-stone-300">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
