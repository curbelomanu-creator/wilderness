# WILDERNESS 6 — BLOQUE 6: FENICIA / ARAM / LÍBANO / ANTI-LÍBANO

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque continúa el sistema geográfico aprobado y aplica las reglas globales de escala, corredores, puertas, ciudades estratégicas, cultura y religión.

---

# 1. Objetivo del bloque

Construir el corredor noroccidental y nororiental que conecta:

- Dan / Monte Hermón;
- costa fenicia del Mediterráneo;
- Cordillera del Líbano;
- valle de la Becá;
- Anti-Líbano;
- Damasco;
- valle del Orontes;
- Hamat;
- Arpad;
- futura conexión con Carquemis y los estados neo-hititas.

## Ciudades fenicias principales

- **Tiro**
- **Sarepta**
- **Sidón**
- **Berito / Beirut**
- **Biblos**
- **Arwad**

## Centros arameos principales

- **Damasco**
- **Zobá**
- **Bet-Rehob**
- **Hamat**
- **Arpad**

## Geografía estructural

- Mar Mediterráneo continuo;
- costa fenicia estrecha;
- Cordillera del Líbano;
- bosques de cedro;
- valle de la Becá;
- río Litani;
- río Orontes;
- Anti-Líbano;
- Monte Hermón;
- río Barada;
- oasis/llanura de Damasco;
- transición oriental hacia estepa siria.

Este bloque debe sentirse como uno de los más variados del juego: mar y puertos al oeste, montañas boscosas inmediatamente detrás de la costa, un gran valle agrícola interior y finalmente el oasis monumental de Damasco antes de la estepa.

---

# 2. Ajuste político recomendado

## 2.1 Fenicia no será un reino territorial unificado

**PROPUESTA FUERTE**

Fenicia funcionará como **macro-cultura / facción jugable**, pero sus grandes ciudades serán ciudades-estado con identidad política propia.

- Tiro será la capital de selección de la facción fenicia y el principal poder fenicio inicial.
- Sidón tendrá autoridad local propia.
- Biblos tendrá autoridad local propia.
- Arwad tendrá autoridad local propia.
- Berito y Sarepta podrán depender políticamente de una potencia fenicia mayor o tener administración local según el balance final.

Esto permite que dos ciudades fenicias puedan compartir cultura, arquitectura y religión sin estar necesariamente bajo el mismo rey.

## 2.2 Aram como macro-cultura, no dominio automático de Rezín sobre todo el norte

**PROPUESTA FUERTE**

Se distinguirá entre:

- **Aram-Damasco**, gobernado por Rezín;
- otros centros arameos septentrionales como **Hamat** y **Arpad**, culturalmente arameos pero políticamente diferenciados.

Para selección de jugador podrá seguir existiendo la macro-facción **ARAMEOS**, con Damasco como capital inicial, pero el mapa político no debe fingir que Hamat y Arpad son simples ciudades administrativas de Rezín.

**Zobá** y **Bet-Rehob** se tratarán como centros/territorios arameos menores y fronterizos, no como capitales equivalentes a Damasco.

---

# 3. Sistema de coordenadas

Se mantiene la convención global:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala base ≈ **100 unidades de mundo por kilómetro geográfico relativo**

Puntos ya fijados:

- Dan = `(3940,16330)`
- Monte Hermón = `(5200,17450)`

## 3.1 Coordenadas maestras V1

| Lugar | X | Z | Función | Radio urbano V1 |
|---|---:|---:|---|---:|
| Tiro | -300 | 16560 | gran ciudad-estado insular / puerto | 225 |
| Sarepta | 610 | 18560 | ciudad costera artesanal | 105 |
| Sidón | 1320 | 19780 | gran ciudad-estado portuaria | 205 |
| Berito | 2510 | 23490 | ciudad portuaria intermedia | 145 |
| Biblos | 3910 | 26030 | gran ciudad histórica / puerto | 185 |
| Arwad | 5860 | 34140 | ciudad-fortaleza insular | 150 |
| Bet-Rehob | 4300 | 17750 | centro fronterizo arameo menor | 105 |
| Zobá | 7350 | 20800 | fortaleza/territorio arameo interior | 125 |
| Damasco | 9790 | 19270 | capital monumental de Aram-Damasco | 260 |
| Hamat | 14240 | 37240 | gran ciudad aramea del Orontes | 205 |
| Arpad | 17490 | 52110 | gran ciudad fortificada del norte | 185 |
| centro Becá sur | 4700 | 21500 | valle agrícola | — |
| Líbano central | 3100 | 24500 | cordillera / cedros | — |
| Anti-Líbano central | 7600 | 24500 | cordillera | — |

