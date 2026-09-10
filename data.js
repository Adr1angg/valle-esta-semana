/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (lunes→domingo de hoy) y no sale de aqui.        */
window.VS = {
  week: {
    label: "10 – 16 septiembre 2026",
    start: "2026-09-10", end: "2026-09-16",
    updated: "2026-09-10T12:30:00-06:00",
    updatedText: "jue 10 sep, 12:30",
    next: "jueves 17 sep",
    note: "El martes se lleva la semana: el Grito en el Jardín Central cierra con Belinda, gratis. El sábado se encima todo —AvándaRock en Espacio Odisea, Marina Sessions y Roger Cornejo en el Cuenco—, pero el jueves va flaco porque El Cuenco no publicó su volante semanal esta vez. Del desfile del 16 todavía no se publica horario."
  },

  cats: {
    noche:     {label:"Noche",         hue:328, ink:"#fff"},
    musica:    {label:"Música en vivo",hue:268, ink:"#fff"},
    bienestar: {label:"Bienestar",     hue:168, ink:"#fff"},
    mercado:   {label:"Mercado",       hue: 62, ink:"#1a1206"},
    cultura:   {label:"Cultura",       hue: 32, ink:"#fff"},
    aire:      {label:"Aire libre",    hue:205, ink:"#fff"}
  },

  days: [
    {date:"2026-09-10", dow:"Jueves",    s:"Jue", dn:10, m:"sep"},
    {date:"2026-09-11", dow:"Viernes",   s:"Vie", dn:11, m:"sep"},
    {date:"2026-09-12", dow:"Sábado",    s:"Sáb", dn:12, m:"sep"},
    {date:"2026-09-13", dow:"Domingo",   s:"Dom", dn:13, m:"sep"},
    {date:"2026-09-14", dow:"Lunes",     s:"Lun", dn:14, m:"sep"},
    {date:"2026-09-15", dow:"Martes",    s:"Mar", dn:15, m:"sep"},
    {date:"2026-09-16", dow:"Miércoles", s:"Mié", dn:16, m:"sep"}
  ],

  events: [
    /* ── jueves 10 ── */
    { id:"creciendo0910", date:"2026-09-10", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    /* ── viernes 11 ── */
    { id:"cumbia0911", date:"2026-09-11", s:1140, e:1320, time:"19:00 y 20:00", cat:"noche",
      title:"Taller de cumbia de barrio con el Tío", venue:"El Cuenco", price:"$200",
      blurb:"El Tío —actor, stunt y boxeador— da dos tandas de cumbia, a las 7 y a las 8. Incluye una chela y un mezcal; se aparta lugar al 55 3086 5763.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"naha0911", date:"2026-09-11", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── sábado 12 ── */
    { id:"el100_0912", date:"2026-09-12", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"marina0912", date:"2026-09-12", s:780, e:1380, time:"13:00", cat:"noche",
      title:"Marina Sessions 005 · Edición Patria", venue:"Marina 33", price:"Acceso libre",
      blurb:"La quinta Marina Session abre a la una de la tarde en el rooftop de Santa María, con Decke de la O, Johony Pks y Serch BR en cabina.",
      lineup:["Decke de la O","Johony Pks","Serch BR"],
      links:[{l:"Instagram", h:"https://www.instagram.com/marina33terraza/"}] },

    { id:"avandarock0912", date:"2026-09-12", s:1020, e:1380, time:"17:00", cat:"musica",
      title:"AvándaRock 2026 · Festival de Rock y Ruedas", venue:"Espacio Odisea", price:"Entrada libre",
      blurb:"Espacio Odisea celebra los 55 años del Festival de Avándaro con cinco bandas locales, bazar de creadores y comida. Es al aire libre y enfría al caer la tarde: lleva chamarra.",
      lineup:["Odisea Jam","Falso Salvador","Insomnia","Pulgas Negras","La Calle de los Locos"],
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"naha0912", date:"2026-09-12", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"roger0912", date:"2026-09-12", s:1260, e:1560, time:"21:00", cat:"noche",
      title:"Roger Cornejo · vinyl live set", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"Roger Cornejo toca toda la noche en vinil, sin computadora de por medio.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    /* ── domingo 13 ── */
    { id:"brunch0913", date:"2026-09-13", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"El brunch del Santuario frente al lago, abierto a quien no se hospeda. Se reserva.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis0913", date:"2026-09-13", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"", repeat:"cada domingo",
      blurb:"El tianguis grande de la semana toma las calles del centro: fruta, ropa, herramienta y fondas.",
      links:[] },

    { id:"stupa0913", date:"2026-09-13", s:750, e:870, time:"12:30", cat:"bienestar",
      title:"Meditación guiada en Chamma Ling", venue:"Chamma Ling", price:"", repeat:"cada domingo",
      blurb:"Práctica abierta y gratuita al pie de la Gran Stupa Bön, la más grande del hemisferio. No hace falta experiencia.",
      links:[{l:"Ligmincha", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    /* ── lunes 14 ── */
    { id:"creciendo0914", date:"2026-09-14", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"tianguisav0914", date:"2026-09-14", s:480, e:900, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"", repeat:"cada lunes",
      blurb:"El tianguis de los lunes en Avándaro, más chico que el del centro y con más verdura de la zona.",
      links:[] },

    /* ── martes 15 ── */
    { id:"talleres0915", date:"2026-09-15", s:720, e:900, time:"12:00", cat:"cultura",
      title:"Talleres patrios en el Jardín Central", venue:"Jardín Central", price:"Entrada libre",
      blurb:"El Ayuntamiento pone mesas de dibujo, pinta caritas y elaboración de banderitas de papel y moños en el jardín, antes de que empiece la verbena.",
      links:[] },

    { id:"martinis0915", date:"2026-09-15", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1", repeat:"cada martes",
      blurb:"Martinis al 2x1 de seis a nueve, el fijo de los martes del Cuenco.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"cena0915", date:"2026-09-15", s:1140, e:1440, time:"19:00 – 00:00", cat:"cultura",
      title:"Cena Mexicana en El Santuario", venue:"El Santuario, San Gaspar", price:"$1,865 adultos · $750 niños",
      blurb:"Cena de Fiestas Patrias frente al lago, de siete a medianoche. Se reserva al 726 262 3144.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elsantuariovalle/"}] },

    { id:"grito0915", date:"2026-09-15", s:1230, e:1500, time:"20:30 · Grito 22:00 · Belinda 22:30", cat:"cultura", lead:true,
      title:"Grito de Independencia y Belinda en el Jardín Central", venue:"Jardín Central", price:"Entrada libre",
      blurb:"Belinda gratis en el jardín es lo más grande que le va a pasar a Valle este año: Pipo Rodríguez abre a las 20:30, el Grito es a las 22:00, la pirotecnia a las 22:15 y ella sale a las 22:30. En la Villa de Colorines corre su propio programa, con la Sonora Dinamita a las 20:00 y el Grito a las 21:00.",
      links:[{l:"Ayuntamiento", h:"https://www.facebook.com/ayuntamientovdb"}] },

    /* ── miércoles 16 ── */
    { id:"gamenight0916", date:"2026-09-16", s:1110, e:1290, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"Sin cover", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar en el Cuenco, el fijo de los miércoles.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"trommel0911", date:"2026-09-11", time:"23:00", title:"Trommel: Fantastic Man + Yamour + Bastard Love",
      venue:"Fünk", price:"$300 – 600", genre:"house · disco",
      blurb:"Fantastic Man, el australiano de Superconscious, es un selector de disco y house lento — RA lo archivó como progressive house, no le hagas caso. De once a seis.",
      link:"https://ra.co/events/2518128" },

    { id:"despapaye0912", date:"2026-09-12", time:"14:00", title:"Despapaye x Plus Plus Traxx",
      venue:"Medellín 65", price:"$455", genre:"house",
      blurb:"Fiesta de día en la Roma con Louie Fresco a la cabeza de una docena de selectores. Arranca a las dos de la tarde, 21+.",
      link:"https://ra.co/events/2518823" },

    { id:"sundaysunday0913", date:"2026-09-13", time:"15:00", title:"Sunday Sunday",
      venue:"Sunday Sunday, Tabaqueros 16", price:"$400", genre:"house · italo disco",
      blurb:"Gabrielle Kwarteng encabeza la terraza del Centro, con Rubinskee, AURELIA y SAUANI. De tres de la tarde a una de la mañana.",
      link:"https://ra.co/events/2533714" }
  ],

  always: [
    {cat:"aire", title:"Parapente en El Peñón y Divisadero", when:"A diario, según el clima", blurb:"Por lo que Valle es famoso. Vuelos tándem y escuela con Alas del Hombre, Flumen y Skyrides. Septiembre sigue siendo temporada de lluvias: habla antes de subir."},
    {cat:"aire", title:"El lago: kayak, SUP y lancha", when:"A diario · 09:00–19:00", blurb:"Explora Valle y Rio Adventure rentan desde el embarcadero. También velero, wakeboard y esquí."},
    {cat:"aire", title:"Bici de montaña en Monte Alto", when:"Mar cerrado · resto de la semana", blurb:"Living for Bikes renta bici y guía catorce rutas: Las Eses, Los Laberintos, La Torera, Agua Bendita."},
    {cat:"aire", title:"Vela en Avándaro", when:"Fines de semana", blurb:"Navegación de club y clínicas en el Náutico Avándaro y El Zarco. La siguiente regata con nombre es el Festival de Vela del 9 de octubre."},
    {cat:"aire", title:"La Peña y la cascada Velo de Novia", when:"Con luz de día", blurb:"La subida corta y empinada al mirador sobre el lago, y la cascada rumbo a Los Saucos. Rapel guiado si lo quieres con cuerda."},
    {cat:"mercado", title:"Mercado de Artesanías y Plaza Mazahua", when:"A diario · 11:00–19:00", blurb:"Cerámica, vidrio soplado, herrería y textiles en Av. Benito Juárez; a unos pasos, los bordados y tapetes mazahuas."},
    {cat:"mercado", title:"Mercado municipal", when:"A diario · desde las 07:00", blurb:"Cecina vallesana, queso fresco y pan de elmo, con el mostrador de fondas adentro."},
    {cat:"mercado", title:"Callejón del Hambre", when:"A diario · 17:00–23:00", blurb:"Cinco puestos de tacos al lado de la parroquia: pastor, deshebrada, barbacoa y quesadillas."},
    {cat:"cultura", title:"Museo de Arte Popular", when:"Entrada gratuita · recorrido guiado 30–40 min", blurb:"Arte popular mexicano pieza por pieza: barro de Metepec, perritos colimones, textiles. El recorrido guiado se reserva."},
    {cat:"cultura", title:"Centro Regional de Cultura Pagaza", when:"Mar–sáb 10–18 · dom 10–15 · gratis", blurb:"La casa de cultura de Valle, en un edificio del siglo XVII: salas permanentes, exposiciones temporales y talleres abiertos."},
    {cat:"cultura", title:"Espacio Odisea", when:"Lun–vie 10–19 · sáb 12–17", blurb:"Biblioteca comunitaria en Santa María, con ciclo de cine, talleres y un bazar una vez al mes."},
    {cat:"cultura", title:"Centro Ceramista y la ruta del barro", when:"Horario variable", blurb:"Cuarenta años de alta temperatura en Otumba, más las galerías del centro: Zopolite, Venado Azul, Arthouse."},
    {cat:"bienestar", title:"Gran Stupa Bön", when:"A diario · 10:00–17:00", blurb:"Treinta y cuatro metros, el stupa más grande del hemisferio. Se puede entrar cualquier día, no solo el domingo de práctica."},
    {cat:"bienestar", title:"Temazcal con Ma Luisa", when:"Lun y mié 16:30 · sáb 18:00", blurb:"Temazcal tradicional con horario fijo, sin tener que armar grupo. Reserva por teléfono."},
    {cat:"bienestar", title:"Spa de Rodavento", when:"A diario, con cita", blurb:"Circuito de agua y tratamientos en el bosque, camino a Los Saucos. Abierto a quien no se hospeda."},
    {cat:"noche", title:"Mestizo", when:"Desde las 16:00 · +18", blurb:"Rooftop de mezcal en Pagaza 321 con DJ residente todos los fines. Bellakeo, no deep house."},
    {cat:"noche", title:"Marina 33", when:"Jue–dom · desde las 13:00", blurb:"Rooftop con cabina y vista al lago en Santa María. DJ en vivo los fines y promos de jueves a domingo."},
    {cat:"musica", title:"La Mezca", when:"Jue–sáb, hasta las 2", blurb:"Mezcalería en Pagaza 316 que sí programa bandas en vivo, y de vez en cuando noche de stand-up."}
  ],

  checked: "El Cuenco (esta vez no publicó su volante semanal; lo del viernes y el sábado salió en posts sueltos) · Altitud 1700 (Noche Mexicana el sáb 12 y Grito el mar 15, pero no publicó horario de ninguna; se reserva al 722 559 0359) · Monkeys (anunció el puente del 11 y 12 sin horario ni cartel) · Bar 7 (su última clase con fecha fue la del 5 de septiembre) · Mestizo · Cinco Rodavento · Surreal · Basilico · El Santuario Music (solo lanzamientos del sello) · Museo de Arte Popular · Turismo y Cultura Valle de Bravo · La Pila Seca · R27 · Kuun · Doña Barra · eticket (sin eventos en Valle) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (solo el cartel del Grito, que ya confirmó el Ayuntamiento)",

  soon: "Esmeraldas bajo la luna, teatro para primeras infancias en Espacio Odisea, 24 y 25 sep 11:00 y 26 sep 13:00, entrada libre · Kirtan con Swami Yatidharmananda el 1 oct y satsang el 3 · Fiesta patronal de San Francisco 4 oct · Festival de Vela 9 oct · Oktoberfest en Skyline a fin de mes · Triatlón Valle de Bravo 24 oct · Festival de las Almas fin de oct a 2 nov."
};
