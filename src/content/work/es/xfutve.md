## La idea

El fútbol venezolano tiene poca cobertura fuera de los medios locales. Quería llevar una pequeña cuenta de X con noticias de la Vinotinto, la liga local y los venezolanos en el extranjero, sin dedicarle horas al día y sin dejar que un bot publicara por su cuenta.

## El ciclo

Dos veces al día una tarea programada lee fuentes de noticias por tema y por jugador. Las filtra por palabras clave, una lista de seguimiento y una lista de fuentes fiables, y ordena lo que queda. Del mejor artículo lee el texto, y Claude Haiku redacta un post con la voz de la cuenta, guiado por unos archivos de texto que describen el estilo.

El borrador llega a Telegram con tres botones: aprobar, editar o rechazar. Un borrador rechazado se reescribe. Un artículo rechazado va a una lista de bloqueo y su lugar lo ocupa el siguiente de la reserva ordenada. Solo los posts aprobados llegan a X.

## Coste

El prompt de sistema se cachea una vez por ejecución, así que un mes de borradores cuesta unos cincuenta céntimos en llamadas a la API. El código tiene un modo automático que se salta la aprobación. Lo tengo apagado.

## Lo que se rompió

Tras un rechazo, a veces no quedaba nada que proponer, así que añadí una reserva de artículos ordenados. El programador de tareas de Windows fallaba con código de salida 1 porque la carpeta de logs aún no existía, y ahora cada tarea pasa por un pequeño script batch que la crea. También hay un modo de prueba que no publica nada, y más de una vez me salvó de subir borradores de test.
