# OptiXtream Apple Showroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the OptiXtream root page as a complete, luminous Apple-like showroom that presents all eleven model routes clearly and beautifully on desktop and mobile.

**Architecture:** Keep the eleven model directories untouched and replace only the root presentation layer (`index.html`, `styles.css`, `script.js`). Extend the existing Node validator with structural requirements, then verify interaction and responsive behavior in a real browser before pushing `main`, which triggers the connected Cloudflare Pages project.

**Tech Stack:** Semantic HTML5, CSS custom properties/grid/container-safe responsive rules, vanilla JavaScript, Node.js contract tests, Chrome browser verification, GitHub, Cloudflare Pages.

## Global Constraints

- Modify only the root catalog; do not change `/modelo-01/` through `/modelo-11/`.
- Keep exactly eleven ordered `data-model="01"` through `data-model="11"` entries in `index.html`.
- Preserve the WhatsApp destination `https://wa.me/5492616027055`.
- Use Plus Jakarta Sans with regular, bold and italic styles.
- Use the palette `#F5F5F7`, `#FFFFFF`, `#111216`, `#686A73`, `#4F66FF`, `#FF775F`.
- Use real images from `previews/modelo-01.png` through `previews/modelo-11.png`.
- At 390 px viewport width, require `scrollWidth === clientWidth`.
- Honor `prefers-reduced-motion` and visible keyboard focus.
- Use no marquee, parallax, custom cursor or permanent ambient animation.

---

### Task 1: Lock the Apple Showroom contract

**Files:**
- Modify: `tests/validate-site.mjs`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: root `index.html` as UTF-8 text.
- Produces: structural guarantees for `.showcase-stage`, eleven `.model-picker` buttons, `.assurance-grid`, `.process-grid`, Plus Jakarta Sans and the approved color tokens.

- [ ] **Step 1: Write the failing structural assertions**

Add after the existing ordered-card assertion:

```js
const showroomRequirements = [
  ['class="showcase-stage"', 'Catalog is missing the Apple showroom stage'],
  ['class="model-picker"', 'Catalog is missing the quick model selector'],
  ['class="assurance-grid"', 'Catalog is missing the assurance section'],
  ['class="process-grid"', 'Catalog is missing the selection process'],
  ['aria-live="polite"', 'Showcase changes are not announced'],
  ['Plus Jakarta Sans', 'Catalog is missing the approved typography']
];
for (const [needle, message] of showroomRequirements) {
  if (!index.includes(needle)) fail(message);
}
const pickerModels = [...index.matchAll(/class="[^"]*\bmodel-picker\b[^"]*"[^>]+data-pick="(\d{2})"/g)].map((match) => match[1]);
if (JSON.stringify(pickerModels) !== JSON.stringify(expected)) {
  fail(`Showcase picker order must be ${expected.join(', ')}; received ${pickerModels.join(', ') || 'none'}`);
}
```

Read `styles.css` and assert the exact tokens:

```js
const stylesPath = join(root, 'styles.css');
const rootStyles = readFileSync(stylesPath, 'utf8');
for (const token of ['#F5F5F7', '#FFFFFF', '#111216', '#686A73', '#4F66FF', '#FF775F']) {
  if (!rootStyles.toUpperCase().includes(token)) fail(`Catalog styles are missing token ${token}`);
}
```

- [ ] **Step 2: Run the validator and confirm RED**

Run:

```powershell
npm.cmd test
```

Expected: FAIL listing the missing Apple showroom stage, selector, assurance section and process.

- [ ] **Step 3: Commit the failing contract**

```powershell
git add tests/validate-site.mjs
git commit -m "test: define Apple showroom catalog contract"
```

---

### Task 2: Replace the root page with the complete showroom

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Test: `tests/validate-site.mjs`

**Interfaces:**
- Consumes: `previews/modelo-01.png` through `previews/modelo-11.png` and the existing model routes.
- Produces: stable DOM hooks `.showcase-stage`, `#stage-image`, `#stage-title`, `#stage-note`, `.model-picker[data-pick]`, `.model-card[data-model]`, `.assurance-grid`, `.process-grid`.

- [ ] **Step 1: Replace the document head and navigation**

Use this head contract:

```html
<meta name="theme-color" content="#F5F5F7">
<meta name="description" content="Explorá once modelos web OptiXtream, comparalos y elegí el estilo ideal para tu experiencia de streaming.">
<title>OptiXtream — Elegí tu modelo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700;1,800&display=swap" rel="stylesheet">
```

The sticky navigation contains the OptiXtream mark, `Modelos`, `Cómo elegir` and the WhatsApp CTA `Consultar`.

- [ ] **Step 2: Build the hero and interactive stage**

