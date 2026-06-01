export function LoadingSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-stone-300">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
      {label}
    </div>
  )
}
