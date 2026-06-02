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

## Render Hosting

This repo includes `render.yaml` for a one-service Render deploy. The Express
server serves both `/api/*` and the built React app from `dist/`.

1. Push the repo to GitHub.
2. In Render, choose **New > Blueprint** and select this repository.
3. When Render prompts for secret values, fill:
   - `MONGO_URI`
   - `EMAIL_FROM`
   - `EMAIL_USER`
   - `EMAIL_PASS`
4. Leave `API_URL` and `CLIENT_URL` unset unless you add a custom domain. The
   server uses Render's `RENDER_EXTERNAL_URL` automatically.
5. In MongoDB Atlas Network Access, allow Render to connect. For the free Render
   plan, use `0.0.0.0/0` or move to a plan/static outbound IP setup.

Render uses:

- Build command: `npm ci --include=dev && npm run build`
- Start command: `npm run start:server`
- Health check: `/api/health`

## Railway Hosting

This repo also includes `railway.json` for a one-service Railway deploy. The
same Express server serves both `/api/*` and the built React app.

1. In Railway, choose **New Project > Deploy from GitHub repo**.
2. Select this repository and deploy the `main` branch.
3. In the service Variables tab, add:
   - `NODE_ENV=production`
   - `VITE_API_URL=/api`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `MFA_ENCRYPTION_KEY`
   - `EMAIL_FROM`
   - `EMAIL_USER`
   - `EMAIL_PASS`
4. In the service Settings or Networking tab, generate a public domain.
5. In MongoDB Atlas Network Access, allow Railway to connect. If you do not
   have static outbound IPs, use `0.0.0.0/0`.

Railway reads:

- Build command: `npm ci --include=dev && npm run build`
- Start command: `npm run start:server`
- Health check: `/api/health`

## API Highlights

- Auth: register, login, refresh, logout, me, verify email, resend verification, forgot/reset password, MFA setup/login/disable
- Portfolio: photos, albums, services, testimonials, blogs
- Bookings: public booking submission and admin booking management
- Admin: protected dashboard stats

Development email fallback logs verification/reset links when SMTP is not configured.
