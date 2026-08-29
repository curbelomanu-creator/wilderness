# WILDERNESS 6 — WORLD BIBLE

> Documento maestro de diseño del mundo de **Wilderness 6**.
>
> Este archivo es la fuente oficial para las decisiones de geografía, ciudades, rutas, arquitectura, religión, conquista y generación del mundo. Las decisiones aprobadas se consolidan aquí antes de convertirse en código.

## 0. Estado del documento

- **Estado:** Diseño en progreso
- **Objetivo:** definir el mundo completo antes de reconstruirlo en el motor.
- **Regla de trabajo:** primero se aprueba una decisión en este documento; después se implementa en `world6-data.js` / módulos del juego.
- **Principio:** distinguir siempre entre decisiones **APROBADAS**, **PROPUESTAS** y **PENDIENTES**.

---

# 1. Principios generales del mundo

## 1.1 Escala

**APROBADO**

Las ciudades históricas deben sentirse separadas por territorio real. No deben verse unas desde otras salvo casos geográficamente justificados.

- Capitales y ciudades mayores: trayectos largos entre sí.
- Ciudades menores: pueden estar más próximas, pero nunca pegadas.
- Aldeas, campamentos, caravanas, ruinas y puestos menores pueden existir entre ciudades.
- Cada ciudad histórica tendrá un radio de exclusión que impedirá la aparición de otra ciudad histórica demasiado cerca.
- El mapa histórico se ampliará respecto al actual, probablemente entre **2× y 4×**, sujeto a pruebas de gameplay.

## 1.2 Geografía fija

**APROBADO**

Los siguientes elementos deben existir siempre y no depender de generación aleatoria:

### Agua
- Mar Mediterráneo
- Río Jordán
- Mar Muerto
- Mar de Galilea
- Golfo de Aqaba / brazo norte del Mar Rojo

### Montañas y sistemas elevados
- Monte Carmelo
- Montes de Galilea
- Montes de Samaria
- Montes de Judá
- Monte de los Olivos
- Monte Hermón
- Meseta de Moab
- Montañas de Edom
- Cordillera del Líbano
- Anti-Líbano

### Valles, llanuras, desiertos y regiones
- Valle de Jezreel
- Llanura de Sarón
- Sefelá
- Valle del Jordán
- Desierto de Judea
- Néguev
- Arabá
- Valle de Elá
- Galaad
- Bashán

### Hitos regionales adicionales
- Monte Nebo
- oasis y wadis
- pasos montañosos
- puertos fenicios
- zonas agrícolas del Jordán

## 1.3 Red vial

**APROBADO**

Las ciudades no estarán conectadas de forma arbitraria. El mundo utilizará una red jerárquica de rutas.

- Rutas principales interregionales.
- Caminos secundarios regionales.
- Caminos locales hacia aldeas, santuarios, campos, puertos y fortalezas.
- Ninguna ciudad tendrá una puerta sin un destino vial lógico.
- Ningún camino principal terminará contra una muralla sin una puerta.

## 1.4 Puertas orientadas por destino

**APROBADO**

Las puertas se generan a partir de la red de caminos, no al revés.

Regla:

`Ciudad A ↔ Ciudad B` → orientación de ruta → puerta de salida → cartel/señal → camino continuo → destino.

Cada puerta importante tendrá un cartel o mojón indicando el destino principal, por ejemplo:

- A BELÉN
- A JERICÓ
- A GEZER
- A SAMARIA

Una puerta puede servir a más de un destino cuando esos caminos comparten el mismo corredor inicial.

---

# 2. Rutas mayores del mundo

## 2.1 Vía Maris

**APROBADO COMO PRINCIPIO**

Corredor occidental y septentrional aproximado:

Gaza → Ascalón → Asdod → zona Ecrón/Gat → Gezer → Llanura de Sarón → Monte Carmelo/Megido → Jezreel → Hazor → Dan → Damasco / norte.

## 2.2 Camino de la serranía central

Samaria → Betel → Jerusalén → Belén → Hebrón → Beerseba.

## 2.3 Camino Jerusalén–Jericó

Jerusalén → Desierto de Judea → Jericó → Jordán.

Desde Jericó:
- norte por el valle del Jordán;
- este hacia Transjordania;
- sur bordeando el Mar Muerto.

## 2.4 Ruta occidental de Judá

Jerusalén → Gezer / Azecá / Laquis → Filistea / costa.

## 2.5 Camino del Rey / King’s Highway

