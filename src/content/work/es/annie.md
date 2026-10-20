## Quién era Annie

Annie Tanaka era una agente con su propio correo cuyo trabajo era encontrar empleo. La construí para experimentar con agentes e interacción web automatizada: leer portales de empleo, mantener una hoja de cálculo al día y escribir y responder correos sin que yo pulsara ningún botón. Le di nombre y cara porque escribía a personas, y un correo de Annie se leía muy distinto a uno enviado por "el script de empleos".

## Su día

Cada mañana a las 07:00 UTC un job de GitHub Actions la despertaba. Leía más de once fuentes de empleo remoto, desde RemoteOK y We Work Remotely hasta portales de empresas en Greenhouse y Lever, con listas de palabras clave en inglés y español. Claude Haiku puntuaba cada oferta frente a un perfil de candidato y respondía en JSON con una nota de encaje y comprobaciones de visado y región. Las buenas recibían un CV y una carta de presentación a medida en PDF, un correo por oferta. Una hoja de Google lo registraba todo, con lista negra y marca de "aplicado", para que la misma oferta nunca se enviara dos veces.

Cada 15 minutos revisaba su bandeja. Si le respondía "aplicado" o "saltar", o le dejaba una nota, la clasificaba, actualizaba la hoja y contestaba en su papel. Si le pedía algo que no sabía hacer, me mandaba por correo una propuesta de cambio en el código.

## Reglas para un personaje

Su prompt era estricto. Respuestas cortas, nada de datos inventados, nunca decir que hizo algo técnico que no hizo y un bloque de acción en JSON al final de cada respuesta para que el código supiera qué hacer. El prompt del perfil iba cacheado y las llamadas se reintentaban cuando la API avisaba de saturación.

## Lo que salió mal

Una vez respondió el mismo correo tres veces, y cuatro commits se dedicaron a evitar respuestas duplicadas. Una coma que faltaba en una lista de Python unió en silencio dos palabras clave en una. Cuando añadí un segundo perfil de candidato, datos de una persona aparecieron en las cartas de la otra. Ese es el tipo de error que solo se permite una vez. Los perfiles pasaron a ser clases separadas sobre una base común, con un perfil de ejemplo para copiar en cada candidato nuevo.

## Cómo terminó

40 commits en una semana de mayo de 2026, y no la he vuelto a ejecutar desde entonces. Como experimento cumplió: me enseñó cómo se comporta un agente cuando actúa en la web y escribe a personas por su cuenta, y cuántas reglas necesita antes de confiarle una bandeja de entrada.
