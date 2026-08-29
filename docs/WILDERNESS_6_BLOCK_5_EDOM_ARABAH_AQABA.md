# WILDERNESS 6 — BLOQUE 5: EDOM / ARABÁ / GOLFO DE AQABA

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque continúa el sistema geográfico aprobado y aplica las reglas globales de escala, corredores, puertas, ciudades estratégicas y continuidad cultural.

---

# 1. Objetivo del bloque

Construir el extremo suroriental del mundo principal conectando Moab con Edom, la Arabá y el Golfo de Aqaba.

## Ciudades principales de Edom

- **Bosra** — capital monumental de Edom.
- **Sela** — gran fortaleza rocosa y paso estratégico.
- **Temán** — ciudad regional del sur / centro caravanero.
- **Elat** — ciudad meridional costera.
- **Ezión-Geber** — puerto/instalación marítima dependiente de Elat.

## Sitios secundarios propuestos

- **Punón / región de Faynan** — distrito minero y metalúrgico de cobre, no gran ciudad principal.
- fortalezas de paso en las montañas de Seír;
- oasis y estaciones caravaneras;
- puestos del Camino del Rey;
- pequeños campamentos mineros y fundiciones.

## Geografía estructural

- Wadi Zered / límite septentrional aproximado del corredor edomita;
- montañas de Seír / tierras altas de Edom;
- Arabá;
- grandes wadis y cañones;
- región cuprífera Faynan/Punón;
- macizos rocosos de Sela;
- desierto meridional;
- Golfo de Aqaba;
- costa de Elat / Ezión-Geber.

Este bloque debe sentirse más seco, vertical, rocoso y hostil que Moab. El jugador debe percibir que las carreteras y los pasos importan porque abandonar la ruta significa internarse en barrancos, montañas y desierto.

---

# 2. Sistema de coordenadas

Se mantiene la convención global:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala base ≈ **100 unidades de mundo por kilómetro geográfico relativo**

Punto de continuidad del Bloque 4:

- Kir-Hareset = `(5200,-6750)`

## 2.1 Coordenadas maestras V1

| Lugar | X | Z | Función | Radio urbano V1 |
|---|---:|---:|---|---:|
| Kir-Hareset | 5200 | -6750 | bastión meridional de Moab / conexión norte | 175 |
| Wadi Zered | 5450 | -7550 | barrera geográfica / transición Moab–Edom | — |
| Bosra | 6100 | -8750 | capital monumental de Edom | 205 |
| Punón / Faynan | 4400 | -10000 | distrito minero-metalúrgico | 70 |
| Sela | 5750 | -10750 | gran fortaleza rocosa | 175 |
| montañas de Seír | 6100 | -11250 | macizo fijo | — |
| Temán | 6500 | -12450 | ciudad regional caravanera | 135 |
| Arabá central | 3650 | -11600 | valle/desierto estructural | — |
| Elat | 4050 | -15400 | gran ciudad costera del sur | 165 |
| Ezión-Geber | 4200 | -15700 | puerto dependiente / astillero | 80 |
| centro norte del Golfo de Aqaba | 4000 | -16150 | cuerpo de agua permanente | — |

> Las coordenadas conservan relaciones geográficas y de gameplay aproximadas; no constituyen una reconstrucción topográfica exacta.

---

# 3. Diagrama regional simplificado

```text
                         NORTE / MOAB

                         KIR-HARESET
                              |
                        WADI ZERED
                              |
                            BOSRA
                           /     \
                         /         \
                 PUNÓN/FAYNAN     CAMINO DEL REY
                   [COBRE]             |
                         \             |
                           SELA --------+
                              |
                      MONTAÑAS DE SEÍR
                              |
                            TEMÁN
                              |
                 ---------------------------
                 |                         |
              ARABÁ                 RUTA CARAVANERA
                 |                         |
                 +----------- ELAT --------+
                               |
                         EZIÓN-GEBER
                               |
                         GOLFO DE AQABA
                               |
                       MAR ROJO / SUR
```

---

# 4. Geografía fija del Bloque 5

## 4.1 Wadi Zered

**OBLIGATORIO**

Funcionará como transición geográfica entre el sur de Moab y las tierras de Edom.

Características:
- quebrada profunda;
- terreno más seco hacia el sur;
- uno o dos cruces principales;
- puestos militares o aduaneros cerca del camino;
- rutas alternativas difíciles para grupos pequeños.

Gameplay:
- frontera natural;
- punto de emboscada;
- control de caravanas;
- primer cambio visual fuerte hacia Edom.

