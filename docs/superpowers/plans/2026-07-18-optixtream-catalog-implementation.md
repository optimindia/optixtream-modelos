# OptiXtream Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish eleven isolated OptiXtream website models behind one polished public catalog, one GitHub repository, and one Cloudflare Pages project.

**Architecture:** Build a clean static repository outside the existing `optimind-landing` repository. A Node migration utility copies only production files from the workshop, localizes model dependencies, and normalizes the dated variant to Modelo 10. The repository root serves the public catalog and each model serves its own independent directory index.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Node.js validation/migration scripts, GitHub CLI, Cloudflare Pages, Wrangler 4.x.

## Global Constraints

- Public brand is `OptiXtream`.
- Repository and Cloudflare Pages project are named `optixtream-modelos`.
- Routes are `/modelo-01/` through `/modelo-11/`.
- `modelo-03-09-04-25` is normalized to `modelo-10`.
- Every model owns its HTML, CSS, JavaScript, theme, and image assets.
- No production model may reference `../../design`, a Windows absolute path, or another model.
- Google Fonts, Meta Pixel, WhatsApp, and Telegram may remain external runtime services.
- Root catalog contains exactly eleven ordered model cards.
- Root catalog has no horizontal overflow at 320, 390, 768, 1360, or 1440 CSS pixels.
- Main branch deployments are production deployments.
- Contact URL is `https://wa.me/5492616027055`.

---

### Task 1: Structural validation contract

**Files:**
- Create: `package.json`
- Create: `tests/validate-site.mjs`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: repository root through `process.cwd()`
- Produces: exit code `0` with `OptiXtream validation passed` or exit code `1` with a list of violations

- [ ] **Step 1: Create a failing structural validator**

The validator must check root production files, eleven model directories, local file references, model isolation, forbidden debug filenames, duplicate HTML IDs, WhatsApp destinations, and catalog card order. It must treat external Google Fonts, Meta Pixel, WhatsApp, and Telegram URLs as allowed.

- [ ] **Step 2: Run the validator and verify RED**

Run:

```powershell
npm.cmd test
```

Expected: exit `1` because root production files and model directories do not exist.

- [ ] **Step 3: Commit the validation contract**

```powershell
git add package.json tests/validate-site.mjs
git commit -m "test: define OptiXtream site contract"
```

### Task 2: Self-contained model migration

**Files:**
- Create: `scripts/migrate-models.mjs`
- Create: `modelo-01/` through `modelo-11/`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: environment variable `OPTX_SOURCE`, pointing to the workshop `PLANTILLAS WORDPRESS` directory
- Consumes: shared theme at the workshop sibling path `../design/theme.css`
- Produces: production-only model directories with localized assets and normalized references

- [ ] **Step 1: Add migration assertions to the existing validator**

The assertions must reject `../`, `design/theme.css`, `images.unsplash.com`, source screenshot/debug filenames, and local absolute paths inside model HTML/CSS/JS.

- [ ] **Step 2: Run the validator and verify RED**

Run `npm.cmd test` and confirm missing models and isolation checks fail.

- [ ] **Step 3: Implement `scripts/migrate-models.mjs`**

The script must:

1. Map source names to target names, including `modelo-03-09-04-25` to `modelo-10`.
2. Copy `index.html`, `styles.css`, and `script.js`.
3. Copy model-local assets referenced by production files.
4. Copy the shared theme into every model that links to it and rewrite the link to `theme.css`.
5. Download each `images.unsplash.com` image into that model's `assets/` directory using deterministic names and preserve query-driven crop dimensions where possible.
6. Rewrite downloaded image references in HTML and CSS to local relative paths.
7. Exclude backups, debug images, crops, mobile audits, and capture files.
8. Preserve UTF-8 Spanish copy.

- [ ] **Step 4: Run the migration**

```powershell
$env:OPTX_SOURCE='C:\Users\HP\Pictures\Proyectos_Emprendimientos\OptiMind_IA\Generador de PAGINAS IPTV\PLANTILLAS WORDPRESS'
npm.cmd run migrate
```

Expected: eleven target directories and a per-model migration summary.

- [ ] **Step 5: Run isolation validation**

Run `npm.cmd test`. Expected remaining failures are limited to missing root catalog files.

- [ ] **Step 6: Commit isolated models**

```powershell
git add modelo-* scripts/migrate-models.mjs package.json tests/validate-site.mjs
git commit -m "feat: isolate eleven OptiXtream models"
```

### Task 3: Public OptiXtream catalog

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `favicon.svg`
- Create: `404.html`
- Create: `assets/catalog/modelo-01.webp` through `assets/catalog/modelo-11.webp`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: eleven model routes and locally generated model captures
- Produces: an accessible public catalog with eleven links opened in new tabs

- [ ] **Step 1: Confirm catalog-specific tests fail**

Run `npm.cmd test`. Expected: missing root catalog files, catalog card count, and route-order failures.

- [ ] **Step 2: Generate real model thumbnails**

Serve the repository locally, capture every model at 1360 CSS pixels with Chrome, and convert the captures to 1200-pixel-wide WebP files at quality 82. Each thumbnail must show the actual model rather than a generic placeholder.

- [ ] **Step 3: Build the root catalog**

Implement:

