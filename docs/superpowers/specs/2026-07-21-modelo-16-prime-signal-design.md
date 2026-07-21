# Modelo 16 · Prime Signal — Diseño

## Objetivo

Crear una landing IPTV completa que convierta el lenguaje visual de una ficha de personaje de acción en una experiencia propia de OptiXtream. El público son personas que quieren películas, series, deportes y canales en vivo en un servicio simple; el trabajo único de la página es llevarlas a consultar un plan por WhatsApp.

## Dirección elegida

**Prime Signal** trata cada tipo de contenido como la estrella de su propia señal. La composición usa grandes marcos diagonales, recortes editoriales, titulares condensados y personajes originales en movimiento. No replica personajes, nombres, logotipos ni elementos protegidos de Marvel.

Se descartaron dos alternativas: una grilla de pósters clásica, porque pierde el efecto protagonista de la referencia, y una interfaz de control técnico, porque se parece demasiado a modelos IPTV anteriores. Prime Signal conserva la teatralidad editorial y la traduce a navegación real de canales.

## Sistema visual

- Signal Red `#F22432`: energía, CTA y cambios de sección.
- Broadcast Blue `#16356A`: profundidad y paneles de señal.
- Ink `#0B0D12`: contraste y contenido premium.
- Paper `#F6F5F1`: respiración editorial.
- Solar `#FFC83D`: deporte, estados activos y datos.
- Electric `#2C6BFF`: interfaz, foco y movimiento.
- Display: Bebas Neue, mayúscula condensada y dramática.
- Texto: Poppins en 300, 500 y 700 para combinar trazos finos y bloques fuertes.
- Utilidad: Poppins en mayúsculas espaciadas; no se agrega una tercera familia.

## Firma

El **Hero Signal Frame** es un escenario inclinado que cambia de protagonista, imagen, color y texto. Tres señales originales —deporte, cine y naturaleza— se recorren con flechas, indicadores, teclado y gesto táctil. El personaje ocupa el panel derecho y parece atravesar las diagonales de la interfaz.

## Arquitectura de la página

```text
[NAV / PRIME SIGNAL / WHATSAPP]
[COPY + CTA] [HERO SIGNAL FRAME CAMBIANTE]
[TICKER EN VIVO]
[TRES UNIVERSOS DE CONTENIDO EN DIAGONAL]
[GUÍA EN VIVO / HORARIOS]
[BENEFICIOS + DISPOSITIVOS]
[PLANES]
[OPINIONES]
[FAQ]
[CIERRE ROJO + CTA]
```

## Interacciones y responsive

- Carrusel accesible con botones, indicadores, flechas de teclado y swipe.
- Menú móvil desplegable con cierre por Escape y al seleccionar un enlace.
- Acordeón nativo para preguntas frecuentes.
- Revelado por máscara suave solo cuando hay movimiento permitido.
- En móvil, las diagonales se simplifican, el protagonista pasa debajo del copy y todos los CTA mantienen un área táctil cómoda.
- `prefers-reduced-motion` elimina transiciones y autoplay; no se oculta contenido sin JavaScript.

## Contenido y conversión

Todo el copy se escribe para IPTV y usa datos ilustrativos coherentes con el catálogo. Los CTA apuntan a `https://wa.me/5492616027055`. La landing incluye señales en vivo, catálogo, dispositivos, activación, planes, testimonios y respuestas frecuentes.

## Validación

La suite debe reconocer 16 modelos, la ruta `modelo-16/`, la vista previa y el estado del showroom. Se validarán referencias locales, ausencia de rutas absolutas o imágenes remotas, JavaScript, desktop, móvil y la URL publicada.
