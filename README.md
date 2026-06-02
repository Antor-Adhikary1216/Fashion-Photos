# Fashion-Photos

A full-stack cinematic photography portfolio built with React, Vite, Tailwind CSS, Express, MongoDB, JWT auth, email verification, optional TOTP MFA, and Cloudinary uploads.

## Structure

```txt
client/          React frontend
server/          Express and MongoDB API
README.md
```

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Fill in MongoDB Atlas, JWT, email, Cloudinary, and MFA values
4. Run the full stack: `npm run dev:full`

Useful scripts:

- `npm run dev` starts the Vite client
- `npm run dev:server` starts the Express API
- `npm run dev:full` starts both
- `npm run seed` creates sample public content
- `npm run lint` runs ESLint
- `npm run build` type-checks and builds the client

## API Highlights

- Auth: register, login, refresh, logout, me, verify email, resend verification, forgot/reset password, MFA setup/login/disable
- Portfolio: photos, albums, services, testimonials, blogs
- Bookings: public booking submission and admin booking management
- Admin: protected dashboard stats

Development email fallback logs verification/reset links when SMTP is not configured.