Damasco → Rabá → Hesbón → Medeba → Dibón → Aroer → Edom → Bosra → Sela → Temán → Elat / Ezión-Geber.

## 2.6 Ruta fenicia costera

Tiro → Sarepta → Sidón → Berito → Biblos → Arwad.

## 2.7 Eje Jezreel–Carmelo

Samaria → Jezreel → Megido → Monte Carmelo / costa.

Megido → Hazor → Dan.

---

# 3. Facciones, reyes y ciudades

> Los listados son de diseño del juego. La fidelidad histórica fina por ciudad y fecha se revisará antes de fijar coordenadas finales.

## 3.1 Reino de Israel

**Capital:** Samaria  
**Rey:** Pécaj

### Roster aprobado/propuesto actual

- Samaria — capital
- Betel
- Siquem
- **Silo** — reemplaza a Tirsa en el roster principal
- Jezreel
- Megido
- Hazor
- Dan

### Candidatos importantes a evaluar

- **Ramot de Galaad** — muy valiosa para la frontera Israel–Aram y para integrar Galaad.
- **Bet-seán** — valiosa como ciudad regional estratégica del corredor Jezreel–Jordán; su adscripción política exacta debe evaluarse.

### Decisión ya tomada

- **Tirsa sale del roster principal y entra Silo.**

## 3.2 Reino de Judá

**Capital:** Jerusalén  
**Rey:** Acaz

- Jerusalén
- Jericó
- Hebrón
- Belén
- Laquis
- Beerseba
- Arad
- Tecoa
- Bet-sur
- Azecá
- Libná
- **Gezer** — incorporada al diseño del nuevo mapa como nodo occidental clave

## 3.3 Filistea

**Capital de gameplay actual:** Gaza  
**Gobernante asociado:** Hanunu de Gaza

- Gaza
- Ascalón
- Asdod
- Ecrón
- Gat

## 3.4 Moab

**Capital:** Dibón  
**Rey:** Salamanu

- Dibón
- Medeba
- Nebo
- Kir-Hareset
- Aroer
- Atarot
- Bet-Baal-Meón

## 3.5 Edom

**Capital:** Bosra  
**Rey:** Qaus-malaka

- Bosra
- Sela
- Temán
- Elat
- Ezión-Geber

## 3.6 Amón

**Capital:** Rabá  
**Rey:** Sanipu

- Rabá
- Hesbón
- Jazer
- Minnit
- Abel-Queramim

## 3.7 Aram-Damasco

**Capital:** Damasco  
**Rey:** Rezín

- Damasco
- Hamat
- Arpad
- Zobá
- Bet-Rehob

## 3.8 Fenicia

**Capital de gameplay actual:** Tiro  
**Gobernante asociado:** Mitenna de Tiro

- Tiro
- Sidón
- Biblos
- Arwad
- Sarepta
- Berito

## 3.9 Estados neo-hititas

**Capital de gameplay actual:** Carquemis  
**Gobernante asociado:** Pisiri

- Carquemis
- Sam'al
- Melid
- Gurgum
- Kinalua

---

# 4. Escala y jerarquía urbana

**APROBADO**

Las ciudades serán proporcionalmente mucho mayores que en Wilderness 5.x.

## 4.1 Categorías de ciudad

| Categoría | Ejemplos | Radio urbano de gameplay inicial |
|---|---|---:|
| Capital monumental | Jerusalén, Samaria, Damasco, Tiro, Carquemis | 180–260 m |
| Gran ciudad | Gaza, Megido, Hazor, Ecrón, Laquis, Sidón | 130–190 m |
| Ciudad fortificada | Belén, Betel, Dibón, Bosra, Gat | 90–140 m |
| Ciudad/santuario regional | Silo, Nebo, Tecoa, etc. | 70–110 m |

> Estos radios son de gameplay y quedan sujetos a pruebas.

## 4.2 Alturas

**APROBADO**

- Murallas: aproximadamente **1.5×–2×** más altas que las actuales.
- Torres: más altas que la muralla y reconocibles desde lejos.
- Casas: aproximadamente **2×** más altas que las actuales.
- Edificios importantes: palacios, templos y puertas deben dominar el skyline.
- Árboles: más altos y maduros, según bioma y región.

## 4.3 Edificios obligatorios

**APROBADO**

Toda ciudad histórica tendrá:

- palacio, casa de gobierno o residencia del gobernador;
- plaza administrativa;
- almacenes;
- zona militar / cuarteles / guardia;
- red de calles principales y secundarias;
- barrios residenciales;
- templo, santuario o recinto religioso culturalmente apropiado;
- puertas ligadas a caminos externos;
- vegetación propia de la región.

