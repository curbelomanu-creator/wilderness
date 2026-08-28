# Wilderness

Prototipo 0.2 de un videojuego 3D procedural de supervivencia, exploración, reclutamiento y conquista inspirado visualmente en el Medio Oriente bíblico.

## Qué incluye

- Mundo 3D procedural sin imágenes externas.
- Desierto, oasis, terreno rocoso y vegetación.
- Aldea con aldeanos reclutables.
- Seguidores con IA básica.
- Ovejas, caballo montable y leones agresivos.
- Ciudad amurallada con habitantes, soldados y rey.
- Combate y conquista de ciudad.
- Órdenes para que sigan: gente, ganado, todos o nadie.
- Controles de escritorio y teléfono.

## Computadora

- WASD: mover
- Shift: correr
- E: interactuar / reclutar / montar
- F: atacar
- R: retirada
- 1: gente
- 2: ganado
- 3: todos
- 4: nadie
- Arrastrar con botón derecho: girar cámara

## Teléfono / tablet

- Joystick izquierdo: mover
- Arrastrar el mundo: girar cámara
- ACCIÓN: reclutar / montar / desmontar
- ATACAR: ataque cercano
- RETIRADA: retirar seguidores
- CORRER: mantener presionado para correr
- GENTE / GANADO / TODOS / NADIE: seleccionar quién sigue al jugador

El juego funciona tanto en vertical como horizontal, aunque la orientación horizontal es la recomendada.

## GitHub Pages

El repositorio incluye `.github/workflows/pages.yml` para desplegar el juego como sitio estático con GitHub Pages en cada push a `main`.

Si Pages todavía no está activado para el repositorio, entra a **Settings → Pages → Build and deployment → Source → GitHub Actions**. Después de eso, el workflow publicará la versión online automáticamente.

## Desarrollo

No hay proceso de build. `index.html` carga Three.js desde CDN y luego ejecuta `game.js`.
