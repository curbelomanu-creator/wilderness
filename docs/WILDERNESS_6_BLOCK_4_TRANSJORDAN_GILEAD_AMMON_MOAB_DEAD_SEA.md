# WILDERNESS 6 — BLOQUE 4: TRANSJORDANIA / GALAAD / AMÓN / MOAB / MAR MUERTO

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque continúa el sistema geográfico aprobado y aplica las reglas globales de escala, corredores, puertas y nodos estratégicos.

---

# 1. Objetivo del bloque

Construir la mitad oriental del corredor Jordán–Mar Muerto y conectar el Reino de Israel con Galaad, Amón y Moab.

## Núcleos principales

### Israel / Galaad
- **Ramot de Galaad** — propuesta como gran fortaleza israelita fronteriza y disputada con Aram.

### Amón
- Rabá
- Hesbón
- Jazer
- Minnit
- Abel-Queramim

### Moab
- Dibón
- Medeba
- Nebo
- Kir-Hareset
- Aroer
- Atarot
- Bet-Baal-Meón

## Geografía estructural
- Río Jordán continuo
- Mar Muerto permanente
- Galaad
- río Jaboc / Jabbok
- meseta de Amón
- meseta de Moab
- Monte Nebo
- río Arnón / Wadi Mujib
- escarpes orientales del Mar Muerto
- oasis de En-Gadi en la costa occidental como hito fijo
- corredor sur hacia Edom / Arabá

Este bloque debe sentirse muy distinto de Judá: grandes desniveles, mesetas elevadas, quebradas profundas, pastizales y bosques en Galaad, y un paisaje más seco y monumental al descender hacia Moab y el Mar Muerto.

---

# 2. Sistema de coordenadas

Se mantiene la convención global:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala base ≈ **100 unidades de mundo por kilómetro geográfico relativo**

Puntos de continuidad ya fijados:

- Jericó = `(1970, 1030)`
- Bet-seán = `(2510, 7980)`

## 2.1 Coordenadas maestras V1

| Lugar | X | Z | Función | Radio urbano V1 |
|---|---:|---:|---|---:|
| Jericó | 1970 | 1030 | conexión occidental / Bloque 1 | 135 |
| vado del Jordán de Jericó | 3200 | 1050 | cruce estratégico | — |
| Bet-seán | 2510 | 7980 | conexión norte / Bloque 3 | 115 |
| vado oriental de Bet-seán | 3300 | 8050 | cruce hacia Galaad | — |
| Ramot de Galaad | 7600 | 8050 | gran fortaleza fronteriza de Israel | 155 |
| Jazer | 6250 | 2850 | ciudad fronteriza de Amón | 105 |
| Rabá | 6950 | 2200 | capital monumental de Amón | 220 |
| Minnit | 7750 | 1750 | ciudad agrícola oriental | 90 |
| Abel-Queramim | 7050 | 1050 | ciudad agrícola / viñedos | 90 |
| Hesbón | 5750 | 250 | gran nodo fortificado y disputado | 150 |
| Monte Nebo | 4950 | -250 | macizo / santuario / mirador | — |
| Nebo | 5050 | -550 | ciudad-santuario moabita | 95 |
| Medeba | 5550 | -850 | ciudad fortificada moabita | 140 |
| Atarot | 5250 | -1750 | puesto fortificado septentrional de Moab | 100 |
| Bet-Baal-Meón | 5550 | -2200 | ciudad cultual/agropecuaria | 100 |
| Dibón | 5650 | -3350 | capital monumental de Moab | 195 |
| Aroer | 5750 | -4300 | fortaleza sobre el Arnón | 105 |
| Kir-Hareset | 5200 | -6750 | gran fortaleza meridional de Moab | 175 |
| centro del Mar Muerto | 3300 | -3000 | cuerpo de agua permanente | — |

> Coordenadas de gameplay: conservan relaciones espaciales aproximadas, no son una reconstrucción topográfica exacta.

---

# 3. Diagrama regional simplificado

```text
                               NORTE / ARAM

                            RAMOT DE GALAAD
                               /       \
                  BET-SEÁN --VADO       \ ruta a Damasco
                     |                    \
                 RÍO JORDÁN             GALAAD
                     |                      |
                     |                    JAZER
                     |                      |
                  JERICÓ -- VADO ---- HESBÓN ---- RABÁ ---- MINNIT
                     |                 |             |
                     |               NEBO      ABEL-QUERAMIM
                     |                 |
                MAR MUERTO          MEDEBA
                     |                 |
                     |               ATAROT
                     |                 |
                     |          BET-BAAL-MEÓN
                     |                 |
                     |               DIBÓN
                     |                 |
                     |          ARNÓN / AROER
                     |                 |
                     |            KIR-HARESET
                     |
                 SUR → EDOM / ARABÁ
```

