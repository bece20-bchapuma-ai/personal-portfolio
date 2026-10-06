### Decision log

## Decision 1 : Theme Toggle Button for Desktop Mode
- Figma showed the theme toggle as a labelled pill ("☀ Light" / "🌙 Dark") but I initially coded it as icon-only to save header width. This created a visual gap in the navbar at desktop widths. I reverted to the labelled pill, giving it min-width: 68px to match the ↓ CV button, so the two right-hand actions align evenly. Trade-off: slightly less room for nav links at the 1024px breakpoint, which I've verified still fits.
