import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'
import { buildAuthPath, getLocationReturnTo } from '@/utils/redirect'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const returnTo = getLocationReturnTo(location)

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-black">
        <LoadingSpinner label="Checking session" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={buildAuthPath('/login', returnTo)} replace />
  }

  if (!user.isEmailVerified) {
    return (
      <Navigate
        to={buildAuthPath('/resend-verification', returnTo, {
          email: user.email,
        })}
        replace
      />
    )
  }

  return <Outlet />
}
