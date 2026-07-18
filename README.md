# OptiXtream · Catálogo de modelos

Catálogo público y repositorio monolítico de once modelos web independientes para experiencias de streaming.

## Estructura

- `/` — catálogo visual público.
- `/modelo-01/` a `/modelo-11/` — sitios autocontenidos, cada uno con su HTML, CSS, JavaScript e imágenes.
- `/previews/` — capturas reales usadas por el catálogo.
- `tests/validate-site.mjs` — contrato de integridad de rutas, archivos, referencias y marca.
- `scripts/migrate-models.mjs` — migración reproducible desde el taller original.

## Desarrollo local

```powershell
npx.cmd serve .
```

## Verificación

```powershell
npm.cmd test
```

## Cloudflare Pages

- Rama de producción: `main`
- Comando de build: vacío
- Directorio de salida: `.`
- Versión de Node recomendada: `22`

Cloudflare Pages publica el repositorio como sitio estático. Los archivos `_headers` y `_redirects` se aplican automáticamente.
