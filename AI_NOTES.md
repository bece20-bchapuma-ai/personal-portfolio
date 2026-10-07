# AI Notes

This file documents, honestly, how AI tools were used while building this
portfolio. Using AI to learn, scaffold and debug is expected and allowed by
the brief. Using it to produce content or code I cannot explain is not.

## Tools used

- **Gemini (Google)** — used during the Figma design phase for design-system
  guidance and step-by-step layout instructions for each screen.
- **DeepSeek** — used during the development phase to scaffold the HTML, CSS
  and JavaScript files and to help debug tooling issues (Git branches, VS
  Code configuration, browser caching, case-sensitive file paths).

No other AI tool was used. In particular, no AI was used to produce the About
page bio, the three project write-ups, or the blockchain article.

## How I used what the tools gave me

Gemini helped me set up the Figma file. I asked it to help me structure a
design system that would map cleanly onto CSS custom properties later — colour
tokens grouped by role, a type scale, a spacing scale, and the light/dark
value pairs. I kept its recommendation for the colour palette (the slate and
blue tokens you see in `css/tokens.css`) but changed the type scale myself
because its suggested sizes were too large for a mobile-first layout. It also
walked me through building each screen frame, section by section, with exact
X/Y coordinates. I followed that structure but adjusted the spacing in places
where the values felt tight.

DeepSeek was used during development. I asked it to scaffold the HTML files,
the CSS custom-properties setup, and the JavaScript files (theme toggle,
mobile nav, contact form validation, GitHub API fetch). For each file I read
through the code line by line before committing it, removed the temporary
`console.log` statements it left in for debugging, and renamed variables
where its names were unclear. The contact form's Netlify submission logic had
a bug in the first version — it tried to POST to the wrong endpoint — which I
found by watching the Network tab and fixed with reference to Netlify's own
documentation. I did not write any code without understanding what it does,
because the brief explicitly says I'll have to explain any of it during the
live defence.

There was one moment where AI was actively unhelpful: when a hero image
failed to render only on the live GitHub Pages site but worked locally,
neither tool identified the cause. I diagnosed it myself by reading the
Network tab in DevTools, noticing the 404 on `hero.jpg`, and comparing
`git ls-files` output to the casing in my HTML. The extensions were uppercase
(`.JPG`) on three of the images, which is invisible on Windows but distinct
on Linux. That diagnosis and fix are documented in the decision log.

## What I did not use AI for

- The bio on the About page.
- The three project write-ups on `/projects.html`.
- The blockchain article on `/article.html`.
- Any code I cannot explain line by line in the live defence.

## What I learned

AI was strongest at two things: producing boilerplate quickly, and pointing
out tooling problems (a Git branch naming issue, a browser cache gotcha) that
would have taken me much longer to reason through alone. It was weakest at
content — every attempt to get it to write the About page bio or the article
came back generic and interchangeable, and I ended up rewriting those myself.
It also missed the case-sensitivity bug entirely, which is the kind of thing
only a human reading the actual error sees.

The takeaway for me is that AI is a good pair-programmer and a bad writer,
and that the code it produces still needs to be read, understood, and
verified before it goes anywhere near a real project.