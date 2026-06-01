import { motion } from 'framer-motion'

export function PageHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl px-5 pb-12 pt-36"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-gold-300">
        {eyebrow}
      </p>
      <h1 className="mt-5 max-w-4xl font-serif text-5xl text-white md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-400">
        {copy}
      </p>
    </motion.section>
  )
}
