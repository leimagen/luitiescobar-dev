## La pregunta

En la fase de grupos del Mundial 2026 todo el mundo preguntaba lo mismo: si los partidos terminaran ahora, ¿quién pasa? Con 12 grupos, ocho mejores terceros y partidos a la misma hora, era difícil calcularlo de cabeza. FWC2026 Live lo respondía mientras se seguían jugando.

## Cómo funcionaba

Cada marcador en vivo se tomaba como resultado final. La app recalculaba las doce tablas, ordenaba a los terceros y proyectaba los dieciseisavos, incluido lo que pasaba cuando cambiaban a la vez dos partidos del mismo grupo. Los desempates seguían el orden de la FIFA para 2026: primero el enfrentamiento directo, que se volvía a aplicar a los equipos que seguían empatados, y después diferencia de goles, goles a favor, juego limpio y ranking. Ese motor lo escribí yo en lugar de fiarme de la clasificación de un feed.

Cada grupo tenía un panel de simulación donde podías sumar o quitar goles sin tocar los datos en vivo. Una marquesina mostraba goles, goleadores, asistencias y tarjetas en el momento, y las notificaciones push avisaban de goles, rojas e inicios de partido, con opción de silenciar cada partido. El sitio se podía instalar como app, también en iPhone.

## Infraestructura con poco presupuesto

El sitio era Astro y React estático en Cloudflare Pages. Los datos en vivo venían de un pequeño servicio en Python en una Raspberry Pi en casa. Consultaba API-Football cada diez segundos mientras había partido, se dormía cuando no se jugaba nada y se despertaba antes del inicio. La clave de la API y las claves push nunca salieron de la Pi. Los visitantes tampoco llegaban a ella: un Cloudflare Tunnel exponía un único endpoint JSON limpio y la caché de Cloudflare absorbía el tráfico.

La analítica solo cargaba con consentimiento, y las páginas llevaban hreflang, sitemap y tarjetas para compartir en los dos idiomas.

## Cuatro días

25 commits entre el 20 y el 23 de junio de 2026, en plena fase de grupos. El primer día salieron el prototipo, la fuente de datos y el motor de proyección. El segundo, las notificaciones push, actualizaciones más rápidas, la analítica con consentimiento y las banderas reales. El último arreglo hizo que las tablas se movieran bien cuando cambiaba un marcador real.

El Mundial terminó hace meses. El sitio sigue en línea y el feed en vivo se apagó después de la final.
