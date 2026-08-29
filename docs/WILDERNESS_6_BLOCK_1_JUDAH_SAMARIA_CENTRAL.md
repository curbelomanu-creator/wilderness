# WILDERNESS 6 — BLOQUE 1: JUDÁ / SAMARIA CENTRAL

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Primero se revisa y aprueba el bloque; después se traduce a datos estructurados y código.

---

# 1. Objetivo del bloque

Definir la arquitectura geográfica y urbana del corredor central formado por:

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

El bloque debe resolver simultáneamente:

1. posición relativa coherente entre ciudades;
2. distancias de gameplay suficientemente grandes;
3. red de caminos jerárquica;
4. puertas orientadas a destinos reales;
5. geografía fija reconocible;
6. escala urbana mucho mayor;
7. calles y plazas completamente transitables;
8. palacio/casa de gobierno en todas las ciudades;
9. santuario/templo coherente con cada ciudad;
10. continuidad futura con Filistea, Jezreel, Jordán y Transjordania.

---

# 2. Sistema de coordenadas propuesto

## 2.1 Convención

Para el diseño del mundo histórico:

- **Jerusalén = (0, 0)**
- **X positivo = este**
- **X negativo = oeste**
- **Z positivo = norte**
- **Z negativo = sur**

## 2.2 Escala inicial de gameplay

**PROPUESTA:** aproximadamente **100 unidades de mundo por kilómetro geográfico relativo**.

No representa una escala física exacta. Su objetivo es conservar aproximadamente las relaciones de posición reales y, al mismo tiempo, hacer que los viajes tengan peso jugable.

Reglas iniciales:

- ninguna gran ciudad debe ser visible desde otra;
- ninguna ciudad histórica debe aparecer dentro del radio de exclusión de otra;
- el terreno entre ciudades debe contener paisaje, aldeas, caravanas, ruinas, fortalezas, cultivos y encuentros;
- las rutas largas deben sentirse como verdaderos viajes;
- el streaming por chunks debe impedir que la escala grande perjudique el rendimiento.

## 2.3 Coordenadas maestras V1

| Ciudad | X | Z | Dirección desde Jerusalén | Radio urbano V1 |
|---|---:|---:|---|---:|
| Jerusalén | 0 | 0 | origen | 240 |
| Belén | -310 | -810 | sur-suroeste | 110 |
| Tecoa | -200 | -1580 | sur-sureste | 90 |
| Bet-sur | -1260 | -2020 | sur-suroeste | 100 |
| Hebrón | -1280 | -2720 | sur-suroeste | 150 |
| Jericó | 1970 | 1030 | este-noreste | 135 |
| Gezer | -2980 | 900 | oeste-noroeste | 150 |
| Betel | 30 | 1640 | norte | 125 |
| Silo | 510 | 3070 | norte-noreste | 105 |
| Siquem | 440 | 4830 | norte-noreste | 165 |
| Samaria | -350 | 5540 | norte-noroeste | 220 |

> Estas coordenadas son de gameplay y deben revisarse visualmente antes de convertirse en definitivas.

---

# 3. Diagrama regional simplificado

```text
                                  NORTE

                                SAMARIA
                                   \
                                    \
                                   SIQUEM
                         [MONTE EBAL / GERIZIM]
                                      |
                                     SILO
                                      |
                                    BETEL
                                      |

  OESTE / SEFELÁ       GEZER ------ JERUSALÉN ------ WADI QELT ------ JERICÓ ------ RÍO JORDÁN
                                    /   |                                  |
                          M. OLIVOS     |                                  |
                                       |                          VALLE DEL JORDÁN
                                     BELÉN
                                       |  \
                                       |   TEC0A ---- DESIERTO DE JUDEA ----> MAR MUERTO
                                       |
                                    BET-SUR
                                       |
                                     HEBRÓN

                                  SUR / NÉGUEV
```

`TECOA` se escribe Tecoa en interfaz; el cero del diagrama solo evita que algunas fuentes monoespaciadas confundan el ancho visual.

---

# 4. Nuevos accidentes geográficos obligatorios para este bloque

Además de los ya incluidos en la World Bible, este bloque requiere añadir como geografía fija:

## 4.1 Jerusalén

