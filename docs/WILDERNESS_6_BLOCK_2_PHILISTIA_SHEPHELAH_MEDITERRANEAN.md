# WILDERNESS 6 — BLOQUE 2: FILISTEA / SEFELÁ / MEDITERRÁNEO

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque continúa el sistema de coordenadas del Bloque 1 y aplica las reglas globales aprobadas.

---

# 1. Objetivo del bloque

Definir la arquitectura geográfica, vial, urbana, militar y religiosa del corredor occidental compuesto por:

## Pentápolis / ciudades filisteas principales
- Gaza
- Ascalón
- Asdod
- Ecrón
- Gat

## Nodos de Judá / frontera conectados
- Gezer — ciudad cananea fronteriza/disputada ya aprobada
- Azecá
- Laquis
- Libná

## Geografía estructural
- Mar Mediterráneo permanente
- llanura costera filistea
- Sefelá
- Valle de Elá
- Valle de Sorec
- Valle de Ajalón
- transición hacia Montes de Judá
- grandes cultivos de cereal, vid y olivo

El bloque debe lograr que la llegada desde Jerusalén a la costa se sienta como un cambio completo de paisaje, cultura, arquitectura y estrategia militar.

---

# 2. Sistema de coordenadas

Se mantiene la convención aprobada:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala inicial ≈ **100 unidades de mundo por kilómetro geográfico relativo**

Gezer conserva su coordenada del Bloque 1: `(-2980, 900)`.

## 2.1 Coordenadas maestras V1

| Ciudad | X | Z | Función | Radio urbano V1 |
|---|---:|---:|---|---:|
| Gezer | -2980 | 900 | ciudad cananea disputada / bisagra occidental | 150 |
| Ecrón | -3650 | 0 | gran ciudad filistea interior | 175 |
| Gat | -3850 | -900 | gran ciudad filistea militar | 175 |
| Azecá | -3000 | -900 | fortaleza judía del Valle de Elá | 110 |
| Libná | -3350 | -1800 | ciudad-fortaleza judía | 105 |
| Laquis | -3650 | -2450 | gran ciudad real fortificada de Judá | 185 |
| Asdod | -5500 | 250 | gran ciudad filistea con corredor al litoral | 185 |
| Ascalón | -6350 | -1250 | gran ciudad costera amurallada | 195 |
| Gaza | -7200 | -3150 | gran capital/city-state del sur filisteo | 215 |

Las coordenadas buscan reproducir relaciones reales aproximadas, no una medición topográfica exacta.

## 2.2 Separación visual

- ninguna de estas grandes ciudades debe poder verse desde el centro de otra;
- Azecá y Gat son relativamente cercanas por razón estratégica, pero la topografía del Valle de Elá y las colinas deben impedir que se lean como barrios de una misma ciudad;
- los radios de exclusión deben impedir asentamientos históricos adicionales demasiado próximos;
- aldeas, granjas, torres y puestos pueden poblar los espacios intermedios sin competir visualmente con las ciudades mayores.

---

# 3. El Mar Mediterráneo

## 3.1 Regla permanente

**El Mar Mediterráneo siempre existe.**

No será un lago procedural ni una franja decorativa ocasional. Será el límite geográfico occidental continuo del mapa.

Debe incluir:
- línea de costa continua;
- playas y dunas donde corresponda;
- acantilados bajos / costa rocosa en zonas puntuales;
- oleaje visual ligero;
- horizonte marítimo claro;
- embarcaciones costeras y mercantes cuando se implemente la navegación;
- rutas terrestres paralelas a la costa.

## 3.2 Costa V1

La costa no será una línea vertical perfecta. Se utilizará una spline fija con entrantes y salientes suaves.

Coordenadas orientativas de costa:

| Altura Z | X aproximado de costa |
|---:|---:|
| +1000 | -6100 |
| +250 | -6150 |
| -1250 | -6500 |
| -3150 | -7650 |

Esto permite que:
- Ascalón esté directamente asociada al mar;
- Asdod quede algo tierra adentro y tenga un corredor hacia un enclave marítimo;
- Gaza quede tierra adentro pero próxima al litoral;
- Ecrón y Gat sean claramente ciudades interiores.

## 3.3 Puertos y enclaves costeros

