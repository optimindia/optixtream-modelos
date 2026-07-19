# OptiXtream Modelo 13 — Vértigo

## Objetivo

Agregar una decimotercera experiencia independiente al catálogo de OptiXtream. Vértigo debe sentirse como una transmisión editorial en movimiento: rápida, expresiva y memorable, pero clara para pedir una prueba por WhatsApp. Los modelos 01–12 no se rediseñan.

## Dirección visual aprobada

Vértigo convierte una plataforma de streaming en una señal que cambia de canal frente a tus ojos. La composición usa recortes diagonales, una ventana partida en dos y módulos que parecen placas de transmisión. La audacia vive en la división cromática del hero; el resto mantiene una retícula limpia para que el catálogo siga siendo usable.

### Tokens

- Ultramarino: `#171C5A` — fondo principal y superficies de alto contraste.
- Coral de señal: `#FF6B57` — titulares activos, estados y momentos de conversión.
- Amarillo solar: `#FFD45C` — resaltado secundario y etiquetas de programación.
- Azul hielo: `#D9E8FF` — fondos de lectura y contraste suave.
- Carbón: `#171821` — texto, bordes y paneles oscuros.
- Blanco de estudio: `#F8F8F4` — superficies claras y descanso visual.

### Tipografía

- Display: **Bebas Neue**, pesos 400–700, en titulares compactos y numerales grandes.
- Texto: **Manrope**, pesos 400–700, para navegación, párrafos y acciones.
- Utility: **IBM Plex Mono**, sólo en códigos de transmisión, horas y estados que representan datos reales.

La firma tipográfica es el choque entre display condensado, cuerpo geométrico y pequeños datos monoespaciados; no se usa como decoración terminal.

## Firma visual

La **ventana partida**: un marco diagonal atraviesa la pieza hero y divide una imagen de programación en dos momentos simultáneos. En desktop el marco se desplaza unos píxeles al entrar; en móvil se convierte en dos paneles apilados. La línea no aparece en cada componente, sólo en el hero y en la cabecera de catálogo.

## Estructura de modelo-13

```text
┌──────────────────────────────────────────────────────────────┐
│ VÉRTIGO / navegación / VER AHORA                            │
├──────────────────────────────────────────────────────────────┤
│ HOY CAMBIA LA SEÑAL       ventana partida / programa activo │
│ copy + CTA                 show A / show B / live marker    │
├──────────────────────────────────────────────────────────────┤
│ 24:00  EN VIVO  4K  7 DÍAS  — ticker de programación       │
├──────────────────────────────────────────────────────────────┤
│ ELEGÍ TU CORTE  / destacado + dos tarjetas + géneros        │
├──────────────────────────────────────────────────────────────┤
│ CAMBIO DE CANAL  / rail horizontal de señales               │
├──────────────────────────────────────────────────────────────┤
│ POR QUÉ VÉRTIGO / tres beneficios + dispositivos            │
├──────────────────────────────────────────────────────────────┤
│ TRES FORMAS DE ENTRAR / pasos                               │
├──────────────────────────────────────────────────────────────┤
│ PLANES / FAQ / CTA final WhatsApp                            │
└──────────────────────────────────────────────────────────────┘
```

## Hero y copy

- Eyebrow: `Modelo 13 · Vértigo`.
- Título: **“Hoy cambia la señal.”**
- Subcopy: `Películas, partidos y mundos nuevos. Elegí un corte y dejá que la noche haga el resto.`
- CTA principal: `Ver Vértigo` → `https://wa.me/5492616027055`.
- CTA secundario: `Explorar cortes` → `#catalogo`.

La imagen principal no contiene texto incrustado: un estudio de transmisión con un panel coral y otro ultramarino, una figura humana desenfocada y una luz amarilla que cruza el marco diagonal.

## Contenido y conversión

- Catálogo con estados reales: `Ahora`, `Estreno`, `Última función`, `Para compartir`.
- CTA de WhatsApp autorizado: `https://wa.me/5492616027055` en hero, planes, catálogo y cierre.
- Meta Pixel: conservar `PageView`; CTAs disparan `Lead` con `content_name: OptiXtream Vértigo 13`.
- FAQ con `details/summary`, una respuesta abierta inicialmente.

## Responsive y accesibilidad

- Desktop (≥1080px): hero dividido 44/56, ventana partida superpuesta, rails visibles y planes en tres columnas.
- Tablet (621–1079px): hero apilado, ventana partida refluida, tarjetas en dos columnas.
- Mobile (≤620px): header con menú funcional, CTA de ancho completo, ventana partida en dos paneles, rails con scroll interno y `scrollWidth === clientWidth`.
- Focus visible, HTML semántico, alt útil, `aria-expanded` en menú, `aria-live` sólo para cambios de canal.
- `prefers-reduced-motion` desactiva el desplazamiento del marco y deja todos los reveals visibles.

## Integración del catálogo

- Agregar `/modelo-13/` después de `/modelo-12/`.
- Agregar `previews/modelo-13.png` como captura real.
- Actualizar el selector, tarjetas, estado `getModelState('13')` y contratos de 12 a 13 modelos.
- No tocar el contenido de los modelos 01–12.

## Verificación

1. Ejecutar `npm.cmd test` con todos los contratos ampliados a 13.
2. Capturar Vértigo en 1440×1000, 879×866 y 390×844.
3. Confirmar cero overflow, imágenes rotas y errores de consola.
4. Probar menú móvil, enlaces de cortes, FAQ y CTA sin enviar formularios.
5. Auditar catálogo raíz y `/modelo-13/` en Cloudflare Pages después del push.

## Fuera de alcance

- Rediseñar modelos 01–12.
- Cambiar dominio, cuenta de Cloudflare o número de WhatsApp.
- Backend, autenticación, pagos o catálogo dinámico.