- **Monte de los Olivos** — al este de la ciudad.
- **Valle del Cedrón / Kidron** — entre Jerusalén y el Monte de los Olivos.
- **Valle de Hinom** — borde sur/suroeste de Jerusalén.
- **Manantial de Gihón** — elemento hídrico local asociado a Jerusalén.

## 4.2 Ruta Jerusalén–Jericó

- **Wadi Qelt / sistema de quebradas del descenso oriental**.
- transición clara de montaña de Judá → desierto de Judea → valle del Jordán.
- caída progresiva muy marcada de altitud hacia Jericó.

## 4.3 Gezer

- **Valle de Ajalón** como gran corredor occidental hacia la Sefelá y la costa.
- transición entre serranía y tierras más abiertas del oeste.

## 4.4 Siquem

- **Monte Ebal** al norte del valle.
- **Monte Gerizim** al sur del valle.
- Siquem debe sentirse encajada entre ambos montes, no colocada en una llanura genérica.

## 4.5 Eje oriental

- **Río Jordán** al este de Jericó.
- **Mar Muerto** al sureste del bloque.
- valle del Jordán mucho más bajo y cálido que la serranía central.

---

# 5. Red vial maestra del Bloque 1

## 5.1 Eje central norte-sur

Ruta principal:

**Hebrón → Bet-sur → Belén → Jerusalén → Betel → Silo → Siquem → Samaria**

Esta es la columna vertebral montañosa del bloque.

### Tramos aproximados de gameplay

| Tramo | Distancia centro-centro aprox. |
|---|---:|
| Hebrón ↔ Bet-sur | 700 |
| Bet-sur ↔ Belén | 1,540 |
| Belén ↔ Jerusalén | 870 |
| Jerusalén ↔ Betel | 1,640 |
| Betel ↔ Silo | 1,510 |
| Silo ↔ Siquem | 1,760 |
| Siquem ↔ Samaria | 1,060 |

No todos los tramos deben ser rectos. La carretera debe seguir crestas, pasos, valles y pendientes.

## 5.2 Eje oriental

**Jerusalén → Wadi Qelt / Desierto de Judea → Jericó → Río Jordán**

Distancia Jerusalén ↔ Jericó V1: **~2,220 unidades**.

Desde Jericó el camino se divide en futuras rutas:

- norte por el valle del Jordán;
- este hacia cruces del Jordán / Amón y Moab;
- sur hacia el Mar Muerto.

## 5.3 Eje occidental

**Jerusalén → Gezer → Sefelá / Filistea / costa**

Distancia Jerusalén ↔ Gezer V1: **~3,110 unidades**.

Gezer se convierte en el gran nodo que enlaza el mundo montañoso de Judá con las rutas de Filistea y la costa mediterránea.

## 5.4 Corredor de Tecoa

**Belén → Tecoa** será camino regional directo.

Tecoa no necesita convertirse en una estación obligatoria de la ruta Jerusalén–Hebrón. Debe sentirse como una ciudad lateral situada hacia el borde del desierto.

Ruta secundaria futura:

**Tecoa → caminos del desierto de Judea / Mar Muerto**.

## 5.5 Regla de conexiones

No se crearán caminos directos que salten innecesariamente ciudades intermedias.

Ejemplo:

- Samaria no necesita una carretera separada hasta Jerusalén.
- La ruta Samaria–Jerusalén pasa por Siquem → Silo → Betel.
- Hebrón–Jerusalén utiliza Bet-sur → Belén.

Esto hace que las ciudades intermedias tengan valor estratégico real.

---

# 6. Reglas de puertas para todo el bloque

## 6.1 Principio

Una ciudad no tendrá una puerta por cada nombre del mapa si varios destinos comparten un corredor inicial.

La puerta corresponde al **corredor de salida**. El cartel puede señalar varios destinos.

Ejemplo:

`PUERTA SUR — BELÉN · HEBRÓN`

La ruta puede bifurcarse más adelante.

## 6.2 Señalización

Los carteles o mojones deben:

- estar inmediatamente dentro o fuera de la puerta;
- mirar hacia el jugador que abandona la ciudad;
- mostrar 1–3 destinos como máximo;
- usar nombres grandes y legibles;
- no bloquear el camino;
- poder reflejar cambios políticos futuros sin cambiar el destino geográfico.

