export function LoadingSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      className="flex items-center gap-3 text-sm font-medium text-stone-300"
      role="status"
      aria-live="polite"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold-400 border-t-transparent shadow-[0_0_18px_rgba(231,191,92,0.28)]" />
      <span>{label}</span>
    </div>
  )
}