## 4.4 Calles limpias

**APROBADO — REGLA ESTRUCTURAL**

Las calles y plazas son zonas protegidas.

No puede generarse sobre ellas:

- roca;
- árbol;
- tienda;
- puesto de mercado;
- casa;
- decoración sólida;
- mobiliario que bloquee el paso;
- obstáculo procedural.

Orden de generación obligatorio:

1. geografía;
2. rutas externas;
3. puertas;
4. calles internas;
5. plazas;
6. parcelas;
7. edificios;
8. decoración solamente en zonas permitidas.

---

# 5. Arquitectura cultural

**APROBADO COMO SISTEMA, DETALLES PENDIENTES**

Cada facción tendrá un lenguaje arquitectónico reconocible.

Se definirá por cultura:

- piedra/adobe predominante;
- proporciones de edificios;
- forma de murallas y torres;
- palacios;
- templos;
- puertas;
- mercados;
- vegetación;
- estatuas, estelas y símbolos;
- tratamiento de puertos, patios y plazas.

Una ciudad conquistada conservará inicialmente su **cultura arquitectónica original**, aunque cambie de controlador.

---

# 6. Religión, templos y culto de las ciudades

## 6.1 Principio general

**APROBADO**

Cada ciudad importante puede tener un culto oficial y un templo físico asociado.

La religión será una mecánica política y urbana, no únicamente decoración.

## 6.2 Deidades/cultos previstos

**PROPUESTA BASE — requiere cierre histórico antes de implementar**

| Cultura/Reino | Cultos/deidades candidatas |
|---|---|
| Israel / Judá | Yahvé / Elohim |
| Filistea | Dagón, Baal-Zebub, Astarté |
| Moab | Quemos / Chemosh |
| Amón | Milcom |
| Edom | Qos / Qaus |
| Aram | Hadad / Rimón |
| Fenicia | Baal / Melqart, Astarté |
| Cananeos regionales | Baal, Asera/Astarté |

## 6.3 Templos distintivos

**PROPUESTO**

- Jerusalén → Templo de Yahvé / Elohim
- Betel → santuario del reino del norte
- Dan → santuario del reino del norte
- Silo → antiguo centro santuario
- Ecrón → gran templo asociado a Baal-Zebub
- Asdod → gran templo de Dagón
- Gaza → gran templo de Dagón

Otros templos se definirán ciudad por ciudad.

## 6.4 Cambio de culto tras conquista

**APROBADO COMO MECÁNICA**

Después de conquistar una ciudad, el jugador podrá decidir el destino del santuario.

Opciones previstas:

- conservar culto local;
- consagrar a Elohim;
- introducir el culto oficial de la nación conquistadora;
- destruir/reemplazar el templo cuando la narrativa y recursos lo permitan.

El cambio de culto debe producir consecuencias:

- transformación física del templo;
- cambio de estatua/símbolos;
- lealtad de la población;
- riesgo de rebelión;
- reputación/diplomacia;
- posibles eventos religiosos o políticos.

El templo no debe transformarse instantáneamente sin explicación: puede pasar por una fase de obras/reconsagración.

---

# 7. Conquista y continuidad cultural

**APROBADO COMO PRINCIPIO**

Conquistar una ciudad no elimina automáticamente su identidad cultural.

Debe distinguirse entre:

- **cultura original**;
- **control político actual**;
- **religión/culto oficial actual**;
- **gobernador/guarnición**.

Ejemplo:

Una Ecrón conquistada por Judá puede seguir siendo arquitectónicamente filistea, estar políticamente controlada por Judá y, dependiendo de la decisión del jugador, conservar su culto anterior o ser reconsagrada a Elohim.

---

# 8. Regiones geográficas maestras

El mundo se revisará por bloques antes de codificarlo.

## Bloque 1 — Judá / Samaria central

Ciudades iniciales a diseñar en detalle:

- Jerusalén
- Belén
- Hebrón
- Bet-sur
- Tecoa
- Jericó
- Gezer
- Betel
- Silo
- Siquem
- Samaria

Elementos geográficos asociados:

- Montes de Judá
- Monte de los Olivos
- Desierto de Judea
- valle del Jordán
- río Jordán
- Mar Muerto
- Sefelá
- transición hacia los montes de Samaria

## Bloque 2 — Filistea y costa mediterránea