---

# 7. Fichas maestras por ciudad

# 7.1 JERUSALÉN

**ID:** jerusalem  
**Facción original:** Judá  
**Control inicial:** Judá  
**Rey:** Acaz  
**Categoría:** Capital monumental  
**Radio V1:** 240  
**Coordenadas:** (0, 0)

### Geografía

- Montes de Judá.
- Ciudad claramente elevada y visible desde los accesos cercanos.
- Monte de los Olivos al este.
- Valle del Cedrón entre la ciudad y el Monte de los Olivos.
- Valle de Hinom hacia el sur/suroeste.
- Manantial de Gihón como elemento local.
- Al este comienza rápidamente el ambiente del desierto de Judea.

### Conexiones directas

- norte → Betel;
- sur → Belén;
- este → Jericó;
- oeste → Gezer.

Tecoa se alcanza por el corredor sur y una bifurcación regional posterior.

### Puertas

1. **Puerta Norte**  
   Cartel: `BETEL · SAMARIA`
2. **Puerta Sur**  
   Cartel: `BELÉN · HEBRÓN`
3. **Puerta Este**  
   Cartel: `JERICÓ · JORDÁN`
4. **Puerta Oeste**  
   Cartel: `GEZER · COSTA`

### Urbanismo

- mayor ciudad de Judá del bloque;
- calles principales amplias desde las cuatro puertas;
- calles secundarias irregulares pero transitables;
- ninguna roca, puesto, árbol o decoración puede invadir los corredores viales;
- barrios densos en terrazas;
- plazas administrativas y religiosas separadas.

### Construcciones dominantes

- **Templo de Elohim/Yahvé** sobre el monte integrado al relieve;
- gran palacio real / complejo de gobierno;
- cuarteles y almacenes reales;
- puertas monumentales y torres.

### Escala V1

- muralla: 14–16 unidades de altura;
- torres: 20–24;
- casas comunes: 7–10;
- edificios nobles: 11–15;
- palacio/Templo: skyline dominante.

### Vegetación

- olivos grandes;
- higueras;
- viñedos/terrazas fuera de muralla;
- árboles altos solo fuera de calles y plazas.

### Característica única

**Centro político y religioso de Judá.** Debe sentirse diferente a cualquier otra ciudad del juego.

---

# 7.2 BELÉN

**ID:** bethlehem  
**Facción:** Judá  
**Categoría:** Ciudad fortificada  
**Radio V1:** 110  
**Coordenadas:** (-310, -810)

### Geografía

- serranía inmediatamente al sur de Jerusalén;
- laderas agrícolas;
- terrazas de olivo, vid e higuera;
- paisaje más rural que Jerusalén.

### Conexiones

- norte → Jerusalén;
- sur → Bet-sur / Hebrón;
- este/sureste → Tecoa.

### Puertas

1. **Puerta Norte:** `JERUSALÉN`
2. **Puerta Sur:** `BET-SUR · HEBRÓN`
3. **Puerta Este:** `TECOA`

### Urbanismo

- eje norte-sur despejado atravesando la ciudad;
- plaza central lateral al eje, nunca ocupando el camino;
- barrios residenciales compactos;
- corrales y campos fuera de muralla.

### Gobierno

- casa fortificada del gobernador/administrador sobre la parte alta.

### Religión

- santuario yahvista local de escala regional, claramente menor que Jerusalén.

### Escala

- muralla: 10–12;
- torres: 15–17;
- casas: 7–9.

### Vegetación

- olivos altos;
- higueras;
- viñedos;
- algunos terebintos fuera de la muralla.

---

# 7.3 BET-SUR

**ID:** bethzur  
**Facción:** Judá  
**Categoría:** Ciudad-fortaleza  
**Radio V1:** 100  
**Coordenadas:** (-1260, -2020)

### Función estratégica

Controla el corredor entre Belén/Jerusalén y Hebrón. Debe sentirse más militar que comercial.

### Conexiones

- norte → Belén / Jerusalén;
- sur → Hebrón;
- oeste → futura conexión Azecá/Laquis.

### Puertas

