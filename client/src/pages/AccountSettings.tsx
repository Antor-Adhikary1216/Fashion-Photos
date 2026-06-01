import { Link } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { PageHeader } from '@/components/PageHeader'

export function AccountSettings() {
  const { user } = useAuth()

  return (
    <main>
      <PageHeader
        eyebrow="Account"
        title="Security and profile settings."
        copy="Manage your verified account and multi-factor authentication status."
      />
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <dl className="grid gap-4 text-sm text-stone-300">
            <div>
              <dt className="text-stone-500">Name</dt>
              <dd>{user?.name}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Email</dt>
              <dd>{user?.email}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Role</dt>
              <dd>{user?.role}</dd>
            </div>
            <div>
              <dt className="text-stone-500">MFA</dt>
              <dd>{user?.mfaEnabled ? 'Enabled' : 'Disabled'}</dd>
            </div>
          </dl>
          {!user?.mfaEnabled ? (
            <Link
              to="/mfa-setup"
              className="mt-6 inline-flex rounded-full bg-gold-400 px-6 py-3 font-semibold text-black"
            >
              Enable MFA
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  )
}