### Ascalón
Gran puerto/ensenada urbana integrada a la ciudad.

### Asdod
La ciudad principal permanece tierra adentro. Tendrá un **enclave costero / puerto de Asdod** unido por camino directo.

### Gaza
Tendrá un **corredor comercial hacia la costa** y una zona de desembarco/mercado marítimo separada de la muralla principal.

Los enclaves portuarios no cuentan como ciudades históricas mayores y no rompen la regla de separación entre ciudades.

---

# 4. Geografía maestra del bloque

## 4.1 Llanura costera filistea

Zona amplia, relativamente llana, agrícola y muy distinta a los montes de Judá.

Debe contener:
- campos extensos de cereal;
- viñas;
- olivares;
- caminos anchos aptos para carros y ejércitos;
- granjas y aldeas agrícolas;
- menor densidad de roca que la serranía;
- palmeras y vegetación mediterránea cerca del litoral.

## 4.2 Sefelá

Franja de colinas entre la llanura filistea y los Montes de Judá.

Función de gameplay:
- frontera natural;
- terreno ideal para fortalezas;
- colinas que bloquean líneas de visión;
- rutas canalizadas por valles;
- emboscadas y batallas de paso.

## 4.3 Valle de Elá

**Elemento fijo y jugable.**

Debe conectar aproximadamente:

`Gat ↔ Valle de Elá ↔ Azecá ↔ ascenso hacia Judá`

Características:
- valle ancho entre colinas;
- cauce estacional / wadi;
- campos y pastizales;
- espacio adecuado para grandes enfrentamientos campales;
- Azecá dominando una de las alturas;
- Gat visible solo al acercarse al extremo occidental del corredor.

El valle debe sentirse como lugar natural para campañas militares entre Filistea y Judá.

## 4.4 Valle de Sorec

Corredor occidental-oriental al norte del Valle de Elá.

Conecta el entorno de:

`Ecrón / llanura filistea ↔ Sefelá ↔ ascenso hacia la serranía`

Puede contener aldeas y puestos regionales sin añadir necesariamente otra gran ciudad al roster.

## 4.5 Valle de Ajalón

Corredor asociado a Gezer.

Gezer debe dominar la transición entre:
- llanura costera;
- Sefelá;
- camino hacia Jerusalén.

---

# 5. Red vial maestra

# 5.1 Vía Maris — corredor costero

Ruta mayor:

**Gaza → Ascalón → Asdod → norte hacia Llanura de Sarón / Monte Carmelo**

No debe atravesar necesariamente el centro exacto de cada ciudad. En grandes ciudades puede pasar por una puerta principal y continuar por el exterior.

Características:
- camino ancho;
- terreno favorable para caravanas;
- mayor tráfico comercial;
- mayor probabilidad de patrullas y caravanas;
- hitos y mojones frecuentes;
- ramales hacia puertos.

# 5.2 Corredor interior filisteo

Ruta estratégica:

**Gaza → Gat → Ecrón → Gezer**

Función:
- enlazar ciudades militares del interior;
- permitir movimientos de ejército sin seguir la costa;
- conectar la llanura filistea con los accesos hacia Judá.

# 5.3 Conexiones transversales

- Ascalón ↔ Gat
- Asdod ↔ Ecrón
- Ecrón ↔ Gezer
- Gat ↔ Azecá
- Gat ↔ Laquis (ruta militar/comercial secundaria)
- Azecá ↔ Libná ↔ Laquis
- Laquis ↔ Gaza (corredor meridional/fronterizo)

# 5.4 Entrada occidental hacia Jerusalén

Se revisa la interpretación del corredor occidental del Bloque 1:

La **Puerta Oeste de Jerusalén** sigue siendo una única puerta por corredor, pero el camino se bifurca más adelante:

```text
JERUSALÉN
    |
PUERTA OESTE
    |
corredor occidental
    |
    +---------------------> GEZER -> ECRÓN -> ASDOD / COSTA
    |
    +---------------------> AZECÁ -> GAT / LAQUIS
```

Cartel propuesto de Puerta Oeste:

`GEZER · AZECÁ · COSTA`

Esto respeta la regla global: una puerta por corredor, no una puerta por destino.

---

# 6. Diagrama regional simplificado