1. **Puerta Norte:** `BELÉN · JERUSALÉN`
2. **Puerta Sur:** `HEBRÓN`
3. **Puerta Oeste:** `AZECÁ · LAQUIS` *(se activa plenamente al diseñar Bloque 2)*

### Urbanismo

- ciudad estrecha y fortificada en una posición alta;
- eje vial norte-sur completamente libre;
- gran cuartel;
- almacenes de grano y armas;
- menos mercado que otras ciudades.

### Gobierno

- fortaleza/casa del comandante funcionando también como gobierno.

### Religión

- pequeño santuario local.

### Escala

- murallas especialmente altas para su tamaño: 12–14;
- torres: 17–19;
- casas: 7–8.

---

# 7.4 HEBRÓN

**ID:** hebron  
**Facción:** Judá  
**Categoría:** Gran ciudad fortificada  
**Radio V1:** 150  
**Coordenadas:** (-1280, -2720)

### Geografía

- altas colinas al sur de Jerusalén;
- paisaje agrícola de altura;
- viñas, olivos, higueras, robles/terebintos en áreas adecuadas.

### Conexiones

- norte → Bet-sur / Jerusalén;
- sur → Beerseba *(Bloque futuro)*;
- oeste → Laquis *(Bloque 2)*.

Tecoa puede enlazarse mediante un camino regional secundario, pero no es necesario abrir una gran ruta directa.

### Puertas

1. **Puerta Norte:** `BET-SUR · JERUSALÉN`
2. **Puerta Sur:** `BEERSEBA`
3. **Puerta Oeste:** `LAQUIS · COSTA`

### Urbanismo

- gran eje central;
- barrios densos en pendiente;
- plaza de gobierno;
- mercado grande, pero sus puestos deben quedar dentro de parcelas laterales y nunca sobre la calle.

### Gobierno

- gran casa de gobierno/citadela en terreno elevado.

### Religión

- santuario yahvista/local;
- posible zona sagrada exterior asociada a tradiciones patriarcales se estudiará aparte, sin convertirla automáticamente en un templo monumental dentro de la ciudad.

### Escala

- muralla: 12–14;
- torres: 18–20;
- casas: 7–10;
- casa de gobierno: 13–16.

---

# 7.5 TECOA

**ID:** tekoa  
**Facción:** Judá  
**Categoría:** Ciudad regional / puesto fronterizo del desierto  
**Radio V1:** 90  
**Coordenadas:** (-200, -1580)

### Geografía

- borde oriental de la serranía de Judá;
- transición inmediata hacia el desierto de Judea;
- vistas lejanas hacia el este y el Mar Muerto en condiciones adecuadas;
- terreno más seco y abierto.

### Conexiones

- noroeste → Belén / Jerusalén;
- este → desierto de Judea / Mar Muerto mediante ruta regional;
- futuras sendas secundarias hacia el sur.

### Puertas

1. **Puerta Noroeste:** `BELÉN · JERUSALÉN`
2. **Puerta Este:** `DESIERTO · MAR MUERTO`

### Urbanismo

- menos densa que Hebrón;
- calle principal ancha;
- corrales y almacenamiento vinculados a actividad pastoril fuera de los corredores peatonales.

### Gobierno

- casa del gobernador/comandante en el punto alto.

### Religión

- santuario local pequeño.

### Vegetación

- árboles más escasos;
- olivo/higuera donde el terreno lo permita;
- matorral y pastizal;
- árboles altos raros y colocados fuera de los caminos.

---

# 7.6 JERICÓ

**ID:** jericho  
**Facción de gameplay inicial:** Judá  
**Categoría:** Ciudad-oasis fortificada  
**Radio V1:** 135  
**Coordenadas:** (1970, 1030)

### Geografía

- valle del Jordán;
- enorme descenso de altitud desde Jerusalén;
- oasis fértil;
- clima visualmente más cálido;
- Río Jordán al este;
- Mar Muerto al sur/sureste.

### Conexiones

- oeste → Jerusalén;
- este → Jordán / Transjordania;
- norte → valle del Jordán / futura Bet-seán;
- sur → Mar Muerto.

### Puertas

1. **Puerta Oeste:** `JERUSALÉN`
2. **Puerta Este:** `JORDÁN · TRANSJORDANIA`
3. **Puerta Norte:** `VALLE DEL JORDÁN`
4. **Puerta Sur:** `MAR MUERTO`

