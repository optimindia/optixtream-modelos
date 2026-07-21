# Modelo 16 Prime Signal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear, integrar y publicar el Modelo 16 Prime Signal como una landing IPTV completa y responsive inspirada en fichas editoriales de personajes de acción.

**Architecture:** El modelo será una ruta estática independiente con `index.html`, `styles.css`, `script.js` y assets locales. El catálogo raíz seguirá siendo el único registro de navegación y los contratos existentes validarán presencia, orden y estado del modelo.

**Tech Stack:** HTML5, CSS moderno, JavaScript sin dependencias, Node.js para contratos, Cloudflare Pages por integración Git.

## Global Constraints

- No modificar `design/` ni modelos 01–15.
- No usar personajes, nombres, logos o imágenes de Marvel.
- Todo asset visual de producción debe vivir dentro de `modelo-16/assets/`.
- Todos los CTA comerciales apuntan a `https://wa.me/5492616027055`.
- Responsive real desde 360 px y soporte `prefers-reduced-motion`.
- Publicar mediante push a `main` y verificar la URL pública de Cloudflare Pages.

---

### Task 1: Contratos del Modelo 16

**Files:**
- Modify: `tests/showroom-state.test.mjs`
- Modify: `tests/responsive-showroom.test.mjs`
- Modify: `tests/validate-site.mjs`

**Interfaces:**
- Produces: contrato `getModelState('16')` y expectativa de 16 rutas, cards y pickers.

- [ ] **Step 1: Escribir el contrato fallido** con estado `{ id: '16', title: 'Prime Signal', note: 'Cada señal es protagonista', href: 'modelo-16/', src: 'previews/modelo-16.png' }` y conteos de 16.
- [ ] **Step 2: Ejecutar `npm test`** y confirmar fallo por modelo/ruta ausente.
- [ ] **Step 3: Mantener el test rojo** hasta que la integración y los archivos de producción existan.

### Task 2: Arte y landing independiente

**Files:**
- Create: `modelo-16/assets/prime-sport.png`
- Create: `modelo-16/assets/prime-cinema.png`
- Create: `modelo-16/assets/prime-nature.png`
- Create: `modelo-16/index.html`
- Create: `modelo-16/styles.css`
- Create: `modelo-16/script.js`

**Interfaces:**
- Produces: carrusel `[data-signal]`, menú `[data-menu]`, enlaces WhatsApp y secciones completas.

- [ ] **Step 1: Generar tres imágenes originales** sin texto, marcas ni personajes protegidos, con sujeto a la derecha y espacio editorial a la izquierda.
- [ ] **Step 2: Construir HTML semántico** con hero, ticker, universos, guía, beneficios, dispositivos, planes, opiniones, FAQ y cierre.
- [ ] **Step 3: Implementar tokens y responsive** con marcos diagonales, tipografía Bebas Neue/Poppins, foco visible y reducción de movimiento.
- [ ] **Step 4: Implementar JavaScript** para carrusel accesible, swipe, teclado, menú, reveals, año y tracking local de CTA.
- [ ] **Step 5: Ejecutar `node --check modelo-16/script.js`** y corregir cualquier error.

### Task 3: Integración en el catálogo

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Create: `previews/modelo-16.png`

**Interfaces:**
- Consumes: `modelo-16/` terminado.
- Produces: Modelo 16 seleccionado en el escenario, picker 16 y card final.

- [ ] **Step 1: Agregar `Prime Signal` al registro** con nota `Cada señal es protagonista`.
- [ ] **Step 2: Actualizar textos y selector** de 15 a 16 modelos y hacer Prime Signal el escenario inicial.
- [ ] **Step 3: Agregar card destacada y acento propio** sin alterar las cards existentes.
- [ ] **Step 4: Crear la vista previa** desde una captura desktop validada.
- [ ] **Step 5: Ejecutar `npm test`** y confirmar cuatro contratos verdes.

### Task 4: Verificación visual, Git y Cloudflare

**Files:**
- Verify: `modelo-16/**`
- Verify: catálogo raíz

**Interfaces:**
- Produces: commit publicable, `main` actualizado y despliegue Pages confirmado.

- [ ] **Step 1: Servir el sitio localmente** y revisar desktop y móvil en el navegador.
- [ ] **Step 2: Corregir cualquier solapamiento, overflow o problema táctil** y repetir la captura.
- [ ] **Step 3: Ejecutar `npm test`, `node --check modelo-16/script.js` y `git diff --check`** con salida limpia.
- [ ] **Step 4: Commit y fast-forward a `main`**, repetir tests desde `main` y pushear `origin/main`.
- [ ] **Step 5: Confirmar Cloudflare Pages exitoso** y HTTP 200 para catálogo, modelo y assets.
