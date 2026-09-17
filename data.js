/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "17 – 23 septiembre 2026",
    start: "2026-09-17", end: "2026-09-23",
    updated: "2026-09-17T12:30:00-06:00",
    updatedText: "jue 17 sep, 12:30",
    next: "jueves 24 sep",
    note: "Semana de resaca después del Grito, y se nota: lo único con nombre propio es la Noche Mexicana del viernes en El Cuenco, con son jarocho en vivo de Los Acociles. De ahí en adelante son los fijos —Na-ha viernes y sábado, el Mercado El 100, el tianguis del domingo, la práctica en la stupa— más los martes y miércoles del Cuenco. El Cuenco no sacó volante de agenda semanal esta vez, así que si aparece algo para el sábado será en las próximas horas."
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
    {date:"2026-09-17", dow:"Jueves",    s:"Jue", dn:17, m:"sep"},
    {date:"2026-09-18", dow:"Viernes",   s:"Vie", dn:18, m:"sep"},
    {date:"2026-09-19", dow:"Sábado",    s:"Sáb", dn:19, m:"sep"},
    {date:"2026-09-20", dow:"Domingo",   s:"Dom", dn:20, m:"sep"},
    {date:"2026-09-21", dow:"Lunes",     s:"Lun", dn:21, m:"sep"},
    {date:"2026-09-22", dow:"Martes",    s:"Mar", dn:22, m:"sep"},
    {date:"2026-09-23", dow:"Miércoles", s:"Mié", dn:23, m:"sep"}
  ],

  events: [
    /* ── jueves 17 ── */
    { id:"creciendo0917", date:"2026-09-17", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    /* ── viernes 18 ── */
    { id:"mexicana0918", date:"2026-09-18", s:1200, e:1440, time:"20:00", cat:"musica", lead:true,
      title:"Noche Mexicana con Los Acociles", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"Son jarocho en vivo, que en Valle no se oye casi nunca: Los Acociles con jarana y tarima en la barra de Pagaza. El Cuenco lo anunció como la continuación de la fiesta patria, así que cuenta con que se llene temprano.",
      lineup:["Los Acociles"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"naha0918", date:"2026-09-18", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── sábado 19 ── */
    { id:"el100_0919", date:"2026-09-19", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"naha0919", date:"2026-09-19", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"La segunda de las dos noches con música en vivo del restaurante del Santuario, de ocho y media a diez y media.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── domingo 20 ── */
    { id:"brunch0920", date:"2026-09-20", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis0920", date:"2026-09-20", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"", repeat:"cada domingo",
      blurb:"El tianguis grande de la semana toma las calles del centro desde temprano: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo.",
      links:[] },

    { id:"chamma0920", date:"2026-09-20", s:750, e:870, time:"12:30", cat:"bienestar",
      title:"Meditación guiada en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera, no hace falta experiencia previa.",
      links:[{l:"Ligmincha", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    /* ── lunes 21 ── */
    { id:"creciendo0921", date:"2026-09-21", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"tianguisav0921", date:"2026-09-21", s:540, e:960, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"", repeat:"cada lunes",
      blurb:"El tianguis de los lunes en Avándaro: verdura, quesos, flores y puestos de comida, más tranquilo que el del centro.",
      links:[] },

    /* ── martes 22 ── */
    { id:"martinis0922", date:"2026-09-22", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1 en martinis", repeat:"cada martes",
      blurb:"Tres horas de martinis al dos por uno en la barra de Pagaza, el fijo de los martes del Cuenco.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    /* ── miércoles 23 ── */
    { id:"gamenight0923", date:"2026-09-23", s:1110, e:1290, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"Sin cover", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar en el Cuenco, el fijo de los miércoles.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"funk0918", date:"2026-09-18", time:"23:00", title:"Gabbs + Sami Masmoudi + Vane Vepe",
      venue:"Fünk", price:"$300 – 600", genre:"house · minimal",
      blurb:"Noche de casa en el sótano de Insurgentes Sur, de once a seis. House y minimal sin invitado de fuera, que es cuando Fünk suele salir mejor. 18+.",
      link:"https://ra.co/events/2517152" },

    { id:"ratedr0919", date:"2026-09-19", time:"23:00", title:"Rated R: Rebolledo + Cabizbajo + Baby Mango",
      venue:"Fünk", price:"$300 – 700", genre:"house · cosmic",
      blurb:"Rebolledo toca lento y raro —cosmic, italo, house pesado— y es de los pocos selectores mexicanos que sostiene siete horas sin repetirse. De once a seis, 18+.",
      link:"https://ra.co/events/2520307" },

    { id:"yuyu0919", date:"2026-09-19", time:"23:00", title:"PWR takeover con Jen Cardini",
      venue:"YuYu Cine Club", price:"Boleto por RA", genre:"dark disco · indie dance",
      blurb:"Jen Cardini, fundadora de Correspondant, en el cine club de Doctores junto a Mystery Affair. Dark disco, house y cosas con guitarra, de once a cinco. RA lo marcó como Pick.",
      link:"https://ra.co/events/2515938" },

    { id:"sundaysunday0920", date:"2026-09-20", time:"15:00", title:"Sunday Sunday",
      venue:"Sunday Sunday, Tabaqueros 16", price:"Boleto por RA", genre:"house · italo disco",
      blurb:"Jennifer Loveless encabeza la terraza del Centro, con Villaseñor, Danesholme y Las Reinotas. De tres de la tarde a una de la mañana.",
      link:"https://ra.co/events/2539320" }
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

  checked: "Barrido del jue 17 sep, la semana después del Grito. El Cuenco (sí publicó la Noche Mexicana del viernes, pero no sacó volante de agenda semanal; martes y miércoles quedan por sus fijos) · El Santuario y Na-ha (nada con fecha nueva; siguen los fijos de viernes, sábado y el brunch del domingo) · Espacio Odisea (su último post es de horarios del puente; el teatro Esmeraldas bajo la luna es hasta el 24) · Turismo Valle de Bravo y Ayuntamiento (nada después del Grito) · Marina 33 · Altitud 1700 · Mestizo · Monkeys · Cinco Rodavento · Museo de Arte Popular · Rancho Avándaro · Cervecería Nevado · Yoga Sana · Gaspart Studio (la escuela está suspendida por la mudanza a El Rizal) · El Santuario Music · Surreal · Basilico · Fullpass · eticket (sin eventos en Valle) · Ligmincha (su calendario dice 'no events'; la práctica del domingo sigue en pie) · grupo QUE TODO VALLE DE BRAVO SE ENTERE: no se pudo revisar esta semana, Facebook dejó de permitir la búsqueda dentro del grupo sin sesión iniciada.",

  soon: "Esmeraldas bajo la luna, teatro para primeras infancias en Espacio Odisea, 24 y 25 sep 11:00 y 26 sep 13:00, entrada libre · Kirtan con Swami Yatidharmananda el 1 oct y satsang el 3 · Fiesta patronal de San Francisco 4 oct · Festival de Vela 9 oct · Oktoberfest en Skyline a fin de mes · Triatlón Valle de Bravo 24 oct · Festival de las Almas fin de oct a 2 nov."
};
