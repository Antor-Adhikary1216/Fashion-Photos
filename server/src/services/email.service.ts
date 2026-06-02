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

type CodeEmailInput = {
  to: string
  name?: string
  code: string
}

type CodeEmailResult = {
  delivered: boolean
}

let transporter: Transporter | null = null

export async function sendVerificationEmail(
  input: TokenEmailInput,
): Promise<TokenEmailResult> {
  return sendTokenEmail({
    ...input,
    url: getVerificationUrl(input.token),
    subject: 'Verify your Fashion-Photos email',
    action: 'verify your email address',
  })
}

export async function sendPasswordResetEmail(
  input: TokenEmailInput,
): Promise<TokenEmailResult> {
  return sendTokenEmail({
    ...input,
    url: getPasswordResetUrl(input.token),
    subject: 'Reset your Fashion-Photos password',
    action: 'reset your password',
  })
}

export function getVerificationUrl(token: string) {
  return `${env.CLIENT_URL}/verify-email?token=${token}`
}

export function getPasswordResetUrl(token: string) {
  return `${env.CLIENT_URL}/reset-password?token=${token}`
}

export async function sendVerificationCodeEmail(
  input: CodeEmailInput,
): Promise<CodeEmailResult> {
  const mailer = getTransporter()
  const subject = 'Your Fashion-Photos verification code'

  if (!mailer) {
    console.info(`${subject} for ${input.to}: ${input.code}`)

    return {
      delivered: false,
    }
  }

  await mailer.sendMail({
    from: env.EMAIL_FROM,
    to: input.to,
    subject,
    text: buildCodeTextEmail(input.name, input.code),
    html: buildCodeHtmlEmail(input.name, input.code),
  })

  return {
    delivered: true,
  }
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

function buildCodeTextEmail(name: string | undefined, code: string) {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return `${greeting}

Your Fashion-Photos verification code is:
${code}

Enter this code to verify your email address.
This code expires in 10 minutes.`
}

function buildCodeHtmlEmail(name: string | undefined, code: string) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
  const safeCode = escapeHtml(code)

  return `
    <div style="font-family: Arial, sans-serif; color: #1f1f1f;">
      <p>${greeting}</p>
      <p>Your Fashion-Photos verification code is:</p>
      <p style="font-size: 28px; letter-spacing: 0.35em; font-weight: 700;">${safeCode}</p>
      <p>Enter this code to verify your email address.</p>
      <p>This code expires in 10 minutes.</p>
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
