/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "1 – 7 octubre 2026",
    start: "2026-10-01", end: "2026-10-07",
    updated: "2026-10-01T12:30:00-06:00",
    updatedText: "jue 1 oct, 12:30",
    next: "jueves 8 oct",
    note: "El Cuenco festeja el primer aniversario de Colección de Mezcales, su speakeasy del segundo piso, con tres noches desde las seis —jueves de acordeón, viernes con DJ Pesto, sábado de vinilos con DJ Nat—. El sábado a las cuatro Marina 33 pone deep house al atardecer. El viernes también hay karaoke en El Cuenco, pero el volante no dice hora, así que no lo listamos; y el domingo 4 es la fiesta patronal de San Francisco de Asís, sin programa publicado todavía. De lunes a miércoles sólo están los fijos: el volante de la semana de El Cuenco sale en lunes y a la hora de este barrido no existía."
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
    {date:"2026-10-01", dow:"Jueves", s:"Jue", dn:1, m:"oct"},
    {date:"2026-10-02", dow:"Viernes", s:"Vie", dn:2, m:"oct"},
    {date:"2026-10-03", dow:"Sábado", s:"Sáb", dn:3, m:"oct"},
    {date:"2026-10-04", dow:"Domingo", s:"Dom", dn:4, m:"oct"},
    {date:"2026-10-05", dow:"Lunes", s:"Lun", dn:5, m:"oct"},
    {date:"2026-10-06", dow:"Martes", s:"Mar", dn:6, m:"oct"},
    {date:"2026-10-07", dow:"Miércoles", s:"Mié", dn:7, m:"oct"}
  ],

  events: [
    /* ── jueves 1 ── */
    { id:"creciendo1001", date:"2026-10-01", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"ivyjero1001", date:"2026-10-01", s:1080, e:1200, time:"18:00", cat:"musica",
      title:"Ivy Talamás y Jero Zoe en Colección de Mezcales", venue:"El Cuenco", price:"Mezcal artesanal clásico $100",
      blurb:"Concierto íntimo con acordeón en el speakeasy del segundo piso de El Cuenco, para abrir los tres días del primer aniversario de Colección de Mezcales.",
      lineup:["Ivy Talamás","Jero Zoe"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/Dd359EaxUnl/"}] },

    { id:"mexper1001", date:"2026-10-01", s:1140, e:1260, time:"19:00", cat:"noche",
      title:"México vs Perú en Marina 33", venue:"Marina 33", price:"Botana con botella; quemaditas 2x1",
      blurb:"El partido en la terraza de Santa María: con cualquier botella la botana va por la casa (nachos con arrachera o papas a la francesa) y las quemaditas con ron Bacardí van al dos por uno durante el juego.",
      links:[{l:"Instagram", h:"https://www.instagram.com/marina33terraza/p/Dd6wQDJgEhO/"}] },

    /* ── viernes 2 ── */
    { id:"pesto1002", date:"2026-10-02", s:1080, e:1380, time:"18:00", cat:"noche",
      title:"DJ Pesto en Colección de Mezcales", venue:"El Cuenco", price:"Mezcal artesanal clásico $100",
      blurb:"Segunda noche del aniversario del speakeasy de El Cuenco, con DJ Pesto en el segundo piso y mezcal artesanal clásico a cien pesos.",
      lineup:["DJ Pesto"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/Dd40LSsROu0/"}] },

    { id:"naha1002", date:"2026-10-02", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── sábado 3 ── */
    { id:"el100_1003", date:"2026-10-03", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"djezmo1003", date:"2026-10-03", s:960, e:1260, time:"16:00", cat:"noche", lead:true,
      title:"DJezmo + Erick R4ndom en Marina 33", venue:"Marina 33", price:"",
      blurb:"Deep house y deep tech minimal desde las cuatro, con el sol bajando sobre el lago: la mejor excusa del fin de semana para subir a la terraza antes de que oscurezca. Dos DJs, una sola cabina.",
      lineup:["DJezmo","Erick R4ndom"],
      links:[{l:"Instagram", h:"https://www.instagram.com/marina33terraza/p/Dd9SjqBjeZs/"}] },

    { id:"djnat1003", date:"2026-10-03", s:1080, e:1380, time:"18:00", cat:"noche",
      title:"DJ Nat · Vinyl Night en Colección de Mezcales", venue:"El Cuenco", price:"Mezcal artesanal clásico $100",
      blurb:"Cierre del aniversario del speakeasy de El Cuenco: noche de vinilos con DJ Nat en el segundo piso.",
      lineup:["DJ Nat"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/Dd40LSsROu0/"}] },

    { id:"naha1003", date:"2026-10-03", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"La segunda de las dos noches con música en vivo del restaurante del Santuario, de ocho y media a diez y media.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    /* ── domingo 4 ── */
    { id:"brunch1004", date:"2026-10-04", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis1004", date:"2026-10-04", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"", repeat:"cada domingo",
      blurb:"El tianguis grande de la semana toma las calles del centro desde temprano: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo.",
      links:[] },

    { id:"chamma1004", date:"2026-10-04", s:750, e:870, time:"12:30", cat:"bienestar",
      title:"Meditación guiada en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera, no hace falta experiencia previa.",
      links:[{l:"Ligmincha", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    /* ── lunes 5 ── */
    { id:"creciendo1005", date:"2026-10-05", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María: juegos y ejercicios para reforzar el vínculo entre madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"tianguisav1005", date:"2026-10-05", s:540, e:960, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"", repeat:"cada lunes",
      blurb:"El tianguis de los lunes en Avándaro: verdura, quesos, flores y puestos de comida, más tranquilo que el del centro.",
      links:[] },

    /* ── martes 6 ── */
    { id:"martinis1006", date:"2026-10-06", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1 en martinis", repeat:"cada martes",
      blurb:"Tres horas de martinis al dos por uno en El Cuenco, su fijo de los martes.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    /* ── miércoles 7 ── */
    { id:"gamenight1007", date:"2026-10-07", s:1110, e:1290, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"Sin cover", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar en El Cuenco, el fijo de los miércoles.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"hercules1002", date:"2026-10-02", time:"23:00", title:"Hercules & Love Affair x Donna & [sic]",
      venue:"Nuevo León 89, Condesa", price:"Boleto por RA", genre:"disco · house",
      blurb:"El proyecto de Andy Butler, autor de “Blind”, en un club de la Condesa de once a seis: disco y house con filo oscuro. 18+ por confirmar en la puerta.",
      link:"https://ra.co/events/2543716" },

    { id:"sunday1004", date:"2026-10-04", time:"15:00", title:"Sunday Sunday: Fernanda Arrau, Soul Of Hex y Rafatel",
      venue:"Sunday Sunday, Tabaqueros 16", price:"Boleto por RA", genre:"house · italo disco",
      blurb:"La terraza dominguera del Centro, de tres de la tarde a una de la mañana, con Fernanda Arrau, Soul Of Hex y Rafatel en cabina.",
      link:"https://ra.co/events/2550024" },

    { id:"daat1004", date:"2026-10-04", time:"13:00", title:"DAAT 001: Satoshi Tomiie & Friends",
      venue:"Sede por confirmar", price:"Boleto por RA", genre:"house · tech house",
      blurb:"Fiesta de día con el veterano Satoshi Tomiie, Jo Sep, Xwnia Wölf y Mejia b2b Louie Fresco, de una de la tarde a medianoche. La ubicación sólo se manda por correo a quien compra boleto.",
      link:"https://ra.co/events/2540269" }
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

  checked: "Barrido del jue 1 oct. El Cuenco (aniversario de Colección de Mezcales, jue a sáb; karaoke el viernes sin hora publicada; sin volante semanal todavía, lunes a miércoles quedan por sus fijos) · Espacio Odisea (sólo ludoteca y Creciendo Juntos; las funciones de Esmeraldas bajo la luna del 25 y 26 sep se cancelaron) · Marina 33 (México vs Perú y DJezmo + Erick R4ndom) · El Santuario y Na-ha (sin fecha nueva; sigue la lectura de oráculo como experiencia para huéspedes) · Turismo Valle de Bravo (módulos de información; todavía sin programa de la fiesta patronal del 4 oct) · Casa Sadhana (el kirtan del 1 oct y el satsang del 3 no se pudieron confirmar con hora) · Mestizo · Monkeys · R27 (sin fechas) · eticket (sin eventos en Valle) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (buscado con en vivo: sólo noticias, anuncios y bienes raíces) · fmv.mx y tritour.org (tritour sigue pidiendo cuenta; no revisados esta semana).",

  soon: "Fiesta patronal de San Francisco de Asís 4 oct · Festival de Vela 9 oct · Gran Fondo Adolfo Lagos, ciclismo, 11 oct · Oktoberfest en Skyline a fin de mes · Triatlón Valle de Bravo 24 oct · Festival de las Almas fin de oct a 2 nov."
};
