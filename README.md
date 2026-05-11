# Ignite360 Platform

Ignite360 is a modern Next.js platform for a Ghana-based youth empowerment NGO. It combines a premium public website, a shorter multi-step application flow, and a simple content management dashboard for programmes, updates, team members, and gallery media.

## Stack choice

This implementation uses **Option A** with a streamlined version of the stack:

- **Frontend:** Next.js 14 App Router + React
- **Backend:** Next.js route handlers on Node.js
- **Persistence:** File-backed CMS storage for immediate local use, with optional MongoDB support through Mongoose for deployment
- **Styling:** Tailwind CSS + custom design tokens
- **Auth:** Basic admin login secured with a server-issued HttpOnly cookie

Why this stack:

- One codebase handles both the public experience and the admin CMS cleanly.
- Next.js gives strong routing, SEO, server rendering, and deployment support.
- The file-backed mode makes the project work immediately without external setup.
- MongoDB support is already wired in for a more scalable production deployment.

## What is included

- Dynamic home page with programme discovery, updates, team highlights, and social integration
- Programmes listing with search, category filters, quick-view modals, and detail pages
- Activities / Updates feed with categories, featured content, and detail pages
- Gallery page powered by update media with lightbox-style previews
- Team and leadership page with modal profile expansion and social links
- Multi-step application form with progress indicator and saved local draft
- Admin login and dashboard overview
- CRUD management for posts, programmes, and team members
- Real social links for WhatsApp, X, Instagram, Facebook, and TikTok
- Floating WhatsApp join button

## Project structure

```text
app/
  about/
  admin/
    api/
      auth/
      posts/
      programs/
      team/
    dashboard/
      posts/
      programs/
      team/
  api/
    applications/
    contact/
    posts/
    programs/
    team/
  apply/
  gallery/
  home/
  programs/
    [slug]/
  team/
  updates/
    [slug]/
  layout.js
  page.js
components/
  admin/
  site/
  ui/
data/
  content.json
lib/
  models/
  admin-auth.js
  auth.js
  content-store.js
  mongodb.js
  seed-content.js
styles/
  globals.css
```

## Run with Bun

1. Install dependencies:

```bash
bun install
```

2. Start the app:

```bash
bun run dev
```

3. Open:

```text
http://localhost:3000
```

## Environment variables

`.env.local`

```env
MONGODB_URI=
JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRY=7d

# Optional admin overrides
ADMIN_EMAIL=admin@ignite360.org
ADMIN_PASSWORD_HASH=

# Optional future media config
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Notes:

- If `MONGODB_URI` is empty, the CMS uses `data/content.json`.
- If `MONGODB_URI` is set, content is read and written through MongoDB models.
- If `ADMIN_PASSWORD_HASH` is empty, the default login remains enabled.

## Default admin login

- Email: `admin@ignite360.org`
- Password: `Admin123!`

Admin URL:

```text
/admin/login
```

## Deployment guidance

### Vercel

- Best fit for the current Next.js architecture
- Recommended production mode: set `MONGODB_URI` so content persists outside the filesystem
- Add `JWT_SECRET` and optional admin overrides in Vercel environment settings

### Render

- Good option if you want a Node-hosted deployment and MongoDB connection
- Use `bun run build` for build and `bun run start` for start

### Netlify

- Possible with Next.js support, but Vercel is the smoother choice here
- If you deploy on Netlify, use MongoDB instead of filesystem persistence

## Important implementation note

The current admin image workflow supports:

- Direct image URLs
- Local image upload converted to a data URL for immediate use

For long-term production scaling, the next upgrade should be switching those image uploads to Cloudinary or another object storage service.
