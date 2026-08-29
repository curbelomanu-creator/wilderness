# WILDERNESS 6 — BLOQUE 8: EGIPTO / SINAÍ / NILO / MAR ROJO

> Anexo de diseño de `WILDERNESS_6_WORLD_BIBLE.md`.
>
> **Estado:** PROPUESTA MAESTRA V1 PARA REVISIÓN.  
> **No implementar todavía en el motor.** Este bloque amplía Wilderness 6 hacia el suroeste y conecta Filistea con Egipto a través del Sinaí.

---

# 1. Objetivo del bloque

Construir un gran bloque egipcio que permita pasar físicamente desde Canaán hacia África mediante el Sinaí y que añada una de las regiones visualmente más monumentales del juego.

El bloque deberá incluir:

- Península del Sinaí;
- Vía / Camino de Horus entre Egipto y Canaán;
- Monte Sinaí/Horeb como landmark bíblico tradicional;
- Golfo de Suez;
- continuación del Golfo de Aqaba;
- Mar Rojo;
- Delta del Nilo;
- Río Nilo continuo;
- Memphis;
- Heliopolis;
- Tanis;
- Bubastis;
- Sais;
- Hermopolis;
- Abydos;
- Tebas;
- complejos monumentales de Giza, Saqqara y Tebas;
- grandes templos egipcios;
- política fragmentada propia del Tercer Período Intermedio.

Egipto debe sentirse inmediatamente distinto de todos los demás bloques: ciudades de piedra monumental, pilonos, obeliscos, esfinges, templos, estatuas colosales, canales, campos inundables, palmeras, papiros, barcos fluviales y enormes complejos funerarios.

---

# 2. Regla histórica: Egipto no será un reino único al comienzo

Para la fecha base aproximada de Wilderness 6 (734–732 a.C.), Egipto se encuentra en el Tercer Período Intermedio y está políticamente fragmentado.

Por ello se propone:

## 2.1 Macro-cultura EGIPTO

El jugador podrá reconocer una gran macro-cultura egipcia común:

- arquitectura;
- lengua/escritura;
- religión;
- unidades;
- vestimenta;
- monumentos;
- economía del Nilo.

Pero las ciudades no estarán automáticamente bajo un solo faraón.

## 2.2 Centros políticos diferenciados

- **Tanis / Delta oriental** — poder real del nordeste egipcio.
- **Sais / Delta occidental** — poder saíta emergente.
- **Memphis** — gran centro estratégico, administrativo y religioso en la cabeza del Delta.
- **Tebas / Alto Egipto** — enorme centro religioso con fuerte peso sacerdotal y creciente influencia kushita.
- otros centros regionales podrán tener gobernantes locales.

Los controladores exactos de cada ciudad para la fecha inicial se cerrarán en la revisión histórica final.

## 2.3 Kush como potencia meridional externa

Se propone que **Kush/Napata** funcione inicialmente de forma similar a Asiria:

- poder externo al borde sur del mapa;
- influencia creciente sobre Alto Egipto;
- emisarios;
- alianzas;
- tributo;
- campañas;
- posibilidad de entrada de ejércitos kushitas por el corredor del Nilo.

No es necesario construir Napata en este bloque ni convertir Kush inmediatamente en facción seleccionable.

---

# 3. Corrección de rutas: Camino de Horus

La gran ruta egipcia que une el Delta con Canaán se tratará como:

**VÍA DE HORUS / CAMINO DE HORUS**

No debe confundirse con el **Camino del Rey**, que ya existe al este del Jordán y atraviesa Amón, Moab y Edom.

Corredor principal propuesto:

`MEMPHIS / HELIÓPOLIS → BUBASTIS → DELTA ORIENTAL → TJARU/SILE → NORTE DEL SINAÍ → EL-ARISH → RAFAH → GAZA`

La ruta deberá incluir:

