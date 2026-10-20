## Quién es Annie

Annie Tanaka es una agente con su propio correo cuyo trabajo es encontrar empleo. Le di nombre y cara porque escribe a personas, y un correo de Annie se lee muy distinto a uno enviado por "el script de empleos".

## Su día

Cada mañana a las 07:00 UTC un job de GitHub Actions la despierta. Lee más de once fuentes de empleo remoto, desde RemoteOK y We Work Remotely hasta portales de empresas en Greenhouse y Lever, con listas de palabras clave en inglés y español. Claude Haiku puntúa cada oferta frente a un perfil de candidato y responde en JSON con una nota de encaje y comprobaciones de visado y región. Las buenas reciben un CV y una carta de presentación a medida en PDF, un correo por oferta. Una hoja de Google lo registra todo, con lista negra y marca de "aplicado", para que la misma oferta nunca se envíe dos veces.

Cada 15 minutos revisa su bandeja. Si le respondo "aplicado" o "saltar", o le dejo una nota, la clasifica, actualiza la hoja y contesta en su papel. Si le pido algo que no sabe hacer, me manda por correo una propuesta de cambio en el código.

## Reglas para un personaje

Su prompt es estricto. Respuestas cortas, nada de datos inventados, nunca decir que hizo algo técnico que no hizo y un bloque de acción en JSON al final de cada respuesta para que el código sepa qué hacer. El prompt del perfil va cacheado y las llamadas se reintentan cuando la API avisa de saturación.

## Lo que salió mal

Una vez respondió el mismo correo tres veces, y cuatro commits se dedicaron a evitar respuestas duplicadas. Una coma que faltaba en una lista de Python unió en silencio dos palabras clave en una. Cuando añadí un segundo perfil de candidato, datos de una persona aparecieron en las cartas de la otra. Ese es el tipo de error que solo se permite una vez. Ahora los perfiles son clases separadas sobre una base común, con un perfil de ejemplo para copiar en cada candidato nuevo.

## Estado

40 commits en una semana de mayo de 2026. Funciona, y está en pausa mientras me centro en otros proyectos.
