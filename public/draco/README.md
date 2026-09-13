# Draco 3D Data Compression — decoder

`draco_decoder.js` and `draco_decoder.wasm` in this directory are the prebuilt
Draco decoder, redistributed here so the site does not depend on a third-party
CDN at runtime. They are loaded by `DRACOLoader` in
`src/components/Character/utils/character.ts`, which decodes the compressed
geometry in `public/models/`.

These files are **not** part of this project's own source code and are **not**
covered by the repository's [LICENSE](../../LICENSE).

- **Project:** Draco — https://github.com/google/draco
- **Copyright:** Copyright The Draco Authors
- **License:** Apache License 2.0 — full text in [`LICENSE`](./LICENSE)

Distributed with the three.js examples as `examples/jsm/libs/draco/`.

Do not edit these files. To update them, replace both with a newer build from
the Draco or three.js distribution and keep this notice alongside them.
