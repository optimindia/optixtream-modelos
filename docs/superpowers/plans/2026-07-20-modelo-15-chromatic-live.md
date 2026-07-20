# Modelo 15 · Chromatic Live Implementation Plan

**Goal:** Add and publish a complete, colorful IPTV model 15 while preserving the existing OptiXtream showroom contracts.

**Architecture:** Add an isolated `modelo-15/` static route with its own HTML, CSS, JS, and three raster assets. Extend the showroom registry, cards, picker, and route validation from 14 to 15 models without changing models 01–14.

**Tech Stack:** Static HTML/CSS/ES modules, generated PNG assets, Node contract tests, Cloudflare Pages through the existing GitHub-connected project.

## Global Constraints

- All CTA links use `https://wa.me/5492616027055`.
- Model 15 assets stay inside `modelo-15/assets/` and use local references.
- No `design/` files are modified.
- Responsive behavior must be checked at desktop and 390px mobile widths.

### Task 1: Catalog contract

- [x] Add model 15 to `script.js` and `index.html`.
- [x] Extend showroom and route contracts from 14 to 15.
- [x] Run the suite and observe the expected red state before implementation.

### Task 2: Chromatic Live route

- [x] Create `modelo-15/index.html`, `styles.css`, and `script.js`.
- [x] Add the hero, ticker, editorial selection, live tabs, plans, FAQ, and WhatsApp CTAs.
- [x] Add responsive geometry and reduced-motion handling.

### Task 3: Visual assets and verification

- [x] Generate and copy hero, catalog, and live-channel PNGs into `modelo-15/assets/`.
- [x] Capture desktop and mobile previews and remove temporary captures.
- [x] Run `npm.cmd test`, `node --check modelo-15/script.js`, and `git diff --check`.

### Task 4: Integration and release

- [ ] Commit the validated feature on the isolated branch.
- [ ] Fast-forward merge into `main`, rerun tests, and push.
- [ ] Confirm the Cloudflare Pages deployment matches the new commit.
- [ ] Remove the temporary server/worktree after production verification.
