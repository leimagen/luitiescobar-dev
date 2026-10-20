## El punto de partida

Antes de Abril estuvo esto. Quería saber qué podían hacer los modelos locales en mi propio portátil, sin factura de la nube, si les daba nombres, memoria y compañía.

## Qué hace

Esco Playground es una app de escritorio en Electron con backend en Python. Creas agentes con nombre, foto, lista de habilidades y un modelo de Ollama, y los invitas a un chat. Mencionas a uno con @ y responde. Si su respuesta menciona a otro agente, ese también contesta.

Después de cada conversación, un modelo pequeño extrae hechos y los guarda para ese agente en un índice de texto completo de SQLite. Los relevantes vuelven en el siguiente prompt. Desde la interfaz puedes ver, añadir y borrar esos recuerdos. Las respuestas llegan token a token desde Ollama, a través de FastAPI, hasta la interfaz en React.

## Problemas con modelos pequeños

Los modelos locales pequeños se salen del personaje enseguida. Un intercambio de ejemplo de cuatro mensajes al principio de cada prompt, más los recuerdos inyectados como nota del asistente, mantuvo a cada uno en su papel. El extractor de hechos devolvía JSON roto tan a menudo que añadí un paso de reparación. Los agentes respondían en tercera persona o encadenaban respuestas por menciones casuales, así que ahora las menciones se interpretan como llamadas explícitas. Y en Windows, `localhost` resolvía a IPv6 y la comprobación de salud fallaba hasta que usó 127.0.0.1.

## Por qué se quedó aquí

Ocho commits en un día. Me demostró que la memoria y el enrutado entre agentes son la parte interesante, y que quería modelos más capaces detrás. Al día siguiente empecé Abril sobre Claude.