- Gaza
- Ascalón
- Asdod
- Ecrón
- Gat
- conexiones con Gezer, Azecá y Laquis
- Mar Mediterráneo
- llanura costera

## Bloque 3 — Jezreel / Galilea

- Jezreel
- Megido
- Hazor
- Dan
- posible Bet-seán
- Monte Carmelo
- Valle de Jezreel
- Mar de Galilea
- Alto Jordán
- Monte Hermón

## Bloque 4 — Transjordania

- Rabá
- Hesbón
- Jazer
- Medeba
- Dibón
- Nebo
- Aroer
- Kir-Hareset
- posible Ramot de Galaad
- Galaad
- meseta de Moab
- Jordán
- Mar Muerto

## Bloque 5 — Edom / Arabá / Aqaba

- Bosra
- Sela
- Temán
- Elat
- Ezión-Geber
- Arabá
- montañas de Edom
- Golfo de Aqaba

## Bloque 6 — Fenicia / Aram

- Tiro
- Sarepta
- Sidón
- Berito
- Biblos
- Arwad
- Damasco
- Bet-Rehob
- Zobá
- Hamat
- Arpad
- Mediterráneo
- Líbano
- Anti-Líbano

## Bloque 7 — Extremo norte / neo-hititas

- Carquemis
- Sam'al
- Melid
- Gurgum
- Kinalua

---

# 9. Plantilla oficial por ciudad

Cada ciudad deberá tener una ficha como esta antes de implementarse:

```text
Ciudad:
ID:
Facción original:
Control inicial:
Rey/gobernante:
Categoría urbana:
Radio aproximado:
Región geográfica:
Relieve:
Agua cercana:
Vegetación:

Vecino norte:
Vecino sur:
Vecino este:
Vecino oeste:
Otros vecinos directos:

Rutas principales:
Rutas secundarias:
Puertas:
Carteles por puerta:

Altura de muralla:
Torres:
Palacio/casa de gobierno:
Plaza administrativa:
Cuarteles:
Mercado:
Templo/santuario:
Culto inicial:
Arquitectura religiosa:

Característica única:
Notas históricas:
Notas de gameplay:
Estado de aprobación:
```

---

# 10. Arquitectura técnica futura

## 10.1 Documento humano

Este archivo:

`docs/WILDERNESS_6_WORLD_BIBLE.md`

contiene el razonamiento, contexto y decisiones aprobadas.

## 10.2 Datos estructurados

Después del cierre del diseño se creará una fuente de datos del motor, por ejemplo:

- `world6-data.js`, o
- `world6.json`

Contendrá, entre otras cosas:

- coordenadas;
- facción;
- tamaño;
- vecinos;
- rutas;
- puertas;
- destinos;
- geografía;
- templo;
- culto;
- categoría urbana;
- parámetros de arquitectura.

## 10.3 Regla de sincronización

Toda modificación importante seguirá este orden:

1. actualizar World Bible;
2. aprobar decisión;
3. actualizar datos estructurados;
4. modificar motor/renderizado;
5. probar navegación y gameplay.

---

# 11. Próxima tarea de diseño

**SIGUIENTE PASO PROPUESTO**

Completar el **Bloque 1 — Judá / Samaria central** mediante una tabla maestra para:

- Jerusalén
- Belén
- Hebrón
- Bet-sur
- Tecoa
- Jericó
- Gezer
- Betel
- Silo
- Siquem
- Samaria

Para cada una se definirán:

- posición relativa;
- distancia de gameplay;
- conexiones directas;
- rutas;
- puertas;
- carteles;
- relieve;
- arquitectura;
- tamaño;
- murallas;
- palacio;
- templo;
- culto;
- vegetación;
- accidente geográfico dominante.

---

# 12. Decisiones pendientes importantes

- escala final exacta del mapa histórico;
- distancias de gameplay entre ciudades;
- incorporación definitiva de Ramot de Galaad;
- tratamiento de Bet-seán como israelita, independiente o disputada;
- listado religioso definitivo por ciudad y período;
- nomenclatura final Yahvé / Elohim en interfaz y narrativa;
- dimensiones estándar de murallas, torres y casas por categoría;
- sistema de carteles y señalización visual;
- funcionamiento de rutas marítimas;
- tamaño y comportamiento de aldeas intermedias;
- fronteras territoriales entre ciudades/reinos;
- cuánto territorio cambia de control cuando cae una ciudad.

---

**Este documento debe actualizarse continuamente durante el diseño de Wilderness 6.**
