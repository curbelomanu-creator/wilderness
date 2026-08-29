# WILDERNESS 6 — CONSOLIDACIÓN GLOBAL MAESTRA

> Documento de integración de los Bloques 1–8.
>
> **Estado:** CONSOLIDACIÓN GLOBAL V1 EJECUTADA.
> **Jerarquía:** este documento prevalece sobre coordenadas provisionales o conexiones parciales de los documentos regionales cuando exista conflicto. Las decisiones culturales, políticas, religiosas y urbanas aprobadas de cada bloque permanecen vigentes.
> **No activa todavía el nuevo mundo en el motor.** Su función es cerrar la arquitectura geográfica previa a `world6-data.js`.

---

# 1. Convención global definitiva V1

- Jerusalén = `(0,0)`.
- X positivo = este.
- X negativo = oeste.
- Z positivo = norte.
- Z negativo = sur.
- Escala de diseño base ≈ **100 unidades de mundo por kilómetro geográfico relativo**.
- Las proporciones geográficas importan más que la reproducción topográfica exacta.
- Las ciudades grandes deben quedar ampliamente separadas y normalmente no ser visibles entre sí.
- Las carreteras, ríos, costas y pasos se definen globalmente; **ningún corredor principal puede terminar artificialmente en el borde de un bloque**.

Extensión maestra aproximada V1:

- oeste: Delta/Nilo occidental ≈ `X -43000`;
- este: alto Éufrates / Melid ≈ `X +32000`;
- sur: Tebas / límite Kush ≈ `Z -70000`;
- norte: Melid / Tauro ≈ `Z +78000`.

El mundo completo es demasiado grande para cargarse de una sola vez. La implementación deberá usar streaming/chunks y activación de asentamientos por distancia.

---

# 2. Correcciones detectadas durante la consolidación

## 2.1 Beerseba y Arad

Ambas pertenecían al roster de Judá pero no habían recibido posición maestra en los bloques detallados. Se incorporan ahora porque son esenciales para cerrar Judá meridional y conectar Canaán con Néguev, Arabá y Edom.

- **Beerseba:** `(-4200,-5900)`, radio V1 `145`.
- **Arad:** `(-150,-5750)`, radio V1 `105`.

Funciones:

### Beerseba
- gran nodo meridional de Judá;
- conexión Hebrón ↔ Gaza;
- conexión Hebrón ↔ Néguev;
- caravanas hacia Arabá/Edom;
- fortificación, mercado y pozos.

### Arad
- fortaleza oriental del Néguev;
- conexión Judá ↔ Arabá;
- vigilancia de rutas del desierto;
- nodo alternativo hacia el Mar Muerto y Edom.

## 2.2 Pi-Ramés

Se conserva la coordenada V1 `(-30600,-11100)` como zona histórica en ruinas. No sustituye Tanis ni Bubastis y no se trata como ciudad política activa normal.

## 2.3 Principio de continuidad

Los puntos que aparecen en dos bloques usan una sola coordenada maestra. Ejemplos:

- Gezer conecta Bloques 1–2;
- Samaria conecta Bloques 1–3;
- Bet-seán conecta Bloques 3–4;
- Dan conecta Bloques 3–6;
- Ramot de Galaad conecta Bloques 4–6;
- Kir-Hareset conecta Bloques 4–5;
- Arpad conecta Bloques 6–7;
- Gaza conecta Bloques 2–8;
- Elat/Ezión-Geber conecta Bloques 5–8 por Aqaba/Sinaí.

---

# 3. Coordenadas maestras de ciudades y centros principales

## 3.1 Judá / Samaria central

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Jerusalén | 0 | 0 | 240 |
| Belén | -310 | -810 | 110 |
| Tecoa | -200 | -1580 | 90 |
| Bet-sur | -1260 | -2020 | 100 |
| Hebrón | -1280 | -2720 | 150 |
| Beerseba | -4200 | -5900 | 145 |
| Arad | -150 | -5750 | 105 |
| Jericó | 1970 | 1030 | 135 |
| Gezer | -2980 | 900 | 150 |
| Betel | 30 | 1640 | 125 |
| Silo | 510 | 3070 | 105 |
| Siquem | 440 | 4830 | 165 |
| Samaria | -350 | 5540 | 220 |

## 3.2 Filistea / Sefelá

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Ecrón | -3650 | 0 | 175 |
| Gat | -3850 | -900 | 175 |
| Azecá | -3000 | -900 | 110 |
| Libná | -3350 | -1800 | 105 |
| Laquis | -3650 | -2450 | 185 |
| Asdod | -5500 | 250 | 185 |
| Ascalón | -6350 | -1250 | 195 |
| Gaza | -7200 | -3150 | 215 |