- pozos;
- estaciones caravaneras;
- fortalezas/puestos de frontera;
- señales;
- pequeños oasis;
- patrullas;
- caravanas;
- terreno desértico realmente peligroso fuera de la carretera.

Los antiguos fuertes de la ruta podrán aparecer como puestos activos, reutilizados o ruinas según la precisión histórica final del siglo VIII a.C.

---

# 4. Sistema de coordenadas V1

Se mantiene la convención global:

- Jerusalén = `(0,0)`
- X positivo = este
- X negativo = oeste
- Z positivo = norte
- Z negativo = sur
- escala base ≈ **100 unidades por kilómetro geográfico relativo**

Punto de conexión ya aprobado:

- Gaza ≈ `(-7200,-3150)`

## 4.1 Coordenadas maestras preliminares

| Lugar | X | Z | Función | Radio V1 |
|---|---:|---:|---|---:|
| Gaza | -7200 | -3150 | conexión con Filistea | 215 |
| Rafah | -9200 | -5350 | ciudad/fortaleza fronteriza | 95 |
| El-Arish | -13400 | -7050 | oasis/puesto del norte del Sinaí | 85 |
| Tjaru / Sile | -25300 | -8650 | antigua puerta oriental de Egipto / puesto histórico | 95 |
| Tanis | -31600 | -8850 | gran centro real del Delta oriental | 205 |
| Bubastis | -35200 | -13200 | gran ciudad del Delta oriental | 185 |
| Sais | -42200 | -9000 | gran centro del Delta occidental | 190 |
| Heliópolis | -37100 | -18200 | gran ciudad religiosa solar | 180 |
| Memphis | -37650 | -21300 | ciudad monumental / cabeza del Delta | 250 |
| Giza | -38800 | -19800 | complejo monumental de pirámides | — |
| Saqqara | -38200 | -22500 | necrópolis / complejo monumental | — |
| Serabit el-Khadim | -16600 | -30300 | antiguo distrito minero/santuario / ruinas | 60 |
| Monte Sinaí tradicional | -11700 | -35800 | landmark bíblico sagrado | — |
| Hermopolis | -41900 | -44300 | gran centro regional / culto de Thoth | 150 |
| Abydos | -31300 | -62000 | gran centro religioso de Osiris | 145 |
| Tebas | -24400 | -67100 | metrópolis religiosa monumental | 260 |

Las coordenadas son de gameplay y siguen relaciones geográficas aproximadas; podrán ajustarse cuando consolidemos los ocho bloques.

---

# 5. Península del Sinaí

## 5.1 Norte del Sinaí

La franja septentrional será el corredor más transitable entre Egipto y Canaán.

Características:

- dunas;
- planicies áridas;
- pequeñas lagunas/marismas cerca de sectores costeros;
- pozos;
- oasis;
- fortalezas de carretera;
- caravanas;
- rutas militares;
- costa mediterránea continua.

La Vía de Horus debe ser claramente más segura y rápida que internarse en el desierto.

## 5.2 Sinaí central

- mesetas desérticas;
- wadis;
- rutas secundarias;
- escasez de agua;
- campamentos nómadas;
- antiguos puestos/minas.

## 5.3 Sinaí meridional

Debe transformarse en una región de montañas enormes y quebradas estrechas.

Características:

- granito y roca rojiza;
- enormes macizos;
- gargantas;
- oasis pequeños;
- senderos difíciles;
- cielos despejados y sensación de aislamiento.

---

# 6. Monte Sinaí / Horeb

**PROPUESTA DE LANDMARK BÍBLICO ESPECIAL**

El juego incluirá un gran macizo identificado para gameplay como **Monte Sinaí / Horeb**.

Por rigor histórico, el documento dejará explícito que la localización exacta de la montaña bíblica no tiene consenso arqueológico. Para la geografía jugable se utilizará la tradición del Sinaí meridional/Jebel Musa como referencia visual.

No será una ciudad ni un santuario urbano activo.

Diseño:

