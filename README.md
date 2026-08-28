# Wilderness

Wilderness es un prototipo web 3D procedural de supervivencia, exploración, reclutamiento y conquista inspirado visualmente en el Medio Oriente bíblico.

## Versión 0.4 — Ejército y Guerra

La 0.4 convierte a los seguidores en una fuerza militar organizada:

- Hasta **60 seguidores activos** en el prototipo.
- Reclutas con tres especialidades: **infantería, arqueros y caballería**.
- Grupos seleccionables: todos, infantería, arqueros o caballería.
- Órdenes por grupo: **seguir, mantener posición, atacar y retirada**.
- Formaciones: **línea, columna y cuña**.
- Arqueros con proyectiles y combate a distancia.
- Caballería más rápida y con mayor daño de carga.
- Guarniciones de ciudad mixtas con infantería, arqueros y, en ciudades mayores, caballería.
- Separación básica entre seguidores para reducir amontonamientos.
- Tras conquistar una ciudad, sus habitantes pueden ser reclutados.
- Se mantiene el mundo procedural por chunks, semillas, biomas, caminos, cuevas, aldeas, ciudades variables, ganado y monturas.
- Compatible con computadora, teléfono y tablet.

## Computadora

- WASD: mover
- Shift: correr
- E: interactuar / reclutar / montar
- F: atacar y ordenar ataque al grupo seleccionado
- Q: cambiar grupo seleccionado
- V: cambiar formación
- T: ordenar seguir
- H: mantener posición
- R: retirada
- 1: que siga la gente
- 2: que siga el ganado
- 3: que sigan todos
- 4: que no siga nadie
- Arrastrar con botón derecho: girar cámara

## Teléfono / tablet

- Joystick izquierdo: mover
- Arrastrar el mundo: girar cámara
- ACCIÓN: interactuar / reclutar / montar
- ATACAR: ataque personal + orden de ataque al grupo seleccionado
- RETIRADA: retirar el grupo seleccionado
- CORRER: mantener presionado
- GRUPO: alternar Todos / Infantería / Arqueros / Caballería
- FORMA: alternar Línea / Columna / Cuña
- SEGUIR: ordenar seguir al grupo seleccionado
- MANTENER: fijar la posición del grupo seleccionado
- GENTE / GANADO / TODOS / NADIE: decidir qué parte del pueblo acompaña al jugador

La orientación horizontal es la recomendada para batallas grandes.

## Mundo procedural

Cada mundo tiene una semilla reproducible. El terreno se genera por chunks alrededor del jugador e incluye desierto, estepa, valles fértiles, oasis y regiones rocosas. Las ciudades tienen nombre, rey, población y guarnición variables.

## Arquitectura

No hay proceso de build.

- `index.html`: interfaz y controles.
- `world.js`: semilla y generación procedural.
- `engine04.js`: renderizado, chunks, entidades, asentamientos y tipos de tropas.
- `army04.js`: órdenes, formaciones, reclutamiento, combate e IA militar.
- `main04.js`: jugador, cámara, conquista, interfaz y loop principal.

## GitHub Pages

Los cambios a `main` se publican automáticamente mediante GitHub Pages.