### Urbanismo

- calles más amplias y abiertas que en las ciudades montañosas;
- sistema visual de canales/acequias únicamente donde no bloqueen navegación;
- gran plaza de mercado lateral;
- jardines y huertos fuera de corredores principales.

### Gobierno

- residencia administrativa/palaciega asociada al oasis.

### Religión

- santuario local; configuración exacta pendiente de revisión histórica.

### Vegetación

- palmeras datileras muy altas;
- sicómoros;
- tamariscos/acacias;
- vegetación más abundante alrededor del agua.

### Característica única

Debe sentirse como un mundo ecológico distinto después de descender desde Jerusalén.

---

# 7.7 GEZER

**ID:** gezer  
**Facción de gameplay propuesta:** Judá / nodo fronterizo a revisar históricamente  
**Categoría:** Gran ciudad fortificada / nodo vial  
**Radio V1:** 150  
**Coordenadas:** (-2980, 900)

### Geografía

- borde occidental de las tierras altas;
- domina la transición hacia el valle de Ajalón y la Sefelá;
- paisaje más abierto hacia el oeste.

### Conexiones

- este → Jerusalén;
- oeste → Ecrón / costa *(Bloque 2)*;
- sur → Azecá / Laquis *(Bloque 2)*;
- corredor norte hacia Sefelá/Llanura de Sarón en el sistema vial mayor.

### Puertas

1. **Puerta Este:** `JERUSALÉN`
2. **Puerta Oeste:** `ECRÓN · COSTA`
3. **Puerta Sur:** `AZECÁ · LAQUIS`
4. **Puerta Norte:** `SARÓN · MEGIDO` *(ruta mayor; revisar cuando se cierre Bloque 3)*

### Urbanismo

- gran puerta/casa de puerta monumental;
- calles preparadas para caravanas;
- almacenes grandes;
- barrio militar;
- fuerte carácter de ciudad de tránsito.

### Gobierno

- citadela/palacio administrativo.

### Religión

- recinto religioso cuya configuración del siglo VIII a.C. debe cerrarse históricamente antes de fijar deidad oficial;
- pueden conservarse restos visuales de tradiciones cananeas más antiguas sin afirmar que constituyen necesariamente el culto oficial del período.

### Escala

- muralla: 12–14;
- torres: 18–20;
- casas: 7–10.

---

# 7.8 BETEL

**ID:** betel  
**Facción:** Israel  
**Categoría:** Ciudad fortificada / gran centro religioso  
**Radio V1:** 125  
**Coordenadas:** (30, 1640)

### Geografía

- cresta montañosa al norte de Jerusalén;
- terreno rocoso y elevado;
- continuidad visual con los montes de Samaria.

### Conexiones

- sur → Jerusalén;
- norte → Silo / Siquem;
- ruta secundaria oriental hacia el descenso al valle del Jordán.

### Puertas

1. **Puerta Sur:** `JERUSALÉN`
2. **Puerta Norte:** `SILO · SIQUEM`
3. **Puerta Este:** `VALLE DEL JORDÁN`

### Gobierno

- casa del gobernador israelita.

### Religión

- **gran santuario real del Reino de Israel**;
- debe dominar visualmente la ciudad;
- iconografía y configuración precisa se definirán en el bloque religioso antes de implementación.

### Urbanismo

- santuario y plaza religiosa separados de la vía principal para no bloquear circulación;
- barrio de sacerdotes/servicio religioso posible;
- mercado de peregrinos dentro de parcelas laterales, nunca como tiendas sobre la carretera.

### Escala

- muralla: 11–13;
- torres: 16–18;
- casas: 7–9;
- santuario: una de las estructuras dominantes del bloque.

---

# 7.9 SILO

**ID:** shiloh  
**Facción de gameplay:** Israel  
**Categoría:** Ciudad/santuario regional  
**Radio V1:** 105  
**Coordenadas:** (510, 3070)

### Geografía

- valle/cubeta entre colinas de Samaria;
- entorno agrícola fértil;
- sensación más tranquila que Betel o Samaria.

### Conexiones

- sur → Betel / Jerusalén;
- norte → Siquem / Samaria;
- senda secundaria hacia el este.

### Puertas

