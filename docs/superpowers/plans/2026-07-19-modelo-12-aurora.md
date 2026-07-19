# Modelo 12 Aurora Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** Build and publish a twelfth, standalone OptiXtream streaming experience named Aurora, integrate it into the public showroom, and preserve modelos 01–11 unchanged.

**Architecture:** A self-contained `modelo-12/` page owns its HTML, CSS, JavaScript and generated local assets. The root showroom only gains model metadata, card, picker option and preview reference. Existing contract tests extend from 11 to 12 and production is verified by commit hash and browser inspection.

**Tech Stack:** Semantic HTML, modern CSS, vanilla JavaScript, local WebP/PNG assets, Node.js contract tests, Python static server, Chrome screenshots, GitHub and Cloudflare Pages.

## Global Constraints

- Keep modelos 01–11 intact; do not edit their files or assets.
- Use Aurora tokens: `#10142E`, `#18234B`, `#C6B9FF`, `#B8F6D1`, `#5E7CFF`, `#EAEAF2`.
- Use Space Grotesk for display and Instrument Sans for body copy.
- Keep relevant CTAs on `https://wa.me/5492616027055`.
- Keep the page usable at desktop, tablet and 390px mobile widths with zero horizontal overflow.
- Use local assets with useful alt text and no essential text embedded in images.
- Respect `prefers-reduced-motion`, visible focus, semantic landmarks and keyboard-accessible controls.

---

### Task 1: Isolated baseline and red contracts

**Files:**
- Create: `.worktrees/modelo-12-aurora` (linked worktree on branch `codex/modelo-12-aurora`)
- Modify: `tests/validate-site.mjs`
- Modify: `tests/showroom-state.test.mjs`
- Modify: `tests/responsive-showroom.test.mjs`

- [ ] **Step 1: Create the ignored worktree and run the baseline.**

```powershell
git worktree add .worktrees/modelo-12-aurora -b codex/modelo-12-aurora
Set-Location .worktrees/modelo-12-aurora
npm.cmd test
```

Expected: the existing suite passes before feature edits.

- [ ] **Step 2: Extend contracts to expect twelve models.**

Change the model array length to `12`, expect `modelo-12/` in root order, expect twelve picker/card entries, and make the state test assert `getModelState('12')` while reserving `'13'` for the unknown-model error. Keep every assertion for 01–11.

- [ ] **Step 3: Run the changed contracts and record the red result.**

```powershell
npm.cmd test
```

Expected: failure names the missing `modelo-12` route/card/assets; no existing-model regression is introduced.

- [ ] **Step 4: Commit the contract change.**

```powershell
git add tests/validate-site.mjs tests/showroom-state.test.mjs tests/responsive-showroom.test.mjs
git commit -m "test: extend showroom contracts to model 12"
```

---

### Task 2: Build standalone Modelo 12 Aurora

**Files:**
- Create: `modelo-12/index.html`
- Create: `modelo-12/styles.css`
- Create: `modelo-12/script.js`
- Create: `modelo-12/assets/aurora-hero.webp`
- Create: `modelo-12/assets/aurora-feature.webp`
- Create: `modelo-12/assets/aurora-live.webp`
- Create: `modelo-12/assets/aurora-cinema.webp`

- [ ] **Step 1: Generate and inspect local visual assets.**

Create four text-free cinematic assets sharing Aurora’s ink/lavender/mint signal language: a hero transmission horizon, featured editorial still, live broadcast still, and night-cinema still. Inspect every image before copying it into `modelo-12/assets/` and optimize dimensions/file weight for web use.

- [ ] **Step 2: Write semantic page structure.**

Implement `header`, `main`, `section`, `nav`, `article`, `details`, and `footer` landmarks. Include an accessible mobile menu button, hero CTA and catalog anchor, featured rail, live rail, benefits/devices/steps, three plans, FAQ details and final WhatsApp CTA. Keep copy in HTML and use the authorized WhatsApp URL.

- [ ] **Step 3: Implement Aurora styling and signature motion.**

Use scoped custom properties and Space Grotesk/Instrument Sans imports. Build the two-column hero, orbit-line signal signature, quiet ink panels, lavender/menta status chips, responsive rails and plan cards. Add one orchestrated reveal/ambient orbit animation, disable it for reduced motion, and provide visible focus and touch-safe hit areas.

- [ ] **Step 4: Implement interaction behavior.**

Toggle the mobile menu with `aria-expanded`, close it after navigation, keep FAQ native through `<details>`, and expose a small live-status update without timers that interfere with keyboard or reduced-motion users.

- [ ] **Step 5: Run a local page smoke check.**

```powershell
Start-Process python -ArgumentList '-m','http.server','4175' -WorkingDirectory (Get-Location) -WindowStyle Hidden
```

Open `/modelo-12/` at 1440px, 879px and 390px. Confirm no broken image requests, no console errors, no horizontal overflow and functional menu/FAQ/CTAs before continuing.

- [ ] **Step 6: Commit the standalone page.**

```powershell
git add modelo-12
git commit -m "feat: add aurora modelo 12 landing page"
```

---

### Task 3: Integrate the public showroom

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Create: `previews/modelo-12.png`
- Modify: `tests/image-fallbacks.test.mjs`
- Modify: `README.md`

- [ ] **Step 1: Add model 12 metadata and card.**

Add model `12` after `11` in root metadata, picker and card order. Point the card to `modelo-12/`, use `previews/modelo-12.png`, and label it “Aurora / Señal nocturna”. Do not change existing card markup or image sources.

- [ ] **Step 2: Capture the actual preview.**

Use Chrome against the local server at `1440x1000` to write `previews/modelo-12.png`; inspect the screenshot and ensure it shows the real Aurora page rather than a placeholder.

- [ ] **Step 3: Extend fallback and documentation checks.**

Make image fallback tests include model 12 while preserving old model assertions, and document the new route in `README.md`.

- [ ] **Step 4: Run all tests.**

```powershell
npm.cmd test
```

Expected: zero failures and twelve models discovered, ordered and referenced.

- [ ] **Step 5: Commit showroom integration.**

```powershell
git add index.html script.js previews/modelo-12.png tests/image-fallbacks.test.mjs README.md
git commit -m "feat: publish modelo 12 in showroom catalog"
```

---

### Task 4: Visual and production verification

**Files:** No source changes unless a screenshot-backed defect is found.

- [ ] **Step 1: Audit local visual states.**

Capture root and `/modelo-12/` at 1440x1000, 879x866 and 390x844. Check hero hierarchy, typography contrast, orbit signature, rail clipping, menu, FAQ, focus, reduced-motion CSS and zero overflow.

- [ ] **Step 2: Merge the feature branch safely.**

Run the full test suite on the feature branch, fast-forward merge `codex/modelo-12-aurora` into `main`, remove the linked worktree only after confirming the merge, and rerun `npm.cmd test` on `main`.

- [ ] **Step 3: Push and verify Cloudflare deployment.**

```powershell
git push origin main
```

Use the connected Pages project `optixtream-modelos`, confirm the newest production deployment commit hash equals `git rev-parse HEAD`, and wait until its latest stage is `success`.

- [ ] **Step 4: Audit production routes.**

Request `/`, `/modelo-01/` through `/modelo-12/`, then visually inspect production root and `/modelo-12/` at the same three widths. Keep the production root tab open as the deliverable.