---

# 4. Geografía fija

## 4.1 Río Jordán

**OBLIGATORIO Y CONTINUO**

El Jordán ya no será un conjunto de segmentos locales. Debe funcionar como un único sistema:

`Dan / Hermón → Hula → Mar de Galilea → Bet-seán → Jericó → Mar Muerto`.

Reglas:
- cauce continuo;
- vegetación ribereña;
- zonas de barro y juncos;
- pocos cruces importantes;
- vados secundarios estrechos solo donde el terreno lo permita;
- los grandes caminos llegan físicamente al vado y continúan al otro lado;
- carros, caravanas y ejércitos grandes dependen de vados/puentes adecuados.

Dos cruces principales en este bloque:
1. **Vado de Jericó** → acceso a Hesbón / Medeba / Moab.
2. **Vado de Bet-seán** → acceso a Galaad / Ramot de Galaad.

Controlar esos cruces tendrá valor militar y comercial.

## 4.2 Mar Muerto

**OBLIGATORIO Y PERMANENTE**

Debe ser un cuerpo de agua enorme, continuo y reconocible.

Características:
- costa muy baja respecto a Jerusalén y a las mesetas orientales;
- agua visualmente distinta del Mediterráneo y Mar de Galilea;
- orillas salinas y áridas;
- escarpes y cañones entrando desde el este;
- zonas de sal y mineral;
- navegación limitada y secundaria, no equivalente al Mediterráneo.

Gameplay:
- no puede cruzarse a pie;
- obliga a rodear por norte o sur;
- los escarpes limitan el acceso a puntos específicos;
- crea una barrera geográfica natural enorme entre Judá y Moab.

## 4.3 Galaad

**OBLIGATORIO**

Galaad debe sentirse más verde y accidentado que Amón/Moab.

Características:
- colinas y mesetas quebradas;
- bosques abiertos de encinas/robles;
- pastos;
- rebaños;
- barrancos profundos;
- caminos sinuosos;
- mayor humedad relativa.

Gameplay:
- excelente para emboscadas;
- peor para carros;
- bueno para infantería y caballería ligera;
- las carreteras tienen alto valor estratégico.

## 4.4 Río Jaboc / Jabbok

**OBLIGATORIO**

Debe atravesar Galaad hacia el Jordán mediante un valle profundo.

Funciones:
- barrera natural entre sectores de Galaad/Amón;
- puentes y vados estratégicos;
- vegetación ribereña;
- pequeños campamentos y puestos de control.

No debe convertirse en un simple hilo azul plano: necesita quebrada, pendiente y ribera.

## 4.5 Meseta de Amón

Debe sentirse como un altiplano más abierto alrededor de Rabá.

Características:
- agricultura de secano;
- campos de cereal;
- colinas suaves;
- wadis profundos en lugares puntuales;
- menos bosque que Galaad;
- rutas caravaneras hacia el este.

## 4.6 Meseta de Moab

**OBLIGATORIO**

Meseta alta al este del Mar Muerto, cortada por enormes wadis.

Características:
- campos y pastizales en las alturas;
- bordes escarpados hacia el Mar Muerto;
- paisaje más árido hacia el sur;
- ovejas y grandes rebaños;
- fortalezas dominando pasos y gargantas.

## 4.7 Monte Nebo

**OBLIGATORIO COMO LANDMARK**

Debe ser un macizo claramente reconocible sobre la meseta occidental de Moab.

Gameplay:
- gran mirador hacia Jericó, valle del Jordán y Mar Muerto;
- santuario/recinto religioso moabita en las proximidades;
- senderos escarpados;
- punto de orientación regional.

No se representará como si conociéramos con certeza un templo específico del siglo VIII; el santuario será una reconstrucción cultural de gameplay.

## 4.8 Río Arnón / Wadi Mujib

**OBLIGATORIO Y MUY PROFUNDO**

Debe ser una de las barreras naturales más dramáticas del juego.

- cañón profundo;
- Aroer domina uno de los pasos principales;
- Camino del Rey atraviesa por un paso/puente controlado;
- rutas alternativas existen, pero son mucho más difíciles.

Controlar Aroer equivale a controlar uno de los accesos principales al sur de Moab.

## 4.9 En-Gadi

