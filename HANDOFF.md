# HANDOFF.md

## 1. Purpose
Creo & Co is the marketing website for an El Paso / Borderplex-area branding, marketing, and events agency ("Creo & Co"). It's a bilingual (English/Spanish) React single-page site with pages for Home, About, Events, and Contact. The Events page is backed by a Sanity CMS with a custom, passcode-gated in-page editor so the site owner can add/edit/delete events without touching code or a Sanity Studio login. A companion Sanity Studio project (`creoandco/`) provides the full CMS admin UI.

## 2. Status
- **Active** (recently touched). Last commit: `Tue Jul 7 16:56:15 2026 -0600`, branch `main`, remote `https://github.com/idropdev/creo-co.git`.
- **Substantial uncommitted work is present** — do not revert or commit it. `git status` shows ~24 modified tracked files (App.jsx, layout/section components, i18n files, Tailwind/ESLint config, package.json) plus a large amount of new, untracked material: an entirely new `api/`, `lib/`, `creoandco/` (Sanity Studio subproject), `src/components/editor/` (the passcode-gated event editor: `AuthPanel`, `EditModeGate`, `EventForm`, `EventsPanel`, `FloatingToolbar`), `src/contexts/EditModeContext.jsx`, `src/hooks/useEvents.js`, `src/lib/`, `src/data/`, a new `Gallery.jsx` section, new hero photos, and `.env.example`. In short: the working copy is mid-way through building the self-service Events CMS feature end-to-end (frontend + Vercel API + Sanity schema + Studio) — none of it is on `main` yet.
- One deletion pending: `src/components/sections/MarqueeBanner.jsx` was removed but not committed.

## 3. Stack
Root app (`package.json`, name `creo-co`, private, `"type": "module"`):
- react `^19.2.4`, react-dom `^19.2.4`, react-router-dom `^7.14.0`
- framer-motion `^12.38.0`, lucide-react `^1.7.0`
- @sanity/client `^8.1.0` (read/write client used from `api/` and `src/lib/sanityEvents.js`)
- Build tooling: vite `^8.0.4`, @vitejs/plugin-react `^6.0.1`
- Styling: tailwindcss `^3.4.19`, postcss `^8.5.9`, autoprefixer `^10.4.27`
- Lint: eslint `^9.39.4`, eslint-plugin-react-hooks `^7.0.1`, eslint-plugin-react-refresh `^0.5.2`, @eslint/js `^9.39.4`
- sharp `^0.35.3` (devDependency — image optimization for carousel photos)
- No TypeScript in the root app (`.jsx` throughout); `@types/react` / `@types/react-dom` are present only for editor tooling.

Sanity Studio subproject (`creoandco/package.json`, name `creoandco`, v1.0.0, **untracked**):
- sanity `^6.10.0`, @sanity/vision `^6.10.0`, styled-components `^6.1.18`, react `^19.2.4`, react-dom `^19.2.4`
- devDependencies: typescript `^5.8`, @sanity/eslint-config-studio `^6`, eslint `^9.28`, prettier `^3.5`

Deployment: Vercel (`.vercel/project.json` present — projectName `creo-co`; serverless functions in `api/`). No `.nvmrc` or `engines` field in either `package.json` — required Node version is UNKNOWN (checked both manifests and repo root for `.nvmrc`/`.node-version`; none found). Local dev machine has Node v22.12.0 installed, but that is not a repo-declared requirement.

## 4. Setup & Commands
Root app:
```
npm install
npm run dev       # vite dev server, port 5173 (see .claude/launch.json)
npm run build     # vite build
npm run preview   # vite preview of the build
npm run lint      # eslint .
```
No test script defined in `package.json` — there is no automated test suite for the root app.

Sanity Studio (`creoandco/`):
```
npm --prefix creoandco install
npm --prefix creoandco run dev      # sanity dev, port 3333
npm --prefix creoandco run build    # sanity build
npm --prefix creoandco run deploy   # sanity deploy (publishes Studio)
npm --prefix creoandco run start    # sanity start
```
No test script defined here either.

For the passcode-gated editor's `/api/*` routes to work locally, plain `vite dev` is not enough (see `EditModeContext.jsx` comment) — use `vercel dev` instead. `.claude/launch.json` defines a `vercel-dev` config (`npx vercel dev --yes --listen 3000`).

## 5. Architecture Map
```
src/
  main.jsx                 entry — mounts <App/>
  App.jsx                  router, LanguageProvider, EditModeProvider, layout shell
  pages/                   Home, AboutPage, EventsPage, ContactPage
  components/
    layout/                Navbar, Footer
    sections/               Hero, Services, Industries, CaseStudies, Borderplex,
                            FullStatement, Events, Gallery, TrustBar, CTASection,
                            Testimonials
    ui/                     ScrollReveal, AnimatedCounter (shared motion helpers)
    editor/                 self-service Events CMS UI (all uncommitted):
                            AuthPanel, EditModeGate, EventForm, EventsPanel,
                            FloatingToolbar
  contexts/
    LanguageContext.jsx     useLang() — i18n context (en/es), the single most
                            connected node in the codebase (29 edges)
    EditModeContext.jsx     useEditMode() — tracks signed-in/edit state,
                            calls /api/session
  hooks/useEvents.js        useEvents() — fetches + live-refreshes event list
  lib/sanityEvents.js       getEvents() — Sanity read + static-fallback logic
  i18n/en.js, es.js         translation dictionaries consumed via useLang()
  data/sampleEvents.js      static fallback event data
  assets/                   logos, hero photos, carousel photos (+ optimized
                            webp versions), partner logos, team photos,
                            timelapse videos, fonts

api/                        Vercel serverless functions (all uncommitted)
  auth/login.js              checks EDIT_PASSCODE, issues a signed session cookie
  session.js                  reports current session validity to the client
  events.js                   authenticated CRUD proxy to Sanity (create/patch/delete)

lib/session.js               shared HMAC session-token sign/verify logic used by api/*

creoandco/                   separate Sanity Studio project (untracked)
  sanity.config.js, sanity.cli.js
  schemaTypes/eventType.js   the "event" document schema (title, date, endDate,
                             location, category, description, registerUrl, image)

design-system/creo-&-co/MASTER.md   brand/design reference doc (not code)

.claude/launch.json          preview-server configs: dev (vite:5173),
                              sanity-studio (creoandco:3333), vercel-dev (3000)
```