- montaña enorme visible desde gran distancia;
- ascenso difícil;
- cima rocosa;
- ausencia de ciudad;
- pequeño punto de agua/campamento en el valle;
- posible altar o memorial discreto, sin afirmar reconstrucción arqueológica;
- efectos de luz, tormenta o sonido permitidos para eventos narrativos, sin representación física directa de Dios.

Debe sentirse como un lugar remoto, antiguo y excepcional.

---

# 7. Mar Rojo

**OBLIGATORIO Y PERMANENTE**

El sistema acuático deberá conectar:

- Golfo de Aqaba ya iniciado en el Bloque 5;
- Golfo de Suez;
- Mar Rojo hacia el sur fuera del mapa principal.

La Península del Sinaí quedará físicamente entre ambos golfos.

Gameplay futuro:

- navegación costera limitada;
- pesca;
- puertos menores;
- rutas comerciales hacia el sur;
- conexión potencial con Arabia y África oriental.

No es necesario diseñar todavía todo el Mar Rojo ni sus ciudades meridionales.

---

# 8. Río Nilo y Delta

## 8.1 Nilo

**OBLIGATORIO, CONTINUO Y MONUMENTAL**

El Nilo será uno de los mayores sistemas geográficos del juego.

`borde sur / Kush → TEBAS → ABYDOS → HERMOPOLIS → MEMPHIS → DELTA → MEDITERRÁNEO`

Características:

- cauce muy ancho;
- navegación con barcos fluviales;
- campos agrícolas;
- canales de irrigación;
- papiros;
- palmeras;
- pueblos;
- embarcaderos;
- templos junto al río;
- zonas de inundación fértil.

El desierto debe comenzar de forma relativamente brusca fuera de la franja cultivada.

## 8.2 Delta

No se representará como un solo río ancho.

El Nilo se dividirá en varios grandes brazos simplificados de gameplay antes del Mediterráneo.

El Delta tendrá:

- canales;
- marismas;
- cultivos;
- aldeas;
- ciudades grandes separadas;
- navegación interior;
- carreteras sobre terrenos elevados.

---

# 9. Grandes ciudades recomendadas

## MEMPHIS

**Categoría:** metrópolis monumental / capital histórica de gameplay  
**Radio:** 250

Funciones:

- gran palacio/gobierno;
- templo monumental de Ptah;
- culto de Apis;
- grandes talleres;
- arsenales;
- mercados;
- embarcaderos del Nilo;
- puerta hacia el Delta y Alto Egipto.

Memphis será el candidato recomendado como **capital de selección de la macro-facción egipcia**, aunque el mapa político permanezca fragmentado.

## TEBAS

**Categoría:** metrópolis religiosa monumental  
**Radio:** 260

Debe ser una de las ciudades/regiones urbanas más impresionantes de todo Wilderness.

Elementos:

- gran sector oriental del Nilo;
- complejo de Karnak;
- templo de Luxor;
- avenidas procesionales;
- pilonos gigantes;
- obeliscos;
- estatuas colosales;
- palacios/administración;
- muelles ceremoniales;
- barrios urbanos.

En la ribera occidental:

- necrópolis tebana;
- Valle de los Reyes;
- templos funerarios antiguos;
- Deir el-Bahri;
- colosos monumentales.

Culto dominante: **Amun-Ra**, con Mut y Khonsu.

## HELIÓPOLIS / IUNU

**Categoría:** gran ciudad solar  
**Radio:** 180

- gran templo solar;
- obeliscos;
- sacerdotes;
- espacios ceremoniales;
- culto de Atum-Ra / Ra.

Heliópolis será el principal lugar del juego asociado explícitamente al gran culto solar de Ra.

## TANIS

**Categoría:** gran centro real del Delta oriental  
**Radio:** 205

- gran templo de Amun;
- palacios;
- tumbas reales;
- arquitectura monumental reutilizando bloques antiguos;
- navegación del Delta;
- autoridad política propia.

## BUBASTIS