> Las coordenadas son de gameplay y mantienen relaciones geográficas aproximadas; no constituyen una reconstrucción topográfica exacta.

---

# 4. Diagrama regional simplificado

```text
                                      NORTE

                                  ARPAD --------> BLOQUE 7
                                    |
                                    |
                                  HAMAT
                                    |
                             RÍO ORONTES
                                    |
            ARWAD                   |
             |                 VALLE DE LA BECÁ
       MEDITERRÁNEO                  |
             |                ANTI-LÍBANO
           BIBLOS ----- PASOS -------+------- ZOBÁ
             |                        \        |
           BERITO ----- PASOS --------\---- DAMASCO ----> ESTEPA
             |                         \      |
           SIDÓN                        \  BARADA / OASIS
             |                           \
          SAREPTA                   MONTE HERMÓN
             |                           |
            TIRO ------- ALTA GALILEA -- DAN
                                         |
                                     BET-REHOB
                                         |
                                    HAZOR / SUR
```

---

# 5. Geografía fija del Bloque 6

## 5.1 Costa fenicia

**OBLIGATORIA Y CONTINUA**

La costa mediterránea continúa desde Filistea hacia el norte sin interrupciones artificiales.

Características:
- franja costera estrecha en muchos sectores;
- montañas cercanas al mar;
- calas;
- promontorios;
- playas rocosas;
- puertos naturales y construidos;
- huertos, olivos y viñedos en terrazas.

Las carreteras costeras deberán seguir la topografía y en algunos puntos comprimirse entre montaña y mar.

## 5.2 Cordillera del Líbano

**OBLIGATORIA**

Debe elevarse de manera dramática inmediatamente al este de buena parte de la costa fenicia.

Características:
- laderas empinadas;
- bosques mediterráneos;
- cedros en zonas elevadas seleccionadas;
- nieve estacional visual en las cumbres más altas si el sistema climático futuro lo permite;
- gargantas y pasos de montaña;
- canteras y explotación de madera.

Gameplay:
- caravanas necesitan pasos concretos;
- carros muy limitados fuera de rutas;
- excelente terreno para emboscadas;
- controlar un paso puede cortar la conexión costa–Becá.

## 5.3 Bosques de cedro

**OBLIGATORIOS COMO RECURSO REGIONAL**

No serán árboles decorativos aislados.

Habrá distritos forestales de cedro con:
- árboles muy altos;
- leñadores;
- campamentos;
- caminos de arrastre;
- almacenes de troncos;
- caravanas de madera hacia puertos.

El cedro será un recurso comercial de alto valor utilizado para:
- edificios monumentales;
- barcos;
- puertas y techumbres nobles;
- comercio exterior.

## 5.4 Valle de la Becá

**OBLIGATORIO**

Gran corredor longitudinal entre Líbano y Anti-Líbano.

Características:
- valle ancho y fértil;
- cereal;
- viñedos;
- rebaños;
- asentamientos menores;
- rutas caravaneras norte-sur;
- grandes vistas hacia las dos cordilleras.

Será uno de los principales corredores interiores del bloque.

## 5.5 Río Litani

**OBLIGATORIO**

- nace/recorre la Becá;
- fluye hacia el sur y posteriormente gira hacia el Mediterráneo;
- tendrá cauce, riberas y puentes reales;
- sus pasos condicionarán las rutas entre Tiro/Sidón y el interior.

## 5.6 Río Orontes

**OBLIGATORIO Y CONTINUO**

El Orontes será el gran río septentrional interior.

Funciones:
- organiza el corredor hacia Hamat;
- crea tierras fértiles;
- soporta molinos/irrigación futura;
- obliga a puentes y vados;
- continúa hacia el norte y conectará con el Bloque 7.

Hamat debe sentirse físicamente ligada al Orontes.

## 5.7 Anti-Líbano

**OBLIGATORIO**

Cordillera oriental que separa la Becá del territorio de Damasco.

Gameplay:
- pocos pasos principales;
- fortalezas de paso;
- rutas secundarias peligrosas;
- gran cambio visual al atravesarla hacia el oasis de Damasco.

## 5.8 Río Barada y oasis de Damasco

