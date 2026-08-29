# WILDERNESS 6 — BLOQUE 7: ESTADOS NEO-HITITAS / ÉUFRATES / FRONTERA ASIRIA

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque continúa el corredor Hamat–Arpad del Bloque 6 y completa el extremo norte/noreste del mundo principal.

---

# 1. Objetivo del bloque

Construir la región septentrional donde confluyen:

- ciudades-estado neo-hititas;
- principados arameos;
- corredor del Orontes;
- llanura de Alepo;
- montes Amanus;
- estribaciones del Tauro;
- alto Éufrates;
- rutas hacia Anatolia y Mesopotamia;
- presión imperial asiria.

## Centros principales del roster neo-hitita

- **Carquemis** — capital de selección de la macro-facción neo-hitita.
- **Sam'al** — reino/ciudad-estado occidental independiente en cultura y gobierno.
- **Melid** — gran centro septentrional del alto Éufrates.
- **Gurgum** — reino/ciudad-estado de las tierras altas septentrionales.
- **Kinalua / Kunulua** — capital histórica de Unqi/Patina, con situación política especial por la expansión asiria.

## Sitios adicionales propuestos

- **Halab / Alepo** — gran centro regional y religioso, tratado como ciudad fija importante pero no necesariamente como décima facción ni capital de selección.
- fortalezas del corredor del Éufrates;
- puestos en los pasos del Amanus;
- aldeas agrícolas de la llanura de Alepo;
- estaciones caravaneras hacia Harrán y Mesopotamia.

---

# 2. Regla política fundamental

## 2.1 “Neo-hitita” será macro-cultura, no un solo reino

**PROPUESTA FUERTE**

La selección de jugador puede conservar una macro-facción **NEO-HITITAS**, con Carquemis como capital inicial, pero el mapa político distinguirá gobiernos propios.

- Carquemis → reino propio bajo Pisiri en el período base.
- Sam'al → ciudad-estado/reino propio.
- Gurgum → reino propio.
- Melid → reino propio.
- Kinalua/Unqi → identidad luvita/aramea local, pero con situación política afectada por la incorporación asiria previa al período de juego.

Compartirán ciertos elementos culturales, arquitectura monumental y repertorios religiosos, pero no tendrán un único rey automático.

## 2.2 Asiria como potencia imperial externa

**PROPUESTA FUERTE**

Asiria será una potencia activa desde el comienzo del mundo político aunque su núcleo mesopotámico no necesite estar completamente modelado en la primera versión.

Asiria podrá:

- exigir tributo;
- enviar emisarios;
- imponer tratados;
- declarar campañas;
- enviar ejércitos por rutas orientales/nororientales;
- capturar ciudades;
- instalar gobernador/guarnición;
- convertir territorios en provincias o vasallos;
- alterar relaciones entre reinos locales.

El jugador podrá enfrentarse, someterse, pagar tributo, rebelarse o aprovechar campañas asirias contra otros estados.

**No se propone todavía Asiria como décima facción seleccionable obligatoria.** Esto puede decidirse después.

---

# 3. Sistema de coordenadas

Se mantiene la convención global:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala base ≈ **100 unidades por kilómetro geográfico relativo**

Punto de continuidad:

- Arpad = `(17490,52110)`

## 3.1 Coordenadas maestras V1

| Lugar | X | Z | Función | Radio urbano V1 |
|---|---:|---:|---|---:|
| Arpad | 17490 | 52110 | conexión sur / ciudad aramea | 185 |
| Halab / Alepo | 19100 | 54800 | gran centro regional y religioso | 175 |
| Kinalua / Kunulua | 13100 | 55700 | antigua capital de Unqi / zona bajo presión-control asirio | 165 |
| Sam'al | 15700 | 61100 | gran ciudad-estado occidental | 185 |
| Gurgum | 21800 | 66200 | reino de montaña/llanura alta | 180 |
| Carquemis | 26300 | 63700 | capital neo-hitita de gameplay / cruce del Éufrates | 230 |
| Melid | 31300 | 75900 | gran ciudad del alto Éufrates | 200 |
| paso principal Amanus | 12600 | 60600 | corredor montaña–Cilicia | — |
| centro llanura de Alepo | 19000 | 57000 | llanura agrícola | — |
| Éufrates en Carquemis | 26800 | 63700 | río permanente | — |
| corredor oriental a Harrán | 31500 | 61000 | ruta imperial/caravanera | — |
| estribaciones del Tauro | 25000 | 71500 | macizo septentrional | — |

