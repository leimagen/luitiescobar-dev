## El juego

Diriges una pequeña agencia de diseño. Tus empleados viven en una oficina en pixel art, trabajan en sus mesas, hablan entre ellos y te escriben correos, y tú les respondes. Llevo años dentro de agencias, así que el material lo conocía bien.

## Cómo funciona

Un simulador en Python hace avanzar el mundo en ticks de cinco segundos, ocho ticks por jornada. Cada empleado tiene un rol, habilidades, rasgos y una nacionalidad, y sus rutinas van desfasadas para que la oficina nunca cambie toda a la vez.

A Claude Haiku solo se le llama para los eventos que importan: un correo al jefe, una conversación entre dos personas, una respuesta a lo que escribiste. Unos tiempos de espera evitan que te inunde la bandeja. El frontend en Phaser 4 dibuja la oficina, ordena los sprites por profundidad y muestra los bocadillos de diálogo en una capa HTML, con pausas para que no se pisen.

## En qué punto está

Un prototipo de dos días en el que la oficina, la bandeja de entrada y las conversaciones funcionan. El documento de diseño va mucho más allá, con contrataciones, una oficina más grande, una economía y envío de correos reales. Es el proyecto al que vuelvo cuando quiero pensar en los agentes como personajes con vida propia.
