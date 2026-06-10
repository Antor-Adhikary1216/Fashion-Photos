import type { UserDocument } from '../models/User'

export function serializeUser(user: UserDocument) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    mfaEnabled: user.mfa.enabled,
    profileImageUrl: user.profileImageUrl ?? null,
    profileImageSource: user.profileImageSource ?? null,
    lastLoginAt: user.lastLoginAt?.toISOString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}
