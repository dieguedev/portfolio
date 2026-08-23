# Portfolio

Portfolio personal de Diegue, construido con Next.js (App Router), React, TypeScript y Tailwind CSS. Se exporta como sitio estático (`output: "export"`).

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando         | Acción                                                  |
| :--------------- | :------------------------------------------------------ |
| `npm install`     | Instala las dependencias                                 |
| `npm run dev`      | Arranca el servidor de desarrollo en `localhost:3000`    |
| `npm run build`    | Genera el export estático en `./out/`                    |
| `npm start`        | Sirve el contenido de `./out/` (requiere build previo)   |
| `npm run lint`     | Ejecuta ESLint                                            |

## Estructura

```text
src/
├── app/          # Rutas (App Router)
├── components/   # Componentes reutilizables
├── sections/     # Secciones de página compuestas por componentes
├── lib/          # Hooks y utilidades
├── assets/       # Imágenes e iconos importados como módulos
└── fonts/        # Fuentes locales (next/font/local)
```