## 3.3 Jezreel / Galilea / Alto Jordán

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Dothan | -650 | 7000 | 65 |
| Bet-seán | 2510 | 7980 | 115 |
| Jezreel | 880 | 8660 | 170 |
| Megido | -480 | 8950 | 190 |
| Hazor | 3140 | 13750 | 190 |
| Dan | 3940 | 16330 | 175 |

## 3.4 Galaad / Amón / Moab

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Ramot de Galaad | 7600 | 8050 | 155 |
| Jazer | 6250 | 2850 | 105 |
| Rabá | 6950 | 2200 | 220 |
| Minnit | 7750 | 1750 | 90 |
| Abel-Queramim | 7050 | 1050 | 90 |
| Hesbón | 5750 | 250 | 150 |
| Nebo | 5050 | -550 | 95 |
| Medeba | 5550 | -850 | 140 |
| Atarot | 5250 | -1750 | 100 |
| Bet-Baal-Meón | 5550 | -2200 | 100 |
| Dibón | 5650 | -3350 | 195 |
| Aroer | 5750 | -4300 | 105 |
| Kir-Hareset | 5200 | -6750 | 175 |

## 3.5 Edom / Arabá / Aqaba

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Bosra | 6100 | -8750 | 205 |
| Punón/Faynan | 4400 | -10000 | 70 |
| Sela | 5750 | -10750 | 175 |
| Temán | 6500 | -12450 | 135 |
| Elat | 4050 | -15400 | 165 |
| Ezión-Geber | 4200 | -15700 | 80 |

## 3.6 Fenicia / Aram

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Tiro | -300 | 16560 | 225 |
| Sarepta | 610 | 18560 | 105 |
| Sidón | 1320 | 19780 | 205 |
| Berito | 2510 | 23490 | 145 |
| Biblos | 3910 | 26030 | 185 |
| Arwad | 5860 | 34140 | 150 |
| Bet-Rehob | 4300 | 17750 | 105 |
| Zobá | 7350 | 20800 | 125 |
| Damasco | 9790 | 19270 | 260 |
| Hamat | 14240 | 37240 | 205 |
| Arpad | 17490 | 52110 | 185 |

## 3.7 Norte neo-hitita / Éufrates

| Lugar | X | Z | Radio |
|---|---:|---:|---:|
| Halab/Alepo | 19100 | 54800 | 175 |
| Kinalua/Kunulua | 13100 | 55700 | 165 |
| Sam'al | 15700 | 61100 | 185 |
| Gurgum | 21800 | 66200 | 180 |
| Carquemis | 26300 | 63700 | 230 |
| Melid | 31300 | 75900 | 200 |

## 3.8 Egipto / Sinaí / Nilo

| Lugar | X | Z | Radio/función |
|---|---:|---:|---|
| Rafah | -9200 | -5350 | 95 |
| El-Arish | -13400 | -7050 | 85 |
| Tjaru/Sile | -25300 | -8650 | 95 |
| Pi-Ramés | -30600 | -11100 | zona ruinas 180 |
| Tanis | -31600 | -8850 | 205 |
| Bubastis | -35200 | -13200 | 185 |
| Sais | -42200 | -9000 | 190 |
| Heliópolis | -37100 | -18200 | 180 |
| Memphis | -37650 | -21300 | 250 |
| Giza | -38800 | -19800 | monumento |
| Saqqara | -38200 | -22500 | monumento |
| Serabit el-Khadim | -16600 | -30300 | 60 / ruinas-minas |
| Monte Sinaí/Horeb | -11700 | -35800 | landmark |
| Hermópolis | -41900 | -44300 | 150 |
| Abydos | -31300 | -62000 | 145 |
| Tebas | -24400 | -67100 | 260 |

---

# 4. Sistemas geográficos continuos

## 4.1 Mediterráneo

El Mediterráneo es un único cuerpo de agua continuo:

`DELTA DE EGIPTO → NORTE DEL SINAÍ → GAZA/ASCALÓN/ASDOD → COSTA DE SHARON/CARMELO → TIRO → SIDÓN → BERITO → BIBLOS → ARWAD → NORTE`.

Reglas:
- no existen cortes de agua entre bloques;
- las ciudades insulares Tiro y Arwad usan navegación/ferri;
- la costa cambia gradualmente de llanura arenosa en Egipto/Filistea a costa más rocosa y montañosa en Fenicia;
- la navegación marítima forma una red paralela a las carreteras terrestres.

## 4.2 Jordán

Sistema único:

`HERMÓN/DAN → HULA → MAR DE GALILEA → BET-SEÁN → JERICÓ → MAR MUERTO`.

Los vados principales de Bet-seán y Jericó se convierten en nodos obligatorios de las carreteras transjordanas para caravanas y grandes ejércitos.

## 4.3 Mar Muerto → Arabá → Aqaba

El Mar Muerto y la Arabá forman una depresión geográfica continua. Hacia el sur:

`MAR MUERTO → ARABÁ → ELAT/EZIÓN-GEBER → GOLFO DE AQABA → MAR ROJO`.

Esto conecta físicamente los Bloques 4, 5 y 8.

## 4.4 Nilo

Sistema único y navegable:

`BORDE SUR/KUSH → TEBAS → ABYDOS → HERMÓPOLIS → MEMPHIS → DELTA → MEDITERRÁNEO`.

El Delta se divide en varios brazos. Tanis, Bubastis, Sais, Pi-Ramés y Tjaru se conectan por canales/rutas del Delta, no mediante un único cauce recto.

## 4.5 Orontes

El río del Bloque 6 continúa hacia el Bloque 7. Hamat no es el final del cauce. El sistema organiza el corredor hacia Kinalua y Siria septentrional.

## 4.6 Éufrates

Carquemis domina un cruce principal del Éufrates. El río continúa fuera del mapa hacia Mesopotamia y al norte hacia el alto Éufrates/Melid.

## 4.7 Mar Rojo

El Sinaí queda físicamente entre:

- Golfo de Suez al oeste;
- Golfo de Aqaba al este.

Ambos pertenecen al sistema del Mar Rojo.

---

# 5. Red vial maestra global

Las rutas siguientes son **corredores globales**, no líneas decorativas. El generador futuro debe construir puertas y bifurcaciones a partir de esta red.

## R01 — Vía de Horus: Egipto ↔ Canaán

`MEMPHIS → HELIÓPOLIS → BUBASTIS → TJARU/SILE → EL-ARISH → RAFAH → GAZA`

Ramales del Delta:
- `TANIS → PI-RAMÉS → BUBASTIS/TJARU`;
- `SAIS → MEMPHIS`.

**Conecta Bloques 8 ↔ 2.**

## R02 — Vía Maris / gran corredor occidental

`GAZA → ASCALÓN → ASDOD → ECRÓN/GEZER → LLANURA DE SHARON → PASO DEL CARMELO → MEGIDO → JEZREEL → HAZOR → DAN`

Desde Dan continúa hacia Damasco mediante el corredor arameo.

Ramales:
- Gezer → Jerusalén;
- Carmelo → costa de Acco/Tiro;
- Megido → Samaria;
- Jezreel → Bet-seán.

**Conecta Bloques 2 ↔ 1 ↔ 3 ↔ 6.**

## R03 — Camino de la serranía central

`BEERSEBA → HEBRÓN → BET-SUR → BELÉN → JERUSALÉN → BETEL → SILO → SIQUEM → SAMARIA → DOTHAN → JEZREEL`

Es el gran eje longitudinal interior de Judá e Israel.

**Conecta Bloques 1 ↔ 3.**

## R04 — Corredor occidental de Judá / Sefelá

Dos ramas principales:

`JERUSALÉN → GEZER → ECRÓN → ASDOD/COSTA`

`JERUSALÉN → BELÉN → AZECÁ → LAQUIS → GAZA`

Ramales:
- Azecá ↔ Gat;
- Laquis ↔ Libná;
- Beerseba ↔ Gaza.

**Conecta Bloques 1 ↔ 2.**

## R05 — Valle del Jordán

`DAN → HULA → MAR DE GALILEA → BET-SEÁN → JERICÓ → NORTE DEL MAR MUERTO`

No es siempre una carretera recta pegada al cauce; utiliza terrazas y rutas seguras del valle.

**Conecta Bloques 3 ↔ 1 ↔ 4.**

## R06 — Cruce septentrional del Jordán

`JEZREEL/BET-SEÁN → VADO DE BET-SEÁN → GALAAD → RAMOT DE GALAAD → DAMASCO`

**Conecta Bloques 3 ↔ 4 ↔ 6.**

## R07 — Jerusalén / Jericó / Transjordania

`JERUSALÉN → JERICÓ → VADO DEL JORDÁN → HESBÓN → RABÁ`

Ramales:
- Hesbón → Nebo/Medeba;
- Rabá → Jazer/Galaad.

**Conecta Bloques 1 ↔ 4.**

## R08 — Camino del Rey

