# OptiXtream Public Model Catalog — Design Specification

## Objective

Create a new, independent repository named `optixtream-modelos` that publishes every OptiXtream website model under one Cloudflare Pages project. The root URL presents a polished public catalog, and every model is reachable through a stable subpath such as `/modelo-01/` or `/modelo-11/`.

The repository must remain separate from the existing `optimind-landing` repository. It is a production artifact, not a copy of the design workshop.

## Audience and primary job

The audience is a potential client comparing OptiXtream website directions before choosing one. The catalog has one job: make each model easy to preview and compare, then lead the client to WhatsApp.

## Brand

- Public name: **OptiXtream**
- Repository name: `optixtream-modelos`
- Cloudflare Pages project name: `optixtream-modelos`
- Contact URL: `https://wa.me/5492616027055`
- Language: Spanish, using concise Argentine phrasing

## Repository architecture

```text
optixtream-modelos/
├── index.html
├── styles.css
├── script.js
├── 404.html
├── favicon.svg
├── _headers
├── _redirects
├── README.md
├── assets/
│   ├── catalog/
│   │   ├── modelo-01.webp
│   │   └── modelo-11.webp
│   └── brand/
├── modelo-01/
│   ├── index.html
│   ├── theme.css
│   ├── styles.css
│   ├── script.js
│   └── assets/
├── modelo-02/
├── modelo-03/
├── modelo-04/
├── modelo-05/
├── modelo-06/
├── modelo-07/
├── modelo-08/
├── modelo-09/
├── modelo-10/
├── modelo-11/
├── docs/
│   └── superpowers/
└── tests/
    └── validate-site.mjs
```

The existing folder `modelo-03-09-04-25` becomes `modelo-10`. No public route will contain dates or duplicate model numbers.

## Model isolation rules

Every model is a self-contained static site.

- A model may only reference files inside its own directory or public HTTP services intentionally required at runtime, such as Google Fonts, Meta Pixel, WhatsApp, or Telegram.
- Shared workshop paths such as `../../design/theme.css` are forbidden.
- The current shared `theme.css` is copied into each affected model as `theme.css`, and the model links to `./theme.css`.
- Production images used by a model are downloaded into that model's `assets/` directory and HTML/CSS references are rewritten locally.
- Debug screenshots, crops, backups, Chrome logs, and temporary audit files are excluded.
- Each model keeps its original art direction. Migration must not visually homogenize the collection.
- All CTA destinations and Meta Pixel behavior already present in a model must continue working.

## Public routes

```text
/
/modelo-01/
/modelo-02/
/modelo-03/
/modelo-04/
/modelo-05/
/modelo-06/
/modelo-07/
/modelo-08/
/modelo-09/
/modelo-10/
/modelo-11/
```

`/modelo-03-09-04-25/` redirects permanently to `/modelo-10/` to preserve any local or previously shared link.

## Catalog visual direction

The catalog is a cinematic editing table, not an admin dashboard and not another streaming landing page.

### Palette

- Projection black: `#0A0C0F`
- Slate surface: `#15191F`
- Celluloid white: `#F1EEE7`
- OptiXtream red: `#FF3B35`
- Tungsten amber: `#F1B84B`
- Steel gray: `#8D96A3`

### Typography

- Display: `Anybody`, wide and assertive for the OptiXtream wordmark and hero
- Editorial accent: `Instrument Serif`, used only for one contrasting phrase
- Interface and body: `Manrope`, for card metadata and navigation

### Layout

- Compact header with OptiXtream wordmark, model count, and WhatsApp contact
- Hero introducing the collection without oversized metrics or decorative numbering
- Responsive model grid: three columns on desktop, two on tablet, one on mobile
- Each card uses the model's real screenshot as its dominant material
- Card footer contains model name, a short art-direction label, and the action `Abrir modelo`
- Models open in a new tab so the catalog remains available
- Closing OptiXtream CTA links to WhatsApp

### Signature element

The memorable element is a continuous film contact sheet: preview cards align like selected frames from an editing table. A single red playhead crosses the active card on hover or keyboard focus. No glow field, neon blobs, terminal readouts, or generic metric cards are used.

### Motion

- One orchestrated entrance for the first visible row
- Card playhead and image crop respond to hover/focus
- Motion is removed when `prefers-reduced-motion: reduce` is active

## Catalog content

The root catalog includes exactly eleven cards, ordered from Modelo 01 through Modelo 11. Each card uses:

- `Modelo XX`
- A distinctive two-to-four-word art-direction descriptor derived from the actual model
- A real locally stored catalog thumbnail
- `Abrir modelo`

The page does not display illustrative prices or invented technical claims.

## Responsive behavior

- The document must have no horizontal overflow at 320, 390, 768, 1360, or 1440 CSS pixels.
- Card text and actions must remain fully visible at 320 CSS pixels.
- Tap targets are at least 44 CSS pixels tall.
- Catalog cards become a single vertical sequence on mobile; the page does not require horizontal swiping.
- Each individual model is checked at desktop and mobile sizes after migration.

## Accessibility

- Semantic landmarks, a skip link, and one page-level `h1`
- Meaningful screenshot alternative text
- Visible keyboard focus
- Sufficient text/background contrast
- Keyboard-reachable model links and CTA
- Reduced-motion support

## Cloudflare Pages behavior

- The deploy root is the repository root.
- The site is static and requires no build command.
- Directory `index.html` files provide clean trailing-slash routes.
- `_headers` defines security headers and caching rules appropriate for static HTML, CSS, JavaScript, fonts, and images.
- `_redirects` contains the legacy Modelo 10 redirect and a safe fallback to `404.html`.
- GitHub integration deploys the `main` branch to production on every push.

## Validation

`tests/validate-site.mjs` fails when any of these conditions occurs:

- A required route or production file is missing
- A model references `../`, `design/`, a local absolute Windows path, or an unavailable asset
- A catalog card points to a nonexistent model
- The catalog contains anything other than eleven ordered model cards
- A production model contains known debug or temporary filenames
- HTML contains duplicate IDs inside the same document
- A required WhatsApp CTA has an invalid destination

Additional verification:

- Run the validation script successfully
- Serve the repository locally and verify every route returns HTTP 200, except the deliberate legacy redirect
- Open every model in a real browser at 1360 px and 390 px
- Inspect the catalog at 1440, 768, 390, and 320 px
- Capture final desktop and mobile catalog screenshots
- Check browser console errors and missing network assets

## Git and deployment sequence

1. Build and validate the clean repository locally.
2. Commit the completed catalog and isolated models on `main`.
3. Create the GitHub repository `optixtream-modelos` under the authenticated OptiMind organization or account.
4. Push `main`.
5. Create the Cloudflare Pages project `optixtream-modelos` connected to that GitHub repository.
6. Verify the generated `pages.dev` URL and all model subpaths.
7. Add a custom domain only after the generated deployment passes the route and visual checks.

## Completion criteria

The work is complete only when the repository is clean, all eleven models are self-contained, validation passes, the public catalog has been visually inspected on desktop and mobile, GitHub contains the committed source, and Cloudflare Pages serves every documented route without missing assets.
