# Decision Log

At least eight entries. Each one records what I decided, what else I considered,
why I chose what I did, and what I gave up by choosing it.

## 1. Colour system — CSS custom properties, single source of truth

**Decided:** Every colour, spacing value, and font size is defined once as a CSS
custom property in `css/tokens.css`. The dark theme is a second block of the same
names under `[data-theme="dark"]`.

**Alternatives considered:**

- Duplicating every component's styles under a `.dark` class
- Using a preprocessor like Sass to generate two stylesheets

**Why this:** CSS variables let the whole site switch theme by changing one
attribute on `<html>`. There's no build step, no double declaration, and the
tokens file is a direct mirror of the Figma variable collection.

**What I gave up:** the dark palette is written twice (once in Figma, once in
CSS), so any future colour change has to be made in both places.

## 2. Multi-page site, not a single-page scroll

**Decided:** Six separate HTML files, one per logical area of the site.

**Alternatives considered:**

- One long single-page site with anchor navigation
- A hybrid: single page for marketing content, separate pages for detail

**Why this:** The brief said "single scrolling page or multiple pages — your
call, as long as everything is genuinely there and easy to find." Multiple pages
make the writing (projects, article) easier to scan and give each piece of
content its own URL. It also matches how a recruiter would skim — they can
bookmark `/projects.html` and skip the rest.

**What I gave up:** a small amount of perceived smoothness (page reloads between
sections).

## 3. Mobile nav — slide-down panel, content width, not full width

**Decided:** The hamburger opens a compact dropdown panel positioned under the
header, sized to its contents.

**Alternatives considered:**

- Full-width full-screen overlay with large tap targets
- Drawer sliding in from the right

**Why this:** The five nav links are short. A full-screen overlay would be a lot
of empty space, and the right-side drawer feels heavier than the content
warrants. A content-width panel keeps the header and page visible underneath
and matches the visual weight of the desktop nav.

**What I gave up:** smaller tap targets than a full-screen menu would offer. I
compensated by giving each link `padding: 12px 16px`, which comfortably exceeds
the 44px minimum recommended target size.

## 4. Theme toggle — icon + label, sized to match the CV pill

**Decided:** The toggle is a pill labelled `☀ Light` / `🌙 Dark`, given a
`min-width: 68px` so it lines up with the `↓ CV` pill next to it.

**Alternatives considered:**

- Icon-only toggle (just the sun/moon, ~36px wide)
- A sliding switch component drawn in Figma

**Why this:** My first version was icon-only, which created a visible gap in the
header because the toggle was much narrower than the CV button. Widening it to
match, and adding the text label, makes the two right-hand actions read as a
group. The label also makes the toggle unambiguous on first view.

**What I gave up:** about 34px of header width, which pushed the nav links
slightly left. I verified at the 1024px breakpoint that everything still fits.

## 5. Live API — GitHub repos on the Projects page

**Decided:** A section below the three manual project cards on `/projects.html`
that fetches the four most recently updated repositories from the GitHub API
using `fetch()` and `async/await`, and renders them as cards.

**Alternatives considered:**

- Fetching pinned repositories (requires GraphQL + an auth token, which I don't
  want to embed in a public site)
- Hard-coding a static list of repos in the HTML

**Why this:** The brief asks for a live API call, and the recent-repos endpoint
requires no authentication. It also means the Projects page stays current
without me editing the HTML every time I push a new repo.

**What I gave up:** I can only pull recent activity, not pinned order. And the
API is rate-limited to 60 requests/hour per IP for unauthenticated calls — fine
for a portfolio, but not if this scaled.

## 6. Contact form — client-side validation with optional Netlify Forms

**Decided:** `js/form.js` validates the form and shows my own error messages.
The form also has `data-netlify="true"` and a `form-name` hidden input, so when
deployed on Netlify the same submit posts to Netlify Forms.

**Alternatives considered:**

