import { Link, NavLink } from 'react-router-dom'
import { FiAlertTriangle, FiCamera, FiMenu } from 'react-icons/fi'
import { useEffect, useState } from 'react'

import { useAuth } from '@/context/AuthContext'

const navItems = [
  ['Home', '/'],
  ['Gallery', '/gallery'],
  ['Albums', '/albums'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Blog', '/blog'],
  ['Book', '/contact'],
] as const

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout } = useAuth()
  const userInitials = user ? getUserInitials(user.name) : ''

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await logout()
      setIsOpen(false)
      setIsLogoutConfirmOpen(false)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/65 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300">
            <FiCamera />
          </span>
          <span>
            <span className="block font-serif text-xl text-white">
              Fashion-Photos
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-stone-400">
              Photography
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          <FiMenu />
        </button>

        <div
          className={`absolute left-5 right-5 top-20 rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-2xl lg:static lg:flex lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            isOpen ? 'block' : 'hidden lg:flex'
          }`}
        >
          {navItems.map(([label, path]) => (
            <AnimatedNavLink
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </AnimatedNavLink>
          ))}
          {user?.role === 'admin' ? (
            <AnimatedNavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </AnimatedNavLink>
          ) : null}
          {user ? (
            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 lg:mt-0 lg:border-0 lg:pt-0">
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                aria-label={`${user.name} account`}
                title={user.name}
                className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-gold-300/35 bg-gold-300/15 text-xs font-bold uppercase text-gold-100 shadow-[0_0_22px_rgba(231,191,92,0.18)] transition hover:border-gold-300 hover:bg-gold-300/25"
              >
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userInitials
                )}
              </Link>
              <button
                type="button"
                onClick={() => setIsLogoutConfirmOpen(true)}
                disabled={isLoggingOut}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-gold-300 hover:text-gold-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="mt-3 block rounded-full bg-gold-400 px-5 py-2 text-center text-sm font-semibold text-black lg:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <LogoutConfirmDialog
        isOpen={isLogoutConfirmOpen}
        isLoading={isLoggingOut}
        onCancel={() => setIsLogoutConfirmOpen(false)}
        onConfirm={() => void handleLogout()}
      />
    </header>
  )
}

function getUserInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return initials || 'U'
}

function AnimatedNavLink({
  to,
  children,
  onClick,
}: {
  to: string
  children: string
  onClick: () => void
}) {
  return (
    <NavLink to={to} end={to === '/'} onClick={onClick}>
      {({ isActive }) => (
        <span
          className={`group relative isolate block px-1 py-3 text-sm transition-colors ${
            isActive ? 'text-white' : 'text-stone-400 hover:text-white'
          }`}
          aria-label={isActive ? `${children}, current page` : children}
        >
          <span
            className="absolute inset-x-[-0.65rem] inset-y-1 -z-10 rounded-full bg-white/[0.04] opacity-0 blur-sm transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
          <span className="relative z-10 flex items-center gap-2">
            <span>{children}</span>
          </span>
          {isActive ? (
            <span
              className="absolute bottom-1 left-0 right-0 h-px rounded-full bg-gradient-to-r from-transparent via-gold-300 to-transparent shadow-[0_0_18px_rgba(231,191,92,0.75)]"
            />
          ) : null}
        </span>
      )}
    </NavLink>
  )
}

function LogoutConfirmDialog({
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean
  isLoading: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  useEffect(() => {
    if (!isOpen || isLoading) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLoading, isOpen, onCancel])

  function handleBackdropClick() {
    if (!isLoading) {
      onCancel()
    }
  }

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirm-title"
            className="w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-6 text-white shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 rounded-full border border-gold-300/30 bg-gold-300/10 p-3 text-gold-200">
                <FiAlertTriangle aria-hidden="true" />
              </span>
              <div>
                <h2
                  id="logout-confirm-title"
                  className="font-serif text-2xl text-white"
                >
                  Log out?
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  Are you sure you want to log out of your Fashion-Photos
                  account?
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                autoFocus
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/35 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