> Coordenadas de gameplay; preservan relaciones regionales aproximadas y pueden ajustarse durante pruebas sin romper la jerarquía geográfica.

---

# 4. Diagrama regional simplificado

```text
                                      NORTE / ANATOLIA

                                       MELID
                                         |
                               ESTRIBACIONES DEL TAURO
                                         |
                         GURGUM ---------+--------- CARQUEMIS ===== ÉUFRATES =====> HARRÁN / ASIRIA
                           |                             |
                           |                             |
             PASOS AMANUS--SAM'AL                  LLANURA ORIENTAL
                    |       |                            |
                    |    KINALUA ---- HALAB/ALEPO ------+
                    |                   |
                 CILICIA              ARPAD
                                        |
                                      HAMAT
                                        |
                                   DAMASCO / SUR
```

---

# 5. Geografía fija del Bloque 7

## 5.1 Río Éufrates

**OBLIGATORIO Y PERMANENTE**

Será uno de los mayores accidentes geográficos de Wilderness 6.

Características:
- cauce mucho más ancho que ríos regionales como Kishon o Barada;
- riberas fértiles;
- islas/bancos de sedimento en sectores apropiados;
- pocas zonas de cruce para ejércitos;
- puentes, ferris o vados controlados;
- caravanas y tropas concentradas en pasos conocidos.

### Carquemis

Carquemis debe dominar físicamente un cruce principal del Éufrates.

Controlar Carquemis significará controlar:
- comercio este–oeste;
- tránsito militar;
- acceso hacia Anatolia;
- acceso hacia Mesopotamia/Asiria.

## 5.2 Montes Amanus

**OBLIGATORIOS**

Gran barrera montañosa occidental entre Siria septentrional y Cilicia.

Características:
- montañas boscosas;
- desfiladeros estrechos;
- fortalezas de paso;
- rutas de comercio y ejército concentradas;
- árboles altos y vegetación más densa que la estepa oriental.

Gameplay:
- controlar un paso puede bloquear una ruta completa;
- carros dependen de carreteras;
- excelente terreno para emboscadas.

## 5.3 Estribaciones del Tauro

**OBLIGATORIAS COMO LÍMITE NORTE**

- relieve elevado;
- clima visualmente más fresco;
- bosques y pastos de altura;
- corredores hacia Anatolia;
- nieve visual en cumbres altas si el sistema climático posterior lo permite.

Melid debe sentirse vinculada a este mundo septentrional, no como otra ciudad desértica.

## 5.4 Llanura de Alepo

**OBLIGATORIA**

Gran espacio agrícola y militar alrededor de Halab/Arpad.

Características:
- cereal;
- grandes horizontes;
- aldeas;
- caravanas;
- rutas aptas para carros;
- transición entre Orontes, Éufrates y estepa.

## 5.5 Continuación del Orontes

El río Orontes del Bloque 6 continuará físicamente hacia el norte.

No debe terminar al llegar a Hamat.

- corredor agrícola;
- puentes;
- humedales locales;
- camino paralelo en ciertos sectores;
- conexión hacia el área de Kinalua/Antioquía regional.

## 5.6 Afrin y cursos secundarios

Se incorporarán cauces secundarios en la región de Alepo/Amanus como elementos regionales para evitar que todo el norte dependa visualmente de un único río.

No todos deben tener importancia equivalente al Éufrates.

---

# 6. Red vial maestra

## 6.1 Gran eje meridional

`Damasco → Hamat → Arpad → Halab/Alepo → Carquemis`

Será la principal ruta norte-sur interior.

## 6.2 Eje del Éufrates

`Carquemis → rutas del alto Éufrates → Melid`

Y hacia el este:

`Carquemis → Harrán → Mesopotamia / Asiria (fuera del mapa principal inicial)`

El camino oriental continuará físicamente hasta el borde jugable con señalización de destino, aunque Nínive no necesite modelarse todavía.

## 6.3 Corredor occidental

`Arpad / Halab → Kinalua → Sam'al → pasos del Amanus → Cilicia`

