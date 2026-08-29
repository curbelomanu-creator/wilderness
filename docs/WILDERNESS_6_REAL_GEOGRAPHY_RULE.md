# WILDERNESS 6 — REGLA MAESTRA DE GEOGRAFÍA REAL

> Documento normativo complementario de `WILDERNESS_6_GLOBAL_CONSOLIDATION_MASTER.md`.
>
> **Estado:** APROBADO / OBLIGATORIO antes de crear `world6-data.js`.
>
> Esta regla prevalece sobre las coordenadas manuales provisionales de los bloques 1–8 cuando exista diferencia entre una posición aproximada de diseño y la ubicación geográfica real.

---

# 1. Principio central

El mundo de Wilderness 6 debe conservar una **coherencia geográfica real reconocible**.

Al abrir el mapa mundial, la silueta general debe parecerse al Mediterráneo oriental y al Cercano Oriente reales:

- Egipto y el Delta del Nilo;
- Península del Sinaí;
- costa mediterránea de Canaán/Fenicia;
- Mar Muerto;
- valle y río Jordán;
- Mar de Galilea;
- Líbano y Anti-Líbano;
- Siria interior;
- Éufrates;
- Arabá;
- Golfo de Aqaba;
- Mar Rojo.

Las ciudades deben aparecer en la misma relación espacial que en la geografía real: norte/sur/este/oeste, cercanía relativa, costa/interior, valle/montaña y relación con ríos, mares y pasos.

---

# 2. Las coordenadas actuales pasan a ser provisionales

Las coordenadas de `WILDERNESS_6_MASTER_COORDINATES.csv` se conservan únicamente como **layout V1 de diseño** hasta completar el proceso de georreferenciación.

Antes de generar `world6-data.js` se deberá producir una nueva tabla maestra derivada de coordenadas geográficas reales.

La nueva tabla deberá contener, como mínimo:

- `id`;
- `name`;
- `historical_lat`;
- `historical_lon`;
- `location_confidence`;
- `source_note`;
- `game_x`;
- `game_z`;
- `radius`;
- `type`;
- `block`.

---

# 3. Sistema de georreferenciación

## 3.1 Ciudades y landmarks

Cada ciudad o sitio con localización conocida se colocará usando su latitud/longitud real o la mejor localización arqueológica/histórica aceptable disponible.

Ejemplos:

- Jerusalén;
- Gaza;
- Hebrón;
- Samaria;
- Megido;
- Dan;
- Damasco;
- Tiro;
- Sidón;
- Carquemis;
- Memphis;
- Tebas;
- Giza;
- Monte Sinaí tradicional;
- etc.

Los sitios cuya identificación exacta sea discutida, como Ramot de Galaad, Zobá o determinados enclaves bíblicos, deberán conservar un campo de **nivel de certeza** y se ubicarán de forma aproximada dentro de la región históricamente plausible.

## 3.2 Conversión a coordenadas del juego

Las coordenadas reales se transformarán mediante una única proyección geográfica coherente para todo el mapa.

Reglas:

- Jerusalén seguirá pudiendo actuar como origen lógico `(0,0)` del mundo si conviene al motor;
- la transformación de latitud/longitud a `game_x/game_z` debe ser matemática y uniforme;
- no se moverán ciudades manualmente para hacerlas “verse mejor” salvo ajustes mínimos de gameplay documentados;
- cualquier compresión de distancias deberá utilizar un factor global o regional controlado, nunca desplazamientos arbitrarios independientes por ciudad.

---

# 4. Costas y mares

Las costas no se dibujarán a mano mediante polígonos inventados.

La forma base debe provenir de geometría geográfica real simplificada.

Esto se aplica especialmente a:

- Mediterráneo oriental;
- Delta del Nilo;
- Península del Sinaí;
- Mar Muerto;
- Mar de Galilea;
- Golfo de Suez;
- Golfo de Aqaba;
- Mar Rojo.

La simplificación visual está permitida por rendimiento/estética voxel, pero la forma y posición relativa deben seguir siendo reconocibles.

---

# 5. Ríos

Los grandes ríos deberán seguir trayectorias geográficas reales simplificadas.

## Obligatorios

