# Modelo 14 Orbital Pulse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with checkpoints.

**Goal:** Crear y publicar el Modelo 14 “Orbital Pulse”, una página de streaming visualmente dinámica con diagonales, círculos, tipografía Poppins y responsive completo, integrada al showroom público.

**Architecture:** Página estática autocontenida en `modelo-14/` siguiendo la estructura probada de los modelos existentes. El showroom raíz agrega el nuevo estado, selector, tarjeta y preview; no se cambian los modelos anteriores. Las interacciones se resuelven con JavaScript vanilla y CSS, sin dependencias nuevas.

**Tech Stack:** HTML semántico, CSS moderno (grid, clip-path, conic/radial gradients, scroll-snap), JavaScript ES modules, Node test contracts, Cloudflare Pages vía GitHub `main`.

## Global Constraints

- No usar la carpeta `design/`.
- No modificar modelos 01–13.
- Todos los CTA comerciales apuntan a `https://wa.me/5492616027055`.
- Respetar `prefers-reduced-motion`, foco visible y teclado.
- La ruta final es `/modelo-14/` y el showroom debe enumerar 14 modelos.
- Usar Poppins como fuente principal; evitar Inter, Montserrat y Manrope.

---

### Task 1: Extender los contratos del showroom

**Files:** `tests/showroom-state.test.mjs`, `tests/responsive-showroom.test.mjs`, `tests/validate-site.mjs`

- [ ] Añadir contrato completo para `getModelState('14')`, cambiar desconocido a `15`, ampliar conteos y rutas a 14.
- [ ] Ejecutar `npm.cmd test` y confirmar RED porque aún no existe Modelo 14.

### Task 2: Construir la página Orbital Pulse

**Files:** `modelo-14/index.html`, `modelo-14/styles.css`, `modelo-14/script.js`, `modelo-14/assets/orbital-hero.png`, `modelo-14/assets/orbital-catalog.png`, `modelo-14/assets/orbital-live.png`

- [ ] Generar e inspeccionar tres assets sin texto, logos ni watermark y copiarlos al proyecto.
- [ ] Crear hero, ticker, catálogo, selector live, beneficios, pasos, planes, FAQ, CTA y footer con copy español real.
- [ ] Implementar Poppins + Space Grotesk + IBM Plex Mono, tokens Orbital Pulse, `clip-path` diagonal, radar circular y luz indigo coherente.
- [ ] Implementar menú/Escape, tabs accesibles, reveals, reduced motion y rails scroll-snap sin overflow en móvil.
- [ ] Ejecutar `node --check modelo-14/script.js`.

### Task 3: Integrar al showroom

**Files:** `script.js`, `index.html`, `styles.css`, `README.md`, `previews/modelo-14.png`

- [ ] Registrar `14: Orbital Pulse`, cambiar contadores/default, añadir picker y tarjeta featured.
- [ ] Capturar preview 1440×1000 siguiendo la convención existente.
- [ ] Ejecutar `npm.cmd test` y dejar los cuatro contratos GREEN.

### Task 4: Verificar, publicar y limpiar

- [ ] Auditar capturas desktop/mobile, menú, tabs, FAQ, imágenes, overflow y consola.
- [ ] Commit: `feat: publish orbital pulse modelo 14`.
- [ ] Merge a `main`, repetir `npm.cmd test`, push y confirmar todas las rutas `200` y el deploy Cloudflare exitoso.
- [ ] Detener server, eliminar worktree enlazado y borrar la rama feature.