```text
                                      NORTE

                          [futuro SARÓN / CARMELO]
                                  |
                    MEDITERRÁNEO  |        GEZER
                         ~~~~~     |          |
                           |      ASDOD ---- ECRÓN
                           |        |          |
                           |        |        VALLE DE SOREC
                           |        |          |
                        ASCALÓN ----+        GAT ---- VALLE DE ELÁ ---- AZECÁ ----> JERUSALÉN
                           |                   |                         |
                           |                   |                       LIBNÁ
                           |                   |                         |
                         GAZA -----------------+---------------------- LAQUIS

                    LLANURA COSTERA      SEFELÁ / COLINAS       MONTES DE JUDÁ
```

---

# 7. Reglas urbanas específicas de Filistea

Las ciudades filisteas deben diferenciarse visualmente de Judá.

## 7.1 Lenguaje urbano

Propuesta:
- murallas masivas de adobe/piedra con basamentos de piedra;
- torres cuadradas robustas;
- puertas profundas con cámaras laterales;
- grandes patios interiores;
- casas altas y densas, pero con avenidas principales despejadas;
- palacios/casas de gobierno monumentales;
- edificios de almacenamiento y producción a gran escala;
- templos con patios ceremoniales y estatuaria.

## 7.2 Calles

Se mantiene la regla global absoluta:
- primero calles y plazas;
- después parcelas;
- ninguna roca, puesto, tienda, árbol o edificio bloquea corredores;
- mercados solo en plazas laterales;
- animales estacionarios fuera del eje de circulación.

## 7.3 Vegetación

- árboles significativamente más altos que en Wilderness 5.x;
- sicómoros, tamariscos, palmeras, olivos y otros árboles mediterráneos según zona;
- árboles fuera de calles y accesos militares;
- mayor vegetación en valles y cercanías de agua.

---

# 8. Fichas maestras por ciudad

# 8.1 GAZA

**ID:** gaza  
**Cultura:** filistea  
**Control inicial:** Filistea / ciudad-estado de Gaza  
**Gobernante asociado:** Hanunu  
**Categoría:** Capital regional / gran ciudad  
**Radio V1:** 215  
**Coordenadas:** (-7200,-3150)

## Geografía
- gran ciudad del extremo sur filisteo;
- situada tierra adentro pero cercana al Mediterráneo;
- llanura costera amplia;
- conexión natural hacia el sur/Egipto y hacia el norte por la Vía Maris.

## Puertas
1. **Puerta Norte:** `ASCALÓN · ASDOD`
2. **Puerta Este/Noreste:** `GAT · ECRÓN`
3. **Puerta Sur:** `CAMINO DE EGIPTO`
4. **Puerta Oeste:** `MAR · PUERTO`

## Urbanismo
- gran avenida norte-sur;
- mercado internacional amplio pero lateral;
- barrios de artesanos;
- almacenes y patios para caravanas;
- gran cuartel y guarnición;
- residencia fortificada del gobernante.

## Religión
- **gran templo de Dagón** como edificio monumental;
- estatua/culto físicamente reemplazable por el futuro sistema religioso de conquista.

## Escala V1
- muralla: 15–17;
- torres: 21–25;
- casas: 8–11;
- palacio y templo: 17–23.

## Rasgo único
**Puerta meridional del mundo levantino y gran nodo militar/comercial.**

---

# 8.2 ASCALÓN

**ID:** ashkelon  
**Cultura:** filistea  
**Categoría:** Gran ciudad costera  
**Radio V1:** 195  
**Coordenadas:** (-6350,-1250)

## Geografía
- directamente asociada a la costa mediterránea;
- muralla siguiendo parcialmente el relieve costero;
- playa/ensenada y puerto integrados visualmente.

## Puertas
1. **Puerta Norte:** `ASDOD`
2. **Puerta Sur:** `GAZA`
3. **Puerta Este:** `GAT · INTERIOR`
4. **Puerta del Mar:** acceso portuario.

## Urbanismo
- barrios marítimos;
- almacenes de mercancías;
- mercado de pescado y comercio costero fuera del eje vial;
- palacio/casa del gobernante en posición elevada;
- torre/mirador marítimo.

## Religión
- gran templo filisteo; deidad específica **pendiente de cierre histórico**.

