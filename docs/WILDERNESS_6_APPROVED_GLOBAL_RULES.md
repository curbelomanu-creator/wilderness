# WILDERNESS 6 — REGLAS GLOBALES APROBADAS

> Documento normativo complementario de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** APROBADO.
> **Aplicación:** estas reglas se aplican a todos los bloques regionales, ciudades, rutas y facciones de Wilderness 6 salvo que una excepción geográfica o histórica se apruebe expresamente.

---

# 1. Escala y separación entre ciudades

**APROBADO**

Se mantiene como criterio base la escala de diseño de aproximadamente **100 unidades de mundo por kilómetro geográfico relativo**.

Objetivo:
- conservar relaciones geográficas coherentes entre ciudades;
- impedir que las ciudades importantes se sientan pegadas;
- hacer que los viajes tengan peso de gameplay;
- dar utilidad real a caballos, camellos, caravanas y rutas seguras;
- permitir territorio intermedio con aldeas, ruinas, cultivos, caravanas, fauna, bandidos, fortalezas y encuentros.

Reglas:
- las grandes ciudades no deben ser visibles unas desde otras salvo casos excepcionales justificados;
- cada ciudad histórica tendrá un radio de exclusión;
- el viaje por camino debe ser más eficiente y seguro que atravesar terreno difícil;
- las distancias podrán ajustarse durante pruebas, pero se conservarán las proporciones y la sensación de viaje largo.

---

# 2. Puertas por corredor geográfico, no por ciudad

**APROBADO**

Las murallas no tendrán una puerta distinta para cada ciudad de destino.

La lógica será:

`corredor geográfico → puerta → camino principal → bifurcaciones → destinos`

Ejemplo de Jerusalén:
- Puerta Norte → Betel / Siquem / Samaria;
- Puerta Sur → Belén / Hebrón;
- Puerta Este → Jericó / Jordán;
- Puerta Oeste → Gezer / costa.

Reglas:
- una puerta puede mostrar entre 1 y 3 destinos principales;
- los caminos se bifurcan después de salir de la ciudad;
- en cada bifurcación importante habrá nuevos mojones o carteles;
- las puertas se generan a partir de la red vial, nunca al revés;
- ninguna puerta importante puede desembocar en un camino que no continúe hacia un destino real del mapa.

Este principio se aplicará a todas las ciudades de Wilderness 6.

---

# 3. Ciudades menores como nodos estratégicos de rutas

**APROBADO**

Las ciudades intermedias pueden ser puntos obligatorios de la **ruta principal** cuando su posición geográfica o militar lo justifique.

Ejemplo aprobado:

`Jerusalén → Belén → Bet-sur → Hebrón`

Bet-sur será un nodo fortificado del corredor principal. Controlarla significará controlar la carretera principal hacia Hebrón.

Esto no significa que el jugador quede físicamente obligado a entrar en la ciudad.

Siempre podrá existir:
- rodeo por terreno abierto;
- senda secundaria;
- paso de montaña;
- ruta de explorador;
- maniobra militar fuera de carretera.

Pero esas alternativas deberán ser normalmente:
- más lentas;
- más difíciles;
- más peligrosas;
- menos apropiadas para caravanas o grandes ejércitos.

Regla global:

Una ciudad menor no debe existir únicamente como decoración. Si se encuentra sobre un corredor importante, debe adquirir valor estratégico, comercial, religioso o militar.

---

# 4. Ciudades fronterizas y disputadas

**APROBADO**

Wilderness 6 distinguirá claramente entre:

- **cultura original de una ciudad**;
- **control político actual**;
- **culto/religión oficial actual**;
- **guarnición y gobernador actual**.

Una ciudad no tiene por qué pertenecer culturalmente al reino que la controla.

## Gezer — criterio aprobado

Gezer se tratará como **ciudad fronteriza/disputada de identidad cananea**, no simplemente como una ciudad genérica de Judá.

Función de gameplay:
- nodo occidental entre Jerusalén, Sefelá y la llanura costera;
- llave estratégica del corredor hacia la costa;
- ciudad apta para cambiar de controlador durante campañas;
- conserva su arquitectura/cultura original aunque cambie de reino;
- su templo y culto pueden conservarse o modificarse mediante el sistema de conquista.

Este modelo se reutilizará en otras ciudades fronterizas cuando corresponda históricamente.

---

# 5. Aplicación obligatoria a los próximos bloques

Estas cuatro reglas se aplicarán desde ahora a:

1. Filistea / Sefelá / Mediterráneo;
2. Jezreel / Galilea;
3. Transjordania / Amón / Moab;
4. Edom / Arabá / Aqaba;
5. Fenicia / Aram;
6. Extremo norte / estados neo-hititas;
7. cualquier nueva ciudad, santuario, fortaleza o capital que se añada posteriormente.

Cada bloque deberá definir explícitamente:
- escala y separación;
- corredores principales;
- puertas generadas por corredor;
- nodos intermedios estratégicos;
- posibles ciudades disputadas;
- rutas alternativas fuera de carretera;
- señalización de destinos.

---

# 6. Regla de implementación futura

Estas decisiones son de diseño aprobado, pero **no deben implementarse parcialmente de forma aislada**.

Orden futuro:
1. completar todos los bloques geográficos;
2. cerrar coordenadas y conexiones;
3. generar `world6-data.js` o equivalente;
4. reconstruir rutas y puertas a partir de esos datos;
5. actualizar ciudades y territorios;
6. probar tiempos de viaje y rendimiento;
7. ajustar escala sin romper proporciones geográficas.

---

**Aprobado para uso global en Wilderness 6.**
