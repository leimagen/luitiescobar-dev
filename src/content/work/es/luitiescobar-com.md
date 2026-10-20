## De una página a un sitio completo

Mi portafolio de diseño era una sola página HTML estática. En octubre de 2026 lo reconstruí como un sitio bilingüe con cuatro disciplinas, case studies y un CMS que puedo editar desde el móvil. Llevó cinco días y 20 commits, y está en producción desde el 17 de octubre.

## Stack

Astro 7 genera cada página desde Sanity al compilar y Cloudflare Workers las sirve. El Sanity Studio vive en su propio subdominio. El único código de servidor es el botón de like: un like por visitante y proyecto, guardado en Cloudflare D1 como un hash con sal en lugar de cualquier dato personal, y un mensaje de Telegram para mí cuando alguien nuevo da like a un proyecto.

Primero diseñé las páginas en Figma, a través del MCP de Figma, y las revisé antes de escribir una línea de código.

## Mudar 15 años de trabajo

Un script importó 35 proyectos antiguos desde Behance y el sitio anterior a Sanity como borradores, con textos en los dos idiomas, para que pudiera revisar cada uno antes de publicarlo. La sección AI Media tiene tres case studies de mi propio trabajo con Kling AI, hechos a partir de mis ilustraciones y modelos de Blender.

## Los detalles que llevaron tiempo

La analítica solo carga cuando aceptas las cookies, y rechazar cuesta el mismo clic que aceptar. Vistas previas para compartir, datos estructurados, un sitemap con los dos idiomas y un favicon dibujado con la tipografía del logo. Los vídeos se quedan fuera del CMS para no pagar ancho de banda. Un despliegue subió a producción páginas de prueba antiguas porque la carpeta de compilación no se limpiaba, así que ahora la regla es borrarla antes de cada build.

## Cómo recuerda el agente

El repo tiene un MEMORY.md que Claude Code lee al empezar cada sesión y actualiza en cada hito: qué está en producción, dónde está cada cosa, qué decidí y por qué. Este sitio se construyó igual, partiendo de ese archivo.