1. **Puerta Sur:** `BETEL · JERUSALÉN`
2. **Puerta Norte:** `SIQUEM · SAMARIA`
3. **Puerta Este:** `VALLE DEL JORDÁN` *(ruta secundaria)*

### Gobierno

- casa administrativa relativamente modesta.

### Religión

- **santuario ancestral de Silo** como elemento principal;
- debe transmitir importancia religiosa histórica aunque en el período político del juego no sea la capital religiosa del reino;
- recinto de peregrinación más antiguo y menos palaciego que Betel.

### Urbanismo

- el santuario ocupa un recinto amplio pero no bloquea el corredor norte-sur;
- zonas de peregrinos y animales quedan en patios laterales protegidos.

### Vegetación

- olivos;
- viñas;
- higueras;
- árboles maduros alrededor del valle, nunca sobre calles.

---

# 7.10 SIQUEM

**ID:** shechem  
**Facción:** Israel  
**Categoría:** Gran ciudad regional  
**Radio V1:** 165  
**Coordenadas:** (440, 4830)

### Geografía

- ciudad obligatoriamente situada en el corredor entre **Monte Gerizim** y **Monte Ebal**;
- valle fértil y estrecho;
- el relieve debe ser una de sus características visuales principales.

### Conexiones

- sur → Silo / Betel;
- oeste-noroeste → Samaria;
- norte → futuro eje Jezreel;
- este → futura salida hacia Jordán/Galaad.

### Puertas

1. **Puerta Sur:** `SILO · BETEL`
2. **Puerta Oeste/Noroeste:** `SAMARIA`
3. **Puerta Norte:** `JEZREEL`
4. **Puerta Este:** `JORDÁN · GALAAD`

### Gobierno

- gran complejo administrativo regional.

### Religión

- santuario/recinto sagrado regional;
- relación visual con Gerizim y Ebal;
- configuración religiosa exacta del siglo VIII a.C. pendiente de cierre histórico.

### Urbanismo

- forma urbana alargada por el valle;
- calles siguiendo el relieve;
- gran avenida longitudinal;
- plaza administrativa central-lateral.

### Vegetación

- olivos;
- viñedos;
- higueras;
- árboles de mayor porte en las laderas.

---

# 7.11 SAMARIA

**ID:** samaria  
**Facción:** Israel  
**Control inicial:** Israel  
**Rey:** Pécaj  
**Categoría:** Capital monumental  
**Radio V1:** 220  
**Coordenadas:** (-350, 5540)

### Geografía

- capital sobre una colina dominante;
- valles fértiles alrededor;
- laderas agrícolas y visuales amplias hacia el territorio israelita.

### Conexiones

- sureste → Siquem;
- norte/noreste → futuro Jezreel/Megido;
- oeste → futura conexión con la llanura de Sarón / costa.

La ruta hacia Jerusalén utiliza Siquem → Silo → Betel; no requiere una carretera paralela directa.

### Puertas

1. **Puerta Sureste:** `SIQUEM · BETEL`
2. **Puerta Norte:** `JEZREEL · MEGIDO`
3. **Puerta Oeste:** `SARÓN · COSTA`

### Urbanismo

- gran capital planificada alrededor de una acrópolis administrativa;
- avenidas principales amplias;
- barrios residenciales densos pero ordenados;
- almacenes y cuarteles propios de una capital;
- mercado grande en plaza lateral protegida.

### Gobierno

- **palacio real monumental** como edificio dominante de la acrópolis;
- complejo administrativo y patios reales.

### Religión

- santuario real/urbano importante;
- configuración de culto específica debe revisarse históricamente antes de fijarla en el motor.

### Escala

- muralla: 14–16;
- torres: 20–23;
- casas: 7–10;
- palacio: 15–20 o más según composición.

### Vegetación

- olivares;
- viñedos;
- higueras;
- árboles altos en laderas y patios, nunca en ejes viales.

### Característica única

Debe sentirse como la contraparte septentrional de Jerusalén: capital poderosa, monumental y políticamente reconocible, pero con arquitectura y religión propias de Israel.

---

# 8. Reglas urbanas obligatorias del Bloque 1

Estas reglas deben transformarse posteriormente en restricciones del generador:

## 8.1 Corredores protegidos

