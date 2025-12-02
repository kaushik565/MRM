# MRM React Presentation (Next.js + Vercel)

This project converts the original monolithic HTML slide deck into a modular React (Next.js) application with API routes for dynamic data. Suitable for deployment on **Vercel**.

## Features
- Slides as React components: Title, Team, Executive Summary, Production, Rejections.
- Centralized metrics in `public/data/metrics.json` served via `/api/metrics`.
- Chart.js line chart for monthly production.
- Keyboard navigation: `←` / `→` arrows; on-screen Prev/Next buttons.
- Responsive layout with CSS grid.

## Structure
```
MRM-react/
  package.json
  next.config.mjs
  public/
    data/metrics.json
    footer-logo.png (copy manually from original root)
  src/
    styles/globals.css
    components/* (slide components)
    pages/_app.jsx
    pages/index.jsx
    pages/api/metrics.js
```

## Getting Started
Install dependencies and run dev server.
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
1. Push repo to GitHub.
2. In Vercel dashboard: New Project → Import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` (default). Output: `.next`.
5. Add any ENV vars if making data dynamic (none required now).

## Customization
- Update metrics: edit `public/data/metrics.json` (hot-loaded).
- Add slides: create new component in `src/components` and append to `slides` array in `Slides.jsx`.
- Theme: modify CSS variables in `globals.css` or add a toggle applying a class that overrides token values.

## Notes
- Image `footer-logo.png` not auto-copied; place manually into `public/`.
- For large data sets, replace JSON file with a database/API; then adjust `/api/metrics`.
- Animations trimmed for performance; reintroduce as needed.

## Next Ideas
- Add persistence layer (e.g., Postgres + Prisma) for metrics updates.
- Implement print/export to PDF using `next-pdf` or headless Chromium.
- Add theming toggle (original vs new palette).

MIT (internal use).  
