# react-vite-starter

A drop-in React 19 + Vite + TypeScript scaffold with Vitest unit tests
and Playwright end-to-end tests already wired up.

## What this repo does

- Vite 6 with React 19, TypeScript strict mode and `@/` alias to `src/`.
- Vitest + jsdom + React Testing Library configured for unit tests of
  components and hooks.
- Playwright e2e suite that auto-starts `vite preview` against the built
  bundle so you don't drift from the real shipping artefact.
- ESLint flat config + Prettier preconfigured.
- CI workflow runs typecheck, lint, unit + coverage, then e2e in a
  separate job.

## Project layout

- `src/`
  - `main.tsx` - app entrypoint.
  - `App.tsx` - root component.
  - `components/Counter.tsx` - sample component the tests assert on.
  - `hooks/useDebounced.ts` - sample hook.
  - `api/client.ts` - tiny typed fetch wrapper.
  - `__tests__/` - Vitest unit tests.
- `e2e/` - Playwright tests.
- `playwright.config.ts` - boots `vite preview` on :4173 and runs against it.
- `vite.config.ts` - Vite + Vitest config (single file).
- `vitest.setup.ts` - jest-dom matchers + auto-cleanup.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173 — hot reload
```

Tests:

```bash
npm test             # Vitest, unit + component
npm run test:watch
npm run test:coverage

npm run e2e:install  # download Playwright browsers (first time only)
npm run build && npm run e2e
```

## Common commands

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR. |
| `npm run build` | Type-check then build into `dist/`. |
| `npm run preview` | Serve the built bundle (used by e2e). |
| `npm test` | Run Vitest unit/component tests. |
| `npm run test:coverage` | Tests with v8 coverage report. |
| `npm run e2e` | Playwright e2e against the preview server. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run lint` | ESLint flat config. |
| `npm run format` | Prettier format. |

## Why preview, not dev, for e2e

`vite preview` serves the production bundle, so e2e exercises the same
artefact you ship. Running e2e against `vite dev` would hide bundling
bugs (dead-code elimination, env replacement, asset paths). The cost is
~2s of build time per CI run — worth it.

## Adding a new component

1. Create `src/components/MyThing.tsx`.
2. Test it in `src/__tests__/MyThing.test.tsx` with React Testing
   Library — query by **role / label / text**, not by class names or
   internal data attributes.
3. If it's a top-level page, add an e2e test in `e2e/` that exercises it
   through the real app.

## What's intentionally not here

- No router (add React Router or TanStack Router when you need it).
- No state management (start with `useState`/`useContext`; reach for Zustand
  or TanStack Query when components start prop-drilling).
- No CSS framework (the global styles are minimal; bring your own).
- No backend (point `getJson` at your real API).
