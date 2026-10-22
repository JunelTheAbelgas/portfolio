# Student Portfolio Website

Personal portfolio of **Junel T. Abelgas** — 4th year student, Cebu Eastern College.

Live site: https://portfolio-*.vercel.app (add final URL after deployment)

## What's inside

- **Home** — short intro: who I am and the kind of work I'm learning
- **About & Skills** — background, interests (web development, Cisco networking,
  cloud/AWS, AI), and an honest snapshot of current abilities
- **Projects** — real school/practice builds from my GitHub, each with a
  screenshot, a short explanation, and my contribution:
  - Flappy Bird — HTML5 Canvas game (JavaScript)
  - Google Sheets Data Saver — web app + Google Apps Script
- **Contact** — professional email link (mailto), GitHub profile link,
  and copy-email button

## Design

Neumorphism (soft-UI): monochromatic muted palette, dual light/dark box shadows
with a consistent top-left light source, rounded components, pressed (inset)
states for interactivity, and an accent color reserved for primary actions so
buttons stay accessible. Includes a persistent dark mode toggle.

## Tech

- Plain HTML, CSS, and JavaScript (no frameworks, no build step)
- Google Fonts: Poppins + Inter
- Screenshots captured with headless Chromium

## Project structure

```
portfolio/
├── index.html          # single-page site (sections: #home #about #skills #projects #contact)
├── style.css           # all styling, themes, responsive rules
├── script.js           # typewriter, theme toggle, mobile menu, scroll reveals, copy email
└── images/
    ├── favicon.svg
    └── shots/          # real screenshots of the two projects
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8123
```

Then visit http://localhost:8123. Resize the window (or open devtools device
toolbar) to check phone, tablet, and desktop layouts.

## Compatibility

Responsive from ~320px phones up to wide desktops, mobile hamburger menu,
scroll-margin so anchor links land correctly under the fixed navbar, and a
`prefers-reduced-motion` fallback that disables animation.

## AI tools used

This website was created with assistance from AI tools (opencode CLI with
GLM). AI helped with layout generation, neumorphism research (CSS-Tricks and
accessibility articles), automation scripts, and deployment tooling. All
content, projects, and personal information shown are my own, and I reviewed
and understand every file.

## Deployment notes

- Source: GitHub repository `JunelTheAbelgas/portfolio`
- Hosting: Vercel (Hobby plan), plain static site — no build command needed
- Updating: edit files locally, commit to `main`, push — Vercel redeploys
  automatically
