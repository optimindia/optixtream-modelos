# OptiXtream Modelo 14 — Orbital Pulse

## Contexto

Modelo 14 debe ampliar el catálogo público de OptiXtream sin parecer una variación de Vértigo. El pedido es explícito: abandonar la sensación cuadrada y recta, sumar diagonales, círculos y movimiento, y usar una fuente de aire Poppins. La página conserva el objetivo del showroom: convertir una visita en una consulta por WhatsApp.

## Dirección visual

**Orbital Pulse** toma materiales de una señal satelital y de una interfaz de control musical: círculos concéntricos, líneas de órbita, paneles diagonales y una única fuente de luz que cruza el layout de izquierda a derecha. La firma es un “radar de selección” en el hero: un disco grande con anillos y una ventana de contenido que rota levemente al cambiar de estación.

No se reutiliza la dirección broadcast coral/ultramarina de Vértigo. Orbital Pulse usa un azul tinta con lavanda eléctrica, lima cítrica y un blanco frío; los radios son amplios y las tarjetas se recortan con diagonales, no con rectángulos rígidos.

## Sistema de tokens

- `--night: #11152F` — fondo profundo con tinte azul.
- `--indigo: #5865F2` — acento principal y estados activos.
- `--lime: #D9F36B` — señal de acción y contraste.
- `--lilac: #C8B8FF` — halo secundario y notas editoriales.
- `--fog: #F2F3F8` — superficie clara de lectura.
- `--ink: #17192A` — texto de alta legibilidad.

Tipografía: `Poppins` 300/400/500/600/700/800 para texto y titulares; `Space Grotesk` 500/700 para display corto y números de señal; `IBM Plex Mono` 400/500 solo en telemetría.

## Estructura de experiencia

1. **Hero / Orbital Pulse**: headline “Elegí tu próxima órbita.”, CTA a WhatsApp, prueba social breve y radar circular con imagen hero.
2. **Marquee de señal**: cinta animada con estrenos, deportes y cine.
3. **Constelación de catálogo**: una pieza diagonal destacada más dos órbitas secundarias con imágenes y badges.
4. **Selector en vivo**: tabs accesibles que actualizan título, categoría y audiencia; tarjetas en rail horizontal en móvil.
5. **Beneficios / dispositivos**: tres círculos visuales y línea de dispositivos compatibles.
6. **Ruta de activación**: tres pasos con diagonales y microanimación de entrada.
7. **Planes**: tres tarjetas con una opción “Órbita” destacada y acciones consistentes.
8. **FAQ y cierre**: preguntas nativas `<details>` y CTA final con círculos concéntricos de baja opacidad.

## Interacción y accesibilidad

- Menú móvil con `aria-expanded`, cierre con Escape y foco visible.
- Selector de canales con `role="tablist"`, `aria-selected` y estado sincronizado.
- Revelado por IntersectionObserver y fallback para reduced motion.
- `prefers-reduced-motion: reduce` desactiva marquee, transformaciones y reveals.
- Imágenes con alt descriptivo, loading lazy fuera del hero y sin overflow horizontal en 390px, 768px y desktop.
- Todos los CTA comerciales apuntan a `https://wa.me/5492616027055` y registran `Lead` si Meta Pixel está presente.

## Límites

- No modificar visual ni estructuralmente los modelos 01–13.
- No añadir backend, dependencias ni librerías de animación.
- Mantener la página autocontenida en `modelo-14/` y el índice del showroom como única integración global.

## Criterio de aceptación

- Ruta pública `/modelo-14/` completa y navegable.
- Catálogo raíz muestra 14 modelos y selecciona Modelo 14 por defecto.
- Suite `npm.cmd test` verde con contratos actualizados.
- Capturas desktop y móvil revisadas; no hay clipping, overflow ni errores de consola.
- Deploy de Cloudflare Pages exitoso desde `main`.
