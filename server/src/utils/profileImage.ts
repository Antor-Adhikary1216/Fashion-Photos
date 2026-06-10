import { createHash } from 'node:crypto'

import type { UserDocument } from '../models/User'

export function getGravatarProfileImageUrl(email: string) {
  const emailHash = createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex')

  return `https://www.gravatar.com/avatar/${emailHash}?s=256&d=identicon&r=g`
}

export function applyDefaultProfileImage(user: UserDocument) {
  if (user.profileImageSource === 'upload' && user.profileImageUrl) {
    return false
  }

  const profileImageUrl = getGravatarProfileImageUrl(user.email)

  if (
    user.profileImageSource === 'gravatar' &&
    user.profileImageUrl === profileImageUrl
  ) {
    return false
  }

  user.profileImageUrl = profileImageUrl
  user.profileImageSource = 'gravatar'
  user.profileImagePublicId = undefined

  return true
}

export async function ensureDefaultProfileImage(user: UserDocument) {
  if (applyDefaultProfileImage(user)) {
    await user.save()
  }

  return user
}
