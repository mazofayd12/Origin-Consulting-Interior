# Origin Consulting Interior - Production Corporate Application & Admin Portal

An enterprise-grade, ultra-luxurious corporate website and administrative management suite engineered for **Origin Consulting Interior**, specializing in Architecture, Interior Design, MEP Engineering, Structural Engineering, and Turnkey Project Management across the GCC.

---

## 🌟 Tech Stack Architecture

### Frontend (`client/`)
- **Framework**: Next.js 15 (App Router with React 19, SSR, SSG, ISR)
- **Styling**: Tailwind CSS with custom Luxury tokens (Charcoal `#1A1A1A`, Gold `#B79A5B`, Off-White `#FFFFFF`)
- **Animations**: Framer Motion
- **Internationalization (i18n)**: English (`en`) & Arabic (`ar`) with dynamic document direction (`dir="rtl"` / `dir="ltr"`) and webfonts (`Poppins` & `Cairo`)
- **State & Query**: React Query (`@tanstack/react-query`) & Axios
- **Form Validation**: React Hook Form + Zod Validation
- **Charts**: Chart.js & `react-chartjs-2`
- **SEO & Structured Data**: Dynamic OpenGraph, Twitter Cards, Canonical URLs, and JSON-LD `ArchitectureFirm` Schema

### Backend (`server/`)
- **Runtime**: Node.js & Express API Server
- **Database & ORM**: PostgreSQL / SQLite with Prisma ORM
- **Authentication**: JWT access tokens & refresh tokens with Role-Based Access Control (`ADMIN` & `EDITOR`)
- **Security**: Helmet security headers, CORS, XSS protection, `express-rate-limit`
- **Media Engine**: Multer file uploads with Sharp image optimization & storage provider abstraction (Local / S3 / Cloudinary)
- **Logging & Auditing**: Winston structured logger & automated `AuditLog` database recording for all administrative mutations

### Infrastructure & DevOps (`docker/`)
- **Docker Compose**: Multi-container orchestration (Next.js Client, Express API, PostgreSQL 16, Redis Cache)
- **CI/CD**: GitHub Actions workflow (`.github/workflows/ci-cd.yml`)
- **Automated Testing**: Vitest, React Testing Library, and Playwright E2E
- **Database Backup**: Shell scripts for automated `pg_dump` backup & restore (`docker/scripts/`)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Docker & Docker Compose (optional for containerized deployment)

### 1. Clone & Install Monorepo Dependencies
```bash
cd Origin-Consulting-Interior
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Database Setup & Seeding
Initialize the database and populate seed data (Admin user, core services, luxury portfolio projects, blog posts, testimonials):
```bash
cd server
npx prisma migrate dev --name init
npx prisma db seed
```

### 3. Run Development Servers
Start both the API Server (`http://localhost:5000`) and the Next.js Client (`http://localhost:3000`):
```bash
# From the root directory:
npm run dev
```

---

## 🔑 Administrative Credentials

- **Portal URL**: `http://localhost:3000/en/admin/login`
- **Super Admin Email**: `admin@origin-consulting.com`
- **Password**: `Admin@Origin2026!`

---

## 🐋 Production Docker Deployment

Deploy the entire stack with Docker Compose:
```bash
docker-compose up --build -d
```

### Database Backup & Restore
- **Backup**: `./docker/scripts/backup.sh`
- **Restore**: `./docker/scripts/restore.sh ./docker/backups/origin_db_backup_TIMESTAMP.sql.gz`

---

## 🧪 Testing

- **Run Unit & Component Tests**: `npm run test`
- **Run End-to-End Playwright Tests**: `npm run test:e2e`

---

© 2026 Origin Consulting Interior. All Rights Reserved.