- OptiXtream header and WhatsApp contact
- Hero introducing the model collection
- Three/two/one-column contact-sheet grid
- Eleven ordered cards linking to `./modelo-XX/`
- Local thumbnail, model number, direction label, and `Abrir modelo`
- Closing WhatsApp CTA
- Skip link, semantic landmarks, focus styles, and reduced-motion support

- [ ] **Step 4: Build the 404 page and favicon**

The 404 page links back to `/` and uses the same OptiXtream visual language without duplicating the entire catalog.

- [ ] **Step 5: Run catalog validation**

Run `npm.cmd test`. Expected: failures, if any, are limited to Cloudflare configuration files.

- [ ] **Step 6: Commit the catalog**

```powershell
git add index.html styles.css script.js favicon.svg 404.html assets/catalog tests/validate-site.mjs
git commit -m "feat: build public OptiXtream catalog"
```

### Task 4: Cloudflare Pages configuration and documentation

**Files:**
- Create: `_headers`
- Create: `_redirects`
- Create: `README.md`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: static repository root
- Produces: Cloudflare Pages routing, cache/security headers, and exact deployment instructions

- [ ] **Step 1: Add configuration assertions**

Require `_headers`, `_redirects`, the Modelo 10 legacy redirect, the 404 fallback, and README route documentation.

- [ ] **Step 2: Run tests and verify RED**

Run `npm.cmd test`. Expected: configuration assertions fail.

- [ ] **Step 3: Implement Pages configuration**

`_redirects` must include:

```text
/modelo-03-09-04-25/* /modelo-10/:splat 301
```

`_headers` must set security headers for all routes and immutable caching for versioned/static image assets while keeping HTML revalidatable.

- [ ] **Step 4: Write README**

Document local preview, validation, route inventory, GitHub source, Pages deployment settings, and custom-domain handoff.

- [ ] **Step 5: Run validation and commit**

```powershell
npm.cmd test
git add _headers _redirects README.md tests/validate-site.mjs
git commit -m "chore: configure OptiXtream for Cloudflare Pages"
```

Expected: `OptiXtream validation passed`.

### Task 5: Browser and route verification

**Files:**
- Create: `docs/audits/catalog-desktop.png`
- Create: `docs/audits/catalog-mobile.png`
- Modify: production files only when an observed defect requires correction

**Interfaces:**
- Consumes: local HTTP server
- Produces: visual evidence and a clean browser/network audit

- [ ] **Step 1: Verify all HTTP routes**

Start a local static server and request `/`, every `/modelo-XX/`, local CSS/JS/image assets, and `/404.html`. Expected: HTTP 200 for production resources.

- [ ] **Step 2: Inspect catalog viewports**

Inspect at 1440×1000, 768×1024, 390×844, and 320×720. Verify no horizontal document overflow, no clipped actions, and visible focus.

- [ ] **Step 3: Inspect every model**

Open each model at 1360×900 and 390×844. Verify document width, key hero visibility, local image loads, menu/FAQ interactions where present, and browser console errors.

- [ ] **Step 4: Capture final catalog evidence**

Save desktop and mobile catalog screenshots in `docs/audits/`.

- [ ] **Step 5: Re-run all validation and commit audit evidence**

```powershell
npm.cmd test
git diff --check
git add docs/audits
git commit -m "test: verify OptiXtream catalog and model routes"
```

### Task 6: GitHub and Cloudflare Pages production deployment

**Files:**
- Modify: `README.md` only if the real GitHub or Pages URLs differ from the expected names

**Interfaces:**
- Consumes: authenticated GitHub and Cloudflare sessions
- Produces: public GitHub repository, connected Cloudflare Pages project, and verified production URLs

- [ ] **Step 1: Verify authentication without exposing credentials**

Run:

```powershell
gh auth status
npx.cmd wrangler@latest whoami
```

Expected: authenticated GitHub account/organization and Cloudflare account details without printing tokens.

- [ ] **Step 2: Create and push the GitHub repository**

```powershell
gh repo create optixtream-modelos --public --source . --remote origin --push
```

If the authenticated organization is `optimindia`, create `optimindia/optixtream-modelos`; otherwise use the authenticated owner and report it.

- [ ] **Step 3: Create the connected Cloudflare Pages project**

Use the authenticated Cloudflare connection/API to create `optixtream-modelos` with production branch `main`, repository owner/name from Step 2, no build command, and repository root as output.

- [ ] **Step 4: Trigger and wait for production deployment**

Wait until the deployment status is successful. Do not treat project creation alone as a successful deployment.

- [ ] **Step 5: Verify production**

Request the generated Pages URL, every model route, representative CSS/image assets, the legacy redirect, and the 404 response. Open the root and Modelo 11 in a browser at desktop and mobile sizes.

- [ ] **Step 6: Record real URLs and push final documentation**

Update README with the GitHub and Pages URLs, run `npm.cmd test`, commit, and push `main`.

## Plan self-review

- Spec coverage: repository isolation, eleven routes, catalog design, accessibility, responsive behavior, GitHub, Cloudflare Pages, redirect, validation, and visual audit are covered.
- Placeholder scan: no deferred implementation markers are present.
- Interface consistency: migration produces the model routes consumed by the catalog; validation consumes the final repository structure; deployment consumes the validated `main` branch.