Cada ciudad mantiene máscaras de exclusión para:

- carretera externa;
- puerta;
- avenida principal;
- calle secundaria;
- plaza;
- escalera/rampa;
- patio de templo;
- patio de palacio.

En esas máscaras no se genera ninguna roca, árbol, tienda, puesto, casa, barril, cercado, animal estático ni decoración bloqueante.

## 8.2 Mercados

Los mercados dejan de ser filas de tiendas colocadas sobre plazas o caminos.

Nuevo modelo:

- plaza abierta y transitable;
- puestos colocados exclusivamente en los bordes;
- pasillos mínimos definidos;
- mercados grandes pueden ocupar patios específicos fuera del eje vial.

## 8.3 Casas

Las casas se generan en **parcelas**, no mediante coordenadas aleatorias alrededor del centro.

Cada parcela debe respetar:

- calle frontal;
- separación mínima;
- acceso a puerta;
- patios traseros;
- pendiente máxima.

## 8.4 Árboles

Los árboles serán considerablemente mayores que en Wilderness 5.x, pero:

- nunca en carreteras;
- nunca delante de puertas;
- nunca dentro de corredores de combate/sitio;
- nunca atravesando casas.

---

# 9. Jerarquía urbana V1 del bloque

| Ciudad | Categoría | Radio | Muralla V1 | Casas V1 | Elemento dominante |
|---|---|---:|---:|---:|---|
| Jerusalén | Capital monumental | 240 | 14–16 | 7–10 | Templo + palacio |
| Samaria | Capital monumental | 220 | 14–16 | 7–10 | palacio real |
| Siquem | Gran ciudad regional | 165 | 12–14 | 7–10 | valle + recinto regional |
| Gezer | Gran ciudad fortificada | 150 | 12–14 | 7–10 | puerta/citadela |
| Hebrón | Gran ciudad fortificada | 150 | 12–14 | 7–10 | ciudad alta/gobierno |
| Jericó | Ciudad-oasis fortificada | 135 | 10–12 | 7–9 | oasis |
| Betel | Ciudad/santuario mayor | 125 | 11–13 | 7–9 | santuario real |
| Belén | Ciudad fortificada | 110 | 10–12 | 7–9 | eje serrano |
| Silo | Ciudad/santuario regional | 105 | 9–11 | 7–8 | santuario ancestral |
| Bet-sur | Ciudad-fortaleza | 100 | 12–14 | 7–8 | fortaleza |
| Tecoa | Ciudad regional | 90 | 9–11 | 7–8 | borde del desierto |

---

# 10. Decisiones del bloque que deben revisarse con el usuario

1. Aprobar o ajustar la escala de **100 unidades por km relativo**.
2. Aprobar las coordenadas V1.
3. Confirmar que Jerusalén tendrá cuatro grandes corredores/puertas, no una puerta diferente para cada destino secundario.
4. Confirmar que Tecoa sea un ramal desde Belén y no parte de la carretera principal a Hebrón.
5. Confirmar que Bet-sur sea parada obligatoria entre Belén y Hebrón.
6. Confirmar Gezer como gran nodo occidental antes de cerrar su control político inicial.
7. Cerrar posteriormente la configuración religiosa precisa de Gezer, Siquem y Samaria.
8. Definir si los carteles mostrarán solo la próxima ciudad o también un destino mayor lejano.
9. Decidir si las carreteras principales tendrán posadas/puestos de guardia en intervalos fijos.
10. Definir la densidad de aldeas entre ciudades sin disminuir la sensación de viaje.

---

# 11. Siguiente bloque recomendado después de aprobar éste

**Bloque 2 — Filistea / Sefelá / Mediterráneo**

Debe cerrar:

- Gaza;
- Ascalón;
- Asdod;
- Ecrón;
- Gat;
- Azecá;
- Laquis;
- Libná;
- conexión occidental de Gezer;
- costa mediterránea fija;
- Vía Maris;
- Valle de Elá;
- arquitectura y templos filisteos;
- Dagón / Baal-Zebub y otros cultos del bloque.

Una vez aprobado Bloque 1 y Bloque 2, podrá definirse correctamente toda la transición **Jerusalén ↔ Sefelá ↔ Filistea ↔ Mediterráneo**.
