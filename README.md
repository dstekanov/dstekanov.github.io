# dstekanov.github.io

Personal site — projects, thoughts, experiments.

🌐 **[dstekanov.github.io](https://dstekanov.github.io)**

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-121013?style=flat&logo=github&logoColor=white)

---

## What's here

- **Hero** — glitch name, matrix rain, typewriter role, social links
- **Projects** — 6 real repos with GitHub + live demo links
- **Thoughts** — interactive pieces and essays
  - [`ai-steals-mind.html`](https://dstekanov.github.io/ai-steals-mind.html) — immersive story about AI and cognition
- Bilingual **UA / EN** toggle throughout

## Stack

- React + CRACO
- Tailwind CSS
- `LanguageContext` for UA/EN translations
- Static data in `src/data/projects.js` and `src/data/posts.js`
- Standalone HTML pages in `public/` for interactive essays

## Local dev

```bash
npm install
npm start
```

## Deploy

```bash
npm run deploy
```

Builds and pushes to the `gh-pages` branch → live at [dstekanov.github.io](https://dstekanov.github.io)

## Adding content

**New project** → add entry to `src/data/projects.js`

**New thought/post** → add entry to `src/data/posts.js` with `platform: 'ghpages' | 'medium' | 'substack'`

**New interactive page** → drop HTML file into `public/`, link it from `posts.js`