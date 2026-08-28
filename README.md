# Wilderness

Versión **0.3** del prototipo de un videojuego 3D procedural de supervivencia, exploración, reclutamiento y conquista inspirado visualmente en el Medio Oriente bíblico.

## Novedades de 0.3

- Mundo generado por **chunks** mientras el jugador avanza.
- **Semillas reproducibles**: una misma semilla vuelve a crear el mismo mundo.
- Biomas: desierto, estepa, valle fértil, oasis y regiones rocosas.
- Caminos procedurales entre asentamientos.
- Aldeas y ciudades con ubicación, tamaño y población variables.
- Ciudades con nombre, rey, murallas, casas y guarnición procedurales.
- Cuevas básicas generadas en regiones rocosas.
- Fauna procedural por región: ovejas, leones, caballos y camellos.
- El botón **NUEVO MUNDO** permite escribir una semilla o generar una aleatoria.
- El terreno lejano se descarga para mantener mejor rendimiento en computadora y teléfono.
- Los seguidores se colocan en una formación básica en vez de amontonarse.
- `ATACAR / F` también da una orden temporal de ataque a los seguidores.

## Mecánicas actuales

- Explorar un mundo 3D generado proceduralmente sin imágenes externas.
- Reclutar aldeanos.
- Dar órdenes para que sigan: gente, ganado, todos o nadie.
- Añadir ovejas al ganado.
- Montar caballos y camellos.
- Combatir soldados y leones.
- Descubrir aldeas, ciudades y cuevas.
- Derrotar la guarnición y el rey para conquistar una ciudad.
- Jugar tanto desde computadora como teléfono.

## Computadora

- `WASD`: mover
- `Shift`: correr
- `E`: interactuar / reclutar / montar / desmontar
- `F`: atacar y ordenar ataque
- `R`: retirada
- `1`: gente
- `2`: ganado
- `3`: todos
- `4`: nadie
- Arrastrar con botón derecho: girar cámara

## Teléfono / tablet

- Joystick izquierdo: mover
- Arrastrar el mundo: girar cámara
- `ACCIÓN`: reclutar / montar / desmontar
- `ATACAR`: atacar y ordenar ataque
- `RETIRADA`: retirar seguidores
- `CORRER`: mantener presionado
- `GENTE / GANADO / TODOS / NADIE`: seleccionar quién sigue al jugador

La orientación horizontal sigue siendo la recomendada.

## Semillas

Puedes abrir un mundo específico usando:

`?seed=583271`

al final de la URL de GitHub Pages, o usar el botón **NUEVO MUNDO** dentro del juego.

## Arquitectura

No hay proceso de build.

- `index.html`: interfaz, controles móviles y selector de semilla.
- `world.js`: generación determinista del mundo, biomas, caminos, asentamientos y cuevas.
- `game.js`: renderizado 3D, chunks, entidades, IA, combate y conquista.

Three.js se carga desde CDN.

## GitHub Pages

Los cambios a `main` se publican mediante GitHub Pages. El repositorio contiene el workflow de despliegue.
