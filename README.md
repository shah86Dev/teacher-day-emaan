# Teacher's Day Greeting — Next.js

A modern, animated Teacher's Day greeting web app for Imaan Fatima, Class 1-B, Allied School Surjani Campus.

## Teacher name

The greeting is addressed to Ma’am Rida. To change it, edit `app/letter/page.tsx`:

```ts
const TEACHER_NAME = "Ma’am Rida";
```

The name also appears in the home-page intro (`app/page.tsx`), the thank-you card
(`app/thank-you/page.tsx`) and the page title (`app/layout.tsx`).

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

- Next.js App Router
- TypeScript
- Motion for React (`motion/react`)
- CSS responsive UI

No external image assets are required for the starter version.
