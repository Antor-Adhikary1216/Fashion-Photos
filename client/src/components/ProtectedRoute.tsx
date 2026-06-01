import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-black">
        <LoadingSpinner label="Checking session" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!user.isEmailVerified) {
    return <Navigate to="/resend-verification" replace />
  }

  return <Outlet />
}