## 4.2 Montañas de Seír

**OBLIGATORIO**

Deben ser uno de los sistemas montañosos más dramáticos del mapa.

Características:
- roca rojiza y ocre;
- cañones;
- crestas;
- barrancos estrechos;
- mesetas rocosas;
- vegetación escasa pero no inexistente;
- enebros, arbustos y árboles dispersos en zonas altas/abrigadas.

Gameplay:
- los carros pierden gran parte de su ventaja;
- infantería ligera y arqueros dominan pasos;
- las fortalezas pueden controlar corredores enteros;
- abandonar el camino principal debe ser costoso.

## 4.3 Arabá

**OBLIGATORIO Y CONTINUO**

La Arabá será el gran corredor de depresión que conecta el sur del Mar Muerto con Aqaba.

Características:
- enorme valle árido entre montañas;
- salares y zonas pedregosas;
- wadis estacionales;
- oasis aislados;
- rutas caravaneras visibles;
- largas líneas de visión en algunos sectores.

Gameplay:
- excelente para caravanas cuando se sigue la ruta;
- exposición alta a bandidos y clima;
- poca agua fuera de oasis;
- montañas laterales dificultan escapar de determinados corredores.

## 4.4 Región minera de Punón / Faynan

**PROPUESTA FUERTE**

Se incorporará como distrito productivo, no como otra gran capital.

Elementos:
- minas de cobre;
- galerías/entradas mineras;
- montones de escoria;
- hornos de fundición;
- campamentos de trabajadores;
- almacenes;
- guardias;
- caravanas de mineral.

Gameplay:
- recurso económico importante para Edom;
- controlar la zona mejora producción de armas/herramientas;
- puede ser objetivo de incursiones;
- sus rutas conectan con Sela, Bosra y la Arabá.

## 4.5 Sela y sus macizos

Sela debe estar integrada físicamente a un paisaje de roca elevada.

No debe parecer una ciudad normal colocada sobre una llanura.

Debe incluir:
- acceso principal por desfiladero/paso estrecho;
- ciudadela en roca alta;
- terrazas;
- escaleras y rampas;
- murallas que aprovechan paredes naturales;
- cisternas;
- almacenes;
- puntos de tiro sobre el paso.

## 4.6 Golfo de Aqaba

**OBLIGATORIO Y PERMANENTE**

Debe existir como continuación marítima del mundo al sur.

Características:
- agua profunda y visualmente distinta de lagos interiores;
- costas áridas y montañosas;
- navegación real;
- pesca;
- embarcaciones mercantes;
- muelles y astilleros en la zona Elat/Ezión-Geber.

No será un pequeño estanque decorativo: el jugador debe entender que forma parte del sistema del Mar Rojo.

---

# 5. Red vial maestra

## 5.1 Continuación del Camino del Rey

Eje principal:

**Kir-Hareset → Wadi Zered → Bosra → Sela → Temán → Elat**

Reglas:
- será la carretera principal de Edom;
- seguirá mesetas y pasos naturales;
- tendrá mojones y puestos;
- no será una línea perfectamente recta;
- las ciudades fortificadas dominan los pasos más importantes.

## 5.2 Ruta minera

**Bosra / Sela → Punón/Faynan → Arabá**

Funciones:
- mover cobre y suministros;
- caravanas pesadas;
- puestos de guardia;
- riesgo de bandidaje.

## 5.3 Ruta de la Arabá

**sur del Mar Muerto → Arabá → Elat / Ezión-Geber**

Será una alternativa al Camino del Rey por las alturas.

Comparación:

### Camino del Rey
- mejor infraestructura;
- más ciudades;
- más control político;
- terreno montañoso.

### Ruta de la Arabá
- más directa en ciertos tramos;
- más árida;
- menos agua;
- más expuesta;
- útil para caravanas que conocen los oasis.

## 5.4 Rutas hacia Arabia

Desde Temán y Elat existirán caminos que continúan hacia el este/sureste fuera del núcleo principal del mapa.

En esta etapa se representarán como corredores de frontera con caravanas procedentes de Arabia, sin necesidad de construir todavía grandes ciudades árabes externas.

---

# 6. Ciudades maestras

# 6.1 BOSRA

**ID:** bozrah  
**Facción:** Edom  
**Control inicial:** Edom  
**Rey:** Qaus-malaka  
**Categoría:** Capital monumental  
**Radio V1:** 205  
**Coordenadas:** `(6100,-8750)`

### Función

