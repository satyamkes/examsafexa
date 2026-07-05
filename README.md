# ExamSafexa

"Never Travel Alone for an Exam." ExamSafexa is an independent, safety-first exam-center discovery and community-matching platform for Indian students.

Phase 1 delivered the landing page. Phase 2 adds credentials auth, MongoDB-backed registration, exam selection, exam-center selection, a Mapbox center picker, seeded exam data, and a minimal authenticated dashboard placeholder.

## Getting Started

```bash
npm install
cp .env.local.example .env.local
```

Fill these required values in `.env.local`:

```bash
MONGODB_URI=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
NEXT_PUBLIC_MAPBOX_TOKEN=
```

`NEXT_PUBLIC_MAPBOX_TOKEN` is optional for local development. Without it, the center picker shows a branded fallback pin layout instead of the live Mapbox map.

Seed exams and centers:

```bash
npm run seed
```

Run the app:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Phase 2 Flow

1. Register at `/register`.
2. The app creates a MongoDB `User`, hashes the password with bcrypt, signs in through NextAuth credentials, and redirects to `/onboarding/select-exam`.
3. Choose an exam from seeded `Exam` documents.
4. Choose a matching `ExamCenter` from the searchable list or interactive map.
5. Finish setup and land on `/dashboard`.

Protected routes are guarded by `middleware.ts` for `/onboarding/*` and `/dashboard/*`.

## Project Structure

```text
app/
  api/                    NextAuth, registration, exams, centers, user update APIs
  dashboard/              Phase 4 placeholder dashboard
  login/                  Credentials login
  onboarding/             Exam and center selection flow
  register/               Registration form
components/
  landing/                Phase 1 landing sections
  map/CenterPicker.tsx    Mapbox center selector with no-token fallback
  onboarding/             Shared onboarding shell and step indicator
  ui/                     shadcn-style primitives
lib/
  auth.ts                 NextAuth options
  db.ts                   Cached Mongoose connection
models/                   Mongoose schemas
scripts/seed.ts           Seed common Indian exams and centers
types/                    Shared app and NextAuth types
```

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run seed
```

## Phase Boundaries

Phase 2 intentionally stops at persisted registration, login, exam selection, center selection, and a placeholder dashboard. Community matching, live location sharing, parent notifications, richer dashboard views, and admin tools are reserved for later phases.