## Escala
- muralla: 14–16;
- torres: 20–23;
- casas: 8–11.

## Rasgo único
**La gran ciudad marítima del bloque**, con horizonte del Mediterráneo visible desde muralla y palacio.

---

# 8.3 ASDOD

**ID:** ashdod  
**Cultura:** filistea  
**Categoría:** Gran ciudad fortificada  
**Radio V1:** 185  
**Coordenadas:** (-5500,250)

## Geografía
- ciudad principal situada tierra adentro;
- corredor dedicado hacia el enclave marítimo de Asdod;
- llanura agrícola fértil.

## Puertas
1. **Puerta Sur:** `ASCALÓN · GAZA`
2. **Puerta Norte:** `SARÓN · CARMELO`
3. **Puerta Este:** `ECRÓN · GEZER`
4. **Puerta Oeste:** `MAR · PUERTO`

## Gobierno
- palacio administrativo monumental;
- patios de almacenamiento y tributo.

## Religión
- **gran templo de Dagón**;
- estatua monumental dentro del recinto;
- templo preparado para futura transformación de culto tras conquista.

## Escala
- muralla: 15–17;
- torres: 21–24;
- casas: 8–11;
- templo: uno de los edificios más altos de la ciudad.

## Rasgo único
**Centro religioso de Dagón y bisagra entre la Vía Maris y las rutas interiores.**

---

# 8.4 ECRÓN

**ID:** ekron  
**Cultura:** filistea  
**Categoría:** Gran ciudad interior  
**Radio V1:** 175  
**Coordenadas:** (-3650,0)

## Geografía
- borde entre llanura filistea y Sefelá;
- posición ideal para controlar rutas hacia Gezer y Judá.

## Puertas
1. **Puerta Oeste:** `ASDOD · MAR`
2. **Puerta Norte/Este:** `GEZER · JERUSALÉN`
3. **Puerta Sur:** `GAT · GAZA`

## Urbanismo
- gran distrito productivo;
- almacenes;
- patios de aceite/vino y bienes agrícolas;
- calles industriales separadas del eje principal;
- palacio/casa de gobierno claramente monumental.

## Religión
- **gran templo asociado a Baal-Zebub** en el diseño bíblico del juego;
- estatua/símbolo monumental;
- recinto mucho mayor que los santuarios de ciudades menores.

## Escala
- muralla: 15–17;
- torres: 21–24;
- casas: 8–11;
- palacio/templo: 17–22.

## Rasgo único
**Gran ciudad cultual y económica del interior filisteo.**

---

# 8.5 GAT

**ID:** gath  
**Cultura:** filistea  
**Categoría:** Gran ciudad militar  
**Radio V1:** 175  
**Coordenadas:** (-3850,-900)

## Geografía
- colinas interiores;
- domina accesos al Valle de Elá;
- transición inmediata entre Filistea y la Sefelá.

## Puertas
1. **Puerta Norte:** `ECRÓN`
2. **Puerta Oeste/Suroeste:** `ASCALÓN · GAZA`
3. **Puerta Este:** `VALLE DE ELÁ · AZECÁ · JUDÁ`
4. **Puerta Sur:** `LAQUIS`

## Urbanismo
- cuarteles especialmente grandes;
- patios de entrenamiento;
- armería/almacenes;
- palacio de gobernante;
- barrios residenciales densos pero avenidas militares despejadas.

## Religión
- gran templo filisteo; deidad específica pendiente de revisión.

## Escala
- muralla: 16–18;
- torres: 23–26;
- casas: 8–11.

## Rasgo único
**Fortaleza militar que controla el acceso occidental al Valle de Elá.**

---

# 8.6 GEZER

**ID:** gezer  
**Cultura original:** cananea  
**Control inicial:** **PENDIENTE / DISPUTADO**  
**Categoría:** Ciudad fronteriza mayor  
**Radio V1:** 150  
**Coordenadas:** (-2980,900)

## Geografía
- domina Valle de Ajalón y accesos hacia la serranía;
- posición de bisagra entre llanura, Sefelá y Jerusalén.

## Puertas
1. **Puerta Este:** `JERUSALÉN`
2. **Puerta Oeste:** `ECRÓN · ASDOD`
3. **Puerta Sur:** `AZECÁ · GAT`
4. **Puerta Norte:** futura conexión hacia Sarón.

