## El encargo que me hice

Un diario de estudio suele ser un formulario y una lista. Quería ver hasta dónde podían llegar esos mismos datos dentro de una escena: una bóveda de museo sellada, iluminada como una foto de producto, que cambia mientras estudias. También era una prueba pública de lo que puedo dirigir en 3D en tiempo real.

## Lo que muestra la escena

Registras una sesión con materia, tema, duración, dificultad y energía, y la bóveda reacciona. Las torres crecen con tus horas totales en escala logarítmica. El reactor del centro muestra tu racha, que perdona un día perdido. Hay 30 niveles, 22 logros, un mapa de calor y una vista semanal. Todo se guarda en tu navegador y lo puedes exportar en JSON.

## Los gráficos

El agua es una simulación real de ondas en la GPU, una malla de 256 por 256 con paredes que devuelven las olas y cáusticas en el suelo. La niebla se calcula con raymarching contra el buffer de profundidad y 24.000 partículas de polvo se mueven dentro del vertex shader. Los materiales son PBR, con mapas de rugosidad y de normales pintados en un canvas al cargar.

El sonido no usa ningún archivo de audio. El zumbido del reactor, el viento, las gotas y una radio de onda corta con voz sintetizada y código Morse se generan en vivo con la Web Audio API.

## Dos días peleando con la luz

Casi todos los 26 commits tratan de que se viera bien. Un velo lechoso sobre todo resultó ser bloom de emisivos catorce veces más brillantes de la cuenta. Las paredes ignoraban las luces porque las texturas del canvas se leían en el espacio de color equivocado. El suelo metálico parecía agua por culpa de los mapas de normales. Las capas de niebla parecían anillos subiendo por las torres hasta que las cambiamos por niebla volumétrica. Al final le pasé al agente una imagen de referencia y fuimos quitando cosas hasta que la escena se pareció a ella.

Un detalle que me gusta: el agente no podía oír el sonido que estaba diseñando, así que midió los niveles en dBFS con un nodo analizador y equilibró la mezcla con números.

## El proceso

La lógica es JavaScript puro que corre en Node, así que tiene 117 comprobaciones propias, y GitHub Actions las ejecuta antes de cada despliegue a GitHub Pages. Empecé el proyecto en OpenCode y lo seguí en Claude Code. Un archivo MEMORY.md llevó el contexto entre sesiones y entre modelos, incluidos los errores del propio agente, apuntados para que no se repitieran.

También probé ComfyUI en la GPU de 4 GB de mi portátil para generar texturas por adelantado. La escena final no las usa, porque la versión procedural se veía mejor.
