### Decision log

## Decision 1 : Theme Toggle Button for Desktop Mode
- Figma showed the theme toggle as a labelled pill ("☀ Light" / "🌙 Dark") but I initially coded it as icon-only to save header width. This created a visual gap in the navbar at desktop widths. I reverted to the labelled pill, giving it min-width: 68px to match the ↓ CV button, so the two right-hand actions align evenly. Trade-off: slightly less room for nav links at the 1024px breakpoint, which I've verified still fits.

## Decision 2: Branches — combined HTML and JS on one branch instead of two
I created feature/layout-html, feature/styles-css and feature/js-theme-api up front as three parallel streams. In practice the JS interacts so tightly with the HTML markup (element IDs, classes, aria attributes) that splitting them into separate branches would have meant merging twice before anything was testable. I folded the JS into feature/layout-html and left feature/js-theme-api unused, then deleted it.
What I gave up: one clean PR trail per concept. What I gained: faster verification, no half-broken intermediate state.