**OBLIGATORIO**

Damasco no debe aparecer como una ciudad genérica en mitad del desierto.

El Barada desciende desde las montañas y alimenta un gran oasis/llanura cultivada alrededor de la ciudad.

Elementos:
- canales de irrigación;
- huertos;
- jardines;
- frutales;
- campos;
- aldeas dependientes;
- agua visible entrando y distribuyéndose por la llanura.

Al este del oasis el paisaje debe secarse progresivamente hacia la estepa siria.

---

# 6. Red vial maestra

## 6.1 Gran ruta costera fenicia

`Tiro → Sarepta → Sidón → Berito → Biblos → corredor norte → Arwad`

No será perfectamente recta. Seguirá la costa y los pasos entre promontorios.

## 6.2 Corredor Tiro–Dan

`Tiro → Alta Galilea → Dan`

Función:
- conecta comercio fenicio con Israel;
- corredor estratégico entre costa y valle alto del Jordán;
- puede tener fortalezas menores y peajes.

## 6.3 Corredores costa–Becá

Grandes caminos desde:
- Sidón;
- Berito;
- Biblos;

atravesarán pasos del Líbano hacia la Becá.

No todos conducirán directamente a Damasco. Algunos se unirán en el valle antes de cruzar Anti-Líbano.

## 6.4 Corredor Damasco–Dan

`Damasco → flanco de Hermón → Bet-Rehob / región alta → Dan`

Será uno de los corredores militares más importantes por la guerra Aram–Israel.

## 6.5 Corredor Damasco–Galaad

`Damasco → sur → Ramot de Galaad`

Se conecta al Bloque 4 y convierte Ramot de Galaad en verdadero punto de choque entre Israel y Aram.

## 6.6 Corredor del Orontes

`Damasco / Becá → corredor norte → Hamat → Arpad → Bloque 7`

Será una de las grandes rutas caravaneras y militares del norte.

---

# 7. Puertas y señalización

## Tiro

Por ser ciudad insular, no tendrá puertas terrestres convencionales hacia cada destino.

Tendrá:
- **Puerto Norte** → `SIDÓN · BIBLOS`
- **Puerto Sur** → `GALILEA · SUR`
- **Embarcadero continental** → acceso a la costa / Tiro continental

La navegación y pequeños ferris serán necesarios para entrar/salir de la isla si no existe una conexión fija.

## Sidón

- Puerta Sur → `SAREPTA · TIRO`
- Puerta Norte → `BERITO · BIBLOS`
- Puerta Este → `BECÁ · DAMASCO`

## Berito

- Puerta Sur → `SIDÓN · TIRO`
- Puerta Norte → `BIBLOS`
- Puerta Este → `BECÁ · DAMASCO`

## Biblos

- Puerta Sur → `BERITO · SIDÓN`
- Puerta Norte → `ARWAD · NORTE`
- Puerta Este → `LÍBANO · BECÁ`

## Damasco

Damasco será una capital de múltiples corredores:

- Puerta Suroeste → `DAN · ISRAEL`
- Puerta Sur → `RAMOT DE GALAAD · AMÓN`
- Puerta Oeste → `ANTI-LÍBANO · FENICIA`
- Puerta Norte → `HAMAT · ARPAD`
- Puerta Este → `ESTEPA · CARAVANAS`

## Hamat

- Puerta Sur → `DAMASCO`
- Puerta Norte → `ARPAD · CARQUEMIS`
- Puerta Oeste → `COSTA / PASOS`

## Arpad

- Puerta Sur → `HAMAT`
- Puerta Norte/Este → `CARQUEMIS · NORTE`
- Puerta Oeste → `SAM'AL / CILICIA` *(se completa en Bloque 7)*

---

# 8. Ciudades fenicias

## 8.1 TIRO

**Categoría:** Capital fenicia de gameplay / ciudad-estado monumental insular  
**Radio V1:** 225

### Diseño

Tiro debe ser una de las ciudades más visualmente singulares del juego.

- ciudad construida sobre isla(s) frente a la costa;
- murallas marítimas altas;
- torres dominando puertos;
- calles densas;
- edificios de piedra de varios niveles;
- almacenes portuarios;
- astilleros;
- mercados de lujo;
- palacio real;
- dos grandes áreas portuarias.

### Religión

**Culto principal propuesto:** Melqart.  
**Culto secundario:** Astarté.

