# 🎬 Go Boot It - Ticket Booking System

A full-stack ticket booking application for movies and events with a comprehensive admin panel for management and control.

## ✨ Features

### User Features
- User registration & authentication with OTP verification
- Browse movies and events with filtering
- Seat selection and booking
- Real-time seat availability
- Online payment (Razorpay)
- Booking history and ticket management
- Like/favorite movies
- User dashboard & profile

### Admin Features
- Complete movie management (CRUD operations)
- Cinema management with multi-screen support
- Show scheduling and management
- Event creation and management
- Booking & payment oversight
- User and RBAC management
- Revenue analytics
- Featured banner management

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TanStack React Query** - State management & data fetching
- **Zustand** - Global state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js + Express.js** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT + Cookies** - Authentication
- **Razorpay** - Payment integration
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Node Cron** - Scheduled jobs

## 📁 Project Structure

```
Ticket-Booking-System/
├── backend/                 # Node.js + Express server
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middlewares/        # Auth, role, multer
│   ├── config/             # DB, Cloudinary, Razorpay config
│   ├── jobs/               # Scheduled tasks (ticket expiry)
│   └── index.js            # Server entry point
├── frontend/               # React TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand store
│   │   ├── api/            # API integration
│   │   └── routes/         # App routing
│   └── vite.config.ts      # Vite configuration
└── admin-client/           # Admin dashboard (Vite + React)
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | User registration | - |
| POST | `/verify-otp` | Verify OTP | - |
| POST | `/resend-otp` | Resend OTP | - |
| POST | `/login` | User login | - |
| POST | `/admin-login` | Admin login | - |
| POST | `/create-admin` | Create admin user | ✓ Admin |
| POST | `/logout` | User logout | - |
| GET | `/user` | Get current user | ✓ |

### Movies (`/api/movies`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all movies | - |
| GET | `/trending` | Get most liked movies | - |
| GET | `/:id` | Get movie details | - |
| GET | `/status/:status` | Filter by status | - |
| POST | `/` | Create movie | ✓ Admin |
| PUT | `/:id` | Update movie | ✓ Admin |
| DELETE | `/:id` | Delete movie | ✓ Admin |

### Cinemas (`/api/cinemas`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all cinemas | - |
| GET | `/:id` | Get cinema details | - |
| POST | `/` | Create cinema | ✓ Admin |
| POST | `/:cinemaId/screens` | Add screen | ✓ Admin |
| DELETE | `/:id` | Delete cinema | ✓ Admin |

### Shows (`/api/shows`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all active shows | - |
| GET | `/:id` | Get show details | - |
| GET | `/admin/all` | Get all shows (admin) | ✓ Admin |
| GET | `/movie/:movieId` | Get shows by movie & date | - |
| POST | `/` | Create show | ✓ Admin |
| PUT | `/:id` | Update show | ✓ Admin |
| PUT | `/cancel/:id` | Cancel show | ✓ Admin |

### Tickets (`/api/tickets`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all tickets (admin) | ✓ Admin |
| GET | `/:ticketId` | Get ticket details | ✓ |
| GET | `/my-tickets` | Get user's tickets | ✓ |
| POST | `/book-seats` | Book seats | ✓ |
| POST | `/confirm-ticket/:ticketId` | Confirm booking | ✓ |
| POST | `/cancel-ticket` | Cancel ticket | ✓ |
| POST | `/admin/cancel-ticket` | Cancel ticket (admin) | ✓ Admin |

### Events (`/api/events`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all events | - |
| GET | `/:id` | Get event details | - |
| GET | `/trending` | Get trending events | - |
| GET | `/my-bookings` | Get user's event bookings | ✓ |
| GET | `/bookings/:id` | Get booking details | ✓ |
| POST | `/` | Create event | ✓ Admin |
| POST | `/book` | Book event seats | ✓ |
| POST | `/confirm/:bookingId` | Confirm event booking | ✓ |
| PUT | `/:id` | Update event | ✓ Admin |
| PUT | `/cancel/:id` | Cancel event | ✓ Admin |

### Payments (`/api/payment`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/create-order` | Create Razorpay order | ✓ |
| POST | `/verify-payment` | Verify payment | ✓ |
| POST | `/refund-payment` | Process refund | ✓ |
| GET | `/revenue-stats` | Get revenue statistics | ✓ Admin |
| GET | `/all-payments` | Get all payments | ✓ Admin |
| GET | `/payment-details/:id` | Get payment details | ✓ Admin |

### Movie Likes (`/api/movieLikes`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/like/:movieId` | Toggle like/favorite | ✓ |
| GET | `/like-status/:movieId` | Get like status | ✓ |

### Featured Banners (`/api/featured-banners`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get featured banners | - |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Razorpay account
- Cloudinary account
- Email service (Gmail or similar)

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file from example:
```bash
cp .env.example .env
```

Configure `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:3001
```

Start server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file from example:
```bash
cp .env.example .env
```

Configure `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_public_key
```

Start development server:
```bash
npm run dev
```

### Admin Client Setup
```bash
cd admin-client
npm install
```

Create `.env` file from example:
```bash
cp .env.example .env
```

Configure `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_public_key
```

Start development server:
```bash
npm run dev
```

## 📝 Key Features Implementation

- **RBAC**: Role-based access control (User, Admin)
- **OTP Verification**: Email-based registration verification
- **Seat Management**: Dynamic seat layouts and real-time availability
- **Auto Expiry**: Tickets expire automatically based on show timing
- **Payment Processing**: Razorpay integration with order verification
- **Image Uploads**: Cloudinary for movie/event posters and banners
- **Email Notifications**: Nodemailer for booking confirmations

## 🔐 Authentication

- JWT tokens stored in HTTP-only cookies
- Token-based session management
- Role-based middleware for protected routes

## 📈 Database Models

- **User/Admin** - User authentication and profiles
- **Movie** - Movie catalog
- **Cinema** - Cinema locations and screens  
- **Show** - Movie schedules
- **Ticket** - Booking records
- **Event** - Event listings
- **EventBooking** - Event reservations
- **Payment** - Transaction history
- **MovieLike** - User preferences
- **FeaturedBanner** - Marketing banners

---

## 👨‍💻 Developed by

- **Purv Patel**
- **Param Bhavsar**
- **Prince Patel**

**Version**: 1.0.0  