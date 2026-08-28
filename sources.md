# Fuentes — Valle Esta Semana

Lista maestra. Ampliada a fondo el **28 ago 2026**: pasó de ser una lista de DJs
a cubrir noche, música, bienestar, mercado, cultura y aire libre.

Marcas: ✅ vivo y confirmado · ⚠️ existe pero flojo o dudoso · ☠️ muerto, no gastes checks.

**Truco que sí funciona para Instagram** (los perfiles cargan pero `get_page_text`
no ve el grid): desde el perfil, con `javascript_tool` —

```js
[...document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')]
  .slice(0,8).map(a=>'X '+((a.querySelector('img')||{}).alt||'').slice(0,220)).join('\n')
```

El `alt` de Instagram **transcribe el texto del volante**, así que en una sola llamada
ves la agenda de la semana sin abrir post por post. Para el caption completo, abre el
post y lee `document.body.innerText.slice(0,900)`. Los `href` a veces vuelven como
"BLOCKED: Base64" — pásalos por `.replace(/[^A-Za-z0-9_\/-]/g,'')` y salen bien.
La API `/api/v1/users/web_profile_info/` **ya no sirve** (400, schema borrado).

---

## TIER 1 — lo que de verdad programa cada semana

| Fuente | Handle | Qué es | Estado |
|---|---|---|---|
| **El Cuenco** | [@elcuencovalle](https://instagram.com/elcuencovalle) · [FB](https://facebook.com/ElCuencoBarraDeEspecialidades/) | Barra de especialidades. **Publica volante de agenda semanal lun–mar** con los cinco días. Fijos: martes de martinis 2x1 18–21, miércoles game night 18:30. Jueves concierto o jam, viernes y sábado DJ sets. También masterclasses (té chino con Nanshan Cha). | ✅ **La mejor fuente del pueblo, con diferencia.** |
| **Espacio Odisea** | [@espacioodiseavb](https://instagram.com/espacioodiseavb) · [espacioodisea.org](https://espacioodisea.org/) | Biblioteca comunitaria en Santa María (Parque Santa María 10). **Ciclo de cine con entrada libre**, talleres, bazar mensual, Feria del Libro. Lun–vie 10–19, sáb 12–17. | ✅ **El hallazgo de agosto 2026.** Cultura de verdad, con fechas. |
| **Turismo y Cultura Valle de Bravo** | [@turismovalledebravo](https://instagram.com/turismovalledebravo) | Cuenta oficial del municipio. Anuncia los festivales del pueblo (Festival del Hongo, Almas, fiestas patronales) con fecha y sede. | ✅ |
| **Marina 33** | [@marina33terraza](https://instagram.com/marina33terraza) | Rooftop en Santa María, jue–dom 13–23. **Jueves Vallesano** semanal y promos jue–dom. | ✅ |
| **Na-ha / El Santuario** | [@elsantuariovalle](https://instagram.com/elsantuariovalle) · [OpenTable](https://www.opentable.com/r/restaurante-naha-valle-de-bravo) | Restaurante del Santuario en San Gaspar. **Música en vivo vie y sáb 20:30–22:30**, brunch dom 8:30–13:00. | ✅ |
| **Mestizo** | [@mestizosaborymezcal](https://instagram.com/mestizosaborymezcal) | Rooftop mezcalería, Pagaza 321, desde las 16:00, +18. DJ residente todos los fines; nunca publica line-up con fecha. Bellakeo. | ✅ como permanente, ⚠️ para eventos |
| **Ligmincha / Chamma Ling** | [ligmincha.org](https://ligmincha.org/center-mexico-valledebravo/) | Gran Stupa Bön (34 m, el más grande del hemisferio). **Práctica guiada domingos 12:30**, terreno abierto a diario 10–17. | ✅ |
| **Surreal Festival** | [@surreal.festival](https://instagram.com/surreal.festival) | Melodic y organic house y techno en Jardín Basilico, Avándaro. Teasing "Edition V — 2026". | ✅ |
| **Festival Bravo GNP** | bravognp.com | Los mejores line-ups que ha tenido la zona. Última edición confirmada nov 2024. @bravognp es liga muerta. | ⚠️ vigilar el sitio |

## TIER 2 — noche y música, red amplia

| Fuente | Handle | Notas |
|---|---|---|
| La Mezca de Valle | FB /lamezca · Pagaza 316 | Mezcalería jue–sáb hasta las 2. **Bandas en vivo y stand-up.** ✅ |
| Cinco Rodavento (RÜF) | [@cincorodavento](https://instagram.com/cincorodavento) | Rooftop de hotel. Sunset parties con DJ, esporádicas. ✅ |
| Altitud 1700 | [@altitud1700](https://instagram.com/altitud1700) | Bistró y gin bar en Plaza Andaro, Avándaro. Sábados de música al atardecer 16–21, no confirmado como semanal. ⚠️ |
| Monkeys Bar | [@monkeysvalle](https://instagram.com/monkeysvalle) | Antro de fin, comercial. Programa los puentes (11 y 12 sep). ✅ |
| R27 Night Club | [@r27nightclub](https://instagram.com/r27nightclub) | Vie y sáb 21–3, Agua Fría, acceso solo RSVP. Publica teasers sin fecha. ⚠️ |
| Doña Barra | [@donabarra.cantina](https://instagram.com/donabarra.cantina) | Cantina y antro tarde. Fotos sin caption. ⚠️ señal baja |
| KUUN | [@kuun_rooftop](https://instagram.com/kuun_rooftop) | 8k seguidores, 0 posts. ⚠️ dormido |
| La Playa | [@laplaya_valledebravo](https://instagram.com/laplaya_valledebravo) | Bar-restaurante a la orilla, familiar. Sin line-ups. ✅ |
| Los Pericos | [@lospericos_valle](https://instagram.com/lospericos_valle) | Restaurante flotante, 50 años. Sin eventos con fecha. ✅ |
| Basilico | [@basilico_valle](https://instagram.com/basilico_valle) | El jardín donde cae Surreal. Cuenta dormida desde 2023. ⚠️ |
| El Santuario Music | [@el_santuario_music](https://instagram.com/el_santuario_music) | Sello y colectivo local; Quadrivium. Sin publicar desde julio 2026. ⚠️ |
| Hotel Puesta del Sol / Terraza 360 | [@hotelpuestadelsol360](https://instagram.com/hotelpuestadelsol360) | Terraza 360° en el centro. Cuenta chica. ⚠️ |
| Cervecería Nevado | [@cerveceria.nevado](https://instagram.com/cerveceria.nevado) | Cervecería artesanal, camino a San Simón. Programa carreras y eventos por ticketera. ⚠️ |
| Skyline Cervecería | Barrio 28, Acatitlán | Cervecería con vista al lago. **Hace el Oktoberfest del pueblo cada finales de octubre.** ⚠️ sin IG confirmado |
| Vinopremier | [@vinopremiervalle](https://instagram.com/vinopremiervalle) | Vinoteca en el centro, catas. ⚠️ |
| Teva Skyroof · Forsyth Brewpub · Efecto · Celtics Pub · La Cocina de 5 · Quirina · Soleado · El Cien | — | Bares y rooftops del centro y Avándaro sin handle confirmado. Pendiente resolverlos con una pasada de Google Maps. ⚠️ |
| FULLPASS | [@fullpassticket](https://instagram.com/fullpassticket) | Ticketera detrás de Surreal; caza eventos electrónicos sueltos. ⚠️ |
| Día Fuera del Tiempo / X-FDR | [xfdr.net](https://xfdr.net) | Promotor de fiestas al aire libre. RSVP por WhatsApp, sin IG. ⚠️ |

## CULTURA

| Fuente | Dónde | Notas |
|---|---|---|
| **Centro Regional de Cultura Joaquín Arcadio Pagaza** | Pagaza 201, Centro · 726 262 4046 | La casa de cultura. Mar–sáb 10–18, dom 10–15, **gratis**. Talleres permanentes (tai-chi, ballet, piano, escritores). Sede principal del Festival de las Almas. |
| **Museo de Arte Popular** | [@museodeartepopular_valle](https://instagram.com/museodeartepopular_valle) · muapovalle.com.mx | **Entrada gratuita.** Publica seguido. |
| Museo Arqueológico | Av. Costera s/n, Santa María | Colección prehispánica de la región. |
| Casa de Artesanías del Estado de México (IIFAEM) | Fray Gregorio Jiménez s/n, Santa María | Jue–dom 10–18. |
| Centro Ceramista · Plaza Mazahua · Mercado de Artesanías | Centro y Otumba | El triángulo artesanal. Plaza Mazahua está a pasos del Mercado de Artesanías. |
| Galerías | Zopolite · Venado Azul (Pagaza 504) · Arthouse (Santa María 125-A) · Victoria (El Salitre 111) · Tatiana H. Rajkov (Plaza Avándaro) | Exposiciones rotativas. |
| Gaspart Studio | [@gaspartstudio](https://instagram.com/gaspartstudio) · Prol. Av. Toluca 438 | Escuela de ebanistería y cerámica, cursos recurrentes niños y adultos. |
| Atelier Pia Seiersen | piaseiersen.com | Talleres permanentes de papel hecho a mano. |
| Cinema Valle | Plaza Valle · cinemavalledebravo.com | La única sala del pueblo. Cartelera semanal. |
| Festival de las Almas | [festivaldelasalmas.com](https://festivaldelasalmas.com/) | XXIV edición, fin de oct a 2 nov. **Fechas 2026 aún sin publicar al 28 ago.** |
| Feria del Libro de Valle de Bravo | Espacio Odisea, Casa Fuensanta, Museo Pagaza | Unos 60 actos. La XI edición fue del 22 al 31 may 2026. |
| Parroquia de San Francisco de Asís · Santuario de Santa María (Cristo Negro) | Centro y Santa María | Fiestas patronales: **4 oct** y **3 may**. |

## BIENESTAR

| Fuente | Dónde | Notas |
|---|---|---|
| Casa Sadhana | Marina Nacional 129 (verificar) | Kirtan y satsang recurrentes. Organizador "Sadhana Now" en Eventbrite y AllEvents. |
| Chamma Ling / Gran Stupa Bön | [ligmincha.org](https://ligmincha.org/center-mexico-valledebravo/) | Domingos 12:30, gratis. Abierto a diario 10–17. |
| Temazcal Ma Luisa | 726 26 96 296 | **Lun y mié 16:30, sáb 18:00.** Horario fijo, raro y útil. |
| Temazcal Ixtlán | [@temazcal_valledebravo](https://instagram.com/temazcal_valledebravo) | Ceremonias de luna llena, esporádicas. Última publicación mar 2026. ⚠️ |
| Spa de Rodavento | [hotelrodavento.com](https://www.hotelrodavento.com/) | Circuito de agua, "spa by night". Abierto a no huéspedes. |
| Vipassana — Dhamma Makaranda | [makaranda.dhamma.org](https://www.dhamma.org/es/schedules/schmakaranda) | San Bartolo Amanalco. Cursos de 3 y 10 días, calendario publicado todo el año, gratis. |
| Canto del Colibrí | [@cantodelco](https://instagram.com/cantodelco) | Centro holístico, Cerro Colorado. |
| Yoga Sana | [@yoga_sana.valledebravo](https://instagram.com/yoga_sana.valledebravo) | Publica horario semanal de clases. |
| Ballet Combat | [@balletcombat](https://instagram.com/balletcombat) | Pilates y barre en el Club de Golf Avándaro. |
| Espacio Estudio Yoga & Pilates · Narayana Yoga | Avándaro y Valle | Estudios locales, horario no publicado. ⚠️ |
| Eleusinia Retreat · Soul Reset · Carmel Maranatha | Bosque arriba de Valle | Retiros de varios días, no eventos sueltos. |
| Osiris Heyerdahl | Basado en El Santuario | Baños de sonido y ceremonias de cacao, anunciados ad hoc. |

## AIRE LIBRE Y DEPORTE

| Fuente | Notas |
|---|---|
| Parapente: [Alas del Hombre](http://www.alas.com.mx/) ([@alasdelhombre](https://instagram.com/alasdelhombre)) · [Flumen](https://www.parapentevalledebravo.com/) ([@flumenparagliding](https://instagram.com/flumenparagliding)) · [Skyrides](https://www.skyrides.mx/) ([@skyrides.mx](https://instagram.com/skyrides.mx)) · ViveValle | Vuelos tándem a diario y escuelas. Despegue en El Peñón. |
| [Club Peñón](https://clubpenon.org/pages/competitions) | El club de pilotos. Vende pases de despegue y organiza el **Club Peñón Open (14–19 dic 2026)** y el Fly-In. |
| [Monarca Paragliding Open](https://monarcaopen.com/) | **10–16 ene 2027**, FAI CAT 2, cupo 130 pilotos. |
| [Club Náutico Avándaro](https://www.clubnauticoavandaro.org/) | Regatas mensuales por clase; Copa Sauter (Semana Santa), Día de la Marina (jun), Oktoberfest (oct), Copa de la Champagne (fin de dic). |
| Club de Vela El Zarco | Copa Zarco en abril; zona de transición del Triatlón. |
| Club Náutico Santa María (Marina Nacional 201) · Club Náutico La Peña | Clubes de vela más chicos. |
| [Explora Valle](https://exploravalle.com/) ([@exploravalle](https://instagram.com/exploravalle)) | Kayak, SUP, lancha, velero, cañonismo. Diario 9–19. |
| [Rio Adventure](https://rioadventure.mx/) ([@rioadventuremx](https://instagram.com/rioadventuremx)) | El operador más completo: agua, bici, escalada, cabalgata, rapel en cascada, parapente. Lun–sáb 10–18. |
| [Living for Bikes](https://www.livingforbikes.com/) ([@livingforbikes](https://instagram.com/livingforbikes)) | Renta de MTB y 14 rutas guiadas. **Martes cerrado.** |
| [Rancho Avándaro Club de Esquí](https://ranchoavandaro.com.mx/clubdeesqui) | Lago de esquí, cable park, SUP, padel. |
| Parque Estatal Monte Alto · La Peña · Cerro Gordo · Velo de Novia | Caminata, camping, enduro, cascada. Monte Alto abre 9–17. |
| Club de Golf Avándaro · Club de Golf Izar | Golf. |
| El Ranchito ([@elranchitodevalle](https://instagram.com/elranchitodevalle)) | Cabalgatas a cascadas y por el pueblo. |
| Santuario Piedra Herrada | Monarca, **temporada de mediados de nov a fines de marzo**, 8–17. Está en Temascaltepec, no en Valle. |
| [asdeporte.com](https://www.asdeporte.com/) | Donde aparecen las carreras con fecha. **Triatlón Valle de Bravo: sáb 24 oct 2026.** |

## MERCADO Y COMIDA

| Fuente | Cuándo |
|---|---|
| Tianguis de Avándaro | Lunes |
| Mercado El 100 (Del Salitre 104, frente al puerto municipal) | Sábados 9–16 |
| Domingo de tianguis, centro | Domingos, desde temprano |
| Mercado municipal | A diario desde las 7 — cecina vallesana, queso, pan de elmo |
| Callejón del Hambre (junto a la parroquia) | A diario 17–23 |
| Callejón de los Esquites (frente a la iglesia) | A diario 10–22 |
| Mercado San Ramón, Avándaro | Fines de semana |
| Panadería San Simón · Benicio Casa de Pan · Almatierra · Pájaro Café · Dosis · Garden de Walo | Panaderías y cafés con público de brunch |
| Ruta de la cecina: La Michoacana · La Herencia · Sucursal del Cielo · El Mesón | A diario |

---

## ☠️ Callejones sin salida — no gastes checks

- **La Pila Seca** — [@la_pila_seca_](https://instagram.com/la_pila_seca_) no publica desde **2021**. El antro existe; la cuenta está muerta.
- **Bandsintown "Valle de Bravo"** — la página entera es Toluca y Metepec (Teatro Morelos, Foro Lando, Estadio Toluca 80, Parque Skate Sauces). **Fuente inservible.**
- **Eventbrite y AllEvents** — mismo problema de Toluca, más eventos de Michoacán y Luvianos etiquetados como Valle. AllEvents sí trae los kirtan de Casa Sadhana; todo lo demás hay que verificar.
- **Resident Advisor** — un solo evento indexado de Valle en toda su historia. Solo sirve para CDMX.
- **The Weekend** — cerrado permanentemente.
- **@bravognp** — liga muerta.
- **@exs.bar** — cuenta vacía; el venue "EXS Bar" no existe en ninguna fuente.
- **Corazón de Quetzal** — el lugar es real (Santa María Ahuacatlán 117) pero @corazondequetzal es una cuenta personal ajena. Usa la [página de Facebook](https://facebook.com/people/Coraz%C3%B3n-de-Quetzal/100064132178520/).
- **@barcentral.oficial** — bar brasileño, no es Valle.
- **Sivana Spa** — cerrado permanentemente.
- **Festival Internacional de Cine Avándaro–Valle de Bravo** — única edición 2019, difunto.
- **fmvela.com** — dominio secuestrado, redirige a otro sitio.
- **valledebravo.gob.mx e imcufide** — cargan pero no publican agenda cultural. Cultura: 726-262-8064.
- **Búsqueda de posts en Facebook** — puro ruido de anuncios. Los grupos grandes ("Que Todo Valle de Bravo se Entere", 95k; "El trueque", 107k) son de compraventa, no de eventos. La búsqueda de **eventos** de Facebook sí sirve, pero devuelve sobre todo excursiones que salen desde CDMX.

---

## Calendario anual — para `soon`

| Mes | Qué |
|---|---|
| ene | Monarca Paragliding Open (10–16 ene 2027) |
| feb | El Peñón Classic Race |
| mar | Festival Bravo · Festival de Música y Ecología · Maratón K42 |
| abr | Copa Zarco (vela) · Copa Sauter en Semana Santa |
| 3 may | Feria de Santa María en honor al Cristo Negro |
| may | Feria del Libro de Valle de Bravo · Spartan Race |
| jun | Día de la Marina, regata |
| jul–ago | Festival del Hongo (la 5.ª edición fue 7–9 ago 2026, Jardín Central) |
| 15–16 sep | Grito y verbena en la plaza · desfile cívico |
| 4 oct | Fiesta patronal de San Francisco de Asís |
| oct | Festival de Vela (9 oct) · Oktoberfest en Skyline y regata Oktoberfest · Triatlón (24 oct) |
| fin oct–2 nov | Festival Internacional de las Almas · Desfile de las Almas |
| nov | Campeonato Metropolitano de Enduro, Cerro Gordo · abre Piedra Herrada |
| dic | Club Peñón Open (14–19 dic) · Copa de la Champagne |

---

## Ciudad de México

**Primaria:** [ra.co/events/mx/mexicocity](https://ra.co/events/mx/mexicocity) — consultar **un día a la vez** con `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`; la vista por defecto colapsa a un día y esconde sábado y domingo en silencio.

**Venues que hay que checar directo, anuncian antes que RA:**

- **Fünk** (Insurgentes Sur 377, Hipódromo) — la sala de house.
- **Sunday Sunday** (Tabaqueros 16, Centro) — rooftop, 15:00–01:00. El mejor booker de disco y boogie de la ciudad.
- **YuYu Cine Club** — [@yuyucineclub](https://instagram.com/yuyucineclub), Doctores.
- **Versalles 64**, **Bar Oriente**, **Tonal**, **CHICO** — secundarios.

**También:** MUTEK MX y anuncios de Boiler Room y Ceremonia para lo grande que pase por ahí.