El templo de Melqart será uno de los grandes edificios religiosos fenicios.

### Economía

- barcos;
- madera de cedro;
- tintes/púrpura;
- vidrio/artesanía;
- comercio marítimo;
- bienes importados.

### Característica única

**Ciudad-isla.** El jugador debe ver el mar alrededor de las murallas y necesitar puerto/embarcación para conectar con tierra firme.

---

## 8.2 SAREPTA

**Categoría:** Ciudad costera artesanal  
**Radio:** 105

Funciones:
- producción artesanal;
- comercio costero;
- talleres;
- hornos;
- almacenes;
- agricultura cercana.

### Religión propuesta

Astarté como culto importante de gameplay, marcado como reconstrucción cultural donde la evidencia no permita afirmar exclusividad.

---

## 8.3 SIDÓN

**Categoría:** Gran ciudad-estado portuaria  
**Radio:** 205

Diseño:
- puerto monumental;
- palacio;
- barrios mercantiles;
- almacenes;
- talleres;
- calles más amplias cerca del puerto;
- murallas altas pero menos aisladas que Tiro.

### Religión propuesta

- **Eshmun** como culto distintivo;
- Astarté como culto importante secundario.

Sidón debe diferenciarse religiosamente de Tiro aunque comparta cultura fenicia.

---

## 8.4 BERITO

**Categoría:** Ciudad portuaria intermedia  
**Radio:** 145

Función:
- nodo entre Sidón y Biblos;
- conexión privilegiada con pasos hacia la Becá;
- mercado;
- puerto;
- administración local.

Culto propuesto: Baal/Astarté local, sin imponer una identificación demasiado específica donde la evidencia sea incierta.

---

## 8.5 BIBLOS

**Categoría:** Gran ciudad histórica y portuaria  
**Radio:** 185

Diseño:
- acrópolis/sector elevado antiguo;
- puerto;
- murallas;
- palacio/gobierno;
- templos antiguos;
- comercio intensivo de madera y productos de lujo.

### Religión

**Baalat Gebal / Señora de Biblos** será el culto distintivo de la ciudad.

Biblos debe sentirse más antigua y ceremonial que otras ciudades fenicias.

---

## 8.6 ARWAD

**Categoría:** Ciudad-fortaleza insular  
**Radio:** 150

- isla frente a la costa;
- murallas directamente junto al mar;
- densidad urbana alta;
- cisternas;
- puerto;
- fortificaciones navales;
- acceso mediante embarcaciones.

Culto inicial propuesto: Baal/Melqart local con iconografía fenicia, pendiente de precisión histórica final.

Arwad no tendrá carretera entrando físicamente en la ciudad: la carretera termina en un embarcadero continental.

---

# 9. Centros arameos

## 9.1 DAMASCO

**Categoría:** Capital monumental  
**Radio V1:** 260

Damasco debe ser una de las ciudades más grandes de Wilderness 6.

### Urbanismo

- gran muralla;
- múltiples puertas;
- barrios residenciales densos;
- grandes mercados;
- palacio real de Rezín;
- cuarteles;
- arsenales;
- almacenes;
- canales y agua del Barada;
- jardines y huertos alrededor de la ciudad.

### Religión

**Hadad / Rimón** será el culto estatal dominante.

Debe existir un templo monumental de Hadad con estatua/símbolos del dios de la tormenta.

### Función militar

- gran ejército;
- carros en llanuras apropiadas;
- nodo de campañas hacia Israel, Galaad y el norte.

---

## 9.2 BET-REHOB

**Categoría:** Centro fronterizo arameo menor  
**Radio:** 105

- fortaleza/región alta cerca del corredor Dan–Damasco;
- función militar y de peaje;
- arquitectura aramea más austera;
- pequeño santuario de Hadad/Baal local.

No debe competir visualmente con Damasco.

---

## 9.3 ZOBÁ

**Categoría:** Fortaleza/centro regional arameo  
**Radio:** 125

Debido a la incertidumbre sobre su localización exacta y su peso político en el siglo VIII a.C., Zobá se representará con cautela:

- posición regional aproximada;
- fuerte caravanero/interior;
- identidad aramea;
- no capital monumental;
- culto Hadad/Baal local.

La interfaz podrá presentarla como `ZOBÁ` sin afirmar una reconstrucción arqueológica exacta del emplazamiento.

---

## 9.4 HAMAT

**Categoría:** Gran ciudad aramea independiente  
**Radio:** 205