## Identidad
- arquitectura cananea propia;
- no se transforma visualmente al cambiar de controlador;
- bandera, guarnición, gobernador y religión sí pueden cambiar.

## Gobierno
- palacio/casa del gobernador adaptado al controlador actual.

## Religión
- santuario cananeo inicial propuesto;
- deidad concreta pendiente de revisión;
- una de las primeras ciudades ideales para probar el sistema de cambio de culto.

## Rasgo único
**Ciudad disputada clave para controlar la carretera Jerusalén–costa.**

---

# 8.7 AZECÁ

**ID:** azekah  
**Cultura/control:** Judá  
**Categoría:** Fortaleza fronteriza  
**Radio V1:** 110  
**Coordenadas:** (-3000,-900)

## Geografía
- altura dominante en la Sefelá;
- ligada directamente al Valle de Elá;
- vista estratégica sobre corredores occidentales.

## Puertas
1. **Puerta Este:** `JERUSALÉN`
2. **Puerta Oeste:** `VALLE DE ELÁ · GAT`
3. **Puerta Sur:** `LIBNÁ · LAQUIS`

## Urbanismo
- diseño militar;
- gran torre/ciudadela;
- cuarteles y almacenes;
- menor densidad comercial que Laquis.

## Religión
- santuario yahvista local.

## Escala
- muralla: 13–15;
- torres: 19–22;
- casas: 7–9.

## Rasgo único
**Mirador fortificado de Judá sobre el Valle de Elá.**

---

# 8.8 LIBNÁ

**ID:** libnah  
**Cultura/control:** Judá  
**Categoría:** Ciudad-fortaleza regional  
**Radio V1:** 105  
**Coordenadas:** (-3350,-1800)

## Función
Nodo intermedio entre Azecá y Laquis.

## Puertas
1. **Puerta Norte:** `AZECÁ`
2. **Puerta Sur:** `LAQUIS`
3. **Puerta Oeste:** ruta secundaria hacia Gat / llanura.

## Urbanismo
- fortificación compacta;
- casa del gobernador;
- almacenes militares;
- pequeño mercado regional fuera del eje principal.

## Religión
- santuario local de Judá.

## Rasgo único
**Nodo menor que adquiere valor por controlar la ruta, siguiendo la regla global aprobada.**

---

# 8.9 LAQUIS

**ID:** lachish  
**Cultura/control:** Judá  
**Categoría:** Gran ciudad real fortificada  
**Radio V1:** 185  
**Coordenadas:** (-3650,-2450)

## Geografía
- gran posición elevada en la Sefelá meridional;
- controla rutas hacia Gaza, Hebrón y el interior de Judá.

## Puertas
1. **Puerta Norte:** `LIBNÁ · AZECÁ`
2. **Puerta Este:** `HEBRÓN · JERUSALÉN`
3. **Puerta Oeste:** `GAT · FILISTEA`
4. **Puerta Sur/Suroeste:** `GAZA`

## Urbanismo
- debe ser una de las ciudades más impresionantes de Judá después de Jerusalén;
- gran complejo palaciego/administrativo;
- puerta monumental con fuerte sistema defensivo;
- cuarteles grandes;
- almacenes reales;
- avenidas internas amplias;
- barrios residenciales densos pero limpios.

## Religión
- santuario principal de ciudad bajo culto de Judá, de escala menor que el Templo de Jerusalén.

## Escala
- muralla: 16–18;
- torres: 23–27;
- casas: 8–11;
- palacio: 16–21.

## Rasgo único
**Principal bastión occidental/suroccidental de Judá.**

---

# 9. Religión y templos — Bloque 2

## 9.1 Cultos iniciales V1

| Ciudad | Culto/templo V1 |
|---|---|
| Gaza | Dagón |
| Ascalón | templo filisteo — deidad por cerrar |
| Asdod | Dagón |
| Ecrón | Baal-Zebub |
| Gat | templo filisteo — deidad por cerrar |
| Gezer | culto cananeo — deidad por cerrar |
| Azecá | Elohim/Yahvé |
| Libná | Elohim/Yahvé |
| Laquis | Elohim/Yahvé |

## 9.2 Regla de estatuas

