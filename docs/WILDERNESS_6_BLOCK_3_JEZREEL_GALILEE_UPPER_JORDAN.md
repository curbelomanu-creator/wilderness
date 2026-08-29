# WILDERNESS 6 — BLOQUE 3: JEZREEL / GALILEA / ALTO JORDÁN

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque continúa el sistema de coordenadas aprobado y aplica las reglas globales de escala, corredores, puertas y nodos estratégicos.

---

# 1. Objetivo del bloque

Definir la arquitectura geográfica, vial, urbana, militar y religiosa del norte del Reino de Israel, conectando el Bloque 1 (Samaria) con el futuro Bloque 6 (Fenicia / Aram).

## Ciudades principales
- Jezreel
- Megido
- Hazor
- Dan

## Ciudad estratégica adicional propuesta
- **Bet-seán** — ciudad israelita menor, pero nodo clave entre el Valle de Jezreel y el Valle del Jordán.

## Sitios secundarios fijos
- Dothan — asentamiento/puesto importante sobre el corredor Samaria–Jezreel.
- Endor — aldea bíblica secundaria en la zona oriental del valle.
- pequeños puertos y aldeas de pesca en el Mar de Galilea, sin elevarlos todavía a ciudades principales.

## Geografía estructural
- Valle de Jezreel
- Monte Carmelo
- Monte Gilboa
- Monte Tabor
- río Cisón / Kishon
- Fuente de Harod
- Valle de Bet-seán
- Mar de Galilea
- Río Jordán
- valle de Hula
- Alto Jordán
- Monte Hermón
- colinas y montes de Galilea

Este bloque debe sentirse claramente distinto de Samaria: más abierto, verde y fértil en Jezreel; más montañoso en Galilea; acuático y productivo alrededor del Mar de Galilea; y alpino/septentrional al acercarse al Hermón.

---

# 2. Sistema de coordenadas

Se mantiene la convención global:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala inicial ≈ **100 unidades por kilómetro geográfico relativo**

Samaria conserva su coordenada del Bloque 1: `(-350, 5540)`.

## 2.1 Coordenadas maestras V1

| Lugar | X | Z | Función | Radio urbano V1 |
|---|---:|---:|---|---:|
| Samaria | -350 | 5540 | capital de Israel / conexión sur | 220 |
| Dothan | -650 | 7000 | asentamiento vial secundario | 65 |
| Bet-seán | 2510 | 7980 | ciudad estratégica del Jordán | 115 |
| Jezreel | 880 | 8660 | ciudad real / nodo del valle | 170 |
| Megido | -480 | 8950 | gran fortaleza de la Vía Maris | 190 |
| Monte Gilboa | 1750 | 7900 | relieve fijo | — |
| Fuente de Harod | 1180 | 8570 | agua / oasis regional | — |
| Monte Tabor | 1460 | 10090 | relieve fijo | — |
| Monte Carmelo | -1750 | 10570 | macizo fijo | — |
| centro Mar de Galilea | 3350 | 11450 | agua fija | — |
| Hazor | 3140 | 13750 | gran fortaleza del norte | 190 |
| valle de Hula | 3500 | 14750 | humedal/valle fértil | — |
| Dan | 3940 | 16330 | gran ciudad fronteriza y santuario | 175 |
| Monte Hermón | 5200 | 17450 | macizo septentrional | — |

> Coordenadas de gameplay: preservan relaciones geográficas aproximadas, no una reproducción topográfica exacta.

---

# 3. Diagrama regional simplificado

```text
                                      NORTE / ARAM

                                      MONTE HERMÓN
                                           |
                                          DAN ------> DAMASCO (Bloque 6)
                                           |
                                     VALLE DE HULA
                                           |
                                         HAZOR ------> TIRO / FENICIA
                                           |
                                  ALTO JORDÁN
                                           |
                                  MAR DE GALILEA
                                  /              \
                         MONTE TABOR            JORDÁN
                              |                    |
          MONTE CARMELO ---- MEGIDO ---- JEZREEL ---- BET-SEÁN ----> GALAAD
                              |          /   \
                              |   F. HAROD   MONTE GILBOA
                              |
                            DOTHAN
                              |
                           SAMARIA
                              |
                          SIQUEM / SUR
```

