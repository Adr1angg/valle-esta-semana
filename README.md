# Valle Esta Semana

A weekly what's-on page for Valle de Bravo. Rebuilds itself every Thursday at midday.

## Files

| File | What it is |
|---|---|
| `core.html` | **The source of truth.** Page fragment — title, styles, markup, script. Edit this. |
| `index.html` | Generated. The standalone site with `<head>`, meta and Open Graph tags. **Never edit directly.** |
| `build.js` | Wraps `core.html` into `index.html`. Run `node build.js` after any edit. |
| `verify.js` | Renders the built page headlessly at phone + desktop, light + dark. Checks for horizontal overflow, JS errors, and drives the filters. Run `node verify.js` before deploying. |
| `sources.md` | Every Valle + CDMX source, verified, with the dead ends noted. |

## Editing

1. Edit `core.html`
2. `node build.js`
3. `node verify.js` — must report `hOverflow:0` and no errors
4. Deploy (below)

## Deploying to Cloudflare Pages

Cloudflare's API is **not reachable** from the Claude environment (both the cloud container and the
Cowork VM are behind an egress allowlist that blocks `api.cloudflare.com`). So deploys go one of two ways:

**Manual (works today, 2 minutes)**
1. dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets
2. Drag this folder in (or just `index.html`)
3. Project name `valle-esta-semana` → gets you `valle-esta-semana.pages.dev`
4. For later updates: same screen → Create new deployment → drag the new `index.html`

**Automatic (one-time setup, then hands-off)**
1. Create a GitHub repo and push this folder to it
2. Cloudflare Pages → Create → Connect to Git → pick the repo
3. Build command: none. Build output directory: `/`
4. Every push then deploys automatically — including pushes from the weekly scheduled task

GitHub *is* reachable from the Claude environment, which is why this is the route that lets the
weekly update publish itself without you touching anything.

## Design notes

- **Type:** Fraunces (display, variable — `opsz` / `wght` / `SOFT` / `WONK` axes are used deliberately;
  `SOFT` rounds the terminals, `WONK` switches in the eccentric alternates at large sizes only),
  Karla (body), IBM Plex Mono (all data — times, prices, labels).
- **Colour:** OKLCH throughout so category hues sit at identical perceived lightness
  (`oklch(62% .16 H)` — only the hue varies). Neutrals come from the light/dark theme;
  the accent and the sky come from the time of day.
- **Time of day:** `data-time` on `<html>` is set from the viewer's clock — dawn (05–09),
  day (09–17), dusk (17–20), night (20–05) — and re-checked every 10 minutes. No manual control.
- **Sky:** three OKLCH radial gradients over a base, `screen` blended, driven by hue custom
  properties rather than four separate palettes. One fixed SVG-turbulence grain layer over the
  whole page kills the gradient banding — never put grain on individual scrolling elements.
- **Layout:** hairline rows on a sticky day rail, not a card grid. Three tiers — one `.lead`
  per week, standard `.row`s, and a dense `.brief` tail for standing fixtures. Cards were the
  original mistake: they exist to frame images, and with no images twelve of them read as
  "everything here matters equally," which is the opposite of a curated guide.
- **Motion budget is three things:** a CSS-only staggered entrance, one gentle scroll-driven
  reveal on the "Siempre" block, and `startViewTransition` on filter changes. All of it is
  disabled under `prefers-reduced-motion`.

## Adding an event by hand

Copy an existing `<article class="ev">` and edit. Required attributes:

- `id` — stable and unique, e.g. `ev-hongosto`. This is what makes an event individually shareable.
- `data-day` — `thu` / `fri` / `sat` / `sun`, or `always` for standing fixtures (those show under every day filter)
- `data-cat` — `nightlife` / `music` / `market` / `outdoors` / `wellness` / `culture` / `away`
- `style="--k:var(--c-<category>)"` — sets the category dot colour

Field order inside the row is fixed and should stay that way: **time → recurrence → price → category**
in the meta column, then **title → one specific sentence → venue → links**. Titles are verb-first
("Báilate…", "Maneja a CDMX por…") — that's what keeps it reading as a guide rather than a database.

Add matching `Event` JSON-LD at the bottom of the file for anything dated.
