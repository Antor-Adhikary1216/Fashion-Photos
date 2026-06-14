import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { AdminRoute } from '@/components/AdminRoute'
import { Footer } from '@/components/Footer'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Navbar } from '@/components/Navbar'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const AccountSettings = lazy(() =>
  import('@/pages/AccountSettings').then((module) => ({
    default: module.AccountSettings,
  })),
)
const AlbumDetails = lazy(() =>
  import('@/pages/AlbumDetails').then((module) => ({
    default: module.AlbumDetails,
  })),
)
const Albums = lazy(() =>
  import('@/pages/Albums').then((module) => ({ default: module.Albums })),
)
const About = lazy(() =>
  import('@/pages/About').then((module) => ({ default: module.About })),
)
const Blog = lazy(() =>
  import('@/pages/Blog').then((module) => ({ default: module.Blog })),
)
const BlogDetails = lazy(() =>
  import('@/pages/BlogDetails').then((module) => ({
    default: module.BlogDetails,
  })),
)
const Contact = lazy(() =>
  import('@/pages/Contact').then((module) => ({ default: module.Contact })),
)
const ForgotPassword = lazy(() =>
  import('@/pages/ForgotPassword').then((module) => ({
    default: module.ForgotPassword,
  })),
)
const Gallery = lazy(() =>
  import('@/pages/Gallery').then((module) => ({ default: module.Gallery })),
)
const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home })),
)
const Login = lazy(() =>
  import('@/pages/Login').then((module) => ({ default: module.Login })),
)
const MfaSetup = lazy(() =>
  import('@/pages/MfaSetup').then((module) => ({ default: module.MfaSetup })),
)
const MfaVerify = lazy(() =>
  import('@/pages/MfaVerify').then((module) => ({ default: module.MfaVerify })),
)
const Register = lazy(() =>
  import('@/pages/Register').then((module) => ({ default: module.Register })),
)
const ResendVerification = lazy(() =>
  import('@/pages/ResendVerification').then((module) => ({
    default: module.ResendVerification,
  })),
)
const ResetPassword = lazy(() =>
  import('@/pages/ResetPassword').then((module) => ({
    default: module.ResetPassword,
  })),
)
const Services = lazy(() =>
  import('@/pages/Services').then((module) => ({ default: module.Services })),
)
const VerifyEmail = lazy(() =>
  import('@/pages/VerifyEmail').then((module) => ({
    default: module.VerifyEmail,
  })),
)
const AddAlbum = lazy(() =>
  import('@/dashboard/AddAlbum').then((module) => ({
    default: module.AddAlbum,
  })),
)
const AddPhoto = lazy(() =>
  import('@/dashboard/AddPhoto').then((module) => ({
    default: module.AddPhoto,
  })),
)
const DashboardHome = lazy(() =>
  import('@/dashboard/DashboardHome').then((module) => ({
    default: module.DashboardHome,
  })),
)
const DashboardLayout = lazy(() =>
  import('@/dashboard/DashboardLayout').then((module) => ({
    default: module.DashboardLayout,
  })),
)
const ManageAlbums = lazy(() =>
  import('@/dashboard/ManageAlbums').then((module) => ({
    default: module.ManageAlbums,
  })),
)
const ManageBlogs = lazy(() =>
  import('@/dashboard/ManageBlogs').then((module) => ({
    default: module.ManageBlogs,
  })),
)
const ManageBookings = lazy(() =>
  import('@/dashboard/ManageBookings').then((module) => ({
    default: module.ManageBookings,
  })),
)
const ManagePhotos = lazy(() =>
  import('@/dashboard/ManagePhotos').then((module) => ({
    default: module.ManagePhotos,
  })),
)
const ManageServices = lazy(() =>
  import('@/dashboard/ManageServices').then((module) => ({
    default: module.ManageServices,
  })),
)
const ManageTestimonials = lazy(() =>
  import('@/dashboard/ManageTestimonials').then((module) => ({
    default: module.ManageTestimonials,
  })),
)

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-stone-100">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<RouteLoadingFallback />}>
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
                  <Route
                    path="testimonials"
                    element={<ManageTestimonials />}
                  />
                  <Route path="blogs" element={<ManageBlogs />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

function RouteLoadingFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="rounded-full border border-gold-300/25 bg-gold-300/10 px-5 py-3 shadow-[0_0_34px_rgba(201,154,46,0.18)]">
        <LoadingSpinner label="Loading page" />
      </div>
    </div>
  )
}
