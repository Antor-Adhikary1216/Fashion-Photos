import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

import { env } from '../config/env'

const algorithm = 'aes-256-gcm'

export function encryptSecret(value: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv(algorithm, getEncryptionKey(), iv)
  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()

  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString(
    'hex',
  )}`
}

export function decryptSecret(value: string) {
  const [ivHex, tagHex, encryptedHex] = value.split(':')

  if (!ivHex || !tagHex || !encryptedHex) {
    throw new Error('Invalid encrypted secret')
  }

  const decipher = createDecipheriv(
    algorithm,
    getEncryptionKey(),
    Buffer.from(ivHex, 'hex'),
  )
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'))

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, 'hex')),
    decipher.final(),
  ]).toString('utf8')
}

function getEncryptionKey() {
  if (/^[a-f0-9]{64}$/i.test(env.MFA_ENCRYPTION_KEY)) {
    return Buffer.from(env.MFA_ENCRYPTION_KEY, 'hex')
  }

  return createHash('sha256').update(env.MFA_ENCRYPTION_KEY).digest()
}