- Nilo;
- Jordán;
- Litani;
- Orontes;
- Barada;
- Éufrates;
- Kishon/Cisón;
- Jaboc/Jabbok;
- Arnón/Wadi Mujib;
- cursos regionales importantes aprobados.

El Jordán deberá mantener continuidad física real entre:

`Hermón/Dan → Hula → Mar de Galilea → valle del Jordán → Bet-seán → Jericó → Mar Muerto`.

El Nilo deberá mantener continuidad física real entre el sur, Tebas, Egipto Medio, Memphis y el Delta.

---

# 6. Relieve

Las grandes unidades de relieve deberán colocarse en su posición geográfica real aproximada y con orientación coherente:

- montañas de Judá;
- montañas de Samaria;
- Carmelo;
- Gilboa;
- Tabor;
- Galilea;
- Hermón;
- Galaad;
- meseta de Moab;
- montañas de Edom/Seír;
- Líbano;
- Anti-Líbano;
- Amanus;
- Tauro;
- macizos del Sinaí.

No se exige reproducción topográfica centímetro por centímetro, pero las cadenas montañosas deben tener la orientación y posición correctas respecto de ciudades, ríos y rutas.

---

# 7. Carreteras históricas

Las carreteras continuarán siendo un sistema de gameplay, pero sus corredores deberán respetar la geografía real.

Ejemplos:

- Vía de Horus: Delta oriental → norte del Sinaí → Rafah → Gaza;
- Vía Maris: costa/Filistea → Sharon → Carmelo/Megido → Galilea → Damasco;
- serranía central: Beerseba/Hebrón → Jerusalén → Betel → Siquem → Samaria;
- Camino del Rey: Damasco → Transjordania → Moab → Edom → Aqaba;
- rutas del Nilo;
- rutas fenicias costeras;
- corredores Damasco–Dan y Damasco–Galaad;
- corredor Hamat–Alepo–Carquemis.

Las rutas podrán desviarse para seguir pasos, vados y terreno practicable, pero no podrán contradecir la geografía real para ahorrar distancia artificialmente.

---

# 8. Mapa mundial

El mapa mundial de Wilderness deberá utilizar exactamente la misma base geográfica que el mundo jugable.

Esto significa que:

- el mapa no será una ilustración independiente;
- ciudades, ríos, costas y rutas se dibujarán desde los mismos datos maestros utilizados por el terreno;
- el mapa y el mundo 3D no podrán discrepar;
- si Jerusalén está en una posición concreta en el mapa, esa posición corresponde matemáticamente a su posición en el mundo 3D;
- cuando se active la posición del jugador, su marcador se proyectará sobre esa misma geografía.

Objetivo visual: al reducir el mapa, el usuario debe reconocer inmediatamente un mapa del **Mediterráneo oriental / Medio Oriente real**.

---

# 9. Precisión histórica vs. geografía moderna

Se utilizará la geografía física real como base, pero:

- los nombres políticos y territorios serán del siglo VIII a.C.;
- las ciudades antiguas se ubicarán en sus emplazamientos históricos, no necesariamente en centros urbanos modernos;
- costas y ríos podrán reflejar cambios históricos conocidos cuando sean significativos;
- para lugares desaparecidos o discutidos se documentará la incertidumbre.

---

# 10. Orden obligatorio antes de `world6-data.js`

1. Crear inventario completo de ciudades, landmarks y accidentes geográficos.
2. Asignar latitud/longitud real o arqueológica a cada punto.
3. Incorporar geometría real simplificada de costas, mares y ríos.
4. Elegir una sola proyección geográfica.
5. Convertir todos los puntos a `game_x/game_z`.
6. Regenerar la tabla maestra de coordenadas.
7. Regenerar el grafo vial sobre esas posiciones.
8. Actualizar el mapa mundial para mostrar la nueva geometría real.
9. Validar visualmente que Egipto, Sinaí, Canaán, Fenicia, Siria, Transjordania y el norte encajen como un mapa real.
10. Solo entonces generar `world6-data.js`.

---

**REGLA FINAL:** la fidelidad geográfica global tiene prioridad sobre las coordenadas manuales provisionales creadas durante el diseño de los bloques.
