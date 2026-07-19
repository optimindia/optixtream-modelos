# OptiXtream — Ajuste responsive del showroom

## Objetivo

Corregir la composición del hero de la portada para que se perciba pausada, ordenada y premium en escritorio, tablet y celular. La portada debe mantener sus once modelos y su estética clara, pero eliminar el preview desproporcionado, las superposiciones accidentales y la sensación de elementos compitiendo por atención.

El cambio afecta solamente la portada raíz (`/`). Las rutas `/modelo-01/` a `/modelo-11/` permanecen intactas.

## Causa confirmada

La imagen principal del escenario declara `height="1000"` en HTML. En el rango tablet, esa pista de tamaño termina imponiendo una altura computada de aproximadamente 1000 px aunque el CSS establece una proporción panorámica. Como el escenario visual mide cerca de 544 px, la imagen desborda el componente y empuja visualmente la ficha, el selector y el comienzo del catálogo.

La solución debe corregir el tamaño en la fuente y recomponer el hero; no esconder el exceso con un recorte accidental.

## Dirección aprobada

La dirección es **showroom editorial tranquilo**:

- Contraste intencional entre titulares `800`, énfasis itálicos `700` y textos finos `300–400`.
- Superficies claras y silenciosas; el contenido real de los modelos conserva el protagonismo.
- Una sola pieza firma: el contraste tipográfico fino/bold dentro de la promesa principal.
- Movimiento breve y funcional, sin blur pesado ni animación repetida.

### Tokens conservados

- Pearl: `#F5F5F7` — fondo.
- White: `#FFFFFF` — superficies.
- Graphite: `#111216` — texto fuerte.
- Slate: `#686A73` — texto fino.
- Cobalt: `#4F66FF` — selección y acciones.
- Coral: `#FF775F` — detalle secundario reservado.

### Tipografía

- Familia: **Plus Jakarta Sans**.
- Hero y encabezados: `800`, tracking negativo controlado.
- Énfasis editorial: itálica `700`.
- Texto descriptivo: `300–400` con mayor interlineado.
- Etiquetas y metadatos: `400–500`; evitar que todos los textos pequeños parezcan botones bold.

## Composición

### Escritorio, desde 1080 px

```text
┌──────────────────────────────────────────────────────────┐
│ marca                         navegación         consultar │
├──────────────────────────────────────────────────────────┤
│ promesa + explicación        preview panorámica contenida │
│ acciones                     ficha integrada debajo       │
├──────────────────────────────────────────────────────────┤
│ selector discreto de once modelos                         │
├──────────────────────────────────────────────────────────┤
│ catálogo completo                                         │
└──────────────────────────────────────────────────────────┘
```

El preview nunca excede el alto del escenario ni se superpone al selector. Las capas posteriores se reducen en presencia para no producir ruido.

### Tablet y celular, debajo de 1080 px

```text
┌───────────────────────┐
│ promesa               │
│ explicación           │
│ acciones              │
├───────────────────────┤
│ preview panorámica    │
│ ficha del modelo      │
│ selector desplazable  │
├───────────────────────┤
│ catálogo: 1 columna   │
└───────────────────────┘
```

El breakpoint ocurre antes de que las dos columnas queden comprimidas. El orden es siempre mensaje → acción → prueba visual → exploración.

## Comportamiento responsive

- La imagen del escenario usa ancho completo, alto automático y proporción visual estable.
- El contenedor recorta explícitamente el contenido a su marco panorámico.
- La ficha deja de flotar sobre la captura en tablet y celular; pasa a formar parte del flujo.
- El selector se integra al bloque visual y mantiene scroll horizontal interno en móvil.
- Los botones de acción ocupan todo el ancho solamente en móvil estrecho.
- El catálogo usa dos columnas únicamente cuando cada tarjeta conserva un ancho cómodo; debajo cambia a una columna.
- No debe existir desbordamiento horizontal a 360, 390, 768, 879, 1024 ni 1440 px.

## Movimiento

- Cambio de modelo mediante fundido corto de `250–320 ms`, sin desenfoque mayor a 1 px.
- Hover de escritorio contenido; no se aplica desplazamiento táctil en móvil.
- Reveals de secciones con distancia máxima de 10 px y sin blur pesado.
- `prefers-reduced-motion` elimina transiciones y revela todo inmediatamente.

## Contratos de calidad

1. El preview principal debe medir menos que el alto del escenario en los anchos de prueba.
2. Hero, preview, ficha y selector no deben solaparse.
3. Deben seguir existiendo exactamente once selectores y once tarjetas.
4. El selector debe actualizar imagen, nombre, enlace y estado `aria-pressed`.
5. `scrollWidth === clientWidth` en todos los viewports auditados.
6. Cero imágenes visibles rotas.
7. Las rutas de los once modelos continúan respondiendo sin cambios.

## Verificación visual

- Capturas y mediciones en 1440×1000, 1024×900, 879×866, 768×900, 390×844 y 360×800.
- Revisión manual del primer viewport, transición al catálogo y selector activo.
- Prueba de teclado y modo de movimiento reducido.
- Pruebas automatizadas completas antes de publicar.
- Auditoría final sobre la URL pública de Cloudflare Pages, no solamente en local.

## Fuera de alcance

- Rediseñar los once modelos internos.
- Cambiar marca, dominio o infraestructura.
- Añadir nuevas secciones o funciones ajenas al problema responsive.