**HITO FIJO MENOR**

En la costa occidental del Mar Muerto aparecerá el oasis de En-Gadi:
- manantiales;
- vegetación densa concentrada;
- palmeras;
- fauna;
- cuevas;
- refugio para viajeros;
- no será una gran ciudad.

---

# 5. Red vial maestra

## 5.1 Camino del Rey — eje principal oriental

Ruta propuesta:

`Ramot de Galaad / norte → Rabá → Hesbón → Medeba → Dibón → Aroer → Kir-Hareset → Edom`.

No todos los segmentos tienen que ser rectos. Debe seguir mesetas, pasos y gargantas.

### Nodos estratégicos
- Rabá controla el centro político de Amón.
- Hesbón controla la transición Amón–Moab y el acceso occidental.
- Dibón controla el corazón de Moab.
- Aroer controla el paso del Arnón.
- Kir-Hareset controla el corredor meridional hacia Edom.

## 5.2 Corredor Jericó–Transjordania

`Jerusalén → Jericó → vado del Jordán → Hesbón`.

Después de cruzar el río:
- rama noroeste/alta → Hesbón;
- rama suroeste → Monte Nebo / Medeba;
- desde Medeba → Dibón y Camino del Rey.

La ruta debe ascender fuertemente desde el valle del Jordán hasta la meseta.

## 5.3 Corredor Bet-seán–Galaad

`Jezreel / Bet-seán → vado del Jordán → Galaad → Ramot de Galaad`.

Este será el corredor militar principal entre Israel occidental y su enclave/fortaleza de Galaad.

## 5.4 Ruta Rabá–desierto oriental

Rabá tendrá una puerta oriental hacia:
- Minnit;
- rutas caravaneras;
- interior arábigo.

No es una conexión a otra gran capital del mapa todavía, pero debe existir como corredor vivo con caravanas.

## 5.5 Rutas alternativas

Como regla global aprobada:
- se puede abandonar la carretera;
- cruzar una meseta por campo abierto;
- buscar un vado menor;
- rodear una fortaleza;

Pero debe costar más tiempo, agua, riesgo y dificultad logística.

---

# 6. Ciudades y funciones

# 6.1 RAMOT DE GALAAD

**Facción propuesta:** Israel  
**Estado político:** frontera disputada con Aram  
**Categoría:** gran ciudad-fortaleza  
**Radio V1:** 155

### Función

Será el gran bastión israelita al este del Jordán y un punto permanente de tensión Israel–Aram.

### Urbanismo
- murallas muy altas;
- ciudad compacta y militar;
- cuarteles grandes;
- patios para tropas;
- almacenes;
- palacio/casa del gobernador militar;
- mercado menor que Samaria/Jezreel.

### Puertas
1. **Puerta Oeste:** `BET-SEÁN · ISRAEL`
2. **Puerta Sur:** `RABÁ · GALAAD`
3. **Puerta Norte:** `DAMASCO · ARAM`

### Religión
- santuario israelita a Elohim/Yahvé;
- no debe competir visualmente con Jerusalén ni Dan;
- carácter más militar que ceremonial.

### Gameplay
- cambiar de manos con relativa frecuencia;
- si Aram la conquista, cambia guarnición/control pero conserva arquitectura galaadita/israelita inicialmente;
- excelente ciudad para asedios fronterizos.

---

# 6.2 RABÁ

**Facción:** Amón  
**Capital:** sí  
**Rey:** Sanipu  
**Categoría:** capital monumental  
**Radio V1:** 220

### Función
- centro político de Amón;
- nodo del Camino del Rey;
- gran centro de caravanas y tributo.

### Puertas
1. **Norte:** `GALAAD · RAMOT`
2. **Sur:** `HESBÓN · MOAB`
3. **Oeste:** `JAZER · JORDÁN`
4. **Este:** `MINNIT · DESIERTO`

### Arquitectura
- gran muralla;
- palacio real dominante;
- plaza ceremonial;
- almacenes y corrales de caravanas;
- templo monumental de **Milcom** como culto estatal amonita.

### Vegetación
- olivos;
- higueras;
- cereal;
- árboles de sombra grandes en patios y exterior de muralla.

---

# 6.3 HESBÓN

**Control inicial propuesto:** Amón  
**Cultura:** zona fronteriza con herencia/transición amonita-moabita  
**Categoría:** gran ciudad fortificada y disputada  
**Radio V1:** 150

### Función

Llave de la ruta entre Jericó, Rabá, Medeba y Moab.