**Categoría:** gran ciudad del Delta oriental  
**Radio:** 185

- templo monumental de Bastet;
- canales;
- mercados;
- nodo estratégico hacia la Vía de Horus;
- identidad urbana claramente distinta de Tanis.

## SAIS

**Categoría:** gran centro político del Delta occidental  
**Radio:** 190

- poder saíta emergente;
- templo de Neith;
- palacio/gobierno;
- agricultura y navegación del Delta;
- rivalidad política con otros centros egipcios.

## HERMOPOLIS

**Categoría:** gran centro regional del Egipto Medio  
**Radio:** 150

- culto de Thoth;
- escribas;
- templo;
- ciudad del corredor del Nilo;
- centro político regional.

## ABYDOS

**Categoría:** gran ciudad-santuario  
**Radio:** 145

- culto de Osiris;
- templos antiguos;
- necrópolis;
- peregrinos;
- fuerte carácter funerario y sagrado.

---

# 10. Monumentos fijos

## 10.1 Giza

**OBLIGATORIO**

El complejo de Giza será un landmark permanente cercano a Memphis.

Incluir:

- Gran Pirámide;
- pirámides principales del complejo;
- Esfinge;
- templos funerarios/calzadas conservadas de forma estilizada;
- tumbas menores;
- arena invadiendo sectores.

Las pirámides deben sentirse antiguas incluso para los habitantes del siglo VIII a.C.; no se presentarán como construcciones nuevas.

## 10.2 Saqqara

**OBLIGATORIO**

- Pirámide escalonada de Djoser;
- necrópolis;
- tumbas;
- complejos funerarios;
- culto de Apis / zona sacra según el período.

## 10.3 Karnak

**OBLIGATORIO Y MONUMENTAL**

Será probablemente el mayor complejo religioso individual de Wilderness 6.

- enormes pilonos;
- patios;
- columnas gigantes;
- obeliscos;
- estatuas;
- lagos/estanques sagrados;
- recintos secundarios;
- sacerdotes y procesiones.

## 10.4 Tebas occidental

- Valle de los Reyes;
- templos funerarios;
- tumbas excavadas;
- colosos;
- montañas desérticas directamente detrás de la franja fértil.

---

# 11. Religión egipcia

Egipto no tendrá un único dios nacional exclusivo.

Se utilizará un sistema de cultos urbanos principales:

| Ciudad | Culto principal V1 |
|---|---|
| Heliópolis | Atum-Ra / Ra |
| Memphis | Ptah + Apis |
| Tebas | Amun-Ra |
| Tanis | Amun |
| Bubastis | Bastet |
| Sais | Neith |
| Hermopolis | Thoth |
| Abydos | Osiris |

Cultos secundarios ampliamente visibles podrán incluir:

- Isis;
- Hathor;
- Horus;
- Sekhmet;
- Mut;
- Khonsu;
- Anubis;
- Sobek según región.

La mecánica global de conquista/religión seguirá funcionando, pero cambiar el culto oficial de una gran ciudad egipcia deberá tener consecuencias políticas y de lealtad especialmente fuertes debido a la importancia de sus sacerdocios y templos.

---

# 12. Identidad arquitectónica egipcia

Las ciudades egipcias no deben parecer ciudades cananeas con pirámides añadidas.

Características propias:

- pilonos monumentales;
- muros inclinados de templos;
- columnas con capiteles vegetales;
- obeliscos;
- esfinges;
- estatuas colosales;
- patios ceremoniales;
- adobe en viviendas y murallas urbanas donde corresponda;
- piedra monumental reservada para templos, palacios y monumentos;
- calles protegidas;
- canales integrados al urbanismo;
- palmeras, sicómoros y jardines irrigados.

Los barrios residenciales deben seguir siendo limpios y navegables para el jugador, aplicando la regla global de calles protegidas.

---

# 13. Red de rutas

## 13.1 Vía de Horus