`DAMASCO → RABÁ → HESBÓN → MEDEBA → DIBÓN → AROER → KIR-HARESET → BOSRA → SELA → TEMÁN → ELAT/EZIÓN-GEBER`

El Arnón y el Wadi Zered tienen pasos controlados. Aroer y Sela son nodos de cuello de botella.

**Conecta Bloques 6 ↔ 4 ↔ 5.**

## R09 — Néguev / Arabá

`GAZA → BEERSEBA → ARAD → NÉGUEV ORIENTAL → ARABÁ → PUNÓN/FAYNAN → SELA → ELAT`

Es una ruta alternativa al Camino del Rey y crea una conexión terrestre directa entre Judá/Filistea y Edom.

**Conecta Bloques 2 ↔ 1 ↔ 5.**

## R10 — Costa fenicia

`TIRO → SAREPTA → SIDÓN → BERITO → BIBLOS → EMBARCADERO CONTINENTAL DE ARWAD`

La entrada a Arwad es marítima.

Conexión sur:

`TIRO → COSTA DE ACCO → CARMELO → MEGIDO`.

**Conecta Bloques 6 ↔ 3 y continúa la red mediterránea del Bloque 2.**

## R11 — Tiro / Alta Galilea / Dan

`TIRO → ALTA GALILEA → DAN`

Ruta comercial y militar distinta de la costa.

**Conecta Bloques 6 ↔ 3.**

## R12 — Damasco / Fenicia

`DAMASCO → PASO DE ANTI-LÍBANO → BECÁ → PASOS DEL LÍBANO → SIDÓN/BERITO`

Ramales hacia Biblos y Tiro.

## R13 — Corredor del Orontes / Siria norte

`DAMASCO/BECÁ → HAMAT → ARPAD → HALAB/ALEPO → CARQUEMIS`

Desde Carquemis:
- este → Harrán / Asiria fuera de mapa;
- norte → Gurgum/Melid;
- oeste → Sam'al/Amanus.

**Conecta Bloques 6 ↔ 7.**

## R14 — Red neo-hitita

`ALEPO → KINALUA → SAM'AL → GURGUM → MELID`

con conexiones:
- `ALEPO → CARQUEMIS`;
- `GURGUM → CARQUEMIS`;
- `CARQUEMIS → MELID`;
- `SAM'AL → PASOS DEL AMANUS`.

## R15 — Eje del Nilo

Ruta terrestre y fluvial paralela:

`TEBAS → ABYDOS → HERMÓPOLIS → MEMPHIS → HELIÓPOLIS → DELTA`.

La navegación del Nilo es una alternativa principal al viaje terrestre.

## R16 — Sinaí meridional / Aqaba

`TJARU/DELTA ORIENTAL → SINAÍ CENTRAL → SERABIT EL-KHADIM → REGIÓN DEL MONTE SINAÍ/HOREB → NORTE DEL GOLFO DE AQABA → ELAT/EZIÓN-GEBER`

No es la ruta rápida Egipto–Canaán; es una ruta minera, religiosa, exploratoria y caravanera más difícil.

**Conecta Bloques 8 ↔ 5.**

## R17 — Red marítima mediterránea

`DELTA EGIPCIO ↔ GAZA/ASCALÓN/ASDOD ↔ TIRO ↔ SIDÓN ↔ BERITO ↔ BIBLOS ↔ ARWAD`

No sustituye las carreteras. Es una segunda red estratégica de comercio, transporte y acceso a ciudades insulares.

---

# 6. Matriz de conexión entre bloques

| Bloques | Conexión terrestre principal | Conexión secundaria |
|---|---|---|
| 1 ↔ 2 | Jerusalén–Gezer–Ecrón / Belén–Azecá–Laquis | Beerseba–Gaza |
| 1 ↔ 3 | Samaria–Dothan–Jezreel | Jericó–valle del Jordán–Bet-seán |
| 1 ↔ 4 | Jerusalén–Jericó–vado–Hesbón | valle del Jordán |
| 1 ↔ 5 | Beerseba–Arad–Néguev–Arabá | vía Moab/Camino del Rey |
| 2 ↔ 3 | Gezer–Sharon–Carmelo–Megido | costa hacia Tiro vía Acco/Carmelo |
| 2 ↔ 8 | Gaza–Rafah–Vía de Horus | navegación mediterránea |
| 3 ↔ 4 | Bet-seán–vado–Galaad | Jordán central |
| 3 ↔ 6 | Dan–Bet-Rehob–Damasco | Hazor/Alta Galilea–Tiro |
| 4 ↔ 5 | Kir-Hareset–Wadi Zered–Bosra | Arabá occidental |
| 4 ↔ 6 | Ramot de Galaad–Damasco | Rabá–Damasco |
| 5 ↔ 8 | Elat/Ezión-Geber–Aqaba–Sinaí | navegación del Mar Rojo |
| 6 ↔ 7 | Arpad–Alepo–Carquemis | Orontes/Kinalua–Sam'al |

