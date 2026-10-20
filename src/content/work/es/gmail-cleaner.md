## El problema

Mi bandeja tenía años de newsletters y un goteo constante de phishing. Los filtros de Gmail ayudan, pero darse de baja de cien remitentes uno por uno se come un fin de semana entero.

## Qué hace

Gmail Cleaner es una app web que corre en tu propio ordenador. Conectas una o varias cuentas de Gmail con un asistente de OAuth y analiza hasta 500 mensajes, puntuando a cada remitente por sus cabeceras, sus resultados de autenticación, palabras típicas del phishing y una lista de dominios de envío masivo.

Para las newsletters usa la cabecera estándar List-Unsubscribe. Nunca se da de baja de un mensaje que puntúa como phishing, porque en el phishing ese enlace es la trampa. Bloquear a un remitente crea un filtro de Gmail que manda su correo futuro a la papelera y limpia el que ya está.

También revisa tu dirección en Have I Been Pwned, y Claude Haiku explica cada filtración en lenguaje claro con los pasos a seguir. Una pequeña extensión de Chrome muestra el recuento en un distintivo.

## Decisiones de diseño

La puntuación de spam es un conjunto de reglas que puedo leer y ajustar. Dejé la IA para la parte en la que una persona necesita ayuda: convertir el registro de una filtración en consejos claros. Todo corre en local y los tokens se quedan en archivos locales.

## Estado

Un prototipo de un día, subido en un solo commit. Funciona con mis cuentas. Antes de que lo use otra persona, la forma de guardar los tokens necesita una revisión a fondo.
