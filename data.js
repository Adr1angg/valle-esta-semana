/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "24 – 30 septiembre 2026",
    start: "2026-09-24", end: "2026-09-30",
    updated: "2026-09-24T13:15:00-06:00",
    updatedText: "jue 24 sep, 13:15",
    next: "jueves 1 oct",
    note: "El sábado es el día: (Mami) Fera toca en El Cuenco a las nueve, y en la mañana cierra la temporada de Esmeraldas bajo la luna, teatro para bebés en Espacio Odisea. Lo demás son los fijos —Na-ha viernes y sábado, el Mercado El 100, el tianguis del domingo, la práctica en la stupa—. De lunes a miércoles sólo están los fijos del Cuenco: su volante de la semana sale en lunes y a la hora de este barrido todavía no existía."
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
    {date:"2026-09-24", dow:"Jueves",    s:"Jue", dn:24, m:"sep"},
    {date:"2026-09-25", dow:"Viernes",   s:"Vie", dn:25, m:"sep"},
    {date:"2026-09-26", dow:"Sábado",    s:"Sáb", dn:26, m:"sep"},
    {date:"2026-09-27", dow:"Domingo",   s:"Dom", dn:27, m:"sep"},
    {date:"2026-09-28", dow:"Lunes",     s:"Lun", dn:28, m:"sep"},
    {date:"2026-09-29", dow:"Martes",    s:"Mar", dn:29, m:"sep"},
    {date:"2026-09-30", dow:"Miércoles", s:"Mié", dn:30, m:"sep"}
  ],

  events: [
    /* ── jueves 24 ── */
    { id:"creciendo0924", date:"2026-09-24", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"esmeraldas0924", date:"2026-09-24", s:660, e:720, time:"11:00", cat:"cultura",
      title:"Esmeraldas bajo la luna", venue:"Espacio Odisea", price:"Entrada libre", repeat:"24, 25 y 26 sep",
      blurb:"Obra unipersonal de Jazmín González Cruz para bebés de seis meses a cuatro años, basada en el Diccionario de mitos de América: leyendas, cantos y sonidos prehispánicos que los niños tocan y exploran. Cupo muy limitado.",
      links:[{l:"Instagram", h:"https://www.instagram.com/p/DdC2177lenS/"}] },

    /* ── viernes 25 ── */
    { id:"esmeraldas0925", date:"2026-09-25", s:660, e:720, time:"11:00", cat:"cultura",
      title:"Esmeraldas bajo la luna", venue:"Espacio Odisea", price:"Entrada libre", repeat:"24, 25 y 26 sep",
      blurb:"Obra unipersonal de Jazmín González Cruz para bebés de seis meses a cuatro años, basada en el Diccionario de mitos de América: leyendas, cantos y sonidos prehispánicos que los niños tocan y exploran. Cupo muy limitado.",
      links:[{l:"Instagram", h:"https://www.instagram.com/p/DdC2177lenS/"}] },

    { id:"naha0925", date:"2026-09-25", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── sábado 26 ── */
    { id:"el100_0926", date:"2026-09-26", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"esmeraldas0926", date:"2026-09-26", s:780, e:840, time:"13:00", cat:"cultura",
      title:"Esmeraldas bajo la luna", venue:"Espacio Odisea", price:"Entrada libre", repeat:"24, 25 y 26 sep",
      blurb:"Última función: la obra de Jazmín González Cruz para bebés de seis meses a cuatro años, con un faldón que se vuelve agua, burbujas e instrumentos. Van acompañados de un adulto; cupo muy limitado.",
      links:[{l:"Instagram", h:"https://www.instagram.com/p/DdC2177lenS/"}] },

    { id:"mamifera0926", date:"2026-09-26", s:1260, e:1560, time:"21:00", cat:"noche", lead:true,
      title:"(Mami) Fera en El Cuenco", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"El Cuenco lo anunció como “un acto nuevo” y el volante promete acid trance, vibras latinas y ritmos groovy. No es noche de house: es la apuesta rara del mes, y la única noche de DJ con nombre en Valle este fin.",
      lineup:["(Mami) Fera"],
      links:[{l:"Instagram", h:"https://www.instagram.com/p/DdmgRYOPp5l/"}] },

    { id:"naha0926", date:"2026-09-26", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"La segunda de las dos noches con música en vivo del restaurante del Santuario, de ocho y media a diez y media.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── domingo 27 ── */
    { id:"brunch0927", date:"2026-09-27", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis0927", date:"2026-09-27", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"", repeat:"cada domingo",
      blurb:"El tianguis grande de la semana toma las calles del centro desde temprano: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo.",
      links:[] },

    { id:"chamma0927", date:"2026-09-27", s:750, e:870, time:"12:30", cat:"bienestar",
      title:"Meditación guiada en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera, no hace falta experiencia previa.",
      links:[{l:"Ligmincha", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    /* ── lunes 28 ── */
    { id:"creciendo0928", date:"2026-09-28", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"tianguisav0928", date:"2026-09-28", s:540, e:960, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"", repeat:"cada lunes",
      blurb:"El tianguis de los lunes en Avándaro: verdura, quesos, flores y puestos de comida, más tranquilo que el del centro.",
      links:[] },

    /* ── martes 29 ── */
    { id:"martinis0929", date:"2026-09-29", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1 en martinis", repeat:"cada martes",
      blurb:"Tres horas de martinis al dos por uno en El Cuenco, su fijo de los martes.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    /* ── miércoles 30 ── */
    { id:"gamenight0930", date:"2026-09-30", s:1110, e:1290, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"Sin cover", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar en El Cuenco, el fijo de los miércoles.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"knocks0925", date:"2026-09-25", time:"21:00", title:"The Knocks",
      venue:"Foro Niebla, Doctores", price:"$850", genre:"house · nu-disco",
      blurb:"El dúo de Nueva York que vive entre house de pista y pop de disco, solos toda la noche en Foro Niebla, de nueve a tres. 18+.",
      link:"https://ra.co/events/2449801" },

    { id:"melchior0925", date:"2026-09-25", time:"23:00", title:"Thomas Melchior + Xwnia Wölf + Rodrigo P",
      venue:"Fünk", price:"$300 – 700", genre:"house · minimal",
      blurb:"Thomas Melchior, uno de los arquitectos del microhouse de los dosmiles, en el sótano de Insurgentes Sur de once a seis. 18+.",
      link:"https://ra.co/events/2520007" },

    { id:"discoexpress0925", date:"2026-09-25", time:"20:00", title:"The Disco Express",
      venue:"Departamento, Álvaro Obregón 154", price:"Sólo en puerta", genre:"disco · house",
      blurb:"El sello de disco londinense cierra su verano en la azotea de Departamento, en la Roma, con Nico Raibak, Hously y Disco Feelings. Boletos sólo en taquilla: llega temprano.",
      link:"https://ra.co/events/2539963" },

    { id:"binh0926", date:"2026-09-26", time:"17:00", title:"Saturday Saturday x Calypso Cvlt: Binh b2b Leo Leal",
      venue:"Sunday Sunday, Tabaqueros 16", price:"Boleto por RA", genre:"house · minimal",
      blurb:"Binh, el berlinés de los sets largos y finos, en b2b con Leo Leal en la terraza del Centro, de cinco a una. El Sunday Sunday del domingo ya está agotado; éste no.",
      link:"https://ra.co/events/2535394" },

    { id:"soul0927", date:"2026-09-27", time:"17:00", title:"Domingo de Soul",
      venue:"Maison Artemisia, Tonalá 23", price:"$150", genre:"soul · funk · R&B",
      blurb:"Soul, funk, R&B viejo y hip hop de la vieja escuela con Dizam, The Bradley Way y Driplomat, más tarot y tatuajes flash. Domingo de cinco a doce en la Roma. 20+.",
      link:"https://ra.co/events/2539986" }
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

  checked: "Barrido del jue 24 sep. El Cuenco (sin volante de agenda semanal todavía; publicó el sábado con (Mami) Fera, martes y miércoles quedan por sus fijos) · Espacio Odisea (Esmeraldas bajo la luna confirmada; la función de cine del viernes 18 no se ha anunciado para esta semana) · El Santuario y Na-ha (sin fecha nueva; siguen los fijos) · Turismo Valle de Bravo (nada después del Grito) · Marina 33 (sólo promo de 2x1 en la carta los jueves) · Cinco Rodavento (brunch de sábado y domingo abierto a todos, sin sunset party) · Altitud 1700 (cerró el miércoles, reabre el jueves) · Mestizo · Monkeys · R27 (sin fechas) · Museo de Arte Popular · Surreal · Fullpass · eticket (sin eventos en Valle) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (buscado con en vivo, este viernes, este sábado, taller, evento, festival y fiesta patronal: sólo anuncios, noticias y excursiones).",

  soon: "Kirtan con Swami Yatidharmananda el 1 oct y satsang el 3 · Fiesta patronal de San Francisco 4 oct · Festival de Vela 9 oct · Gran Fondo Adolfo Lagos, ciclismo, 11 oct · Oktoberfest en Skyline a fin de mes · Triatlón Valle de Bravo 24 oct · Festival de las Almas fin de oct a 2 nov."
};