**Resultado:** los ocho bloques forman una única red física. Ningún bloque depende de teletransporte para conectar con otro.

---

# 7. Puertas urbanas derivadas de la red

Se mantiene la regla aprobada:

`corredor → puerta → carretera → bifurcación → destinos`.

Durante la implementación:

1. se cargará primero el grafo global de rutas;
2. cada ciudad detectará qué corredores cruzan su radio exterior;
3. se generará una puerta por corredor relevante;
4. la carretera atravesará la puerta y continuará dentro de la ciudad como calle principal protegida;
5. los carteles mostrarán 1–3 destinos siguientes, no una lista de todo el mundo;
6. una carretera no puede acabar al salir de una puerta salvo puerto, frontera exterior o sitio terminal real.

Ejemplo Jerusalén permanece:
- norte → Betel / Samaria;
- sur → Belén / Hebrón;
- este → Jericó / Jordán;
- oeste → Gezer / costa.

Ejemplo Gaza añade continuidad mundial:
- noreste → Ascalón / Asdod;
- este/sureste → Beerseba / Néguev;
- suroeste → Rafah / Egipto.

---

# 8. Fronteras y control territorial

Las fronteras no serán muros invisibles perfectamente rectos. Se derivarán de:

- ciudades y fortalezas controladas;
- cuencas y cordilleras;
- ríos;
- desiertos;
- pasos;
- carreteras;
- puestos fronterizos;
- influencia política.

Se conserva la separación entre:
- cultura original;
- controlador político;
- culto oficial;
- gobernador;
- guarnición.

Casos maestros:
- Gezer: cananea, disputada;
- Hesbón: fronteriza/disputada;
- Ramot de Galaad: israelita/frontera con Aram;
- Kinalua: cultura local con posible administración asiria;
- ciudades fenicias y neo-hititas: macro-cultura compartida, gobiernos distintos;
- Egipto: macro-cultura fragmentada;
- Pi-Ramés: sitio histórico, no ciudad política activa normal.

---

# 9. Geografía que debe atravesar fronteras de bloques sin cortes

Obligatorio para el futuro generador:

- Mediterráneo continuo;
- Jordán continuo;
- Mar de Galilea continuo;
- Mar Muerto continuo;
- Arabá continua;
- Golfo de Aqaba/Mar Rojo continuos;
- Nilo y Delta continuos;
- Orontes continuo;
- Éufrates continuo;
- Líbano y Anti-Líbano coherentes entre sectores;
- Carmelo conectado con la transición Galilea/Fenicia;
- Hermón compartido por Israel/Aram;
- Amanus/Tauro coherentes en el límite norte;
- Sinaí conectado físicamente a Egipto, Gaza y Aqaba.

---

# 10. Preparación para `world6-data.js`

La siguiente estructura técnica deberá salir de esta consolidación, no de los archivos regionales por separado.

Entidades de datos recomendadas:

- `cities[]`
- `landmarks[]`
- `regions[]`
- `waterBodies[]`
- `rivers[]`
- `roads[]`
- `roadNodes[]`
- `passes[]`
- `fords[]`
- `ports[]`
- `cultures[]`
- `polities[]`
- `religions[]`
- `initialControllers[]`
- `cityGates[]` derivadas del grafo vial

Regla de precedencia técnica:

**GLOBAL CONSOLIDATION MASTER → datos estructurados → generador de terreno/rutas → ciudades → gameplay.**

No se debe volver a posicionar una ciudad manualmente en módulos separados una vez exista `world6-data.js`.

---

# 11. Estado final de la consolidación V1

Queda consolidado un único mundo continuo desde:

- **Tebas/Kush al sur**;
- **Delta egipcio y Sinaí al suroeste**;
- **Filistea/Judá/Israel en el centro**;
- **Amón/Moab/Edom al este-sur**;
- **Fenicia/Aram al norte**;
- **Carquemis/Melid y frontera asiria al extremo norte/noreste**.

Las conexiones principales entre bloques están cerradas y la red vial global evita islas terrestres artificiales.

Los ajustes posteriores de coordenadas deberán ser menores y obedecer pruebas de rendimiento o viaje; no deberán romper la topología, direcciones relativas ni conexiones aprobadas en este documento.

---

**WILDERNESS 6 — MAPA GLOBAL CONSOLIDADO V1.**
