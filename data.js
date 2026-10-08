/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "8 – 14 octubre 2026",
    start: "2026-10-08", end: "2026-10-14",
    updated: "2026-10-08T12:30:00-06:00",
    updatedText: "jue 8 oct, 12:30",
    next: "jueves 15 oct",
    note: "El Cuenco abre la semana con Gabriel en vivo y Danilø en cabina el jueves, y el viernes trae Noche de Salsa en vivo con Vladimir. El sábado toca DJ Mar con deep y organic house, pero el volante no dice hora, así que no lo listamos como evento: pregunta antes de subir. Na-ha sigue con música en vivo viernes y sábado, y el domingo es de tianguis, brunch y práctica en la Gran Stupa. De lunes a miércoles sólo están los fijos: el volante de la semana de El Cuenco sale en lunes y a la hora de este barrido no existía."
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
    {date:"2026-10-08", dow:"Jueves", s:"Jue", dn:8, m:"oct"},
    {date:"2026-10-09", dow:"Viernes", s:"Vie", dn:9, m:"oct"},
    {date:"2026-10-10", dow:"Sábado", s:"Sáb", dn:10, m:"oct"},
    {date:"2026-10-11", dow:"Domingo", s:"Dom", dn:11, m:"oct"},
    {date:"2026-10-12", dow:"Lunes", s:"Lun", dn:12, m:"oct"},
    {date:"2026-10-13", dow:"Martes", s:"Mar", dn:13, m:"oct"},
    {date:"2026-10-14", dow:"Miércoles", s:"Mié", dn:14, m:"oct"}
  ],

  events: [
    /* ── jueves 8 ── */
    { id:"creciendo1008", date:"2026-10-08", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"gabriel1008", date:"2026-10-08", s:1230, e:1320, time:"20:30", cat:"musica",
      title:"Gabriel en vivo", venue:"El Cuenco", price:"",
      blurb:"Canciones originales y covers en español e inglés, entre canción de autor y reinterpretaciones de varios géneros, para abrir la semana de El Cuenco.",
      lineup:["Gabriel"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/DePhseBvSLj/"}] },

    { id:"danilo1008", date:"2026-10-08", s:1320, e:1500, time:"22:00", cat:"noche",
      title:"Danilø · DJ set open format", venue:"El Cuenco", price:"",
      blurb:"Después del live de Gabriel, Danilø toma la noche con un set open format que se mueve entre géneros para llevarla de escuchar a bailar.",
      lineup:["Danilø"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/DeKK_oUxeRD/"}] },

    /* ── viernes 9 ── */
    { id:"salsa1009", date:"2026-10-09", s:1200, e:1380, time:"20:00", cat:"musica", lead:true,
      title:"Noche de Salsa en vivo con Vladimir", venue:"El Cuenco", price:"",
      blurb:"La apuesta bailable del fin de semana: salsa en vivo con Vladimir desde las ocho, en un Cuenco lleno de luces cálidas. Aquí no hay deep house; es para mover los pies con banda.",
      lineup:["Vladimir"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/DePhseBvSLj/"}] },

    { id:"naha1009", date:"2026-10-09", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── sábado 10 ── */
    { id:"el100_1010", date:"2026-10-10", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"naha1010", date:"2026-10-10", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"La segunda de las dos noches con música en vivo del restaurante del Santuario, de ocho y media a diez y media.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── domingo 11 ── */
    { id:"brunch1011", date:"2026-10-11", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis1011", date:"2026-10-11", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"", repeat:"cada domingo",
      blurb:"El tianguis grande de la semana toma las calles del centro desde temprano: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo.",
      links:[] },

    { id:"chamma1011", date:"2026-10-11", s:750, e:870, time:"12:30", cat:"bienestar",
      title:"Meditación guiada en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera, no hace falta experiencia previa.",
      links:[{l:"Ligmincha", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    /* ── lunes 12 ── */
    { id:"creciendo1012", date:"2026-10-12", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"tianguisav1012", date:"2026-10-12", s:540, e:960, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"", repeat:"cada lunes",
      blurb:"El tianguis de los lunes en Avándaro: verdura, quesos, flores y puestos de comida, más tranquilo que el del centro.",
      links:[] },

    /* ── martes 13 ── */
    { id:"martinis1013", date:"2026-10-13", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1 en martinis", repeat:"cada martes",
      blurb:"Tres horas de martinis al dos por uno en El Cuenco, su fijo de los martes.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    /* ── miércoles 14 ── */
    { id:"gamenight1014", date:"2026-10-14", s:1110, e:1290, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"Sin cover", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar en El Cuenco, el fijo de los miércoles.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"funk1010", date:"2026-10-10", time:"23:00", title:"Matias Aguayo + Thomass Jackson + EVNR",
      venue:"Fünk, Insurgentes Sur 377", price:"$300–600 · 18+", genre:"house",
      blurb:"El chileno-alemán Matias Aguayo, del sello Cómeme, en la sala de house de la Hipódromo, de once a seis de la mañana, con Thomass Jackson y EVNR.",
      link:"https://ra.co/events/2544210" },

    { id:"sunday1011", date:"2026-10-11", time:"15:00", title:"Sunday Sunday: Busy P + Breakbot + Irfane",
      venue:"Sunday Sunday, Tabaqueros 16", price:"Boleto por RA", genre:"house · italo disco",
      blurb:"La terraza dominguera del Centro, de tres de la tarde a una de la mañana, con Busy P y Breakbot en cabina, más Salah Rezzak y Vithz: French house y disco en domingo.",
      link:"https://ra.co/events/2557162" }
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

  checked: "Barrido del jue 8 oct. El Cuenco (volante semanal de hoy: Gabriel y Danilø el jueves, salsa el viernes; DJ Mar el sábado sin hora publicada, por eso no está listado; karaoke sin día claro; lunes a miércoles quedan por sus fijos) · Marina 33 (jueves de toda la carta al 2x1, sin DJ ni evento publicado para el fin) · Espacio Odisea (última publicación del 29 sep, ludoteca; sin ciclo de cine nuevo) · Turismo Valle de Bravo (sólo promoción de hoteles para el triatlón; sin programa nuevo) · El Santuario Music · Cinco Rodavento · Mestizo · Monkeys · R27 (sin fechas de esta semana) · Surreal (sin anuncio nuevo) · Club Náutico Avándaro (calendario: sólo el Oktoberfest del 17 y 18) · eticket (sin eventos en Valle) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (buscado con en vivo: puras noticias y anuncios) · Casa Sadhana, fmv.mx y tritour.org (no revisados esta corrida).",

  soon: "Oktoberfest · 70 aniversario del Club Náutico Avándaro 17 y 18 oct · Triatlón Valle de Bravo 24 oct · Oktoberfest en Skyline a fin de mes · Festival de las Almas fin de oct a 2 nov."
};