---

# 4. Geografía fija del Bloque 3

## 4.1 Valle de Jezreel

**OBLIGATORIO**

Debe ser una gran depresión fértil y abierta, claramente diferente de las montañas de Samaria.

Características:
- campos de cereal amplios;
- huertos y viñedos;
- caminos visibles a larga distancia;
- zonas aptas para carros y grandes ejércitos;
- pequeñas aldeas agrícolas;
- corrales y rebaños;
- menor densidad de roca que la serranía central.

Gameplay:
- terreno excelente para caballería y carros;
- combates de grandes formaciones;
- caravanas más frecuentes;
- rutas comerciales muy transitadas.

## 4.2 Monte Carmelo

**OBLIGATORIO**

Debe dominar visualmente el extremo occidental/noroeste del valle.

Características:
- macizo largo y elevado;
- vegetación más densa;
- encinas, pinos/árboles mediterráneos y matorral;
- vistas al Mediterráneo desde alturas seleccionadas;
- senderos de montaña más lentos que la ruta del valle.

Sitio especial propuesto:
- antiguo altar/santuario de Elohim en una zona elevada del Carmelo, relacionado narrativamente con la memoria del ciclo de Elías.

No será una ciudad.

## 4.3 Río Cisón / Kishon

**OBLIGATORIO**

Debe drenar la zona de Jezreel hacia el Mediterráneo.

Reglas:
- cauce más ancho durante zonas húmedas;
- puentes solo en las rutas principales;
- vados secundarios para exploradores;
- orillas fértiles y vegetación ribereña;
- nunca generar casas o carreteras longitudinalmente dentro del cauce.

## 4.4 Monte Gilboa

**OBLIGATORIO**

Debe levantarse al sureste de Jezreel y separar visualmente el valle de las rutas meridionales/eastern.

Gameplay:
- terreno empinado;
- rutas militares limitadas;
- zonas de emboscada;
- referencia visual constante desde Jezreel y Bet-seán.

Debe incluir un sitio memorial secundario asociado a la tradición de Saúl, pero sin convertirse en una ciudad.

## 4.5 Fuente de Harod

**OBLIGATORIO COMO HITO MENOR**

- manantial/estanque al pie del Gilboa;
- vegetación verde concentrada;
- punto de descanso de caravanas y tropas;
- posible encuentro/evento bíblico o militar.

## 4.6 Monte Tabor

**OBLIGATORIO**

Debe aparecer como monte aislado y muy reconocible al noreste del Valle de Jezreel.

Función:
- landmark visual;
- punto de orientación entre Jezreel y Galilea;
- senderos secundarios;
- posible santuario/atalaya, sujeto a decisión posterior.

## 4.7 Mar de Galilea

**OBLIGATORIO Y PERMANENTE**

Debe ser un cuerpo de agua continuo y amplio, no una laguna procedural.

Reglas:
- el Jordán entra por el norte y sale por el sur;
- costas navegables en ciertos puntos;
- pequeñas aldeas de pescadores;
- embarcaciones sencillas;
- muelles menores;
- vegetación ribereña;
- ninguna ciudad principal se colocará arbitrariamente encima de la costa si históricamente no corresponde.

En esta etapa no se añade una gran ciudad principal nueva en la costa del lago; las poblaciones pesqueras serán dependencias menores.

## 4.8 Río Jordán — continuidad norte-sur

El Jordán debe convertirse en un **sistema continuo único** para todo Wilderness 6:

`fuentes septentrionales / Dan → valle de Hula → Mar de Galilea → valle del Jordán → Bet-seán → Jericó → Mar Muerto`

Nunca debe generarse como ríos separados sin continuidad entre bloques.

## 4.9 Valle de Hula

**OBLIGATORIO**

Entre Hazor y Dan:
- terreno húmedo y fértil;
- canales y brazos del Alto Jordán;
- juncales;
- aves;
- zonas pantanosas difíciles para grandes ejércitos;
- pasos secos y caminos elevados más seguros.

## 4.10 Monte Hermón

**OBLIGATORIO**

