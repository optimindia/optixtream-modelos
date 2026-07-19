# OptiXtream Modelo 12 — Aurora

## Objetivo

Agregar una duodécima experiencia completa al catálogo público de OptiXtream. El nuevo `modelo-12` debe ser independiente, navegable y publicable como una página terminada, con assets propios y una identidad visual que no repita la estética de los modelos 01–11.

Los modelos existentes permanecen intactos. La portada raíz se actualiza de 11 a 12 modelos y mantiene el comportamiento responsive ya corregido.

## Dirección aprobada

**Aurora** interpreta una plataforma de streaming como una señal nocturna que encuentra a cada espectador. Su material visual combina paneles de señal, luz atmosférica y superficies oscuras azul tinta; la página se siente tecnológica y cinematográfica sin caer en negro puro más un único neón.

### Tokens

- Tinta nocturna: `#10142E` — fondo principal.
- Azul profundo: `#18234B` — paneles y navegación.
- Lavanda: `#C6B9FF` — títulos secundarios y superficies suaves.
- Menta: `#B8F6D1` — estado en vivo y señales de acción.
- Azul eléctrico: `#5E7CFF` — enlaces, foco y CTA principal.
- Niebla: `#EAEAF2` — texto claro y superficies de contraste.

### Tipografía

- Display: **Space Grotesk**, pesos 500–700, con títulos amplios y compactos.
- Texto: **Instrument Sans**, pesos 300–500, para descripciones ligeras y legibles.
- Utility: Space Grotesk 500 para etiquetas de señal, sin mono decorativa.
- La firma tipográfica es el contraste entre titulares bold y párrafos finos.

## Firma visual

Una **órbita de señal**: una línea curva fina, visible detrás del hero y en el módulo destacado, que conecta el punto “en vivo” con la tarjeta activa. No es un blob decorativo; nace del lenguaje de una transmisión y se apaga gradualmente con una máscara.

## Estructura de modelo-12

```text
┌────────────────────────────────────────────────────────────┐
│ Aurora / navegación / probar ahora                         │
├────────────────────────────────────────────────────────────┤
│ LA SEÑAL TE ENCUENTRA        panel Aurora + órbita         │
│ Una noche para cada historia  tarjeta destacada            │
├────────────────────────────────────────────────────────────┤
│ +7.500 señales · 4K · 24/7 · todos tus dispositivos        │
├────────────────────────────────────────────────────────────┤
│ Destacados: películas / series / deportes / en vivo        │
├────────────────────────────────────────────────────────────┤
│ Señales en vivo — rail horizontal                          │
├────────────────────────────────────────────────────────────┤
│ Tres beneficios + dispositivos + pasos                     │
├────────────────────────────────────────────────────────────┤
│ Planes Aurora + FAQ + CTA WhatsApp                         │
└────────────────────────────────────────────────────────────┘
```

### Hero

Copy principal: **“La señal te encuentra.”**

Subcopy: “Historias, partidos y mundos nuevos, elegidos para tu próxima noche.” El CTA primario lleva a WhatsApp para pedir la prueba; el secundario baja al catálogo.

La imagen principal es un asset nuevo sin texto incrustado: paisaje nocturno abstracto con aurora lavanda y menta, una silueta de pantalla y profundidad cinematográfica. El texto siempre vive en HTML para mantener accesibilidad y responsive.

### Catálogo y rails

El catálogo usa tarjetas con estados reales: “Estreno”, “En vivo”, “Recomendado” y “Para mirar juntos”. Las tarjetas utilizan los assets propios de Aurora y se desplazan horizontalmente en móvil sin generar overflow de página.

### Conversión

La página conserva el número de WhatsApp autorizado `+54 9 2616 02-7055` y todos los CTAs relevantes usan `https://wa.me/5492616027055`. Se mantienen Meta Pixel PageView y Lead siguiendo el patrón existente.

## Responsive

- Escritorio: hero en dos columnas, rails visibles y planes en tres columnas.
- Tablet: hero apilado antes de la compresión, paneles en dos columnas cuando haya espacio.
- Celular: una columna, CTAs de ancho completo, rails con scroll interno y sin overflow horizontal.
- Menú móvil funcional con `aria-expanded`.
- `scrollWidth === clientWidth` en 390 px.

## Movimiento y accesibilidad

- Entrada del hero por máscara suave, máximo 700 ms.
- Órbita con movimiento ambiental mínimo; se apaga completamente con `prefers-reduced-motion`.
- Hover limitado a tarjetas y botones; no se desplaza la interfaz en touch.
- Foco visible, HTML semántico, alt útil y `aria-live` únicamente donde cambia estado.
- Cero texto esencial dibujado dentro de imágenes.

## Integración del catálogo raíz

- Agregar tarjeta `data-model="12"` en orden después del modelo 11.
- El selector raíz tendrá 12 opciones y el destacado podrá abrir `modelo-12/`.
- `previews/modelo-12.png` será una captura real del nuevo sitio, no un placeholder.
- Los contratos automatizados pasarán de 11 a 12 modelos y seguirán comprobando el orden, referencias locales y rutas.

## Verificación

1. Ejecutar `npm.cmd test` con los contratos actualizados a 12 modelos.
2. Capturar modelo-12 en 1440×1000, 879×866 y 390×844.
3. Confirmar cero overflow, imágenes rotas o errores de consola.
4. Probar menú móvil, filtros, FAQ y CTA de WhatsApp sin enviar formularios.
5. Auditar portada raíz y `/modelo-12/` en Cloudflare Pages después del despliegue.

## Fuera de alcance

- Rediseñar modelos 01–11.
- Cambiar dominio, cuenta de Cloudflare o número de WhatsApp.
- Agregar backend, autenticación o pagos.