## 6.4 Corredor Gurgum

`Carquemis → Gurgum → Melid`

con bifurcaciones hacia Sam'al y los pasos del Tauro.

---

# 7. Puertas y señalización

## Carquemis

- Puerta Sur → `ALEPO · ARPAD · HAMAT`
- Puerta Oeste → `SAM'AL · AMANUS`
- Puerta Norte → `GURGUM · MELID`
- Puerta Este / Puerta del Río → `HARRÁN · ASIRIA`

La ruta oriental cruza o utiliza el sistema de paso del Éufrates.

## Sam'al

- Puerta Sur → `KINALUA · ARPAD`
- Puerta Este → `CARQUEMIS`
- Puerta Norte → `GURGUM`
- Puerta Oeste → `AMANUS · CILICIA`

## Gurgum

- Puerta Sur → `CARQUEMIS`
- Puerta Oeste → `SAM'AL`
- Puerta Norte → `MELID`

## Melid

- Puerta Sur → `GURGUM · CARQUEMIS`
- Puerta Oeste/Norte → `TAURO · ANATOLIA`
- Puerta Este → `ALTO ÉUFRATES`

## Kinalua

- Puerta Este → `ALEPO · ARPAD`
- Puerta Norte → `SAM'AL`
- Puerta Oeste → `ORONTES · COSTA`

## Halab / Alepo

- Puerta Sur → `ARPAD · HAMAT`
- Puerta Norte → `CARQUEMIS`
- Puerta Oeste → `KINALUA · SAM'AL`
- Puerta Este → `ÉUFRATES · HARRÁN`

---

# 8. Ciudades principales

## 8.1 CARQUEMIS

**Categoría:** Capital monumental de selección neo-hitita / gran ciudad del Éufrates  
**Radio V1:** 230

### Diseño

- ciudad alta/citadela + ciudad baja;
- murallas monumentales;
- puerta ceremonial con ortostatos/relieves;
- palacio real;
- grandes patios;
- cuarteles;
- almacenes;
- mercado internacional;
- acceso controlado al río;
- puente/ferri estratégico;
- arquitectura luvita-siria monumental.

### Religión

Culto estatal de tradición luvita/hurrita-siria asociado al dios de la tormenta, con otros cultos locales. La identificación exacta se documentará con niveles de certeza antes del código final.

### Función única

**Llave del Éufrates.** Carquemis debe ser uno de los objetivos estratégicos más valiosos de todo el mapa.

---

## 8.2 SAM'AL

**Categoría:** Gran ciudad-estado fortificada  
**Radio:** 185

Diseño:
- muralla poderosa;
- ciudadela;
- palacio local;
- relieves/estelas;
- mezcla cultural luvita/aramea;
- control de pasos hacia Amanus/Cilicia.

Función:
- bisagra entre Siria, Anatolia y costa;
- fuerte valor diplomático;
- susceptible a presión asiria.

---

## 8.3 GURGUM

**Categoría:** Gran ciudad real regional  
**Radio:** 180

- palacio;
- murallas;
- campos fértiles alrededor;
- rutas a Carquemis, Sam'al y Melid;
- arquitectura neo-hitita propia;
- fuerte importancia agrícola y militar.

---

## 8.4 MELID

**Categoría:** Gran capital septentrional  
**Radio:** 200

Debe sentirse distinta del resto:
- relieve más fresco/alto;
- ciudad fortificada;
- citadela;
- rutas hacia Anatolia;
- economía de montaña y valle;
- grandes rebaños;
- comercio septentrional.

---

## 8.5 KINALUA / KUNULUA

**Categoría:** Gran centro cultural luvita/arameo con situación política especial  
**Radio:** 165

No se presentará como otra ciudad libre idéntica a Carquemis.

Para el período base, su región estará marcada por **fuerte control/presencia asiria** derivada de campañas anteriores.

Gameplay:
- arquitectura local permanece;
- guarnición/administración puede ser asiria;
- población conserva identidad regional;
- excelente ejemplo del sistema `cultura ≠ controlador`.

---

# 9. Halab / Alepo

**PROPUESTA DE INCORPORACIÓN COMO CIUDAD FIJA IMPORTANTE**

Halab/Alepo merece existir aunque no forme parte del roster original de facciones.