Debe marcar visualmente el extremo norte del mapa israelita.

Características:
- montaña mucho más alta que los relieves anteriores;
- cumbre clara desde largas distancias;
- vegetación distinta según altura;
- posible nieve visual en la parte más alta si rendimiento y estilo lo permiten;
- fuentes y escorrentías que alimentan el Alto Jordán.

El Hermón debe hacer sentir al jugador que ha llegado a otra región climática.

---

# 5. Red vial maestra

## 5.1 Corredor Samaria–Jezreel

Ruta:

**Samaria → Dothan → Jezreel**

Dothan funciona como nodo menor y lugar de descanso, no como gran ciudad amurallada.

La carretera debe:
- salir por el corredor norte de Samaria;
- cruzar progresivamente de montañas a valle;
- bajar hacia la llanura de Jezreel;
- volverse más ancha al entrar en el valle.

## 5.2 Vía Maris — tramo septentrional

Ruta principal:

**Gezer / costa → Megido → Jezreel → corredor de Galilea → Hazor → Dan → Damasco**

Megido es la fortaleza que controla la entrada occidental al Valle de Jezreel.

## 5.3 Corredor Jezreel–Bet-seán

**Jezreel → Fuente de Harod → Bet-seán → Jordán**

Debe pasar al norte o pie del Monte Gilboa.

Bet-seán controla el paso desde el Valle de Jezreel al Valle del Jordán.

## 5.4 Corredor norte

**Jezreel → entorno del Monte Tabor → Mar de Galilea → Hazor → Dan**

No será una carretera perfectamente recta. Debe adaptarse a montes, valles y costa del lago.

## 5.5 Corredor del Jordán

**Dan → Hazor / Hula → Mar de Galilea → Bet-seán → Jericó → Mar Muerto**

Este corredor será una de las grandes rutas longitudinales del juego.

## 5.6 Conexión con Fenicia

Futuras rutas del Bloque 6:
- Megido / Carmelo → costa fenicia;
- Hazor → Tiro;
- Dan → rutas occidentales hacia Fenicia.

## 5.7 Rutas alternativas

Deben existir:
- pasos por las colinas de Galilea;
- senderos por Carmelo;
- rutas de montaña al oeste de Hazor;
- vados del Jordán;
- caminos de pastores.

Estas alternativas no sustituyen las carreteras principales para caravanas y ejércitos grandes.

---

# 6. Fichas maestras por ciudad

# 6.1 JEZREEL

**ID:** jezreel  
**Facción inicial:** Reino de Israel  
**Categoría:** Gran ciudad real / administrativa  
**Radio V1:** 170  
**Coordenadas:** `(880,8660)`

## Identidad

Jezreel debe sentirse como una ciudad ligada a la monarquía israelita y al control de la gran llanura agrícola.

## Geografía
- situada sobre una posición dominante en el extremo oriental del Valle de Jezreel;
- vistas hacia Gilboa y la llanura;
- campos extensos alrededor;
- Fuente de Harod relativamente próxima.

## Conexiones
- sur → Samaria / Dothan;
- oeste → Megido / Carmelo;
- este → Bet-seán / Jordán;
- norte → Galilea / Hazor.

## Puertas
1. **Puerta Sur:** `SAMARIA`
2. **Puerta Oeste:** `MEGIDO · CARMELO`
3. **Puerta Este:** `BET-SEÁN · JORDÁN`
4. **Puerta Norte:** `HAZOR · DAN`

## Construcciones dominantes
- gran palacio/residencia real;
- plaza administrativa;
- almacenes agrícolas;
- establos y zona de carros;
- cuarteles;
- santuario local israelita de escala media.

## Urbanismo
- avenidas más anchas que en ciudades serranas;
- barrios organizados alrededor del palacio y almacenes;
- corrales y establos fuera de las calles principales.

## Escala
- muralla: 13–15;
- torres: 18–21;
- casas: 7–10;
- palacio: 14–18.

## Característica única
**Ciudad real del valle y centro agrícola/militar.**

---

# 6.2 MEGIDO

**ID:** megiddo  
**Facción inicial:** Reino de Israel  
**Categoría:** Gran fortaleza estratégica  
**Radio V1:** 190  
**Coordenadas:** `(-480,8950)`