Capital política y administrativa de Edom.

### Puertas/corredores

1. **Puerta Norte:** `MOAB · KIR-HARESET`
2. **Puerta Sur:** `SELA · TEMÁN`
3. **Puerta Oeste:** `PUNÓN · ARABÁ`
4. **Puerta Este:** `RUTA DE ARABIA`

### Urbanismo

- gran recinto real;
- barrios en terrazas;
- amplias calles de caravanas;
- grandes almacenes;
- establos;
- plaza de comercio;
- defensas adaptadas al relieve.

### Palacio

Gran palacio de Qaus-malaka / casa de gobierno.

### Religión

Gran templo estatal de **Qos / Qaus**, deidad nacional edomita.

Debe poseer:
- patio ceremonial;
- altar;
- estelas/símbolos;
- estatua cultual estilizada de gameplay;
- sacerdotes y ofrendas.

### Escala

- muralla: 14–16;
- torres: 20–23;
- casas: 7–10;
- palacio/templo: 16–22.

---

# 6.2 SELA

**ID:** sela  
**Facción:** Edom  
**Categoría:** Gran fortaleza rocosa  
**Radio V1:** 175  
**Coordenadas:** `(5750,-10750)`

### Función

Principal fortaleza natural de Edom y uno de los lugares visualmente más distintivos del mundo.

### Puertas/corredores

1. **Acceso Norte:** `BOSRA`
2. **Acceso Sur:** `TEMÁN · ELAT`
3. **Paso Oeste:** `PUNÓN · ARABÁ`

No necesita cuatro puertas simétricas: la geografía decide sus accesos.

### Urbanismo

- acceso estrecho;
- defensas escalonadas;
- edificios sobre terrazas;
- almacenes y cisternas;
- ciudadela superior;
- calles limpias pero adaptadas a la pendiente.

### Gobierno

Fortaleza-palacio del gobernador/comandante.

### Religión

Templo de Qos integrado en una terraza elevada.

### Gameplay

Sela debe ser una de las ciudades más difíciles de conquistar mediante asalto frontal.

---

# 6.3 TEMÁN

**ID:** teman  
**Facción:** Edom  
**Categoría:** Ciudad regional fortificada  
**Radio V1:** 135  
**Coordenadas:** `(6500,-12450)`

### Función

Centro caravanero y administrativo del sur de Edom.

### Puertas

1. **Norte:** `SELA · BOSRA`
2. **Sur:** `ELAT · EZIÓN-GEBER`
3. **Este:** `ARABIA`
4. **Oeste:** `ARABÁ`

### Urbanismo

- caravasares/patios de caravanas;
- almacenes;
- mercado;
- corrales de camellos y asnos;
- casa del gobernador;
- santuario de Qos.

### Característica

Temán debe sentirse como la puerta comercial entre Edom y las rutas del desierto oriental.

---

# 6.4 ELAT

**ID:** elath  
**Facción:** Edom  
**Categoría:** Gran ciudad costera meridional  
**Radio V1:** 165  
**Coordenadas:** `(4050,-15400)`

### Función

Ciudad comercial y militar en la cabecera del Golfo de Aqaba.

### Puertas/corredores

1. **Puerta Norte:** `TEMÁN · SELA`
2. **Puerta Arabá:** `ARABÁ · MAR MUERTO`
3. **Puerta Este:** `ARABIA`
4. **Puerta del Puerto:** `EZIÓN-GEBER`

### Urbanismo

- muralla adaptada a costa/desierto;
- gran mercado de caravanas;
- almacenes de mercancías;
- zona militar;
- barrios de comerciantes;
- astilleros menores propios.

### Religión

Templo edomita de Qos, más pequeño que el de Bosra.

### Gameplay

Elat será el punto donde rutas terrestres y marítimas realmente se encuentran.

---

# 6.5 EZIÓN-GEBER

**ID:** eziongeber  
**Control:** dependencia de Elat / Edom  
**Categoría:** Puerto estratégico dependiente  
**Radio V1:** 80  
**Coordenadas:** `(4200,-15700)`

### Decisión propuesta

No tratar Ezión-Geber como otra ciudad gigantesca junto a Elat.

Funcionará como **dependencia portuaria/industrial**, siguiendo la misma lógica aprobada para Asdod-Yam.

Elementos:
- gran muelle;
- almacenes;
- astillero;
- talleres;
- depósitos de madera/cobre;
- guarnición;
- embarcaciones;
- pequeño santuario.

### Gameplay

