# Anson Woo — Portfolio

Portfolio site for Anson Woo.

Built with Next.js 16, TypeScript, Tailwind v4, Framer Motion.

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Editing content

All profile/experience/project copy lives in [`src/lib/content.ts`](src/lib/content.ts). Change a field, redeploy. No component edits needed.

The hero sprite is [`public/sprite.png`](public/sprite.png) — swap the file to change the avatar.

## Deploy

This project is now configured for Vercel-first deployment.

Link the repo to a Vercel project and deploy from `main`, or use the Vercel CLI for preview deployments.

The legacy GitHub Pages workflow still exists in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), but it is no longer the primary deployment target.

## Clone and make it your own

1. Fork or clone this repo.
2. Edit `src/lib/content.ts`, replace `public/sprite.png`.
3. Link the repo to your Vercel project.
4. Push to your production branch or create preview deploys from the Vercel dashboard/CLI.