### Puertas
1. **Norte:** `RABÁ`
2. **Oeste:** `JERICÓ · JORDÁN`
3. **Sur:** `MEDEBA · DIBÓN`

### Gameplay

Hesbón aplicará la misma lógica aprobada para Gezer:
- cultura regional propia;
- controlador político puede cambiar;
- culto puede cambiar después de conquista;
- dominarla abre/cierra corredores enteros.

### Religión

En V1 se propone templo amonita de Milcom bajo control inicial de Amón, con posibilidad narrativa de conservar elementos moabitas/locales.

---

# 6.4 JAZER

**Facción:** Amón  
**Categoría:** ciudad fronteriza menor  
**Radio:** 105

Función:
- protege accesos desde Galaad/Jordán;
- agricultura y rebaños;
- pequeña guarnición.

Puertas:
- este → Rabá;
- norte → Galaad;
- oeste → Jordán.

Culto: Milcom / santuario local amonita.

---

# 6.5 MINNIT

**Facción:** Amón  
**Categoría:** ciudad agrícola menor  
**Radio:** 90

Función:
- cereal y aprovisionamiento;
- corredor hacia rutas del desierto oriental;
- caravanas.

Edificio dominante:
- casa de gobierno/almacén fortificado, no gran templo.

Culto: Milcom con santuario local.

---

# 6.6 ABEL-QUERAMIM

**Facción:** Amón  
**Categoría:** ciudad agrícola menor  
**Radio:** 90

Identidad:
- viñedos;
- huertos;
- lagares;
- muralla más modesta;
- casa del gobernador.

Debe sentirse diferente de la capital: rica pero rural.

---

# 6.7 DIBÓN

**Facción:** Moab  
**Capital:** sí  
**Rey:** Salamanu  
**Categoría:** capital monumental  
**Radio V1:** 195

### Función
- corazón político de Moab;
- nodo del Camino del Rey;
- centro de tributo, rebaños y administración.

### Puertas
1. **Norte:** `MEDEBA · HESBÓN`
2. **Sur:** `AROER · KIR-HARESET`
3. **Oeste:** `NEBO · MAR MUERTO`

### Arquitectura
- muralla alta;
- palacio real;
- gran plaza;
- almacenes de grano y lana;
- corrales exteriores;
- templo estatal monumental de **Quemos/Chemosh**.

### Identidad

Dibón debe sentirse claramente moabita y no como una copia de Rabá.

---

# 6.8 MEDEBA

**Facción:** Moab  
**Categoría:** ciudad fortificada  
**Radio:** 140

Función:
- controla la meseta norte de Moab;
- conecta Hesbón, Nebo y Dibón;
- agricultura y comercio.

Puertas:
- norte → Hesbón;
- sur → Dibón;
- oeste → Nebo / Jordán.

Culto: Quemos como culto estatal moabita.

---

# 6.9 NEBO

**Facción:** Moab  
**Categoría:** ciudad-santuario  
**Radio:** 95

Identidad:
- asociada al Monte Nebo;
- menos población que Medeba/Dibón;
- recinto cultual destacado;
- peregrinos y ofrendas;
- gran vista del valle del Jordán.

Religión:
- santuario moabita bajo patronazgo estatal de Quemos;
- deidades secundarias/locales se decidirán después de revisión histórica.

---

# 6.10 ATAROT

**Facción:** Moab  
**Categoría:** fortaleza menor  
**Radio:** 100

Función:
- defensa norte de Dibón;
- vigila corredores de meseta;
- guarnición significativa para su tamaño.

Culto: Quemos / santuario militar local.

---

# 6.11 BET-BAAL-MEÓN

**Facción:** Moab  
**Categoría:** ciudad cultual/agropecuaria  
**Radio:** 100

Identidad:
- rebaños;
- cereal;
- culto local asociado a Baal dentro de un marco político moabita dominado por Quemos.

No tendrá el gran templo estatal de Dibón, sino un santuario regional distinto.

---

# 6.12 AROER

**Facción:** Moab  
**Categoría:** ciudad-fortaleza  
**Radio:** 105

Función:
- domina el Arnón;
- protege puente/paso del Camino del Rey;
- enorme valor militar pese a tamaño reducido.

Puertas:
- norte → Dibón;
- sur → Kir-Hareset / Edom.

Debe tener torres especialmente altas mirando al cañón.

---

# 6.13 KIR-HARESET

**Facción:** Moab  
**Categoría:** gran fortaleza meridional  
**Radio:** 175

Función:
- bastión del sur de Moab;
- protege rutas hacia Edom;
- ciudad de refugio en guerra.

