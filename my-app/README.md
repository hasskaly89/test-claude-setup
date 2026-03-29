# Reformd Pilates — Website

Modern, mobile-friendly website for **Reformd Pilates** — a boutique reformer pilates studio with locations in Cecil Hills and Kings Park, NSW.

**Live site:** https://my-app-neon-nine.vercel.app

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, about, classes, pricing, creche, FAQ, locations, app download |
| `/schedule` | Class schedule powered by the MindBody Branded Web widget |
| `/book-now` | Direct booking page |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + inline styles
- **Booking / Schedule:** MindBody Branded Web widget
- **Deployment:** Vercel
- **Fonts:** Geist Sans (Next.js default)

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Dark | `#0c0c0c` | Backgrounds, navbar |
| Cream | `#f5efe6` | Light section backgrounds |
| Beige | `#e1ccbe` | Primary accent, CTAs |
| Brown | `#4f3e33` | Text on light, secondary CTA |

## MindBody Widgets

Schedule widgets are embedded on `/schedule` using the MindBody Branded Web embed script:

- **Cecil Hills** — widget ID `047812b344`
- **Kings Park** — widget ID `0415144b344`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying

```bash
npx vercel deploy --prod
```

Ensure you have the Vercel CLI installed and are logged in (`npx vercel login`).