## Identidad

Megido debe ser uno de los sitios militares más impresionantes del norte.

Su función es controlar:
- entrada occidental al Valle de Jezreel;
- Vía Maris;
- rutas hacia el Carmelo;
- acceso hacia Galilea.

## Geografía
- tell elevado;
- llanura fértil alrededor;
- proximidad al sistema del Cisón/Kishon;
- Monte Carmelo visible al oeste/noroeste.

## Conexiones
- este → Jezreel;
- sur/suroeste → Gezer / costa / Filistea;
- oeste → Carmelo / litoral;
- norte → Galilea / Hazor.

## Puertas
1. **Puerta Este:** `JEZREEL`
2. **Puerta Sur:** `GEZER · COSTA SUR`
3. **Puerta Oeste:** `CARMELO · MAR`
4. **Puerta Norte:** `HAZOR · DAMASCO`

## Construcciones dominantes
- puerta monumental fortificada;
- gran palacio/casa de gobierno militar;
- cuarteles extensos;
- establos de caballos y carros;
- depósitos;
- santuario estatal/local sin asignar todavía a una deidad exclusiva.

## Urbanismo
- prioridad militar;
- grandes patios interiores;
- calles dimensionadas para carros;
- caminos limpios entre puerta, cuartel y establos.

## Escala
- muralla: 15–17;
- torres: 21–24;
- casas: 8–10;
- puerta monumental: una de las mayores de Israel.

## Característica única
**Fortaleza de la Vía Maris y gran base de carros.**

---

# 6.3 BET-SEÁN

**ID propuesto:** bethshean  
**Facción inicial propuesta:** Reino de Israel  
**Categoría:** Ciudad estratégica menor / administrativa  
**Radio V1:** 115  
**Coordenadas:** `(2510,7980)`

## Razón para incluirla

Aunque no será una ciudad tan monumental como Jezreel o Megido, su posición es demasiado importante para omitirla.

Controla la intersección entre:
- Valle de Jezreel;
- Valle del Jordán;
- ruta norte-sur del Jordán;
- pasos hacia Galaad.

## Geografía
- tell dominante sobre valle bajo y cálido;
- tierras agrícolas irrigadas;
- Jordán hacia el este;
- Monte Gilboa hacia el oeste/suroeste.

## Conexiones
- oeste → Jezreel;
- norte → Mar de Galilea / Hazor;
- sur → Jericó;
- este → vados del Jordán / Galaad.

## Puertas
1. **Puerta Oeste:** `JEZREEL`
2. **Puerta Norte:** `MAR DE GALILEA · HAZOR`
3. **Puerta Sur:** `JERICÓ`
4. **Puerta Este:** `JORDÁN · GALAAD`

## Construcciones
- casa del gobernador/administrador;
- pequeño cuartel;
- almacenes agrícolas;
- plaza de caravanas;
- santuario israelita local.

## Escala
- muralla: 10–12;
- torres: 15–17;
- casas: 7–9.

## Característica única
**Llave del cruce Jezreel–Jordán.**

---

# 6.4 HAZOR

**ID:** hazor  
**Facción inicial:** Reino de Israel  
**Categoría:** Gran ciudad fortificada del norte  
**Radio V1:** 190  
**Coordenadas:** `(3140,13750)`

## Identidad

Hazor debe sentirse como la gran fortaleza septentrional de Israel antes de entrar al territorio fronterizo de Dan y Aram.

## Geografía
- posición dominante cerca del corredor del Alto Jordán;
- vistas hacia Hula;
- montes de Galilea alrededor;
- rutas hacia Fenicia y Damasco.

## Conexiones
- sur → Mar de Galilea / Jezreel;
- norte → Dan;
- oeste → Tiro / Fenicia;
- este → rutas hacia Bashán / Aram.

## Puertas
1. **Puerta Sur:** `MAR DE GALILEA · JEZREEL`
2. **Puerta Norte:** `DAN · DAMASCO`
3. **Puerta Oeste:** `TIRO`
4. **Puerta Este:** `BASHÁN`

