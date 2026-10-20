## La pregunta

En la fase de grupos de un Mundial todo el mundo pregunta lo mismo: si los partidos terminaran ahora, ¿quién pasa? Con 12 grupos, ocho mejores terceros y partidos a la misma hora, es difícil calcularlo de cabeza. FWC2026 Live lo responde mientras se siguen jugando.

## Cómo funciona

Cada marcador en vivo se toma como resultado final. La app recalcula las doce tablas, ordena a los terceros y proyecta los dieciseisavos, incluido lo que pasa cuando cambian a la vez dos partidos del mismo grupo. Los desempates siguen el orden de la FIFA para 2026: primero el enfrentamiento directo, que se vuelve a aplicar a los equipos que siguen empatados, y después diferencia de goles, goles a favor, juego limpio y ranking. Ese motor lo escribí yo en lugar de fiarme de la clasificación de un feed.

Cada grupo tiene un panel de simulación donde puedes sumar o quitar goles sin tocar los datos en vivo. Una marquesina muestra goles, goleadores, asistencias y tarjetas en el momento, y las notificaciones push avisan de goles, rojas e inicios de partido, con opción de silenciar cada partido. El sitio se instala como app, también en iPhone.

## Infraestructura con poco presupuesto

El sitio es Astro y React estático en Cloudflare Pages. Los datos en vivo vienen de un pequeño servicio en Python en una Raspberry Pi en casa. Consulta API-Football cada diez segundos mientras hay partido, se duerme cuando no se juega nada y se despierta antes del inicio. La clave de la API y las claves push nunca salen de la Pi. Los visitantes tampoco llegan a ella: un Cloudflare Tunnel expone un único endpoint JSON limpio y la caché de Cloudflare absorbe el tráfico.

La analítica solo carga con consentimiento, y las páginas llevan hreflang, sitemap y tarjetas para compartir en los dos idiomas.

## Cuatro días

25 commits entre el 20 y el 23 de junio de 2026. El primer día salieron el prototipo, la fuente de datos y el motor de proyección. El segundo, las notificaciones push, actualizaciones más rápidas, la analítica con consentimiento y las banderas reales. El último arreglo hizo que las tablas se movieran bien cuando cambiaba un marcador real.
