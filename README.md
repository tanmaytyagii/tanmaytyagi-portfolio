# Tanmay Tyagi — Portfolio

Personal portfolio for **Tanmay Tyagi** — software and AI engineer.

Built with React, TypeScript, Vite, GSAP (ScrollSmoother / ScrollTrigger / SplitText)
and a Three.js character scene.

---

## Credit

The visual design, interaction design and 3D character experience in this repository
originate from **Moncy Yohannan**'s open-source portfolio:

**<https://github.com/MoncyDev/Portfolio-Website>** · <https://www.moncy.dev>

That project is published under the **Personal Portfolio License (PPL) v1.0** — see
[`LICENSE`](LICENSE). Read it before publishing this site anywhere: it restricts
cloning the full design or experience, restricts commercial use, requires attribution,
and excludes the original 3D assets from the licence entirely.

Everything in [`src/data/profile.ts`](src/data/profile.ts) — identity, experience,
research, projects, skills, credentials — is Tanmay Tyagi's own content.

---

## Content

Page copy lives in two files — [`src/data/profile.ts`](src/data/profile.ts) for
identity and portfolio content, and [`src/data/research.ts`](src/data/research.ts)
for the paper. Components read from them, so nothing is duplicated in markup.

| Export | Drives |
| --- | --- |
| `identity` | Navbar, hero, loading screen, social rail, contact |
| `about` | About section |
| `disciplines` | The three "What I Do" panels |
| `career` | Education and experience timeline |
| `research` | IEEE paper spotlight |
| `projects` | The six project case studies, in order |
| `techStack` | Sphere textures in the 3D tech-stack canvas |
| `certifications`, `problemSolving` | Credentials section |

`research.ts` holds the paper. Every figure in it is transcribed from the source
paper and the table it came from is named in a comment: `metrics` → Table II,
`findings` → Table III, `confusionMatrix` → Table IV, `losses` → Section III-E.
`paper.contribution` is the personal figure (15 papers reviewed); the paper's own
wider survey base (20 papers, across the team) is carried separately in
`paper.surveyScope` so the two are never conflated.

The comparative matrix renders in 3D via the React Three Fiber stack the project
already ships ([`ResearchMatrix.tsx`](src/components/ResearchMatrix.tsx)); below
769px, and whenever `prefers-reduced-motion` is set, it swaps for the 2D bar
version ([`ResearchMatrix2D.tsx`](src/components/ResearchMatrix2D.tsx)) and the
WebGL chunk is never downloaded.

Two fields are deliberately left empty:

- `identity.resumeUrl` — drop a PDF at `public/resume.pdf` and set this to
  `"/resume.pdf"` to bring back the resume link in the bottom-right corner.
- `problemSolving.stats` — add `{ value, label }` entries and the stat grid renders
  itself. No problem-solving figures are published here that have not been verified.

---

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # serve the production build
npm run lint
```

**Note on dependencies.** `gsap-trial` and `@gsap/react` resolve to GreenSock's own
registry in `package-lock.json`. If that registry is unreachable, install with
`npm install --registry=https://registry.npmjs.org`. The public copy of `gsap-trial`
ships no type declaration for the `gsap-trial/SplitText` subpath, so `tsc` needs a
one-line shim at `node_modules/gsap-trial/SplitText.d.ts`:

```ts
export { SplitText, SplitText as default } from "gsap/SplitText";
```

GSAP trial plugins are **not licensed for production hosting**. For deployment, swap
them for official Club GSAP builds: <https://gsap.com/docs/v3/Installation/>

---

## Structure

```
src/
├── data/profile.ts        all page content
├── components/
│   ├── Landing.tsx        hero + 3D character mount
│   ├── About.tsx          split-text intro
│   ├── WhatIDo.tsx        three expanding discipline panels
│   ├── Career.tsx         animated timeline
│   ├── Research.tsx       IEEE paper: narrative, methodology, data, CTA
│   ├── ResearchMatrix.tsx 3D comparative matrix (R3F, desktop)
│   ├── ResearchMatrix2D.tsx  2D fallback for small screens
│   ├── Work.tsx           pinned horizontal project scroll
│   ├── TechStack.tsx      Rapier physics sphere canvas
│   ├── Credentials.tsx    certifications + problem solving
│   ├── Contact.tsx        footer
│   ├── Character/         Three.js scene, lighting, animation
│   ├── utils/             GSAP timelines, SplitText setup
│   └── styles/            one stylesheet per component
public/
├── images/work/           project screenshots
├── images/*.webp          tech-stack sphere textures
└── models/                character model + HDR environment
```

Project images in `public/images/work/` are screenshots of the applications they
label. `evalix.webp` is a diagram rather than a screenshot — that project has no
published UI to capture.
