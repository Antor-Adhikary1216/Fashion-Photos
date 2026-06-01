import { randomBytes } from 'node:crypto'

import { generateSecret, generateURI, verify } from 'otplib'
import QRCode from 'qrcode'

import { decryptSecret, encryptSecret } from './encryption'
import { hashToken } from './tokens'

const issuer = 'FrameStory'

export async function createMfaSetup(email: string) {
  const secret = generateSecret()
  const otpauthUrl = generateURI({
    issuer,
    label: email,
    secret,
  })
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)

  return {
    secret,
    encryptedSecret: encryptSecret(secret),
    otpauthUrl,
    qrCodeDataUrl,
  }
}

export async function verifyTotpCode(encryptedSecret: string, code: string) {
  const secret = decryptSecret(encryptedSecret)
  const result = await verify({
    secret,
    token: code.replace(/\s/g, ''),
  })

  return result.valid
}

export function createBackupCodes(count = 10) {
  return Array.from({ length: count }, () =>
    `${randomBytes(4).toString('hex')}-${randomBytes(4).toString('hex')}`.toUpperCase(),
  )
}

export function hashBackupCode(code: string) {
  return hashToken(normalizeBackupCode(code))
}

export function normalizeBackupCode(code: string) {
  return code.trim().replace(/\s/g, '').toUpperCase()
}
