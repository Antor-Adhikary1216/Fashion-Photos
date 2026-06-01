import type { ReactNode } from 'react'

export function AuthLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-32">
      <section className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-gold-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  )
}
