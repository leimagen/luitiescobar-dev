## Por qué un segundo diario de estudio

Un día después de Laboratorio de Estudio construí la misma idea otra vez, lo más pequeña posible: HTML, CSS y JavaScript sin dependencias ni paso de compilación. Hasta se abre directamente desde un archivo en tu disco. Lo usé para practicar desarrollo guiado por especificaciones con Claude Code en algo lo bastante pequeño como para ver cada paso.

## El flujo de trabajo

El repo empieza con una constitución de seis reglas que el agente no puede romper. Después, nueve comandos llevan una funcionalidad de principio a fin: constitución, especificación, aclaración, plan, tareas, implementación, validación, cambio y estado. Cada fase espera mi aprobación antes de que empiece la siguiente.

Dos servidores MCP permiten que el agente revise su propio trabajo. Chrome DevTools abre la página real, incluida una comprobación a 375 px para móvil. Context7 le da documentación actualizada, así lee la API en lugar de adivinarla.

Adapté el flujo de las convenciones de opencode a Claude Code, lo que obligó a reescribir cómo los comandos leen sus argumentos y cómo pasan el trabajo a subagentes.

## La primera funcionalidad

La especificación 001 añadió un mapa de calor al estilo de GitHub con las últimas 12 semanas, cinco niveles de intensidad y tooltips accesibles para lectores de pantalla. La especificación tiene 14 requisitos funcionales y el plan la divide en 8 tareas. En las tareas de interfaz, "primero los tests" significaba escribir la comprobación de DevTools antes del código que la hace pasar.

## Reglas pequeñas que importan

Las fechas son donde este tipo de app se rompe. Salieron dos reglas: nunca usar `toISOString()` y nunca leer una fecha "AAAA-MM-DD" con `new Date()`. Las dos mueven el día a UTC, y una sesión registrada de noche acaba en la fecha equivocada. La lógica recibe "hoy" como parámetro, así 48 tests pueden comprobar rachas para cualquier día del año.

El proyecto tiene tres commits. Lo valioso está en los archivos de proceso que rodean el código: la constitución, los comandos y la especificación aprobada.
