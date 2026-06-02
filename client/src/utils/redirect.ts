const fallbackReturnTo = '/'
const localBaseUrl = 'http://fashion-photos.local'
const authRoutePathnames = new Set([
  '/login',
  '/register',
  '/verify-email',
  '/resend-verification',
  '/forgot-password',
  '/reset-password',
  '/mfa-verify',
])
const protectedReturnPages = [
  { prefix: '/gallery', name: 'Gallery' },
  { prefix: '/albums', name: 'Albums' },
  { prefix: '/services', name: 'Services' },
  { prefix: '/about', name: 'About' },
  { prefix: '/blog', name: 'Blog' },
  { prefix: '/contact', name: 'Book a Shoot' },
  { prefix: '/account', name: 'Account' },
  { prefix: '/dashboard', name: 'Dashboard' },
]

type AppLocation = {
  pathname: string
  search: string
  hash: string
}

type QueryValue = string | null | undefined

export function getLocationReturnTo(location: AppLocation) {
  return `${location.pathname}${location.search}${location.hash}`
}

export function getSafeReturnTo(returnTo: QueryValue) {
  if (!returnTo) {
    return fallbackReturnTo
  }

  if (!returnTo.startsWith('/') || returnTo.startsWith('//')) {
    return fallbackReturnTo
  }

  try {
    const url = new URL(returnTo, localBaseUrl)

    if (url.origin !== localBaseUrl || authRoutePathnames.has(url.pathname)) {
      return fallbackReturnTo
    }

    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return fallbackReturnTo
  }
}

export function getProtectedReturnPageName(returnTo: QueryValue) {
  const safeReturnTo = getSafeReturnTo(returnTo)

  if (safeReturnTo === fallbackReturnTo) {
    return null
  }

  const { pathname } = new URL(safeReturnTo, localBaseUrl)
  const page = protectedReturnPages.find(({ prefix }) =>
    pathname.startsWith(prefix),
  )

  return page?.name ?? null
}

export function getProtectedReturnMessage(returnTo: QueryValue) {
  const pageName = getProtectedReturnPageName(returnTo)

  if (!pageName) {
    return null
  }

  if (pageName === 'Book a Shoot') {
    return 'Please log in to book a shoot.'
  }

  if (pageName === 'Dashboard') {
    return 'Please log in to access the Dashboard.'
  }

  if (pageName === 'Account') {
    return 'Please log in to view your Account.'
  }

  return `Please log in to view the ${pageName}.`
}

export function buildAuthPath(
  pathname: string,
  returnTo: QueryValue,
  params: Record<string, QueryValue> = {},
) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    }
  })

  const safeReturnTo = getSafeReturnTo(returnTo)
  if (safeReturnTo !== fallbackReturnTo) {
    searchParams.set('returnTo', safeReturnTo)
  }

  const search = searchParams.toString()

  return `${pathname}${search ? `?${search}` : ''}`
}