Use this semantic structure and exact DOM identifiers:

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="kicker">Catálogo OptiXtream · 11 modelos</p>
    <h1 id="hero-title">Tu próxima web<br><em>empieza acá.</em></h1>
    <p class="hero-lead">Explorá experiencias completas, compará estilos y abrí cada modelo en su propia pantalla.</p>
    <div class="hero-actions">
      <a class="button button--primary" href="#modelos">Explorar modelos</a>
      <a class="button button--quiet" href="modelo-11/">Ver selección <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="showcase-stage" aria-live="polite">
    <div class="stage-layer stage-layer--back"><img src="previews/modelo-05.png" alt="" aria-hidden="true"></div>
    <div class="stage-layer stage-layer--middle"><img src="previews/modelo-09.png" alt="" aria-hidden="true"></div>
    <a class="stage-screen" id="stage-link" href="modelo-11/">
      <img id="stage-image" src="previews/modelo-11.png" alt="Vista previa del modelo 11 Motivo" width="1440" height="1000">
    </a>
    <div class="stage-caption"><span id="stage-number">11</span><strong id="stage-title">Motivo</strong><span id="stage-note">Gran espectáculo</span></div>
  </div>
</section>
```

- [ ] **Step 3: Add the quick selector**

Create eleven buttons in order with the exact contract:

```html
<div class="picker-row" aria-label="Cambiar modelo destacado">
  <button class="model-picker" type="button" data-pick="01" aria-pressed="false">01</button>
  <button class="model-picker" type="button" data-pick="02" aria-pressed="false">02</button>
  <button class="model-picker" type="button" data-pick="03" aria-pressed="false">03</button>
  <button class="model-picker" type="button" data-pick="04" aria-pressed="false">04</button>
  <button class="model-picker" type="button" data-pick="05" aria-pressed="false">05</button>
  <button class="model-picker" type="button" data-pick="06" aria-pressed="false">06</button>
  <button class="model-picker" type="button" data-pick="07" aria-pressed="false">07</button>
  <button class="model-picker" type="button" data-pick="08" aria-pressed="false">08</button>
  <button class="model-picker" type="button" data-pick="09" aria-pressed="false">09</button>
  <button class="model-picker" type="button" data-pick="10" aria-pressed="false">10</button>
  <button class="model-picker is-active" type="button" data-pick="11" aria-pressed="true">11</button>
</div>
```

- [ ] **Step 4: Build the full model catalog**

Use this exact content map for the eleven ordered `.model-card[data-model]` links:

| Model | Name | Note | Route | Preview |
|---|---|---|---|---|
| 01 | Nocturna | Cine oscuro | `modelo-01/` | `previews/modelo-01.png` |
| 02 | Prisma | Color eléctrico | `modelo-02/` | `previews/modelo-02.png` |
| 03 | Éter | Editorial de lujo | `modelo-03/` | `previews/modelo-03.png` |
| 04 | Órbita | Futuro amable | `modelo-04/` | `previews/modelo-04.png` |
| 05 | Multivisión | Control total | `modelo-05/` | `previews/modelo-05.png` |
| 06 | Pulso | Broadcast directo | `modelo-06/` | `previews/modelo-06.png` |
| 07 | El Dial | Calma analógica | `modelo-07/` | `previews/modelo-07.png` |
| 08 | Uplink | Señal orbital | `modelo-08/` | `previews/modelo-08.png` |
| 09 | Zapping | Pop geométrico | `modelo-09/` | `previews/modelo-09.png` |
| 10 | Butaca | Cartelera moderna | `modelo-10/` | `previews/modelo-10.png` |
| 11 | Motivo | Gran espectáculo | `modelo-11/` | `previews/modelo-11.png` |

Each card uses:

```html
<a class="model-card" data-model="01" href="modelo-01/">
  <figure><img src="previews/modelo-01.png" alt="Vista previa del modelo 01 Nocturna" width="1440" height="1000"></figure>
  <div class="card-copy"><span>Modelo 01</span><h3>Nocturna</h3><p>Cine oscuro</p><span class="card-action">Explorar modelo ↗</span></div>
