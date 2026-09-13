# Third-Party Notices

This project's own source code is licensed under the [Personal Portfolio License
(PPL) v1.0](LICENSE). That license covers **only** code authored for this
repository. Nothing listed below is granted to you by it — each item stays under
its own terms, which you are responsible for checking before reuse.

License identifiers are read from each package's published metadata unless a
note says otherwise. Where terms could not be established from the repository,
that is stated plainly rather than guessed at.

---

## Vendored code

Checked into this repository rather than installed from a registry.

| Component | Location | Copyright | License |
| --- | --- | --- | --- |
| **Draco decoder** (`draco_decoder.js`, `draco_decoder.wasm`) | `public/draco/` | The Draco Authors | Apache License 2.0 — full text in [`public/draco/LICENSE`](public/draco/LICENSE), details in [`public/draco/README.md`](public/draco/README.md) |

## Runtime dependencies

| Package | License |
| --- | --- |
| `react`, `react-dom` | MIT |
| `three` | MIT |
| `three-stdlib` | MIT |
| `gsap` | GSAP Standard "No Charge" License — https://gsap.com/standard-license |
| `@gsap/react` | GSAP Standard "No Charge" License — https://gsap.com/standard-license |
| `@react-three/fiber` | MIT |
| `@react-three/drei` | MIT |
| `@react-three/postprocessing` | MIT |
| `@react-three/rapier` | MIT (per the upstream [pmndrs/react-three-rapier](https://github.com/pmndrs/react-three-rapier) repository; the published package ships no license field) |
| `@dimforge/rapier3d-compat` (via `@react-three/rapier`) | Apache License 2.0 |
| `@react-three/cannon` | MIT |
| `react-icons` | MIT — individual icon sets remain under their own licenses and trademarks; see https://react-icons.github.io/react-icons/ |
| `react-fast-marquee` | MIT |
| `@vercel/analytics` | MPL-2.0 |
| `@types/three` | MIT (DefinitelyTyped) |

### A note on GSAP

`ScrollTrigger`, `ScrollSmoother` and `SplitText` were formerly Club GreenSock
plugins. As of GSAP 3.13 they ship in the public `gsap` package under the GSAP
Standard "No Charge" License. That license permits use in this kind of project
but is **not** an open-source license — read
https://gsap.com/standard-license before reusing this animation code in a
commercial product.

## Build and development dependencies

`vite`, `@vitejs/plugin-react`, `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`,
`eslint-plugin-react-refresh`, `typescript-eslint`, `globals` — MIT.
`typescript` — Apache License 2.0.

The full resolved dependency tree, with exact versions, is in
[`package-lock.json`](package-lock.json).

## Fonts

| Font | Source | License |
| --- | --- | --- |
| **Geist** | Loaded at runtime from Google Fonts (`fonts.googleapis.com`), imported in `src/index.css` | SIL Open Font License 1.1 |

The font is not redistributed in this repository; it is fetched by the browser
from Google Fonts.

## Media assets

**Not covered by this project's [LICENSE](LICENSE), and not licensed for reuse
through it.**

| Asset | Location |
| --- | --- |
| 3D character model | `public/models/character.enc` |
| HDR environment map | `public/models/char_enviorment.hdr` |
| Technology logo textures | `public/images/*.webp` |
| Project card images | `public/images/work/*.webp` |
| Social card and favicon | `public/og.webp`, `public/favicon.svg` |

### 3D character model and environment map

**The included 3D character/model assets may be subject to separate licensing
terms. Replace these assets when creating a derivative portfolio unless you have
the necessary rights.**

This repository does not establish the provenance of these files. The model is
distributed as an encrypted, DRACO-compressed glTF binary and carries no
`copyright`, `author` or `license` metadata; its only embedded provenance marker
is the exporter that produced it (Blender glTF I/O). No statement is made here
about who authored it or who holds rights in it, and none should be inferred
from its presence in this repository.

Treat these assets as third-party material of undetermined licensing, obtain
your own rights, or supply your own model.

### Technology logos

The technology logos in `public/images/` are trademarks of their respective
owners and appear here only to identify the technologies used. Their presence is
nominative use, not a claim of ownership, endorsement or affiliation.

---

**If you fork this repository, replace or remove the media assets above before
deploying.** See the "Fork and customize" section of the [README](README.md).

---

Something listed incorrectly, missing, or attributed to the wrong party? Open an
issue or email tanmaytyagi68@gmail.com and it will be corrected.