Función:
- nodo central entre Arpad, Kinalua y Carquemis;
- gran tradición religiosa del dios de la tormenta;
- mercado y caravanas;
- ciudad fortificada;
- palacio/gobierno regional;
- valor militar por su posición en la llanura.

Se propone como **ciudad regional neutral/disputada o dependiente del equilibrio político inicial**, sujeto a aprobación final.

---

# 10. Arquitectura neo-hitita / luvita-aramea

Características visuales globales:
- grandes puertas de piedra;
- ortostatos esculpidos;
- leones/esfinges guardianes estilizados;
- palacios con patios;
- basalto y piedra según región;
- relieves monumentales;
- estelas;
- ciudadela elevada;
- murallas gruesas;
- templos del dios de tormenta y repertorios locales.

**Importante:** no crear estatuas y templos genéricos idénticos en todas las ciudades. Cada estado tendrá variaciones visuales.

---

# 11. Sistema imperial asirio

## 11.1 Presencia sin modelar Nínive completa

El borde oriental/nororiental del mapa tendrá rutas que continúan hacia:

- Harrán;
- Mesopotamia;
- Asiria;
- eventualmente Nínive.

No hace falta construir esas ciudades en la primera reconstrucción del mundo.

## 11.2 Aparición de ejércitos

Los ejércitos asirios no deben aparecer mágicamente al lado de una ciudad.

Entrarán por corredores definidos:
- ruta oriental de Carquemis;
- corredor de Arpad/Alepo;
- rutas septentrionales según campaña.

El jugador podrá ver:
- exploradores;
- mensajeros;
- columnas militares;
- carros;
- caballería;
- infantería;
- tren logístico;
- máquinas de asedio.

## 11.3 Política imperial

Estados locales podrán tener estados como:

- independiente;
- aliado;
- tributario;
- vasallo;
- rebelde;
- provincia asiria.

La conquista asiria puede conservar arquitectura y población local, pero cambiar:
- gobernador;
- guarnición;
- tributo;
- banderas/símbolos;
- política exterior.

---

# 12. Economía y recursos

Recursos regionales:
- cereal de la llanura de Alepo;
- ganado;
- caballos;
- piedra/basalto;
- madera de montañas occidentales;
- comercio del Éufrates;
- peajes de pasos y puentes;
- caravanas Mesopotamia–Siria–Mediterráneo.

Controlar Carquemis y Alepo debe tener efectos económicos visibles por el volumen de comercio terrestre.

---

# 13. Decisiones recomendadas para aprobar

1. **Neo-hitita será macro-cultura, no reino único.**
2. Carquemis seguirá siendo capital de selección, pero Sam'al, Gurgum y Melid tendrán gobiernos propios.
3. **Kinalua/Unqi tendrá identidad local pero fuerte control/presencia asiria inicial**, usando plenamente el sistema cultura ≠ controlador.
4. **Asiria entra como potencia imperial externa activa desde el comienzo**, aunque no sea todavía facción seleccionable.
5. Los ejércitos asirios entrarán por rutas físicas y nunca aparecerán mágicamente junto a sus objetivos.
6. **Éufrates, Amanus, estribaciones del Tauro, llanura de Alepo y continuación del Orontes** serán geografía fija.
7. **Carquemis será una de las ciudades estratégicamente más importantes del juego** por controlar el cruce del Éufrates.
8. Se incorpora **Halab/Alepo como ciudad fija importante**, sin necesidad de convertirla en nueva facción seleccionable.
9. Sam'al controlará los pasos occidentales hacia Amanus/Cilicia.
10. Melid será el gran centro septentrional ligado al Tauro/alto Éufrates.
11. Las rutas del borde oriental señalarán destinos como `HARRÁN · ASIRIA` aunque esos núcleos puedan permanecer fuera del mapa principal V1.
12. Se introduce el sistema político imperial: independiente / tributario / vasallo / rebelde / provincia.
13. La arquitectura neo-hitita utilizará puertas monumentales, ortostatos y relieves, pero con variantes por estado.
14. El eje `Hamat → Arpad → Alepo → Carquemis → Harrán/Asiria` cerrará la gran carretera norte-oriental del mapa.

---

**Este bloque permanece como PROPUESTA V1 hasta aprobación del usuario.**
