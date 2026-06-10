import mongoose, { Schema, model, type HydratedDocument, type Model } from 'mongoose'

export type UserRole = 'user' | 'admin'
export type ProfileImageSource = 'gravatar' | 'upload'

export interface UserMfa {
  enabled: boolean
  method: 'totp'
  totpSecretEncrypted?: string
  pendingTotpSecretEncrypted?: string
  backupCodesHash: string[]
  lastVerifiedAt?: Date
}

export interface User {
  name: string
  email: string
  passwordHash: string
  role: UserRole
  isEmailVerified: boolean
  emailVerificationTokenHash?: string
  emailVerificationExpiresAt?: Date
  emailVerificationCodeHash?: string
  emailVerificationCodeExpiresAt?: Date
  emailVerificationCodeAttempts: number
  passwordResetCodeHash?: string
  passwordResetCodeExpiresAt?: Date
  passwordResetCodeAttempts: number
  profileImageUrl?: string
  profileImagePublicId?: string
  profileImageSource?: ProfileImageSource
  refreshTokenHash?: string
  mfa: UserMfa
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type UserDocument = HydratedDocument<User>

const mfaSchema = new Schema<UserMfa>(
  {
    enabled: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      enum: ['totp'],
      default: 'totp',
    },
    totpSecretEncrypted: {
      type: String,
      select: false,
    },
    pendingTotpSecretEncrypted: {
      type: String,
      select: false,
    },
    backupCodesHash: {
      type: [String],
      default: [],
      select: false,
    },
    lastVerifiedAt: {
      type: Date,
    },
  },
  { _id: false },
)

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationTokenHash: {
      type: String,
      select: false,
    },
    emailVerificationExpiresAt: {
      type: Date,
      select: false,
    },
    emailVerificationCodeHash: {
      type: String,
      select: false,
    },
    emailVerificationCodeExpiresAt: {
      type: Date,
      select: false,
    },
    emailVerificationCodeAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    passwordResetCodeHash: {
      type: String,
      select: false,
    },
    passwordResetCodeExpiresAt: {
      type: Date,
      select: false,
    },
    passwordResetCodeAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    profileImageUrl: {
      type: String,
    },
    profileImagePublicId: {
      type: String,
      select: false,
    },
    profileImageSource: {
      type: String,
      enum: ['gravatar', 'upload'],
    },
    refreshTokenHash: {
      type: String,
      select: false,
    },
    mfa: {
      type: mfaSchema,
      default: () => ({
        enabled: false,
        method: 'totp',
        backupCodesHash: [],
      }),
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

userSchema.index({ emailVerificationTokenHash: 1 }, { sparse: true })
userSchema.index({ emailVerificationCodeHash: 1 }, { sparse: true })
userSchema.index({ passwordResetCodeHash: 1 }, { sparse: true })

export const UserModel = mongoose.models.User
  ? (mongoose.models.User as Model<User>)
  : model<User>('User', userSchema)