## Construcciones dominantes
- palacio/casa del gobernador;
- fortaleza elevada;
- grandes almacenes;
- cuarteles;
- patios militares;
- santuario israelita/local.

## Escala
- muralla: 15–17;
- torres: 21–24;
- casas: 8–10;
- fortaleza: skyline dominante.

## Característica única
**Gran bastión septentrional de Israel.**

---

# 6.5 DAN

**ID:** dan  
**Facción inicial:** Reino de Israel  
**Categoría:** Gran ciudad fronteriza / centro cultual  
**Radio V1:** 175  
**Coordenadas:** `(3940,16330)`

## Identidad

Dan debe combinar dos funciones igualmente importantes:
- frontera septentrional;
- centro religioso del Reino del Norte.

## Geografía
- agua abundante;
- nacientes y brazos del Alto Jordán;
- vegetación exuberante;
- Monte Hermón dominando el horizonte norte/noreste.

## Conexiones
- sur → Hazor;
- este/noreste → Damasco;
- oeste → rutas de Fenicia;
- norte → pasos del Hermón / frontera.

## Puertas
1. **Puerta Sur:** `HAZOR · SAMARIA`
2. **Puerta Este:** `DAMASCO`
3. **Puerta Oeste:** `TIRO · SIDÓN`

No necesita una puerta monumental al norte si el terreno del Hermón no genera una ruta principal de caravanas; pueden existir senderos menores.

## Construcciones dominantes
- gran santuario real del Reino del Norte;
- complejo del altar;
- plaza religiosa;
- casa de gobierno;
- cuartel fronterizo;
- almacenes.

## Culto propuesto

Santuario de Yahvé/Elohim según la tradición del Reino del Norte, visualmente asociado al **becerro/toro cultual**.

No debe representarse simplemente como un templo cananeo genérico.

## Escala
- muralla: 13–15;
- torres: 19–22;
- casas: 7–10;
- recinto religioso: monumental y visible desde lejos.

## Característica única
**Santuario septentrional y puerta de Israel hacia Aram.**

---

# 7. Sitios secundarios

## 7.1 Dothan

**Tipo:** asentamiento fijo menor.

Función:
- parada entre Samaria y Jezreel;
- pozo/cisterna y caravanas;
- pequeña torre o puesto;
- gran valor narrativo bíblico sin necesidad de convertirlo en una gran ciudad.

No tendrá el radio ni las murallas de una ciudad principal.

## 7.2 Endor

**Tipo:** aldea fija menor.

Ubicación aproximada:
- al noreste de Jezreel, zona de Tabor.

Función:
- asentamiento narrativo;
- caminos rurales;
- no debe competir visualmente con Jezreel o Megido.

## 7.3 Aldeas del Mar de Galilea

Generar varias aldeas de pescadores fijas/semi-procedurales:
- muelle;
- redes;
- pequeñas embarcaciones;
- mercado de pescado;
- casas sin grandes murallas.

No introducir todavía ciudades del período romano o neotestamentario como si existieran con su forma posterior.

---

# 8. Arquitectura y vegetación regional

## 8.1 Jezreel / Megido
- piedra y adobe;
- patios amplios;
- almacenes agrícolas;
- establos;
- arquitectura más horizontal que Jerusalén;
- grandes campos de cereal.

## 8.2 Galilea
- mayor densidad de árboles;
- colinas verdes;
- piedra más visible;
- viñedos;
- olivos;
- robles/encinas y vegetación mediterránea.

## 8.3 Jordán / Bet-seán
- palmeras y vegetación ribereña;
- agricultura irrigada;
- clima visual más cálido;
- cañaverales cerca del agua.

## 8.4 Hula / Dan
- vegetación exuberante;
- juncos;
- sauces/árboles ribereños estilizados;
- cursos de agua múltiples;
- árboles grandes y altos.

## 8.5 Hermón
- bosque más fresco en cotas medias;
- roca expuesta arriba;
- posible nieve/cumbre pálida.

---

# 9. Principios militares del bloque

## Megido
- control de Vía Maris;
- base de carros;
- campo abierto adecuado para grandes batallas.

