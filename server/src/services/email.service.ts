import nodemailer, { type Transporter } from 'nodemailer'

import { env } from '../config/env'

type TokenEmailInput = {
  to: string
  name?: string
  token: string
}

type TokenEmailResult = {
  delivered: boolean
  url: string
}

let transporter: Transporter | null = null

export async function sendVerificationEmail(
  input: TokenEmailInput,
): Promise<TokenEmailResult> {
  const url = `${env.CLIENT_URL}/verify-email?token=${input.token}`
  return sendTokenEmail({
    ...input,
    url,
    subject: 'Verify your FrameStory email',
    action: 'verify your email address',
  })
}

export async function sendPasswordResetEmail(
  input: TokenEmailInput,
): Promise<TokenEmailResult> {
  const url = `${env.CLIENT_URL}/reset-password?token=${input.token}`
  return sendTokenEmail({
    ...input,
    url,
    subject: 'Reset your FrameStory password',
    action: 'reset your password',
  })
}

async function sendTokenEmail({
  to,
  name,
  url,
  subject,
  action,
}: TokenEmailInput & {
  url: string
  subject: string
  action: string
}): Promise<TokenEmailResult> {
  const mailer = getTransporter()

  if (!mailer) {
    console.info(`${subject} link for ${to}: ${url}`)

    return {
      delivered: false,
      url,
    }
  }

  await mailer.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text: buildTextEmail(name, action, url),
    html: buildHtmlEmail(name, action, url),
  })

  return {
    delivered: true,
    url,
  }
}

function getTransporter() {
  if (!env.SMTP_HOST) {
    return null
  }

  if (transporter) {
    return transporter
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
  })

  return transporter
}

function buildTextEmail(
  name: string | undefined,
  action: string,
  url: string,
) {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return `${greeting}

Please ${action} by opening this link:
${url}

This link expires in 30 minutes.`
}

function buildHtmlEmail(
  name: string | undefined,
  action: string,
  url: string,
) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
  const safeUrl = escapeHtml(url)

  return `
    <div style="font-family: Arial, sans-serif; color: #1f1f1f;">
      <p>${greeting}</p>
      <p>Please ${escapeHtml(action)} by opening this link:</p>
      <p><a href="${safeUrl}">${safeUrl}</a></p>
      <p>This link expires in 30 minutes.</p>
    </div>
  `
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