`Gaza → Rafah → El-Arish → puestos/pozos del norte del Sinaí → Tjaru/Sile → Delta oriental → Bubastis → Heliópolis / Memphis`

## 13.2 Ruta del Nilo

`Delta → Memphis → Hermopolis → Abydos → Tebas → borde sur / Kush`

Esta ruta se podrá recorrer por carretera y parcialmente por barco.

## 13.3 Ruta del Sinaí meridional

Ruta secundaria de exploración:

`Delta oriental → Wadi Tumilat / desierto → Serabit el-Khadim → macizos del sur → Monte Sinaí tradicional`

No será la principal carretera militar Egipto–Canaán.

## 13.4 Ruta al Mar Rojo

Desde Egipto se abrirán corredores hacia el Golfo de Suez y puertos menores del Mar Rojo, para expansión futura.

---

# 14. Gameplay regional

Egipto permitirá experiencias que no existen en los otros bloques:

- navegación fluvial extensa;
- guerras por brazos/canales del Delta;
- defensa de cruces y puertos del Nilo;
- enormes centros sacerdotales;
- rivalidades entre gobernantes egipcios;
- presión kushita desde el sur;
- presión asiria indirecta desde Canaán/Siria;
- caravanas a través del Sinaí;
- ciudades monumentales que requieren asedios mucho mayores;
- exploración de tumbas, ruinas y complejos antiguos;
- control de cultos y sacerdocios como parte de la estabilidad política.

---

# 15. Decisiones recomendadas para aprobar

1. **Añadir oficialmente Egipto y Sinaí como Bloque 8.**
2. **EGIPTO será macro-cultura y no un reino políticamente unificado** al inicio del juego.
3. **Memphis será la capital de selección recomendada** para la macro-facción egipcia, sin implicar que controle todo Egipto.
4. Ciudades principales: **Memphis, Tebas, Heliópolis, Tanis, Bubastis, Sais, Hermopolis y Abydos**.
5. **Giza y Saqqara** serán complejos monumentales fijos, no ciudades principales.
6. **Tebas** incluirá Karnak, Luxor y la gran necrópolis occidental y será una de las zonas urbanas/religiosas más monumentales del juego.
7. **El Nilo será continuo y navegable**, con Delta ramificado simplificado.
8. **La Vía de Horus** será la gran carretera Egipto–Canaán: Gaza → Rafah → norte del Sinaí → Delta.
9. **El Camino del Rey conserva su identidad transjordana** y no se usará como nombre de la ruta egipcia.
10. **Monte Sinaí/Horeb** se incorporará como landmark bíblico remoto usando Jebel Musa/sur del Sinaí como referencia tradicional, dejando documentada la incertidumbre histórica de su ubicación exacta.
11. **Mar Rojo, Golfo de Suez y continuación del Golfo de Aqaba** serán geografía permanente.
12. Los cultos urbanos principales serán: **Heliópolis/Ra-Atum, Memphis/Ptah, Tebas/Amun-Ra, Tanis/Amun, Bubastis/Bastet, Sais/Neith, Hermopolis/Thoth, Abydos/Osiris**.
13. **Kush será una potencia externa activa desde el sur**, análoga parcialmente a Asiria, sin requerir todavía un bloque completo de Nubia.
14. Se incluirán **Rafah, El-Arish y Tjaru/Sile** como nodos del corredor del Sinaí, con estatus exacto activo/ruina revisado antes de implementación final.
15. Serabit el-Khadim podrá existir como **antigua zona minera/santuario en ruinas**, no como ciudad viva importante del siglo VIII a.C.
16. Los templos egipcios tendrán una escala excepcional y una arquitectura propia; Egipto no reutilizará simplemente los generadores urbanos cananeos.
17. El mapa mantendrá la escala global aproximada y usará streaming/chunks para que la gran distancia Memphis–Tebas no obligue a reducir artificialmente Egipto.

---

**Este bloque permanece como PROPUESTA V1 hasta aprobación del usuario.**
