# OptiXtream Responsive Showroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corregir la composición del showroom para que el preview mantenga proporción panorámica y la jerarquía fina/bold respire correctamente en escritorio, tablet y celular.

**Architecture:** La portada sigue siendo HTML, CSS y JavaScript estáticos. Un contrato automatizado protege la estructura responsive; CSS controla la composición por flujo y cambia a una columna antes de 1080 px, mientras el selector conserva su API y reduce el movimiento.

**Tech Stack:** HTML5, CSS moderno, JavaScript ES modules, Node.js `assert`, Cloudflare Pages.

## Global Constraints

- Modificar únicamente la portada raíz; conservar intactas `/modelo-01/` a `/modelo-11/`.
- Mantener exactamente once botones `.model-picker[data-pick]` y once tarjetas `.model-card[data-model]`.
- Usar Plus Jakarta Sans con contraste de pesos `300–400` frente a `700–800`.
- No permitir desbordamiento horizontal a 360, 390, 768, 879, 1024 ni 1440 px.
- Mantener foco visible, `aria-pressed` y `prefers-reduced-motion`.
- Auditar visualmente la URL pública después del despliegue.

---

### Task 1: Contrato de regresión responsive

**Files:**
- Create: `tests/responsive-showroom.test.mjs`
- Modify: `package.json`
- Test: `tests/responsive-showroom.test.mjs`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, `script.js` como texto UTF-8.
- Produces: un contrato ejecutable dentro de `npm.cmd test`.

- [ ] **Step 1: Escribir el test que falla**

Crear un test con `node:assert/strict` que exija:

```js
assert.match(styles, /\.stage-screen\s*>\s*img\s*\{[^}]*height:\s*auto/s);
assert.match(styles, /@media\s*\(max-width:\s*1079px\)/);
assert.match(styles, /\.stage-caption\s*\{[^}]*position:\s*relative/s);
assert.match(styles, /font-weight:\s*300/);
assert.match(script, /},\s*180\);/);
assert.equal((html.match(/class="model-picker/g) || []).length, 11);
assert.equal((html.match(/class="model-card(?:\s[^"]*)?"/g) || []).length, 11);
```

- [ ] **Step 2: Ejecutar el test y verificar RED**

Run: `node tests/responsive-showroom.test.mjs`

Expected: FAIL porque el preview no declara `height:auto`, falta el breakpoint de `1079px` y el cambio todavía usa `150` ms.

- [ ] **Step 3: Integrar el test al comando principal**

Añadir `node tests/responsive-showroom.test.mjs` antes de `tests/validate-site.mjs` en el script `test` de `package.json`.

- [ ] **Step 4: Commit del contrato rojo**

```powershell
git add package.json tests/responsive-showroom.test.mjs
git commit -m "test: reproduce responsive showroom overflow"
```

---

### Task 2: Composición estable y tipografía fina/bold

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Test: `tests/responsive-showroom.test.mjs`

**Interfaces:**
- Consumes: estructura actual del hero y selector.
- Produces: preview panorámico contenido y layout de una columna debajo de 1080 px.

- [ ] **Step 1: Cargar el peso fino real**

Actualizar Google Fonts para incluir `300` normal e itálica, conservando `400–800`.

- [ ] **Step 2: Corregir el origen del alto gigante**

En `.stage-screen > img`, declarar explícitamente:

```css
.stage-screen > img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1.44 / 1;
  object-fit: cover;
  object-position: top;
}
```

Mantener `width` y `height` en HTML para reservar espacio antes de la carga; CSS debe ganar sobre la pista de presentación.

- [ ] **Step 3: Rebalancear escritorio**

Reducir el alto máximo del escenario, reservar aire entre copy y preview y mantener la ficha dentro de sus límites. El selector debe usar margen positivo y no invadir el hero.

- [ ] **Step 4: Adelantar el cambio a una columna**

Crear `@media (max-width: 1079px)` con:

```css
.hero { grid-template-columns: 1fr; }
.showcase-wrap { width: min(100%, 52rem); margin-inline: auto; }
.showcase-stage { min-height: 0; display: grid; gap: .85rem; padding-top: 2rem; }
.stage-screen { position: relative; inset: auto; width: 100%; transform: none; }
.stage-caption { position: relative; inset: auto; width: 100%; }
.quick-select { margin-top: 2rem; }
```

