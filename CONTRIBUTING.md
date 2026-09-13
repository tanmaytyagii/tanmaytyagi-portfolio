# Contributing

This is a personal portfolio, not a framework — so the useful contributions are
narrower than usual, but they are real. Thanks for taking a look.

## What's welcome

- **Bug reports**, especially rendering, scroll or layout issues on devices,
  browsers or screen sizes I cannot test.
- **Performance improvements** — bundle size, 3D loading, animation cost.
- **Accessibility fixes** — reduced-motion handling, keyboard navigation,
  focus states, semantics.
- **Correctness fixes** in the animation lifecycle, resize handling or TypeScript
  types.
- **Documentation** that makes the project easier to fork and understand.

## What isn't

- Changes to the personal content in `src/data/` — that is my CV, not code.
- Redesigns, or swapping out the visual direction.
- New dependencies, unless they replace something heavier.

Forking this to build your own portfolio doesn't require contributing anything
back. Read the [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) first — the bundled
media is not licensed for reuse through this project, and the 3D character/model
assets may be subject to separate licensing terms. Replace them unless you have
the necessary rights.

## Before you start

For anything beyond a small fix, **open an issue first.** A short description of
the problem and how you plan to address it saves you from building something
that doesn't fit.

## Workflow

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/tanmaytyagi-portfolio.git
cd tanmaytyagi-portfolio

# 2. Install exactly what the lockfile pins
npm ci

# 3. Branch
git checkout -b fix/horizontal-scroll-on-zoom

# 4. Work, with the dev server running
npm run dev
```

Then, before opening a pull request:

```bash
npm run build     # must pass — it runs `tsc -b` first, so type errors fail here
npm run preview   # check the production bundle, not just the dev server
npm run lint      # don't introduce new warnings
```

> `npm run lint` currently reports pre-existing issues in the older animation
> utilities (`GsapScroll.ts`, `initialFX.ts`). Those are known. Just don't add to
> them — and cleaning them up is itself a welcome PR.

Open the pull request against `main` and fill in the template.

## Checklist

- [ ] `npm run build` passes
- [ ] Verified in the browser, not only in the diff
- [ ] Checked at desktop **and** mobile widths — the layout branches hard at
      1024px, and again at 900px and 769px
- [ ] No new ESLint warnings
- [ ] No changes to `src/data/` personal content
- [ ] No new dependencies (or a clear reason for one)

## Working on this codebase

A few things that will save you time:

- **Content is data.** Everything personal lives in `src/data/profile.ts` and
  `src/data/research.ts`. Components render whatever is there. If you find
  yourself editing a string in a `.tsx` file, check whether it belongs in
  `src/data/` instead.
- **Styles are per-section.** One CSS file per component in
  `src/components/styles/`, with shared tokens in `src/index.css`.
- **GSAP cleanup is not optional.** `ScrollTrigger` instances, `SplitText`
  splits and Three.js resources all need explicit teardown. `Work.tsx` documents
  the pin-spacer failure mode in detail — read it before touching any pinned
  trigger.
- **The 1024px boundary is structural, not cosmetic.** Above it, the 3D character
  renders outside `#smooth-content` and the physics canvas mounts; below it,
  neither does. Test both sides of every change.
- **The research chart has two implementations.** `ResearchMatrix.tsx` (WebGL)
  and `ResearchMatrix2D.tsx` (fallback) read the same `metrics[]` array. Changes
  to what a metric means belong in the data, not in one renderer.

## Commit messages

Conventional-ish is enough — `fix:`, `feat:`, `docs:`, `perf:`, `chore:` — with
a subject line that says what changed and why.

## Reporting a bug

Use the issue template and include the browser, OS, device and viewport width.
For anything visual, a screenshot or screen recording is worth more than a
paragraph.

## Questions

Open an issue, or email tanmaytyagi68@gmail.com.
