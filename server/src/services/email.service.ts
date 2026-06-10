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

type BookingEmailDetails = {
  name: string
  email: string
  phone: string
  serviceType: string
  shootDate?: Date
  location: string
  budget: string
  message: string
  createdAt: Date
}

type BookingNotificationInput = {
  to: string[]
  booking: BookingEmailDetails
}

type BookingConfirmationInput = {
  to: string
  booking: BookingEmailDetails
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

export function getVerificationUrl(token: string) {
  return `${env.CLIENT_URL}/verify-email?token=${token}`
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

export async function sendPasswordResetCodeEmail(
  input: CodeEmailInput,
): Promise<CodeEmailResult> {
  const mailer = getTransporter()
  const subject = 'Your Fashion-Photos password reset code'

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
    text: buildPasswordResetCodeTextEmail(input.name, input.code),
    html: buildPasswordResetCodeHtmlEmail(input.name, input.code),
  })

  return {
    delivered: true,
  }
}

export async function sendBookingNotificationEmail({
  to,
  booking,
}: BookingNotificationInput): Promise<CodeEmailResult> {
  const mailer = getTransporter()
  const subject = `New booking request from ${booking.name}`

  if (!mailer) {
    console.info(`${subject} for ${to.join(', ')}:`)
    console.info(buildBookingNotificationTextEmail(booking))

    return {
      delivered: false,
    }
  }

  await mailer.sendMail({
    from: env.EMAIL_FROM,
    to,
    replyTo: booking.email,
    subject,
    text: buildBookingNotificationTextEmail(booking),
    html: buildBookingNotificationHtmlEmail(booking),
  })

  return {
    delivered: true,
  }
}

export async function sendBookingConfirmationEmail({
  to,
  booking,
}: BookingConfirmationInput): Promise<CodeEmailResult> {
  const mailer = getTransporter()
  const subject = 'We received your Fashion-Photos booking request'

  if (!mailer) {
    console.info(`${subject} for ${to}:`)
    console.info(buildBookingConfirmationTextEmail(booking))

    return {
      delivered: false,
    }
  }

  await mailer.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text: buildBookingConfirmationTextEmail(booking),
    html: buildBookingConfirmationHtmlEmail(booking),
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

function buildPasswordResetCodeTextEmail(
  name: string | undefined,
  code: string,
) {
  const greeting = name ? `Hi ${name},` : 'Hi,'

  return `${greeting}

Your Fashion-Photos password reset code is:
${code}

Enter this code to reset your password.
This code expires in 10 minutes.`
}

function buildPasswordResetCodeHtmlEmail(
  name: string | undefined,
  code: string,
) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
  const safeCode = escapeHtml(code)

  return `
    <div style="font-family: Arial, sans-serif; color: #1f1f1f;">
      <p>${greeting}</p>
      <p>Your Fashion-Photos password reset code is:</p>
      <p style="font-size: 28px; letter-spacing: 0.35em; font-weight: 700;">${safeCode}</p>
      <p>Enter this code to reset your password.</p>
      <p>This code expires in 10 minutes.</p>
    </div>
  `
}

function buildBookingNotificationTextEmail(
  booking: BookingEmailDetails,
) {
  return `New booking request

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Service: ${booking.serviceType}
Shoot date: ${formatBookingDate(booking.shootDate)}
Location: ${booking.location}
Budget: ${booking.budget || 'Not provided'}
Submitted: ${formatBookingDate(booking.createdAt)}

Message:
${booking.message}`
}

function buildBookingNotificationHtmlEmail(
  booking: BookingEmailDetails,
) {
  const rows = [
    ['Name', booking.name],
    ['Email', booking.email],
    ['Phone', booking.phone],
    ['Service', booking.serviceType],
    ['Shoot date', formatBookingDate(booking.shootDate)],
    ['Location', booking.location],
    ['Budget', booking.budget || 'Not provided'],
    ['Submitted', formatBookingDate(booking.createdAt)],
  ]

  return `
    <div style="font-family: Arial, sans-serif; color: #1f1f1f;">
      <h2 style="margin-bottom: 16px;">New booking request</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 140px;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
      <h3 style="margin-top: 20px;">Message</h3>
      <p style="white-space: pre-line;">${escapeHtml(booking.message)}</p>
    </div>
  `
}

function buildBookingConfirmationTextEmail(booking: BookingEmailDetails) {
  const greeting = booking.name ? `Hi ${booking.name},` : 'Hi,'

  return `${greeting}

Your Fashion-Photos booking request has been received.

Booking details:
Service: ${booking.serviceType}
Shoot date: ${formatBookingDate(booking.shootDate)}
Location: ${booking.location}
Budget: ${booking.budget || 'Not provided'}
Submitted: ${formatBookingDate(booking.createdAt)}

We will review your request and reply with availability and next steps soon.

Thank you,
Fashion-Photos`
}

function buildBookingConfirmationHtmlEmail(booking: BookingEmailDetails) {
  const greeting = booking.name ? `Hi ${escapeHtml(booking.name)},` : 'Hi,'
  const rows = [
    ['Service', booking.serviceType],
    ['Shoot date', formatBookingDate(booking.shootDate)],
    ['Location', booking.location],
    ['Budget', booking.budget || 'Not provided'],
    ['Submitted', formatBookingDate(booking.createdAt)],
  ]

  return `
    <div style="font-family: Arial, sans-serif; color: #1f1f1f;">
      <p>${greeting}</p>
      <p>Your Fashion-Photos booking request has been received.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 140px;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
      <p style="margin-top: 20px;">We will review your request and reply with availability and next steps soon.</p>
      <p>Thank you,<br />Fashion-Photos</p>
    </div>
  `
}

function formatBookingDate(value?: Date) {
  if (!value) {
    return 'Not provided'
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(value)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