Arquitectura:
- fortificaciones masivas;
- palacio/casa del gobernador;
- gran cisterna;
- almacenes;
- templo de Quemos;
- menor carácter administrativo que Dibón, mucho mayor carácter defensivo.

---

# 7. Religión del bloque

## Amón

Culto estatal V1:
- **Milcom** en Rabá;
- santuarios locales de Milcom en ciudades menores;
- cultos secundarios no se fijarán hasta revisión histórica.

## Moab

Culto estatal V1:
- **Quemos/Chemosh** como deidad nacional;
- Dibón posee el principal templo estatal del bloque;
- Nebo tendrá santuario regional;
- Bet-Baal-Meón podrá conservar una manifestación cultual local de Baal además del marco político de Quemos.

## Israel en Galaad

Ramot de Galaad:
- culto a Elohim/Yahvé;
- santuario sobrio de carácter militar/fronterizo.

## Cambio de culto tras conquista

Se aplica el sistema global ya aprobado:
- conservar culto local;
- introducir culto del conquistador;
- consagrar a Elohim;
- reconstruir/reemplazar santuario;
- consecuencias en lealtad, rebelión, diplomacia y apariencia urbana.

---

# 8. Escala urbana y arquitectura

Se aplican reglas globales ya aprobadas:

- casas aproximadamente 2× las actuales;
- murallas 1.5–2× las actuales;
- torres claramente superiores a murallas;
- calles protegidas y limpias;
- palacio/casa de gobierno obligatoria;
- mercados nunca bloquean ejes de circulación.

Diferenciación visual:
- **Galaad:** piedra oscura/terrosa, madera visible, paisaje verde;
- **Amón:** piedra clara, grandes patios, muros compactos, arquitectura de meseta;
- **Moab:** piedra rojiza/ocre, terrazas, murallas adaptadas a barrancos, grandes santuarios de Quemos.

---

# 9. Gameplay estratégico del bloque

El relieve debe modificar campañas.

## Puntos de control

- vado de Bet-seán;
- Ramot de Galaad;
- vado de Jericó;
- Hesbón;
- Rabá;
- paso del Arnón / Aroer;
- Kir-Hareset.

## Consecuencias

Un ejército que controle esos puntos puede:
- cortar caravanas;
- bloquear refuerzos;
- impedir paso de grandes ejércitos;
- cobrar tributo;
- aislar capitales;
- controlar los accesos al Camino del Rey.

El jugador puede rodear esos puntos, pero con penalidades logísticas y de tiempo.

---

# 10. Decisiones recomendadas para aprobación

1. **Ramot de Galaad entra definitivamente al mapa** como gran fortaleza israelita de frontera, disputada con Aram.
2. Ramot de Galaad **se añade** al roster de Israel; no reemplaza a otra ciudad.
3. **Hesbón** comienza bajo Amón pero se considera ciudad fronteriza/disputada con identidad regional mixta.
4. **Rabá** será capital monumental de Amón con gran templo de Milcom.
5. **Dibón** será capital monumental de Moab con gran templo estatal de Quemos.
6. **Kir-Hareset** será el gran bastión meridional de Moab.
7. **Aroer** será un nodo estratégico obligatorio del Camino del Rey sobre el Arnón, con rutas alternativas difíciles.
8. **Nebo** será ciudad-santuario menor junto al Monte Nebo, no una gran capital.
9. El **Mar Muerto será una barrera física permanente**, no cruzable a pie y con navegación secundaria limitada.
10. Se incorporan permanentemente **Jaboc, Arnón, Monte Nebo, Galaad, meseta de Amón, meseta de Moab y En-Gadi**.
11. El **Camino del Rey** será el gran eje vial de Transjordania y conectará este bloque con Edom en el Bloque 5.
12. Los dos grandes cruces del Jordán del bloque serán **Jericó** y **Bet-seán**, con importancia militar y comercial real.

---

# 11. Conexión con el próximo bloque

El extremo sur de este bloque debe continuar naturalmente:

`Kir-Hareset → frontera Moab/Edom → Bosra → Sela → Temán → Elat / Ezión-Geber`.

El Bloque 5 deberá incorporar:
- Wadi Zered como transición Moab–Edom;
- Arabá;
- montañas de Edom;
- desierto meridional;
- Golfo de Aqaba;
- puertos de Elat y Ezión-Geber.

---

**Estado final de este archivo:** PROPUESTA V1. Espera aprobación antes de marcar decisiones como definitivas.