Las capas traseras se atenúan en tablet y desaparecen debajo de 620 px.

- [ ] **Step 5: Aplicar el contraste tipográfico aprobado**

Usar `300–400` en `.hero-lead`, `.section-heading > p`, metadatos y textos descriptivos. Reservar `700–800` para titulares, nombres de modelo y CTA. Reducir bold innecesario en etiquetas.

- [ ] **Step 6: Verificar GREEN**

Run: `npm.cmd test`

Expected: todos los contratos pasan, incluido `Responsive showroom contract passed`.

- [ ] **Step 7: Commit de composición**

```powershell
git add index.html styles.css package.json tests/responsive-showroom.test.mjs
git commit -m "fix: stabilize showroom responsive composition"
```

---

### Task 3: Movimiento más tranquilo

**Files:**
- Modify: `script.js`
- Modify: `styles.css`
- Test: `tests/responsive-showroom.test.mjs`

**Interfaces:**
- Consumes: `selectModel(modelId)` y clases `.is-changing`, `[data-reveal]`.
- Produces: el mismo estado funcional con transición de 180 ms y movimiento visual más contenido.

- [ ] **Step 1: Ajustar el intercambio del modelo**

Cambiar el temporizador a `180` ms y la transición visual a `280–320` ms. El estado `.is-changing` debe usar opacidad suave sin blur superior a `1px`.

- [ ] **Step 2: Calmar los reveals**

Reducir la distancia de `18px` a `10px`, eliminar `filter: blur(5px)` y mantener la aparición una sola vez.

- [ ] **Step 3: Evitar desplazamientos táctiles**

Dentro de `@media (hover: none)`, anular `transform` en botones y tarjetas para que tocar no mueva la interfaz.

- [ ] **Step 4: Verificar selector y suite**

Run: `npm.cmd test`

Expected: todos los contratos pasan y `getModelState` conserva sus resultados.

- [ ] **Step 5: Commit de movimiento**

```powershell
git add script.js styles.css
git commit -m "fix: calm showroom motion and interaction"
```

---

### Task 4: Auditoría visual, integración y publicación

**Files:**
- Modify only if an audited defect requires a test-first correction.

**Interfaces:**
- Consumes: sitio local y desplegado.
- Produces: `main` publicado y auditado en Cloudflare Pages.

- [ ] **Step 1: Ejecutar verificaciones estáticas**

```powershell
npm.cmd test
git diff --check
```

Expected: exit code `0` en ambos comandos.

- [ ] **Step 2: Auditar los seis viewports en local**

Navegar 1440×1000, 1024×900, 879×866, 768×900, 390×844 y 360×800. En cada tamaño medir:

```js
{
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  cards: document.querySelectorAll('.model-card').length,
  pickers: document.querySelectorAll('.model-picker[data-pick]').length,
  visibleBroken: [...document.images].filter(/* imagen visible sin naturalWidth */).length
}
```

Expected: `overflow:false`, `cards:11`, `pickers:11`, `visibleBroken:0`.

- [ ] **Step 3: Revisar capturas**

Comprobar visualmente que título, acciones, preview, ficha, selector y catálogo tienen separación clara; en 879 px el preview debe quedar apilado y panorámico.

- [ ] **Step 4: Fusionar en `main` y verificar nuevamente**

Aplicar la opción ya solicitada por el usuario: merge local a `main`, ejecutar `npm.cmd test` sobre el resultado y eliminar el worktree creado por este plan.

- [ ] **Step 5: Subir y comprobar despliegue**

```powershell
git push origin main
npx.cmd wrangler pages deployment list --project-name optixtream-modelos
```

Confirmar que el despliegue de producción contiene el SHA exacto de `main`.

- [ ] **Step 6: Auditar producción**

Repetir en `https://optixtream-modelos.pages.dev/` las mediciones de 1440×1000, 879×866 y 390×844, además de respuestas `200` para `/` y `/modelo-01/` a `/modelo-11/`.
