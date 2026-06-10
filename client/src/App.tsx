import { Route, Routes } from 'react-router-dom'

import { AdminRoute } from '@/components/AdminRoute'
import { Footer } from '@/components/Footer'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Navbar } from '@/components/Navbar'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { AccountSettings } from '@/pages/AccountSettings'
import { AlbumDetails } from '@/pages/AlbumDetails'
import { Albums } from '@/pages/Albums'
import { About } from '@/pages/About'
import { Blog } from '@/pages/Blog'
import { BlogDetails } from '@/pages/BlogDetails'
import { Contact } from '@/pages/Contact'
import { ForgotPassword } from '@/pages/ForgotPassword'
import { Gallery } from '@/pages/Gallery'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { MfaSetup } from '@/pages/MfaSetup'
import { MfaVerify } from '@/pages/MfaVerify'
import { Register } from '@/pages/Register'
import { ResendVerification } from '@/pages/ResendVerification'
import { ResetPassword } from '@/pages/ResetPassword'
import { Services } from '@/pages/Services'
import { VerifyEmail } from '@/pages/VerifyEmail'
import { AddAlbum } from '@/dashboard/AddAlbum'
import { AddPhoto } from '@/dashboard/AddPhoto'
import { DashboardHome } from '@/dashboard/DashboardHome'
import { DashboardLayout } from '@/dashboard/DashboardLayout'
import { ManageAlbums } from '@/dashboard/ManageAlbums'
import { ManageBlogs } from '@/dashboard/ManageBlogs'
import { ManageBookings } from '@/dashboard/ManageBookings'
import { ManagePhotos } from '@/dashboard/ManagePhotos'
import { ManageServices } from '@/dashboard/ManageServices'
import { ManageTestimonials } from '@/dashboard/ManageTestimonials'

export function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-black text-stone-100">
        <div className="grid place-items-center gap-4">
          <div className="rounded-full border border-gold-300/25 bg-gold-300/10 px-5 py-3 shadow-[0_0_34px_rgba(201,154,46,0.18)]">
            <LoadingSpinner label="Loading website" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
            Fashion-Photos
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-stone-100">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/resend-verification"
            element={<ResendVerification />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/mfa-verify" element={<MfaVerify />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:slug" element={<AlbumDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/mfa-setup" element={<MfaSetup />} />
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="photos/new" element={<AddPhoto />} />
                <Route path="photos" element={<ManagePhotos />} />
                <Route path="albums/new" element={<AddAlbum />} />
                <Route path="albums" element={<ManageAlbums />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="blogs" element={<ManageBlogs />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
