# 📸 Fashion-Photos

**Fashion-Photos** is a full-stack cinematic photography portfolio website built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Express.js**, **MongoDB**, **JWT Authentication**, **Email Verification**, **MFA**, and **Cloudinary Uploads**.

This project is designed for professional photographers, fashion studios, and creative agencies who want to showcase photos, albums, services, testimonials, blogs, and booking requests through a modern portfolio website.

---

## 🚀 Live Demo

https://fashion-photos.vercel.app/

---

## ✨ Features

* 📸 Modern photography portfolio website
* 🖼️ Photo gallery with lightbox preview
* 📁 Album listing and album details pages
* 📝 Blog and blog details pages
* 🧾 Services section
* 💬 Testimonials section
* 📩 Booking/contact system
* 🔐 User registration and login
* ✅ Email verification system
* 🔁 Forgot password and reset password
* 🔒 JWT authentication with refresh token support
* 🛡️ Protected routes
* 🔐 MFA setup and MFA verification
* 👤 Account settings page
* 🧑‍💼 Admin dashboard
* 📤 Admin photo upload support with Cloudinary
* 🧰 Admin management for photos, albums, blogs, bookings, services, and testimonials
* ⚡ Fast frontend with Vite
* 🌐 Express.js REST API backend
* 🍃 MongoDB database with Mongoose
* 🎨 Premium dark cinematic UI

---

## 🛠️ Technologies Used

### Frontend

* React.js
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS
* Framer Motion
* Lucide React
* React Icons
* Yet Another React Lightbox
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* Bcrypt.js
* Cookie Parser
* CORS
* Helmet
* Express Rate Limit
* Nodemailer
* Multer
* Cloudinary
* OTP Auth / MFA
* Zod

---

## 📁 Project Structure

```bash
Fashion-Photos/
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── dashboard/
│       ├── pages/
│       ├── styles/
│       ├── App.tsx
│       └── main.tsx
├── server/
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── routes/
│       ├── seed/
│       ├── app.ts
│       └── server.ts
├── .env.example
├── package.json
├── render.yaml
├── railway.json
└── README.md
```

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Antor-Adhikary1216/Fashion-Photos.git
```

### 2. Go to the project folder

```bash
cd Fashion-Photos
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment file

Copy `.env.example` and rename it to `.env`.

```bash
cp .env.example .env
```

For Windows, you can manually create a `.env` file and copy the values from `.env.example`.

---

## 🔐 Environment Variables

Add these values inside your `.env` file.

```env
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173

MONGO_URI=mongodb://127.0.0.1:27017/fashion_photos

JWT_SECRET=replace-this-with-at-least-32-characters
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace-this-refresh-secret-with-32-characters
JWT_REFRESH_EXPIRES_IN=7d

AUTH_COOKIE_MAX_AGE_DAYS=7
BCRYPT_SALT_ROUNDS=12

EMAIL_FROM="Fashion-Photos <no-reply@example.com>"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
BOOKING_NOTIFICATION_EMAIL=bookings@example.com
SMTP_SECURE=false

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

MFA_ENCRYPTION_KEY=replace-this-with-a-long-random-encryption-key

VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Run the Project

### Start frontend only

```bash
npm run dev
```

### Start backend only

```bash
npm run dev:server
```

### Start frontend and backend together

```bash
npm run dev:full
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Starts the Vite frontend.

```bash
npm run dev:server
```

Starts the Express API server.

```bash
npm run dev:full
```

Runs frontend and backend together.

```bash
npm run build
```

Type-checks and builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run seed
```

Creates sample public content.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run start:server
```

Starts the backend server.

---

## 🧩 Main Frontend Routes

| Route                     | Description               |
| ------------------------- | ------------------------- |
| `/`                       | Home page                 |
| `/register`               | User registration         |
| `/login`                  | User login                |
| `/verify-email`           | Email verification        |
| `/resend-verification`    | Resend verification email |
| `/forgot-password`        | Forgot password           |
| `/reset-password`         | Reset password            |
| `/mfa-verify`             | MFA verification          |
| `/gallery`                | Protected photo gallery   |
| `/albums`                 | Protected albums page     |
| `/albums/:slug`           | Album details page        |
| `/services`               | Services page             |
| `/about`                  | About page                |
| `/contact`                | Contact / booking page    |
| `/blog`                   | Blog page                 |
| `/blog/:slug`             | Blog details page         |
| `/account`                | Account settings          |
| `/mfa-setup`              | MFA setup                 |
| `/dashboard`              | Admin dashboard           |
| `/dashboard/photos`       | Manage photos             |
| `/dashboard/photos/new`   | Add new photo             |
| `/dashboard/albums`       | Manage albums             |
| `/dashboard/albums/new`   | Add new album             |
| `/dashboard/bookings`     | Manage bookings           |
| `/dashboard/services`     | Manage services           |
| `/dashboard/testimonials` | Manage testimonials       |
| `/dashboard/blogs`        | Manage blogs              |

---

## 🔗 API Highlights

### Auth APIs

* Register
* Login
* Refresh token
* Logout
* Current user
* Verify email
* Resend verification
* Forgot password
* Reset password
* MFA setup
* MFA login verification
* MFA disable

### Portfolio APIs

* Photos
* Albums
* Services
* Testimonials
* Blogs

### Booking APIs

* Public booking submission
* Admin booking management

### Admin APIs

* Dashboard statistics
* Protected admin management routes

---

## 🧠 How the App Works

The frontend is built with React, TypeScript, and Vite. It uses React Router for page navigation and protected routes for authenticated users.

The backend is built with Express.js and MongoDB. It handles authentication, email verification, password reset, MFA, photo uploads, albums, services, testimonials, blogs, bookings, and admin dashboard data.

In production, the Express server can serve both the API and the built React frontend.

---

## ☁️ Deployment

This project includes deployment configuration for **Render** and **Railway**.

### Render

The repository includes `render.yaml`.

Render uses:

```bash
npm ci --include=dev && npm run build
```

Start command:

```bash
npm run start:server
```

Health check:

```bash
/api/health
```

### Railway

The repository includes `railway.json`.

Railway uses the same full-stack setup where the Express server serves both `/api/*` routes and the built React app.

---

## 📌 Future Improvements

* Add payment system for booking packages
* Add image category filtering
* Add advanced photo search
* Add admin analytics charts
* Add drag-and-drop image upload
* Add image compression before upload
* Add role-based user management
* Add booking status email notifications
* Add live deployment link
* Add project screenshots

---

## 👨‍💻 Author

**Antor Adhikary**

GitHub: [Antor-Adhikary1216](https://github.com/Antor-Adhikary1216)

---

## 📄 License

This project is open source and available for learning and practice purposes.
