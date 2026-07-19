# Modelo 13 Vértigo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a thirteenth, radically distinct OptiXtream streaming landing page named Vértigo and integrate it into the public showroom.

**Architecture:** Keep Vértigo self-contained under `modelo-13/` with local assets, semantic HTML, scoped CSS and a small interaction script. Extend the root showroom's model registry, picker, card and validation contracts from 12 to 13 without altering models 01–12.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript modules, local PNG assets generated for this page, Node contract tests, GitHub-driven Cloudflare Pages deployment.

## Global Constraints

- Ignore the `design` folder; use the frontend-design direction documented in the spec.
- Keep `https://wa.me/5492616027055` as the only conversion destination.
- Use Bebas Neue + Manrope + IBM Plex Mono; do not reuse Aurora's Space Grotesk + Instrument Sans pair.
- Keep the Vértigo palette: `#171C5A`, `#FF6B57`, `#FFD45C`, `#D9E8FF`, `#171821`, `#F8F8F4`.
- All essential copy stays in HTML; images are supporting art only.
- Maintain keyboard focus, `prefers-reduced-motion`, mobile menu state and no horizontal page overflow.

---

### Task 1: Extend the model contracts to 13

**Files:**
- Modify: `tests/validate-site.mjs`
- Modify: `tests/showroom-state.test.mjs`
- Modify: `tests/responsive-showroom.test.mjs`

**Interfaces:**
- Tests consume the existing root model list and `getModelState` export.
- Later tasks must make these expectations pass with `modelo-13/` and its preview.

- [ ] **Step 1: Write the failing contract expectations**

Add model 13 to the expected list in each test, assert `getModelState('13')` returns `Vértigo / Señal cambiante`, and expect 13 picker/card entries.

- [ ] **Step 2: Run the tests and verify the new contract fails**

Run: `npm.cmd test`

Expected: failure mentioning missing model 13 or an unknown showroom model.

- [ ] **Step 3: Commit the red contract**

```bash
git add tests/validate-site.mjs tests/showroom-state.test.mjs tests/responsive-showroom.test.mjs
git commit -m "test: extend showroom contracts to model 13"
```

---

### Task 2: Create Vértigo assets and page shell

**Files:**
- Create: `modelo-13/index.html`
- Create: `modelo-13/styles.css`
- Create: `modelo-13/script.js`
- Create: `modelo-13/assets/vertigo-hero.png`
- Create: `modelo-13/assets/vertigo-feature.png`
- Create: `modelo-13/assets/vertigo-live.png`
- Create: `modelo-13/assets/vertigo-cinema.png`

**Interfaces:**
- `index.html` references only local assets and `script.js`.
- `script.js` exposes no global API; it owns menu, reveal, year and guarded Meta Pixel Lead behavior.

- [ ] **Step 1: Generate four local image assets**

Create a 16:10 hero art and three supporting images in the Vértigo transmission-studio direction. Do not place text or logos inside the images.

- [ ] **Step 2: Write semantic page markup**

Include header/menu, hero with split-window signature, live ticker, catalog, channel rail, benefits/devices, steps, three plans, native FAQ, final CTA and footer. Every CTA uses the authorized WhatsApp URL.

- [ ] **Step 3: Build the Vértigo token system and responsive layout**

Use the documented palette and type roles; keep the split window as the only large visual flourish. Add mobile rail containment, visible focus and reduced-motion rules.

- [ ] **Step 4: Add interaction script**

Implement `aria-expanded` menu toggle, Escape close, year, IntersectionObserver reveals and guarded `fbq('track', 'Lead', { content_name: 'OptiXtream Vértigo 13' })`.

- [ ] **Step 5: Run the page-level checks**

Run: `npm.cmd test`

Expected: existing tests still fail only because root integration and preview are not complete; no syntax errors in the new page.

- [ ] **Step 6: Commit the standalone page**

```bash
git add modelo-13
git commit -m "feat: build vertigo modelo 13 landing"
```

---

### Task 3: Integrate Vértigo into the public showroom

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Modify: `styles.css`
- Modify: `README.md`
- Create: `previews/modelo-13.png`

**Interfaces:**
- Root registry exposes model `13` as `['Vértigo', 'Señal cambiante']`.
- Root picker, featured card and stage link point to `modelo-13/`.
- Preview is a real screenshot of the new page at 1440×1000.

- [ ] **Step 1: Update root model registry and copy**

Set the root showcase default to model 13, add its picker and card after model 12, and update counts from 12 to 13.

- [ ] **Step 2: Capture and inspect the Vértigo preview**

Run Chrome headless at 1440×1000 against the local server and save `previews/modelo-13.png`. Inspect the image before staging it.

- [ ] **Step 3: Run all contracts**

Run: `npm.cmd test`

Expected: all four contract suites pass.

- [ ] **Step 4: Commit showroom integration**

```bash
git add index.html script.js styles.css README.md previews/modelo-13.png
git commit -m "feat: publish vertigo in showroom catalog"
```

---

### Task 4: Visual and browser verification

**Files:**
- Verify: `modelo-13/index.html`, `modelo-13/styles.css`, `modelo-13/script.js`, root showroom

- [ ] **Step 1: Serve the worktree locally**

Run a static server on an isolated local port, then open `/` and `/modelo-13/` in the browser control surface.

- [ ] **Step 2: Audit three viewports**

Check 1440×1000, 879×866 and 390×844. Confirm no element exceeds the viewport, all images have natural width, and the split-window signature remains legible.

- [ ] **Step 3: Exercise interactions**

Open/close the mobile menu, press Escape, open FAQ details, click a non-submitting CTA and check the browser console for errors.

- [ ] **Step 4: Capture before/after evidence**

Keep final desktop and mobile captures for the handoff; do not ship a debug override.

---

### Task 5: Merge, deploy and verify production

**Files:**
- Modify: `main` through a fast-forward merge; no changes to models 01–12

- [ ] **Step 1: Re-run verification on the feature branch**

Run: `npm.cmd test`

Expected: all suites pass with zero failures.

- [ ] **Step 2: Merge into main and push**

From the repository root, fast-forward `main` to `codex/modelo-13-vertigo`, then run `git push origin main`.

- [ ] **Step 3: Confirm Cloudflare Pages deployment**

Query the Pages deployments endpoint for `optixtream-modelos`, verify the latest production deployment points at the pushed commit and has `latest_stage.status === success`.

- [ ] **Step 4: Check all public routes**

Verify HTTP 200 for `/`, `/modelo-01/` through `/modelo-13/`, then visually audit the production root and `/modelo-13/` on desktop and mobile.

- [ ] **Step 5: Clean the feature worktree**

Remove the linked worktree only after merge succeeds and delete the merged feature branch.
