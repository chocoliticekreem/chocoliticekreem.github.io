# Anson Woo — Portfolio

Personal site at [chocoliticekreem.github.io](https://chocoliticekreem.github.io).

Built with Next.js 16, TypeScript, Tailwind v4, Framer Motion.

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Editing content

All profile/experience/project copy lives in [`src/lib/content.ts`](src/lib/content.ts). Change a field, redeploy. No component edits needed.

The hero sprite is [`public/sprite.png`](public/sprite.png) — swap the file to change the avatar.

## Deploy

Pushing to `main` auto-deploys to GitHub Pages via the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Static export is configured in [`next.config.ts`](next.config.ts).

After first push, enable **Settings → Pages → Source: GitHub Actions** in the repo settings.

## Clone and make it your own

1. Fork or clone this repo.
2. Rename it to `<your-username>.github.io`.
3. Edit `src/lib/content.ts`, replace `public/sprite.png`.
4. Enable Pages under **Settings → Pages → Source: GitHub Actions**.
5. Push — the workflow handles the rest.