- Using only the browser's built-in HTML5 validation (rejected — the brief
  explicitly forbids relying on the browser's default red outline)
- Wiring up Formspree or EmailJS with an API key (rejected — harder to keep the
  key out of the repo, and EmailJS bundles a third-party script)

**Why this:** Client-side validation is required by the brief. Adding Netlify
Forms costs nothing (two attributes and no JS changes) and means the form
actually delivers mail when deployed.

**What I gave up:** on GitHub Pages, the form doesn't actually send anything —
it just validates and shows the success message. That's acceptable because the
brief asks for validation, not delivery. Documented here so it's not a surprise.

## 7. Branching — three branches but combined HTML and JS

**Decided:** I created three branches up front (`feature/styles-css`,
`feature/layout-html`, `feature/js-theme-api`) but in practice developed the
JavaScript alongside the HTML on `feature/layout-html`, then used
`feature/js-theme-api` for the documentation and deployment configuration.

**Alternatives considered:**

- Strictly one concept per branch, merging JS on its own
- A single `main`-only workflow

**Why this:** The JS interacts so tightly with the HTML (IDs, classes, aria
attributes) that splitting them would have meant two merge rounds before
anything was testable. Combined, each commit is verifiable in the browser
immediately.

**What I gave up:** the neat three-PR narrative where each PR adds exactly one
layer. The third PR is now "docs + deploy" rather than "JS", which is honest
about how the work actually happened.

## 8. Deployment — GitHub Pages primary, Netlify mirror

**Decided:** GitHub Pages is the primary live URL. The same repo also deploys
cleanly on Netlify via `netlify.toml`, which enables the contact form to
actually send.

**Alternatives considered:**

- Vercel (similar features; less familiar)
- Cloudflare Pages (very fast, but needs a Cloudflare account)

**Why this:** GitHub Pages requires nothing beyond the repo I already had.
Netlify is a free mirror that adds form handling with no code changes. Both are
on the assignment's list of allowed hosts.

**What I gave up:** two URLs to keep in sync in the README, and having to trust
two platforms' uptime rather than one.

## 9. Web asset filenames — lowercase extensions enforced

**Decided:** Every image file in `assets/images/` uses a lowercase extension
(`.jpg`, `.png`), and every reference to it in the HTML matches that case
exactly.

**Alternatives considered:**

- Leaving the extensions as the camera, editor, or drag-and-drop process
  happened to name them (`.JPG`, `.PNG` mixed case)
- Trusting that "it works on my machine" was enough

**Why this:** Git on Windows is case-insensitive, so `hero.JPG` and `hero.jpg`
resolve to the same file on my laptop — everything looked correct locally. But
GitHub Pages runs on Linux, where those are two different files. When I pushed
the site, three of my image files (`hero.JPG`, `about.JPG`,
`project-embedded.JPG`) had uppercase extensions while the HTML referenced
them in lowercase. The live site returned a 404 for each, and the browser
rendered the broken-image icon with the alt text visible. The other two images
(`project-acme.png`, `project-rydberg.png`) happened to have lowercase
extensions and loaded fine, which confirmed the diagnosis.

I fixed it by renaming the three files to lowercase with `git mv` using a
temporary intermediate name (`hero.JPG` → `hero.jpg.tmp` → `hero.jpg`).
The intermediate step is necessary because Git on Windows will silently ignore
a case-only rename — Windows considers the file unchanged, so Git never
records the difference. Only by renaming through an unrelated name does Git
see the delete-and-add and stage it correctly.

**What I gave up:** nothing functional — the site works identically. But I lost
time on a bug that only appears in production, not locally, which is the worst
kind. Going forward I would apply lowercase filenames to every web asset from
the moment it's exported, and prefer `git mv` over the file explorer for any
rename, so the change is always recorded in the commit history.

**Lesson:** "Works on my machine" is not a deployment guarantee. Any asset that
ships to the web should be named for the case-sensitive filesystem that will
eventually serve it, not the one on the developer's laptop.