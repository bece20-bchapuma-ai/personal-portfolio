# Ben Chapuma — Personal Portfolio

A personal portfolio site for Ben Chapuma, a Computer Engineer.
Built as the final assignment for **Internet and Web Services**
(MUBAS — Electronics and Computer Engineering, Year 5).

## Live site

🔗 **TODO — paste your GitHub Pages URL here once deployed**
(e.g. `https://bece20-bchapuma-ai.github.io/personal-portfolio/`)

## Figma design

🎨 **TODO — paste your Figma share link here**

The Figma file contains:
- Page 01 — Design System & Tokens (light + dark palettes, type scale, spacing)
- Page 02 — Desktop & Mobile screens for every page in both themes
- A clickable prototype flow (nav → project → contact form)

## How to run locally

No build step — this is plain HTML, CSS and JavaScript.

```bash
git clone https://github.com/bece20-bchapuma-ai/personal-portfolio.git
cd personal-portfolio

├── index.html         # Home
├── about.html         # About
├── projects.html      # Projects (manual write-ups + live GitHub API)
├── articles.html      # Articles index
├── article.html       # Full blockchain article (500+ words)
├── contact.html       # Contact form with custom validation
├── 404.html           # Custom error page
├── css/
│   ├── tokens.css     # Design tokens (colour, spacing, type, radii)
│   ├── base.css       # Reset, typography, focus styles
│   └── components.css # All reusable UI (header, nav, cards, forms…)
├── js/
│   ├── theme.js       # Light/dark toggle with localStorage
│   ├── nav.js         # Mobile slide-down menu
│   ├── form.js        # Contact form validation
│   └── github.js      # Live GitHub API fetch
├── assets/
│   ├── docs/cv.pdf    # Downloadable CV
│   └── images/        # Hero, about, project thumbnails
├── DESIGN_NOTES.md
├── DECISION_LOG.md
├── AI_NOTES.md
└── netlify.toml