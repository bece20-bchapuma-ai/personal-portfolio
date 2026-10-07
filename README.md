# Ben Chapuma — Personal Portfolio

A personal portfolio site for Ben Chapuma, a Computer Engineer.
Built as the final assignment for **Internet and Web Services**
(MUBAS — Electronics and Computer Engineering, Year 5).

## Live site

🔗 **[bece20-bchapuma-ai.github.io/personal-portfolio](https://bece20-bchapuma-ai.github.io/personal-portfolio/)**

## Figma design

🎨 **[Figma design file](https://www.figma.com/design/IUuWZsVVL4nXDM9m0IQHB5/Personal-Portfolio?node-id=2-2&t=gOdfueuhnGFINifs-1)**

The Figma file contains:

- Page 01 — Design System & Tokens (light + dark palettes, type scale, spacing)
- Page 02 — Desktop & Mobile screens for every page in both themes
- A clickable prototype flow (nav → project → contact form)

## How to run locally

No build step — this is plain HTML, CSS and JavaScript.

```bash
git clone https://github.com/bece20-bchapuma-ai/personal-portfolio.git
cd personal-portfolio
Then either:

Open index.html directly in your browser, or

Use a local server (recommended, so relative asset paths behave the same as in production). In VS Code install the Live Server extension, right-click index.html → Open with Live Server.

The site works fully offline except for:

Google Fonts (Inter), loaded from fonts.googleapis.com

The live GitHub repositories section on /projects.html, which fetches from api.github.com

Project structure
text
.
├── index.html          # Home
├── about.html          # About
├── projects.html       # Projects (manual write-ups + live GitHub API)
├── articles.html       # Articles index
├── article.html        # Full blockchain article (500+ words)
├── contact.html        # Contact form with custom validation
├── 404.html            # Custom error page
├── css/
│   ├── tokens.css      # Design tokens (colour, spacing, type, radii)
│   ├── base.css        # Reset, typography, focus styles
│   └── components.css  # All reusable UI (header, nav, cards, forms…)
├── js/
│   ├── theme.js        # Light/dark toggle with localStorage
│   ├── nav.js          # Mobile slide-down menu
│   ├── form.js         # Contact form validation
│   └── github.js       # Live GitHub API fetch
├── assets/
│   ├── docs/cv.pdf     # Downloadable CV
│   ├── favicon.svg     # Site icon
│   └── images/         # Hero, about, project thumbnails
├── DESIGN_NOTES.md
├── DECISION_LOG.md
├── AI_NOTES.md
└── netlify.toml
Validation
All seven pages pass the W3C HTML validator with no errors. Click any link to re-run the check:

Home
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2F

About
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2Fabout.html

Projects
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2Fprojects.html

Articles
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2Farticles.html

Article
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2Farticle.html

Contact
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2Fcontact.html

404
https://validator.w3.org/nu/?doc=https%3A%2F%2Fbece20-bchapuma-ai.github.io%2Fpersonal-portfolio%2F404.html

Screenshots
https://assets/images/screenshot-home-light.png
https://assets/images/screenshot-home-dark.png
https://assets/images/screenshot-home-mobile.png
https://assets/images/lighthouse.png

Credits
Fonts: Inter by Rasmus Andersson — SIL Open Font License.

Icons: Unicode characters (☀ ☰ ↓ ← →) — no external icon library.

Images: All photos are my own.

Inspiration: The general card-and-hero layout was inspired by public portfolio templates on the Figma Community, but the design, content, code, and copy are original.

AI assistance: See AI_NOTES.md.

License
© 2026 Ben Chapuma. All rights reserved. Code is available for reference; content and images may not be reused without permission.