## 6. Entry Points — Read These First
1. `src/App.jsx` — routing, provider nesting, overall page shell.
2. `src/contexts/EditModeContext.jsx` — explains how the self-service editor auth flow works and why plain `vite dev` won't show it working.
3. `api/events.js` and `lib/session.js` — the whole server-side security model for the editor (session cookie, passcode check, Sanity write token) in ~70 lines total.
4. `src/hooks/useEvents.js` + `src/lib/sanityEvents.js` — how event data flows from Sanity (or static fallback) into the UI, and how edits trigger a refetch.
5. `creoandco/schemaTypes/eventType.js` — the source of truth for what an "event" document looks like in Sanity.
6. `src/contexts/LanguageContext.jsx` + `src/i18n/en.js`/`es.js` — the i18n mechanism used by nearly every component (`useLang()` is the most-connected symbol in the graph).
7. `.env.example` — lists every environment variable the app needs and which ones are public vs. server-only.

## 7. Conventions & Gotchas
- The site is bilingual by hand-maintained dictionary (`src/i18n/en.js` / `es.js`), not a library like i18next. Adding UI text means adding a key to both files and reading it via `useLang().t`.
- Strings containing "todo"/"Todo"/"TODO" in `src/i18n/es.js` (e.g. `"Todos los derechos reservados"`) are legitimate Spanish copy ("all"), not code placeholders — confirmed by reading context; do not treat them as defects.
- The event-editing feature only functions end-to-end when served through Vercel's function runtime (`vercel dev` or an actual deploy) — `vite dev` alone serves the frontend but not `/api/*`, so the editor will silently report "not signed in."
- `EDIT_PASSCODE` and `SESSION_SECRET` gate write access to Sanity from the public site; `SANITY_WRITE_TOKEN` must never be exposed client-side (it's deliberately read only inside `api/events.js`, not in any `VITE_`-prefixed variable).
- Two parallel Sanity access paths exist: a public read-only client (used by `src/lib/sanityEvents.js`, driven by the `VITE_SANITY_*` public vars) and a server-only write client (`api/events.js`, driven by the non-prefixed `SANITY_*` vars + write token). Keep that separation when touching either file.
- Raw/unoptimized carousel source photos are intentionally gitignored (`src/assets/carousel-photos/*.jpg`); only `optimized/*.webp` versions are meant to be committed.
- `creoandco/` is a fully separate npm project (its own `package.json`, `node_modules`, lint/prettier config) nested inside this repo, not a workspace — install and run it with `--prefix creoandco`, not from the root.
- `creoandco/` is currently entirely untracked by git — it doesn't exist on `main` yet.

## 8. External Dependencies & Environment
- **Sanity** (headless CMS) — dataset holding `event` documents. Env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (public, client-side reads), `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_WRITE_TOKEN` (server-only, used by `api/events.js`).
- **Vercel** — hosts the site and the `api/` serverless functions (project linked via `.vercel/project.json`, org `team_u2N7euFcusjSyjyA6t6kRDha`, project `creo-co`).
- Custom passcode-based auth (no third-party auth provider): `EDIT_PASSCODE` (shared secret for the `/edit` sign-in bar), `SESSION_SECRET` (HMAC key for signing session cookies, ≥32 random bytes per the generation hint in `.env.example`).
- No database beyond Sanity; no other external APIs found in `api/`, `src/lib/`, or `creoandco/`.

## 9. Known Issues & TODOs
- No automated tests exist for either the root app or the Studio project — regressions rely on manual verification.
- A large, uncommitted feature branch worth of work sits in the working tree (see Status). It should be reviewed and committed/PR'd as a coherent unit rather than piecemeal, since the frontend editor, `api/` routes, `lib/session.js`, and the `creoandco` schema are interdependent.
- `README.md` at the repo root is still the unedited Vite/React template README — it does not describe this project. Worth replacing with real project documentation at some point (not done as part of this handoff since it wasn't asked for beyond this file).
- None else identified from the code read.

## 10. Fast Orientation for a New Agent
1. Read this file, then skim `graphify-out/GRAPH_REPORT.md` for the current community/god-node map (kept fresh via `graphify update .`).
2. From the repo root: `export PATH="$HOME/.local/bin:$PATH"` then `graphify query "<question>"` for targeted lookups, or `graphify god-nodes --top 15` to see the most-connected symbols again.
3. **Most useful first question for this repo**: `graphify query "how does the passcode-gated event editor authenticate and write to Sanity end to end?"` — this crosses the exact frontend/API/Sanity boundary (`EditModeContext` → `api/session.js`/`api/auth/login.js` → `lib/session.js` → `api/events.js` → Sanity) that the uncommitted work is built around, and is the fastest way to understand the feature currently in progress.
4. Before making changes, run `git status` to see the current uncommitted set (do not discard it), and `git log -1` / `git branch --show-current` to confirm you're still looking at the same state described here.
5. To see the site running with the editor functional, use `vercel dev` (via `.claude/launch.json`'s `vercel-dev` config) rather than plain `vite dev`.
