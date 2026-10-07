# Design Notes

## Who the site is for

The site has one clear audience: **recruiters, internship coordinators, and
freelance clients looking at a graduating Computer Engineer**. They are short
on time and want to see three things fast:

1. Who Ben is and what he does
2. Evidence — real projects, not just a list of buzzwords
3. A CV they can download and a way to get in touch

Everything on the site is designed to answer those three questions in under a
minute. The Projects page gets the most attention because it's where credibility
is earned. The Contact page is deliberately short so nothing gets in the way of
getting in touch.

## Sitemap
Home
├── About
├── Projects
│ └── (Live GitHub repositories section)
├── Articles
│ └── Article detail (blockchain piece, 500+ words)
├── Contact
└── 404 (error page — reachable via any bad URL)


Six pages total. The header navigation contains the five top-level pages; the
404 page is only reached by typing an incorrect URL or following a broken link.

## Design system

### Colour palette

Every colour is defined once in `css/tokens.css` as a CSS custom property and
referenced everywhere else. The dark-mode values sit under
`[data-theme="dark"]`, so switching themes is a single attribute change on
`<html>`.

| Token             | Light     | Dark      | Purpose                               |
| ----------------- | --------- | --------- | ------------------------------------- |
| `--bg-primary`    | `#FFFFFF` | `#0F172A` | Page background                       |
| `--bg-surface`    | `#F8FAFC` | `#1E293B` | Cards, form background, footer        |
| `--text-primary`  | `#0F172A` | `#F8FAFC` | Headings and body text                |
| `--text-muted`    | `#475569` | `#94A3B8` | Secondary text, captions              |
| `--accent`        | `#2563EB` | `#3B82F6` | Buttons, links, focus rings           |
| `--stroke`        | `#E2E8F0` | `#334155` | Card borders, input borders, dividers |
| `--error`         | `#DC2626` | `#EF4444` | Form validation errors, 404 tag       |
| `--error-bg`      | `#FEF2F2` | `#451A1A` | Background for the error tag          |

### Contrast ratios (WCAG AA, checked with WebAIM Contrast Checker)

Body text must reach **4.5:1**; large text (18pt+ or 14pt+ bold) needs **3:1**.

| Foreground             | On background         | Ratio  | Passes |
| ---------------------- | --------------------- | ------ | ------ |
| `#0F172A` text-primary | `#FFFFFF` bg          | 15.8:1 | AAA    |
| `#475569` text-muted   | `#FFFFFF` bg          | 7.4:1  | AAA    |
| `#2563EB` accent       | `#FFFFFF` bg          | 5.1:1  | AA     |
| `#DC2626` error        | `#FEF2F2` error-bg    | 4.9:1  | AA     |
| `#F8FAFC` text-primary | `#0F172A` bg (dark)   | 15.8:1 | AAA    |
| `#94A3B8` text-muted   | `#0F172A` bg (dark)   | 6.4:1  | AA     |
| `#3B82F6` accent       | `#0F172A` bg (dark)   | 4.7:1  | AA     |
| `#EF4444` error        | `#451A1A` error-bg    | 5.0:1  | AA     |

### Type scale

Font: **Inter** (Google Fonts), fallback `system-ui, -apple-system, "Segoe UI",
Roboto`.

| Role      | Size     | Weight  | Line height |
| --------- | -------- | ------- | ----------- |
| H1        | 2.25rem  | 700     | 1.15        |
| H2        | 1.75rem  | 700     | 1.15        |
| H3 / card | 1.375rem | 700     | 1.15        |
| Body      | 1rem     | 400     | 1.6         |
| Small     | 0.875rem | 400/600 | 1.6         |

### Spacing scale

A 4-pixel base. All gaps and padding use one of these values, defined as
`--space-1` through `--space-20`.
4 8 12 16 20 24 32 40 48 64 80 (px)

### Layout

- Mobile-first. Base styles target small screens.
- Three breakpoints:
  - `640px` — small tablets, wider button row
  - `768px` — two-column card grids (projects, repos), tighter container padding
  - `1024px` — full desktop: nav links visible, hero two-column, About
    two-column, header height grows from 64 to 80px
- Everything uses CSS Grid or Flexbox. No floats, no absolute-positioned hacks.

### Components

**Buttons** — three variants, all with default/hover/focus states:

- `.btn--primary` — accent background, white text
- `.btn--secondary` — surface background, border, primary text
- `.btn--cv` — compact accent pill used in the header

States:

- Default — as above
- Hover — primary lightens (`filter: brightness(0.92)`), secondary border and
  text become accent
- Focus-visible — 3px accent outline with 2px offset

**Form fields** (`Name`, `Email`, `Message` on the Contact page):

- Default — `--bg-primary` fill, `--stroke` border
- Focus — accent border + soft accent box-shadow ring
- Error — `--error` border on the input, `--error` text below
- Success — a bordered accent message appears after valid submission

**Theme toggle** — labelled pill (`☀ Light` / `🌙 Dark`), same width as the
`↓ CV` pill so the header actions are visually balanced.

## Accessibility decisions

- Every page has exactly one `<h1>` and no skipped heading levels.
- All meaningful images have descriptive `alt`; decorative content is marked
  `aria-hidden`.
- Every focusable element has a visible `:focus-visible` ring.
- The contact form uses `novalidate` so errors come from our own messages, not
  the browser's default red outline.
- Error text is announced via `aria-live="polite"` and linked to the input with
  `aria-describedby`.
- The mobile menu button uses `aria-expanded` and `aria-controls` and is
  Escape-dismissible.
- `prefers-reduced-motion` disables all transitions and animations.
- Lighthouse accessibility target: **90+**.