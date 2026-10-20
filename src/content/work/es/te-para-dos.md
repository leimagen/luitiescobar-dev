## Un juego de casa

Té Para Dos es un juego de cartas que se juega en mi familia. Las reglas vivían en la cabeza de cada uno hasta que las puse por escrito. Quería una versión que mis familiares pudieran jugar en el ordenador contra la máquina, con una mesa parecida a la de verdad y letras grandes para que se lean bien a cualquier edad.

## De Unity a Godot

Un prototipo en Unity, en primavera, dejó las reglas funcionando y poco más. A finales de septiembre empecé de nuevo en Godot 4.7, que es gratis y no cobra regalías si algún día el juego se vende. Las reglas pasaron del prototipo. Todo lo demás llevó seis días y 29 commits.

## Cómo está hecho

El motor de reglas vive en su propia carpeta y no sabe nada de gráficos: 108 cartas (dos barajas y cuatro comodines), monos, seguidillas del as a la reina, un mazo propio para cada jugador y una basura de cuatro huecos. Encima va una mesa 3D vista desde arriba. Las cartas vuelan en arco, se voltean, se reparten y caen en cascada, con un shader de desenfoque de movimiento para los vuelos. Puedes arrastrar una carta o hacer clic, los destinos válidos se iluminan en dorado y, si te quedas quieto ocho segundos, el juego te da una pista.

El rival es un conjunto de reglas de prioridad, sin ningún modelo detrás. Juega rápido y de forma predecible, que es lo que pide un juego familiar.

Hay un tutorial de nueve pasos con mesas animadas en miniatura, una primera partida guiada, tres idiomas (inglés, español y portugués) y una pieza de handpan en Re Kurd que un script de Python sintetiza desde cero.

## Probar sin probadores

Claude no puede jugar, así que hicimos que el juego se jugara solo. Un script sin interfaz juega más de 300 partidas de máquina contra máquina y avisa si se rompe alguna regla. La primera tanda salió limpia. Una posterior encontró un error en cómo el rival usaba los monos. Otros dos scripts hacen clics reales por los menús y la partida guiada y guardan capturas, así podía revisar el recorrido sin tener que hacerlo a mano cada vez.

## El problema de la licencia

A mitad del proyecto leí la licencia del arte de las cartas que estaba usando y vi que no permitía vender el juego. Cambiamos la baraja entera. Generé las figuras, los comodines y los reversos con ChatGPT, y un script dibuja las cartas numéricas con el mismo estilo. Los fieltros salen de texturas de tela CC0. Hoy todos los recursos del juego se pueden vender.

## Mi parte

Diseñé el juego y dirigí el arte. Claude Code escribió el código, con skills específicas de lógica de cartas, game feel, animación en Godot y audio cargadas en cada sesión. Una bitácora del proyecto guardaba cada decisión para que la siguiente sesión retomara donde se quedó la anterior.

La versión 1.0 está en itch.io para Windows, con la de macOS lista. Lo siguiente es Steam.
