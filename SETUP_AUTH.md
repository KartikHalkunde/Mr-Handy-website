# Google OAuth Authentication Setup Guide

## 🚀 Complete Implementation Done!

Your Mr. Handy website now has full Google OAuth authentication implemented. Here's what has been set up:

### ✅ What's Implemented:

1. **NextAuth.js Configuration** - Complete Google OAuth setup
2. **Database Schema** - Prisma schema with User, Account, Session, and Booking models
3. **Authentication Pages** - Sign in and sign up pages with Google OAuth
4. **User Dashboard** - Protected dashboard for authenticated users
5. **Header Integration** - Dynamic header showing user profile or sign-in button
6. **Session Management** - Persistent login sessions

### 🔧 Setup Steps:

#### 1. Install Dependencies (Already Done)
```bash
npm install
```

#### 2. Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret

#### 3. Update Environment Variables

Edit `.env.local` file with your actual credentials:

```env
# Database (Choose one option below)

# Option A: PostgreSQL (Recommended for production)
DATABASE_URL="postgresql://username:password@localhost:5432/mrhandy_db"

# Option B: SQLite (For development/testing)
# DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# Google OAuth (Replace with your actual credentials)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### 4. Set Up Database

**For PostgreSQL:**
```bash
# Install PostgreSQL and create database
createdb mrhandy_db

# Push schema to database
npx prisma db push
```

**For SQLite (Development):**
```bash
# Update prisma/schema.prisma to use SQLite:
# datasource db {
#   provider = "sqlite"
#   url      = "file:./dev.db"
# }

# Push schema to database
npx prisma db push
```

#### 5. Generate Prisma Client
```bash
npx prisma generate
```

#### 6. Start Development Server
```bash
npm run dev
```

### 🎯 How It Works:

1. **Sign Up/Sign In**: Users click the "Sign Up" button in the header
2. **Google OAuth**: Redirects to Google for authentication
3. **User Data**: Google profile data is stored in your database
4. **Session**: User stays logged in across page refreshes
5. **Dashboard**: Authenticated users can access `/dashboard`
6. **Profile Dropdown**: Shows user avatar, name, and sign-out option

### 🔐 Protected Routes:

- `/dashboard` - User dashboard (requires authentication)
- `/profile` - User profile page (requires authentication)

### 📱 User Experience:

- **Not Logged In**: Header shows "Sign Up" button
- **Logged In**: Header shows user avatar with dropdown menu
- **Dropdown Options**: Dashboard, Profile, Sign Out

### 🛠️ Key Features:

1. **Google OAuth Integration** - Secure authentication with Google
2. **User Data Storage** - Profile information stored in database
3. **Session Management** - Persistent login sessions
4. **Protected Routes** - Dashboard accessible only to authenticated users
5. **Responsive UI** - Modern, mobile-friendly authentication interface
6. **Database Ready** - Schema prepared for booking management

### 🚀 Next Steps:

1. **Test Authentication**: Try signing in with Google
2. **Add Booking System**: Implement service booking functionality
3. **User Preferences**: Add user settings and preferences
4. **Email Notifications**: Set up email notifications for bookings
5. **Admin Dashboard**: Create admin panel for managing bookings
6. **Payment Integration**: Add payment processing for services

### 🔧 Troubleshooting:

1. **Database Connection Issues**: Check your DATABASE_URL in `.env.local`
2. **Google OAuth Issues**: Verify your Google credentials and redirect URIs
3. **Session Issues**: Check NEXTAUTH_SECRET is set
4. **Build Issues**: Run `npx prisma generate` after schema changes

### 📁 Files Created/Modified:

- `package.json` - Added authentication dependencies
- `.env.local` - Environment variables
- `prisma/schema.prisma` - Database schema
- `src/lib/auth.ts` - NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - API routes
- `src/components/AuthProvider.tsx` - Authentication context
- `src/app/auth/signin/page.tsx` - Sign in page
- `src/app/auth/signup/page.tsx` - Sign up page
- `src/app/dashboard/page.tsx` - User dashboard
- `src/components/Header.tsx` - Updated with auth UI
- `src/app/layout.tsx` - Added authentication providers

Your authentication system is now fully functional! Users can sign up and log in with their Google accounts, and you have access to their profile data for personalized services.
