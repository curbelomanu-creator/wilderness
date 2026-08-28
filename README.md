# Wilderness

Wilderness es un prototipo web 3D procedural de supervivencia, exploración, reclutamiento, vida nómada y conquista inspirado visualmente en el Medio Oriente bíblico.

## Versión 0.5 — Campamento, Ganado y Pastores

La 0.5 añade la primera capa real de supervivencia colectiva y vida nómada:

- **Campamento móvil** que puedes establecer y levantar en cualquier región.
- El campamento genera visualmente tiendas, fogata, cajas y un corral.
- Puedes dejar el ganado en el campamento mientras sales con tu gente.
- Hasta **3 seguidores pueden ser asignados como pastores**.
- Los pastores permanecen junto al rebaño y quedan fuera de las órdenes militares mientras cumplen esa función.
- El rebaño tiene una **condición** que depende de la calidad del pasto y de la cantidad de pastores.
- Oasis, valles fértiles y estepas son mejores zonas de pastoreo que el desierto o la montaña rocosa.
- **Ovejas y cabras se reproducen gradualmente** cuando existen machos y hembras adultos, un campamento, pastores y buenas condiciones.
- Las crías nacen pequeñas y crecen con el tiempo.
- Se añadieron **cabras** como segunda especie de ganado.
- Leones y enemigos también pueden atacar cabras.
- Descansar cerca de la fogata recupera lentamente vida mientras el campamento no esté bajo amenaza.
- Se mantienen todas las funciones de 0.4: hasta 60 seguidores, infantería, arqueros, caballería, grupos, formaciones, combate a distancia y conquista de ciudades.
- Compatible con computadora, teléfono y tablet.

## Computadora

### Vida nómada
- `C`: establecer / levantar campamento
- `P`: aumentar la cantidad de pastores asignados; al llegar al máximo vuelve a 0
- `1`: que siga la gente
- `2`: que siga el ganado
- `3`: que sigan todos
- `4`: que no siga nadie

### Ejército
- `WASD`: mover
- `Shift`: correr
- `E`: interactuar / reclutar / montar
- `F`: atacar y ordenar ataque al grupo seleccionado
- `Q`: cambiar grupo seleccionado
- `V`: cambiar formación
- `T`: ordenar seguir
- `H`: mantener posición
- `R`: retirada
- Arrastrar con botón derecho: girar cámara

## Teléfono / tablet

Además de los controles tácticos de movimiento y combate, aparecen dos controles nuevos:

- `CAMPAMENTO`: establecer o levantar el campamento
- `PASTORES`: asignar progresivamente 0–3 pastores

Los controles `GENTE / GANADO / TODOS / NADIE` continúan determinando qué parte del pueblo acompaña al jugador.

La orientación horizontal es la recomendada para batallas y manejo de grupos grandes.

## Mundo procedural

Cada mundo tiene una semilla reproducible. El terreno se genera por chunks alrededor del jugador e incluye desierto, estepa, valles fértiles, oasis y regiones rocosas. Las ciudades tienen nombre, rey, población y guarnición variables.

## Arquitectura

No hay proceso de build.

- `index.html`: interfaz y controles.
- `world.js`: semilla y generación procedural.
- `engine04.js`: renderizado, chunks, entidades, asentamientos y tipos de tropas.
- `army04.js`: órdenes, formaciones, reclutamiento, combate e IA militar.
- `main04.js`: jugador, cámara, conquista, interfaz y loop principal; carga la extensión 0.5.
- `camp05.js`: campamentos, pastores, pastoreo, reproducción y crecimiento del ganado.

## GitHub Pages

Los cambios a `main` se publican automáticamente mediante GitHub Pages.