- construida en relación directa con el Orontes;
- grandes murallas;
- palacio propio;
- mercados;
- agricultura irrigada;
- puente principal;
- templo arameo monumental.

**Importante:** Hamat no debe tratarse automáticamente como una ciudad provincial gobernada por Rezín.

Culto propuesto: Hadad / deidad tormenta local dentro del repertorio arameo.

---

## 9.5 ARPAD

**Categoría:** Gran fortaleza/ciudad-estado aramea del norte  
**Radio:** 185

Función:
- bastión septentrional;
- gran muralla;
- rutas hacia Hamat, Carquemis y Sam'al;
- fuerte presencia militar;
- palacio local;
- templo de tradición aramea.

Arpad será una de las puertas de entrada al Bloque 7.

---

# 10. Arquitectura cultural

## 10.1 Fenicia

Características visuales:
- piedra bien trabajada;
- edificios relativamente altos y compactos por escasez de suelo costero/insular;
- patios;
- muelles;
- almacenes;
- templos con patios y columnas;
- estelas;
- barcos visibles;
- maderas de cedro en estructuras nobles;
- mayor densidad urbana que muchas ciudades interiores.

## 10.2 Aram

Características:
- grandes complejos palaciegos;
- patios monumentales;
- basalto/piedra y adobe según región;
- relieves y estelas;
- grandes puertas urbanas;
- templos del dios de tormenta;
- ciudades de oasis y valle con irrigación visible.

Fenicia y Aram deben ser visualmente reconocibles incluso sin leer el nombre de la ciudad.

---

# 11. Recursos y economía regional

## Fenicia

Recursos/sistemas principales:
- cedro;
- construcción naval;
- comercio marítimo;
- púrpura/tintes;
- vidrio y artesanía;
- importación/exportación de metales, vino, aceite y lujo.

## Aram

- agricultura irrigada;
- cereal;
- frutales;
- vino;
- caravanas;
- caballos;
- comercio entre Mesopotamia, Siria, Transjordania y la costa.

Controlar pasos del Líbano/Anti-Líbano puede cambiar el flujo comercial entre costa y Damasco.

---

# 12. Reglas de navegación

**PROPUESTA**

El Mediterráneo deja de ser únicamente una frontera visual.

En el Bloque 6 debe soportar al menos:
- pequeñas embarcaciones de transporte;
- ferris locales;
- barcos mercantes visuales;
- acceso funcional a Tiro y Arwad;
- puertos como nodos de viaje/comercio.

No hace falta implementar todavía combate naval completo para que los puertos tengan función real.

---

# 13. Decisiones recomendadas para aprobar

1. **Fenicia será una macro-cultura de ciudades-estado**, con Tiro como capital de selección, pero Sidón, Biblos y Arwad con poder local propio.
2. **Aram será una macro-cultura**, pero Hamat y Arpad no estarán políticamente subordinadas de forma automática a Rezín de Damasco.
3. **Tiro será una verdadera ciudad-isla**, sin convertirla en una ciudad costera normal.
4. **Arwad será también una ciudad-fortaleza insular**, accesible por barco/ferri.
5. **Damasco será una de las mayores capitales del juego**, integrada a un gran oasis alimentado por el Barada.
6. **Cordillera del Líbano, bosques de cedro, Becá, Litani, Orontes, Anti-Líbano y Barada** serán geografía fija permanente.
7. **El cedro será un recurso económico real** vinculado a construcción monumental, barcos y comercio.
8. Cultos principales: Tiro/Melqart, Sidón/Eshmun+Astarté, Biblos/Baalat Gebal, Damasco/Hadad-Rimón; los cultos de Sarepta, Berito, Arwad, Zobá, Bet-Rehob, Hamat y Arpad se mantendrán culturalmente plausibles pero marcados con distintos niveles de certeza.
9. **Zobá se conservará**, pero como centro regional aproximado, no como gran capital perfectamente localizada.
10. **Bet-Rehob se conservará como centro fronterizo menor**, ligado al corredor Dan–Damasco.
11. La navegación mediterránea básica será funcional para acceder a ciudades insulares y mover comercio, aunque el combate naval completo pueda llegar más adelante.
12. El corredor **Damasco → Hamat → Arpad → Carquemis** será la gran conexión hacia el Bloque 7.

---

**Este bloque permanece como PROPUESTA V1 hasta aprobación del usuario.**
