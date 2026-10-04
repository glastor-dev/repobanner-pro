# Vercel Configuration for RepoBanner

## Despliegue en Vercel

1. Haz login en Vercel y conecta tu repositorio.
2. Asegúrate de tener el archivo `.env.local` con tu clave `GEMINI_API_KEY` en la raíz del proyecto (no lo subas al repo).
3. Vercel detectará automáticamente el framework (Vite + React) y los endpoints en `/api` como serverless functions.
4. No necesitas configurar `vercel.json` salvo que quieras personalizar rutas o regiones.

## Variables de entorno

- `GEMINI_API_KEY`: Tu clave de API de Gemini. Debe estar en `.env.local` (no en el repo).

## Recomendaciones

- Usa la opción "Environment Variables" en el dashboard de Vercel para definir `GEMINI_API_KEY` en producción.
- Los endpoints `/api/analyze` y `/api/social` ya incluyen rate limiting y cache en memoria.
- Si usas imágenes generadas, recuerda que el almacenamiento es efímero en serverless (usa URLs externas si necesitas persistencia).

## Scripts útiles

- `npm run dev` — Desarrollo local
- `npm run build` — Build de producción
- `npm run preview` — Previsualización local del build
- `npm run lint` — Linter
- `npm run typecheck` — Chequeo de tipos

## Troubleshooting

- Si tienes errores 500 en endpoints, revisa la variable de entorno y los logs de Vercel.
- Si el frontend no encuentra los endpoints, asegúrate de que estén en `/api` y que el build esté actualizado.

---

Para más detalles, consulta la documentación oficial de Vercel: https://vercel.com/docs
