VERCEL DEPLOY GUIDE

Overview

This guide explains how to deploy the Next.js website in this repository to Vercel for full production hosting, including env vars, build settings, custom domains, and common gotchas.

Prerequisites

- A Vercel account (free and paid tiers available).
- A Git hosting provider and the repository pushed (GitHub/GitLab/Bitbucket). Vercel connects directly to your repo.
- Any external services (database, cloudinary, SMTP) reachable from Vercel.

Quick checklist

- Confirm the repo builds locally: `npm install` then `npm run build`.
- Identify required environment variables (see "Environment variables").
- Decide which domain you'll use (Vercel-provided or a custom domain you control).

1) Prepare the project locally

1. Install and verify Node.js and npm versions used by the project.

```bash
node -v
npm -v
npm install
npm run build
```

2. Run the app in production locally to confirm:

```bash
npm run start
# or if the project uses a different start script: npm run start:prod
```

3. Confirm external services work (database, cloudinary, email).

2) Identify environment variables

Open the repo `lib/` files (`mongodb.js`, `cloudinary.js`, any `auth` or `admin` files) to find the env var names used. Common names to set on Vercel:

- `MONGODB_URI` (or `DATABASE_URL`) — remote MongoDB connection string (Atlas or your DB server).
- `CLOUDINARY_URL` or `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — if using Cloudinary.
- `NEXT_PUBLIC_SITE_URL` — canonical site URL used in frontend code.
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` — mail config if used.
- Any `NEXT_PUBLIC_*` values that must be exposed to the browser.

Note: Check `lib/*.js` to confirm exact names—Vercel requires exact keys.

3) Deploy via Vercel web UI (recommended)

1. Push your branch to your Git provider.
2. Sign in to Vercel and click "New Project" → Import Git Repository.
3. Select the repo and Vercel should detect "Next.js" automatically.
4. Review Build & Output settings (defaults usually work):
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: leave default (Next.js uses `.next`).
5. Add Environment Variables in the Vercel project settings (see list above).
6. Click Deploy — Vercel will create a preview deployment for every push and a production deployment for branches mapped to production (typically `main` or `master`).

4) Deploy via Vercel CLI (optional)

Install Vercel CLI and deploy from your machine:

```bash
npm i -g vercel
vercel login
# from repo root
vercel --prod
```

Use `vercel env` to manage environment variables from CLI:

```bash
vercel env add MONGODB_URI production
vercel env add NEXT_PUBLIC_SITE_URL production
# or use vercel secrets for sensitive values
vercel secrets add cloudinary_api_key "<value>"
```

5) Configure custom domain

1. In Vercel project → Domains → Add Domain.
2. Add your custom domain (e.g., `example.com`). Vercel will show DNS records to create.
3. Edit your domain provider's DNS and create the required records (A/ANAME/CNAME). If you control the domain, add the records and wait for propagation.
4. Vercel will provision certificates automatically (Let's Encrypt) once DNS is correct.

Notes about domain providers and DNS:
- If you want Vercel to manage DNS, you can transfer nameservers to Vercel.
- If you keep DNS at your registrar, add the records Vercel shows.

6) Environment: Preview vs Production

- Vercel creates Preview Deployments automatically on PRs/branch pushes.
- Use Environment Variables sections to set different values for `Production`, `Preview`, and `Development`.

7) Secrets and security

- Use `vercel secrets` or the Environment Variables panel for sensitive values.
- Avoid committing `.env` files to the repo.

8) External services and limitations

- Vercel is serverless for functions and best for SSR/SSG. Long-running processes and hosting a database on Vercel are not supported—use external DB (MongoDB Atlas or your own reachable DB host).
- Uploads should use external storage (Cloudinary, S3, etc.).

9) Common Next.js / Vercel adjustments

- Ensure `next.config.js` has correct `images.domains` or `remotePatterns` for remote images (Cloudinary, CDN).
- If you use rewrites or headers, Vercel supports Next.js rewrites out of the box.
- For large image optimization or custom loader, configure `next/image` appropriately.

10) Rollbacks, logs, and troubleshooting

- Use Vercel dashboard to view deployments, logs, and roll back to previous deployments.
- Use the Logs tab to inspect serverless function output and errors.

11) Automations and CI

- Vercel automatically deploys on push — no extra CI required.
- If you need CI checks before deploys, add GitHub Actions/GitLab CI and protect `main` branch.

12) Useful commands

```bash
# Local
npm run build
npm run start

# Vercel CLI
vercel login
vercel --prod
vercel env pull .env.local # pull env from Vercel
```

13) Checklist before going live

- All required env vars set in Production.
- External DB accessible from Vercel.
- Image/CDN settings correct.
- Custom domain DNS updated and SSL issued.
- Test forms, API routes, auth flows on production deployment.

If you want, I can generate a sample list of environment variable names taken directly from your repo files and add `vercel.json` or `vercel` configuration files. Ask me to scan the `lib/` folder and I'll extract exact env var names.
