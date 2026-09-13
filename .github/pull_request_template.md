## What this changes

<!-- One or two sentences. What is different after this PR? -->

## Why

<!-- The problem being solved. Link the issue if there is one: Fixes #123 -->

## Type of change

- [ ] Bug fix
- [ ] Performance improvement
- [ ] Accessibility fix
- [ ] Documentation
- [ ] Refactor (no behaviour change)
- [ ] Other:

## How it was verified

<!-- What you actually ran and looked at. Screenshots or a recording for
     anything visual — before/after is ideal. -->

- [ ] `npm run build` passes
- [ ] Checked in the browser via `npm run preview`, not only the dev server
- [ ] Tested at desktop width (> 1024px)
- [ ] Tested at mobile width (< 1024px)

**Browsers / devices tested:**

## Animation and 3D impact

<!-- Delete this section if the PR touches neither. -->

- [ ] GSAP timelines and `ScrollTrigger` instances are cleaned up on unmount
- [ ] `SplitText` splits are reverted before re-splitting
- [ ] Three.js geometries, materials and loaders are disposed
- [ ] Behaviour verified after a window resize and after a browser zoom change

## Checklist

- [ ] No new ESLint warnings introduced
- [ ] No changes to personal content in `src/data/`
- [ ] No new dependencies (or the reason for one is explained above)
- [ ] Documentation updated if the change affects setup, structure or
      customization

## Notes for the reviewer

<!-- Anything worth knowing: trade-offs, things you were unsure about,
     follow-up work you deliberately left out. -->