## Jezreel
- ejército real;
- reserva agrícola;
- despliegue rápido hacia Megido o Bet-seán.

## Bet-seán
- controla tránsito del Jordán;
- perderla abre el acceso al valle desde Transjordania.

## Hazor
- gran fortaleza defensiva septentrional;
- protege el acceso a Galilea.

## Dan
- fortaleza fronteriza;
- primera línea frente a Aram.

## Geografía como defensa
- Carmelo limita movimientos occidentales;
- Gilboa canaliza rutas hacia Bet-seán;
- Hula dificulta ejércitos fuera de caminos;
- Hermón bloquea movimientos directos hacia el extremo norte.

---

# 10. Religión — propuesta del Bloque 3

## Dan
**Culto principal propuesto:** Yahvé/Elohim del Reino del Norte con símbolo cultual de becerro/toro.

## Jezreel
Santuario israelita local. El elemento dominante de la ciudad debe ser el **palacio**, no el templo.

## Megido
Santuario estatal/local de Israel. No se asigna todavía una deidad distinta sin mejor justificación histórica.

## Hazor
Santuario local israelita con posibles capas arquitectónicas cananeas antiguas, sin convertirlas automáticamente en el culto oficial actual.

## Bet-seán
Santuario local modesto. Su rasgo dominante debe ser estratégico/comercial, no religioso.

Principio:
La cultura material antigua de una ciudad puede dejar ruinas o rasgos heredados sin significar que ese sea el culto oficial en 734–732 a.C.

---

# 11. Tiempos y distancias de viaje V1

Distancias aproximadas centro-centro:

| Tramo | Distancia aprox. |
|---|---:|
| Samaria ↔ Dothan | ~1,490 |
| Dothan ↔ Jezreel | ~2,260 |
| Jezreel ↔ Megido | ~1,390 |
| Jezreel ↔ Bet-seán | ~1,770 |
| Jezreel ↔ Mar de Galilea (zona sur/oeste) | ~3,500 |
| Jezreel ↔ Hazor | ~5,570 |
| Hazor ↔ Dan | ~2,730 |
| Bet-seán ↔ Jericó | ruta larga por valle del Jordán |

La presencia de Dothan, aldeas y posadas/campamentos evita que los tramos largos se sientan vacíos.

---

# 12. Decisiones propuestas para aprobación

Antes de declarar definitivo el Bloque 3, se recomienda aprobar explícitamente:

1. **Incluir Bet-seán de manera permanente** como ciudad menor israelita estratégica, sin convertirla en una gran ciudad monumental.
2. **Convertir Megido en la principal fortaleza/base de carros del norte**, con calles y patios preparados para carros y grandes formaciones.
3. **Hacer de Jezreel la ciudad real/agro-militar del valle**, dominada visualmente por su palacio.
4. **Hacer de Dan un gran centro cultual del Reino del Norte**, con santuario monumental y símbolo del becerro/toro.
5. **Mantener Hazor como gran bastión septentrional**, mientras Dan funciona como ciudad fronteriza/cultual.
6. **Añadir Dothan y Endor como sitios bíblicos secundarios fijos**, sin elevarlos al roster de ciudades mayores.
7. **Hacer continuo el Jordán desde Dan/Hermón hasta el Mar Muerto**, atravesando Hula, Mar de Galilea, Bet-seán y Jericó.
8. **Incluir Monte Carmelo, Monte Gilboa, Monte Tabor, Fuente de Harod, Kishon, Hula y Hermón como geografía fija**, no procedural opcional.
9. **No agregar por ahora una gran ciudad anacrónica en la costa del Mar de Galilea**; utilizar aldeas pesqueras menores apropiadas al período.
10. **Usar el terreno como parte real de la estrategia militar**: llanura de Jezreel apta para carros; Carmelo/Gilboa/Hermón restrictivos; Hula difícil fuera de caminos.

---

# 13. Estado

**PROPUESTA MAESTRA V1 — PENDIENTE DE APROBACIÓN DEL USUARIO.**

Una vez aprobado, las decisiones se registrarán como normativas y el diseño continuará con el **Bloque 4: Transjordania / Galaad / Amón / Moab / Jordán oriental / Mar Muerto**.