Controlar Elat pero perder Ezión-Geber limita el poder marítimo y comercial del controlador.

---

# 7. Arquitectura de Edom

Edom debe tener una identidad propia.

## Materiales

- piedra rojiza;
- arenisca;
- adobe en zonas bajas;
- madera limitada;
- mampostería pesada.

## Forma urbana

- edificios más integrados al relieve;
- terrazas;
- escalinatas;
- patios protegidos;
- calles estrechas secundarias pero calles caravaneras despejadas;
- torres fuertes dominando gargantas.

## Vegetación

- enebros y árboles resistentes en zonas altas;
- acacias en valles y oasis;
- palmeras cerca de agua;
- arbustos desérticos;
- ausencia de vegetación densa en la Arabá.

## Animales/actividad

- camellos más frecuentes;
- asnos;
- cabras y ovejas;
- caravanas;
- minería;
- fundición;
- comercio de larga distancia.

---

# 8. Religión de Edom

## 8.1 Qos / Qaus

**PROPUESTA PARA APROBACIÓN**

Qos será la deidad estatal principal de Edom.

Jerarquía de templos:

- **Bosra:** gran templo nacional/real.
- **Sela:** templo fortificado regional.
- **Temán:** santuario caravanero importante.
- **Elat:** templo portuario regional.
- poblaciones menores: altares y santuarios pequeños.

Tras una conquista se aplica el sistema global:
- conservar Qos;
- sustituir culto;
- consagrar a Elohim;
- reconstruir santuario según controlador.

---

# 9. Economía y recursos

Edom debe tener una economía visible distinta.

## Recursos principales de gameplay

- cobre;
- ganado;
- tránsito caravanero;
- peajes;
- comercio del Mar Rojo;
- piedra;
- productos importados desde Arabia.

## Mecánica estratégica propuesta

Controlar simultáneamente:

`Punón/Faynan + Sela + Elat/Ezión-Geber`

otorga al reino una bonificación de:
- metal;
- comercio;
- producción militar;
- capacidad de equipar tropas.

Esto convierte las ciudades y recursos en una red económica, no en puntos aislados.

---

# 10. Puertas y señalización

Se mantiene la regla global de puertas por corredor.

Ejemplos:

### Bosra
- `MOAB`
- `SELA · TEMÁN`
- `PUNÓN · ARABÁ`
- `ARABIA`

### Sela
- `BOSRA`
- `TEMÁN · ELAT`
- `PUNÓN · ARABÁ`

### Temán
- `SELA · BOSRA`
- `ELAT`
- `ARABIA`
- `ARABÁ`

### Elat
- `TEMÁN`
- `ARABÁ`
- `ARABIA`
- `EZIÓN-GEBER · PUERTO`

Las bifurcaciones posteriores usarán mojones adicionales.

---

# 11. Recomendaciones para aprobación

Se recomienda aprobar:

1. **Bosra** como capital monumental y centro estatal de Qos.
2. **Sela** como gran fortaleza rocosa, diseñada a partir del relieve y no como ciudad plana convencional.
3. **Temán** como centro caravanero del sur.
4. **Elat** como gran ciudad costera y nodo terrestre-marítimo.
5. **Ezión-Geber** como dependencia portuaria/industrial de Elat, no como segunda gran ciudad pegada a ella.
6. **Punón/Faynan** como distrito minero de cobre fijo y estratégico.
7. **Wadi Zered, montañas de Seír, Arabá y Golfo de Aqaba** como geografía permanente.
8. **Qos/Qaus** como culto estatal principal de Edom.
9. El Camino del Rey continúa `Kir-Hareset → Bosra → Sela → Temán → Elat`.
10. La ruta de la Arabá funciona como corredor alternativo más árido y peligroso.
11. Sela debe ser una de las posiciones defensivas naturales más difíciles de tomar del juego.
12. El control de cobre + pasos + puerto debe tener consecuencias económicas y militares reales.

---

# 12. Pendientes antes de aprobar el bloque

- confirmar si Ezión-Geber queda definitivamente como dependencia de Elat;
- confirmar el peso estratégico del cobre dentro de la economía general;
- confirmar si Punón/Faynan será conquistable como puesto/distrito aunque no sea ciudad principal;
- decidir si se añadirán uno o dos fuertes menores en la Arabá;
- afinar coordenadas al unir este bloque con el Néguev y Beerseba;
- decidir en una etapa posterior si habrá navegación jugable extensa por el Golfo de Aqaba.

---

**Fin de propuesta maestra V1 — Bloque 5.**
