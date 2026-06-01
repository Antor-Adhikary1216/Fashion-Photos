export function formatDate(value?: string) {
  if (!value) {
    return 'Date to be announced'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function shortText(value: string, length = 140) {
  return value.length > length ? `${value.slice(0, length).trim()}...` : value
}