En los cultos que utilicen imágenes:
- el templo tendrá estatua o símbolo monumental;
- la estatua no debe bloquear el recorrido ceremonial;
- debe poder retirarse/reemplazarse al cambiar el culto;
- el modelo de templo podrá transformarse por etapas tras conquista.

En ciudades consagradas a Elohim no se utilizará una estatua antropomórfica de Dios.

---

# 10. Guerra y valor estratégico

Este bloque debe crear varias líneas de campaña posibles.

## 10.1 Corredor Gezer

Controlar Gezer permite:
- acceder más fácilmente desde Filistea hacia Jerusalén;
- proteger la salida occidental de Jerusalén;
- controlar tráfico comercial entre costa y serranía.

## 10.2 Valle de Elá

Controlar Gat y Azecá permite dominar los extremos occidental y oriental del valle.

Posibles campañas:
- ejército filisteo Gat → Azecá → ascenso hacia Judá;
- ejército judío Azecá → valle → Gat;
- batalla campal en el valle sin necesidad de asediar inmediatamente una ciudad.

## 10.3 Laquis

Laquis debe funcionar como un gran objetivo militar. Su caída abre rutas hacia:
- interior de Judá;
- Hebrón;
- corredor meridional.

## 10.4 Rutas alternativas

Cada corredor principal tendrá rutas alternativas:
- sendas por colinas;
- pasos secundarios;
- cauces secos;
- rutas de explorador.

Serán menos adecuadas para grandes ejércitos y caravanas, cumpliendo las reglas globales aprobadas.

---

# 11. Distribución procedural entre ciudades

## 11.1 Llanura filistea

Puede generar:
- aldeas agrícolas;
- campos de cereal;
- viñedos;
- olivares;
- granjas;
- corrales;
- puestos militares;
- caravanas abundantes.

## 11.2 Sefelá

Puede generar:
- pequeñas aldeas en colinas;
- torres de vigilancia;
- ruinas;
- cuevas;
- bandidos;
- pasos defendibles;
- terrazas agrícolas.

## 11.3 Costa

Puede generar:
- playas;
- pequeños embarcaderos;
- pescadores;
- campamentos comerciales;
- barcos;
- palmeras/tamariscos;
- dunas.

## 11.4 Zonas prohibidas para generación procedural

No se puede generar obstáculo sobre:
- rutas mayores;
- caminos secundarios definidos;
- puertas;
- puentes;
- plazas;
- zonas de desembarco;
- corredores militares internos de ciudades.

---

# 12. Ajustes cruzados propuestos al Bloque 1

Al aprobar este Bloque 2 se deberán actualizar dos detalles del Bloque 1:

1. Cartel de la Puerta Oeste de Jerusalén:  
   de `GEZER · COSTA`  
   a **`GEZER · AZECÁ · COSTA`**.

2. El corredor occidental de Jerusalén se bifurca después de salir de la ciudad:
   - ramal norte/oeste → Gezer;
   - ramal suroeste → Azecá / Valle de Elá / Laquis.

No es necesario crear una quinta puerta de Jerusalén.

---

# 13. Decisiones a revisar antes de aprobar el Bloque 2

1. **¿Gezer comienza neutral/disputada o bajo un controlador concreto?**  
   Recomendación V1: identidad cananea y control político variable; para una partida inicial puede asignarse un controlador según el escenario histórico.

2. **¿Ascalón tendrá el puerto principal filisteo del juego?**  
   Recomendación V1: sí; permite diferenciarla radicalmente de las otras cuatro ciudades filisteas.

3. **¿Asdod tendrá ciudad + enclave portuario separado?**  
   Recomendación V1: sí; crea una relación geográfica más interesante con el Mediterráneo.

4. **¿Laquis será la segunda ciudad más monumental de Judá después de Jerusalén?**  
   Recomendación V1: sí en términos militares/administrativos de gameplay.

5. **Cultos específicos de Ascalón, Gat y Gezer.**  
   Deben cerrarse mediante revisión histórica antes de codificar estatuas/templos definitivos.

---

# 14. Estado

**Bloque 2 preparado en V1 para revisión.**

No modificar todavía `nations50.js`, `historical52.js`, generadores de ciudades, terreno, rutas ni templos hasta que el bloque sea aprobado y se diseñen los demás sectores del mundo.