</a>
```

Repeat the complete contract with the exact values from the table; model 11 also receives `model-card--featured` and a visible `Selección OptiXtream` badge.

- [ ] **Step 5: Add assurances, process, contact and footer**

The assurances are `Responsive real`, `Cada modelo es independiente`, and `Listo para personalizar`. The process uses the ordered steps `Mirá`, `Compará`, `Consultá`. The closing CTA reads `¿Encontraste el indicado?` and links to the approved WhatsApp number.

- [ ] **Step 6: Replace root CSS with the approved token system**

Start from:

```css
:root {
  --pearl: #F5F5F7;
  --white: #FFFFFF;
  --graphite: #111216;
  --slate: #686A73;
  --cobalt: #4F66FF;
  --coral: #FF775F;
  --line: rgba(17,18,22,.09);
  --shadow: 0 24px 70px rgba(27,32,57,.12);
  --radius: clamp(1.35rem, 2.4vw, 2.25rem);
  --page: min(1240px, calc(100% - 2 * clamp(1.15rem, 4vw, 4rem)));
  --font: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

Implement a two-column hero, layered preview stage, two-column catalog, white cards, cobalt primary actions and cool-gray sections. Use `clamp()` spacing and `minmax(0, 1fr)` columns. At `max-width: 720px`, use one column, `width: 100%`, no `100vw`, internal horizontal overflow only on `.picker-row`, and full-width CTA buttons.

- [ ] **Step 7: Run the contract and confirm GREEN**

```powershell
npm.cmd test
git diff --check
```

Expected: `OptiXtream validation passed` and no whitespace errors.

- [ ] **Step 8: Commit the static showroom**

```powershell
git add index.html styles.css tests/validate-site.mjs
git commit -m "feat: redesign catalog as Apple showroom"
```

---

### Task 3: Add restrained interaction and motion

**Files:**
- Modify: `script.js`
- Test: browser verification against root page

**Interfaces:**
- Consumes: `.model-picker[data-pick]`, `#stage-link`, `#stage-image`, `#stage-number`, `#stage-title`, `#stage-note`, `[data-reveal]`.
- Produces: `selectModel(modelId: string): void` behavior and one-time reveal classes.

- [ ] **Step 1: Define the complete model metadata map**

```js
const models = {
  '01': ['Nocturna', 'Cine oscuro'], '02': ['Prisma', 'Color eléctrico'],
  '03': ['Éter', 'Editorial de lujo'], '04': ['Órbita', 'Futuro amable'],
  '05': ['Multivisión', 'Control total'], '06': ['Pulso', 'Broadcast directo'],
  '07': ['El Dial', 'Calma analógica'], '08': ['Uplink', 'Señal orbital'],
  '09': ['Zapping', 'Pop geométrico'], '10': ['Butaca', 'Cartelera moderna'],
  '11': ['Motivo', 'Gran espectáculo']
};
```

- [ ] **Step 2: Implement selector state changes**

On picker click, update `aria-pressed`, `.is-active`, image `src` and `alt`, destination `href`, number, title and note. Add `.is-changing` for 180 ms and remove it with a timeout. Do not auto-cycle models.

- [ ] **Step 3: Implement one-time reveals**

If reduced motion is enabled, add `.is-visible` immediately. Otherwise observe `[data-reveal]` with `threshold: 0.12`, reveal once and unobserve.

- [ ] **Step 4: Preserve the dynamic year**

Set `#year` to the current year only when the element exists.

- [ ] **Step 5: Commit the interaction**

```powershell
git add script.js
git commit -m "feat: add showroom model selector"
```

---

### Task 4: Visual QA, regression verification and deployment

**Files:**
- Modify if required by visual QA: `index.html`, `styles.css`, `script.js`
- Verify: `/`, `/modelo-01/` through `/modelo-11/`

**Interfaces:**
- Consumes: local static server and connected Cloudflare Pages project `optixtream-modelos`.
- Produces: verified production deployment from `main`.

- [ ] **Step 1: Run fresh automated verification**

```powershell
npm.cmd test
git diff --check
```

Expected: exit 0 for both commands.

- [ ] **Step 2: Start a local static server**

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

- [ ] **Step 3: Audit desktop in the browser**

Use viewport `1440×1000`. Confirm eleven cards, loaded hero image, selector state change, visible focus and `scrollWidth === clientWidth`. Capture the first viewport and full page, critique hierarchy, whitespace, typography and image crop, then fix material issues.

- [ ] **Step 4: Audit mobile in the browser**

Use viewport `390×844`. Confirm one-column catalog, readable typography, full-width CTA, contained picker scroll, no broken visible images and `scrollWidth === clientWidth`. Open `/modelo-11/` to confirm the child route remains unchanged.

- [ ] **Step 5: Re-run tests after visual fixes**

```powershell
npm.cmd test
git diff --check
```

- [ ] **Step 6: Commit any QA polish**

```powershell
git add index.html styles.css script.js tests/validate-site.mjs
git commit -m "fix: polish showroom responsive details"
```

Skip the commit when the QA pass produces no file changes.

- [ ] **Step 7: Push main and monitor Cloudflare**

```powershell
git push origin main
```

Wait for the Pages deployment triggered by `github:push` to reach `deploy: success`.

- [ ] **Step 8: Verify production routes**

Confirm HTTP 200 for `/` and `/modelo-01/` through `/modelo-11/`, then inspect `https://optixtream-modelos.pages.dev/` at desktop and mobile sizes. Confirm the deployed commit matches `origin/main`.

---

## Plan self-review

- Spec coverage: hero, selector, eleven models, guarantees, process, contact, typography, palette, motion, responsive behavior, accessibility and deployment are all assigned to tasks.
- Placeholder scan: no incomplete marker, deferred implementation or undefined interface remains.
- Interface consistency: selector hooks and model metadata names match between Tasks 2 and 3; the existing validator contract for ordered `data-model` entries is preserved.
