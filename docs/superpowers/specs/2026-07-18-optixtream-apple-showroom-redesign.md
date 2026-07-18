# OptiXtream Apple Showroom — Especificación de rediseño

## Objetivo

Reemplazar por completo la portada actual de OptiXtream por un catálogo público luminoso, simple y premium. La página debe mostrar los once modelos de forma inmediata, ayudar a compararlos y llevar al visitante a abrir un modelo o consultar por WhatsApp.

El rediseño afecta únicamente la portada raíz (`/`). Las rutas `/modelo-01/` a `/modelo-11/` permanecen intactas.

## Dirección visual

La dirección aprobada es **Apple Showroom**: superficies claras, jerarquía tipográfica fuerte, imágenes protagonistas, bordes amplios y movimiento mínimo.

### Tokens

- Pearl: `#F5F5F7` — fondo general.
- White: `#FFFFFF` — tarjetas y superficies elevadas.
- Graphite: `#111216` — títulos y navegación.
- Slate: `#686A73` — texto secundario.
- Cobalt: `#4F66FF` — acciones y selección.
- Coral: `#FF775F` — segundo acento reservado para detalles cálidos.

### Tipografía

- Familia única: **Plus Jakarta Sans**.
- Display: 700–800, tracking negativo moderado.
- Énfasis editorial: itálica 600–700 dentro de titulares, nunca como decoración aislada.
- Texto: 400–500, alto contraste y ancho de línea breve.
- Labels: 600–700, tamaño pequeño sin espaciado excesivo.

## Estructura

```text
┌────────────────────────────────────────────┐
│ Navegación translúcida                     │
├────────────────────────────────────────────┤
│ Hero: promesa + CTA                        │
│ Gran pantalla flotante con modelo destacado│
├────────────────────────────────────────────┤
│ Selector rápido de modelos                 │
├────────────────────────────────────────────┤
│ Catálogo completo: 2 columnas / 1 móvil    │
│ [01] [02]                                  │
│ [03] [04] ... [11 destacado]               │
├────────────────────────────────────────────┤
│ Tres garantías: responsive, independiente, │
│ personalizable                             │
├────────────────────────────────────────────┤
│ Cómo elegir: mirar → comparar → consultar  │
├────────────────────────────────────────────┤
│ CTA final + footer                         │
└────────────────────────────────────────────┘
```

## Componentes

### Navegación

Barra sticky blanca translúcida con marca OptiXtream, enlace a modelos y CTA compacto “Consultar”. En móvil mantiene la marca y el CTA sin menú hamburguesa innecesario.

### Hero

Titular: **“Tu próxima web empieza acá.”** La palabra “web” o la segunda línea usa itálica para dar contraste sin recurrir a una segunda familia.

El texto debe explicar en una frase que son once experiencias completas e independientes. Los CTA serán “Explorar modelos” y “Ver selección”.

A la derecha, una gran pantalla con captura real del modelo 11. Detrás aparecen solo dos capas de otras capturas, desplazadas y desenfocadas levemente para comunicar colección. En móvil se apilan después del texto y nunca se cortan.

### Selector rápido

Una fila de once botones compactos permite cambiar la captura y los metadatos del escenario destacado sin navegar. El estado activo es accesible y visible. En móvil la fila tiene scroll horizontal contenido, sin desbordar la página.

### Catálogo

Once tarjetas grandes con captura real, nombre, personalidad y acción “Explorar modelo”. Dos columnas en escritorio, una en celular. La tarjeta 11 ocupa el ancho completo al final y se identifica como selección OptiXtream.

No se usarán números como adorno: cada número identifica realmente la ruta del modelo.

### Garantías

Tres bloques breves explican:

1. Responsive real en escritorio y celular.
2. Cada modelo vive en su propia ruta y no depende de los demás.
3. La identidad, textos y llamadas a la acción pueden personalizarse.

### Proceso

Secuencia real de tres pasos: mirar, comparar y consultar. Al ser un proceso, la numeración sí comunica orden.

### Contacto

Bloque final claro con el texto “¿Encontraste el indicado?” y CTA a `https://wa.me/5492616027055`. No habrá un cierre negro agresivo ni texto gigante decorativo.

## Movimiento

- Entrada inicial coordinada de titular, texto y pantalla en menos de 700 ms.
- Cambio de modelo mediante fundido y desplazamiento de 8–12 px.
- Hover de tarjetas con elevación máxima de 6 px y escala de imagen no mayor a `1.015`.
- Reveal por sección una sola vez mediante `IntersectionObserver`.
- Soporte completo de `prefers-reduced-motion`.
- Sin marquees, cursores personalizados, parallax ni animaciones permanentes.

## Responsive

- Escritorio: hero en dos columnas y catálogo en dos columnas.
- Tablet: hero equilibrado y catálogo en dos columnas compactas.
- Celular: una columna, CTA a ancho completo, tarjetas con proporción estable y selector horizontal interno.
- Criterio obligatorio: `scrollWidth === clientWidth` en 390 px para la página completa.

## Accesibilidad y calidad

- Foco visible en todos los enlaces y botones.
- Contraste AA como mínimo.
- Botones del selector con `aria-pressed` y nombres completos.
- Imágenes con texto alternativo útil y dimensiones declaradas.
- Carga diferida bajo el primer viewport.
- HTML semántico, sin controles falsos.
- La portada debe seguir conteniendo exactamente once elementos `data-model` en orden `01`–`11` para conservar el contrato automatizado existente.

## Verificación

1. Ejecutar `npm.cmd test`.
2. Revisar `git diff --check`.
3. Capturar y criticar la portada en 1440×1000 y 390×844.
4. Verificar interacción del selector y navegación a un modelo.
5. Confirmar cero desborde horizontal y cero imágenes visibles rotas.
6. Publicar en `main` y comprobar `/` y `/modelo-11/` en Cloudflare Pages.

## Fuera de alcance

- Cambiar el diseño interno de los once modelos.
- Añadir backend, autenticación o panel de administración.
- Cambiar el dominio o la configuración de rutas de Cloudflare.
