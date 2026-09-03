/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   Desde el 3 sep 2026 la semana corre jueves→miercoles: el jueves que se
   publica es el primer dia, para que no salgan dias ya muertos arriba.     */
window.VS = {
  week: {
    label: "3 – 9 septiembre 2026",
    start: "2026-09-03", end: "2026-09-09",
    updated: "2026-09-03T13:40:00-06:00",
    updatedText: "jue 3 sep, 13:40",
    next: "jueves 10 sep",
    note: "Primera semana que corre de jueves a miércoles, para que la página abra siempre en un día que todavía no pasa. El fin viene cargado: swing en vivo hoy, karaoke el viernes, y el sábado se encima todo — mercado, té, clase de baile y la noche electrónica del Cuenco. De lunes a miércoles solo está lo de cada semana; El Cuenco publica su volante los lunes, así que esos días se llenarán en la edición del jueves 10."
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
    {date:"2026-09-03", dow:"Jueves",    s:"Jue", dn: 3, m:"sep"},
    {date:"2026-09-04", dow:"Viernes",   s:"Vie", dn: 4, m:"sep"},
    {date:"2026-09-05", dow:"Sábado",    s:"Sáb", dn: 5, m:"sep"},
    {date:"2026-09-06", dow:"Domingo",   s:"Dom", dn: 6, m:"sep"},
    {date:"2026-09-07", dow:"Lunes",     s:"Lun", dn: 7, m:"sep"},
    {date:"2026-09-08", dow:"Martes",    s:"Mar", dn: 8, m:"sep"},
    {date:"2026-09-09", dow:"Miércoles", s:"Mié", dn: 9, m:"sep"}
  ],

  events: [
    { id:"sultanes0903", date:"2026-09-03", s:1260, e:1440, time:"21:00", cat:"musica",
      title:"Los Sultanes del Swing", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"Banda de covers de los cincuenta, sesenta y setenta: Queen, Beatles, Pink Floyd, Led Zeppelin, y lo que pida el público.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"techino0904", date:"2026-09-04", s:1020, e:1170, time:"17:00", cat:"cultura",
      title:"Degustación de té chino con Awei", venue:"El Cuenco", price:"$800",
      blurb:"Awei, de Nanshan Cha, guía una cata de varios estilos de té chino: aromas, sabores y formas de preparación. No hace falta experiencia previa; se reserva al 55 4503 6762.",
      links:[{l:"Instagram", h:"https://www.instagram.com/nanshancha/"}] },

    { id:"karaoke0904", date:"2026-09-04", s:1140, e:1380, time:"19:00", cat:"noche",
      title:"Karaoke con Cristiane Bernal", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"Cristiane Bernal conduce la noche de karaoke del Cuenco, para cantar las que sí te sabes y también las que no.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"naha0904", date:"2026-09-04", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"el100_0905", date:"2026-09-05", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"techino0905", date:"2026-09-05", s:660, e:810, time:"11:00", cat:"cultura",
      title:"Degustación de té chino con Awei · sesión 2", venue:"El Sauna, Acatitlán", price:"$900",
      blurb:"La segunda sesión de la cata de Nanshan Cha, de mañana y en Acatitlán. Esta incluye dos horas de sauna además de la degustación.",
      links:[{l:"Instagram", h:"https://www.instagram.com/nanshancha/"}] },

    { id:"salsabar7_0905", date:"2026-09-05", s:1080, e:1260, time:"Salsa 18:00 · Bachata 19:00", cat:"noche",
      title:"Clases gratis de salsa y bachata", venue:"Bar 7", price:"Gratis",
      blurb:"Bar 7 abrió este año en Durango 101, tercer piso, y estrena noche de baile con el maestro Ale Pérez: salsa a las seis, bachata a las siete. Cupo limitado, se aparta por WhatsApp al 722 885 8454.",
      links:[{l:"Instagram", h:"https://www.instagram.com/_bar7.oficial_2026/"}] },

    { id:"freestyle0905", date:"2026-09-05", s:1200, e:1560, time:"20:00", cat:"noche", lead:true,
      title:"Freestyle Electronic Night", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"La única noche de Valle esta semana pensada de principio a fin para bailar. Live sets de El Niño Ruso y Yohui desde las ocho, y el Cuenco avisa de qué va: bass, techno, psytrance y freestyle. O sea que no es la noche de house de siempre — si vas, vas a eso.",
      lineup:["El Niño Ruso","Yohui"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"},
             {l:"Agendar", h:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=Freestyle%20Electronic%20Night&dates=20260906T020000Z/20260906T080000Z&location=El%20Cuenco%2C%20Valle%20de%20Bravo&ctz=America/Mexico_City"}] },

    { id:"naha0905", date:"2026-09-05", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"Segunda noche de música en vivo del fin en el restaurante del Santuario, en San Gaspar.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"brunchnaha0906", date:"2026-09-06", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch largo frente al lago en San Gaspar, el domingo entero hasta la una.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis0906", date:"2026-09-06", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"Gratis", repeat:"cada domingo",
      blurb:"Día de plaza. El tianguis llena el centro — fruta, ropa, ferretería y la mejor comida de calle de la semana.",
      links:[] },

    { id:"medi0906", date:"2026-09-06", s:750, e:840, time:"12:30", cat:"bienestar",
      title:"Meditación en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada por los lamas residentes, en la tradición bön, a los pies del Gran Stupa. El terreno solo ya vale el viaje.",
      links:[{l:"Info", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    { id:"avandaro0907", date:"2026-09-07", s:600, e:900, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"Gratis", repeat:"cada lunes",
      blurb:"El mercado tradicional de Avándaro, con comida típica y puestos de siempre.",
      links:[] },

    { id:"martinis0908", date:"2026-09-08", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1", repeat:"cada martes",
      blurb:"Dos por uno en martinis de seis a nueve. La única razón real para salir un martes en Valle.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"gamenight0909", date:"2026-09-09", s:1110, e:1320, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar. Sin DJ, sin cover, entre semana.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"barnhus", date:"2026-09-04", time:"23:00", title:"Studio Barnhus", venue:"Fünk", price:"$300 – 850",
      genre:"house",
      blurb:"Axel Boman, Kornél Kovács y Pedrodollar traen el sello sueco completo a Insurgentes, con Jawar abriendo. Lo mejor del fin si te vas a quedar en la ciudad.",
      link:"https://ra.co/events/2510686" },
    { id:"franzscala", date:"2026-09-05", time:"23:00", title:"Franz Scala + Katana + Mohnjaus", venue:"Fünk", price:"$300 – 600",
      genre:"italo disco · house",
      blurb:"El italiano de Slow Motion Records, en su terreno: italo, cosmic y house lento.",
      link:"https://ra.co/events/2518165" },
    { id:"sundaysunday0906", date:"2026-09-06", time:"15:00", title:"Sunday Sunday", venue:"Sunday Sunday, Tabaqueros 16", price:"",
      genre:"house · italo disco",
      blurb:"La terraza del Centro que lleva once años abriendo cada domingo desde las tres. Fina, Vanilla Storm, allangrank, Damian Braun y Moms.",
      link:"https://ra.co/events/2527863" }
  ],

  always: [
    {cat:"aire",    title:"Parapente en El Peñón y Divisadero", when:"A diario, según el clima",
     blurb:"Por lo que Valle es famoso. Vuelos tándem y escuela con Alas del Hombre, Flumen y Skyrides. Septiembre sigue siendo temporada de lluvias: habla antes de subir."},
    {cat:"aire",    title:"El lago: kayak, SUP y lancha", when:"A diario · 09:00–19:00",
     blurb:"Explora Valle y Rio Adventure rentan desde el embarcadero. También velero, wakeboard y esquí."},
    {cat:"aire",    title:"Bici de montaña en Monte Alto", when:"Mar cerrado · resto de la semana",
     blurb:"Living for Bikes renta bici y guía catorce rutas: Las Eses, Los Laberintos, La Torera, Agua Bendita."},
    {cat:"aire",    title:"Vela en Avándaro", when:"Fines de semana",
     blurb:"Navegación de club y clínicas en el Náutico Avándaro y El Zarco. La siguiente regata con nombre es el Festival de Vela del 9 de octubre."},
    {cat:"aire",    title:"La Peña y la cascada Velo de Novia", when:"Con luz de día",
     blurb:"La subida corta y empinada al mirador sobre el lago, y la cascada rumbo a Los Saucos. Rapel guiado si lo quieres con cuerda."},

    {cat:"mercado", title:"Mercado de Artesanías y Plaza Mazahua", when:"A diario · 11:00–19:00",
     blurb:"Cerámica, vidrio soplado, herrería y textiles en Av. Benito Juárez; a unos pasos, los bordados y tapetes mazahuas."},
    {cat:"mercado", title:"Mercado municipal", when:"A diario · desde las 07:00",
     blurb:"Cecina vallesana, queso fresco y pan de elmo, con el mostrador de fondas adentro."},
    {cat:"mercado", title:"Callejón del Hambre", when:"A diario · 17:00–23:00",
     blurb:"Cinco puestos de tacos al lado de la parroquia: pastor, deshebrada, barbacoa y quesadillas."},

    {cat:"cultura", title:"Museo de Arte Popular", when:"Entrada gratuita · recorrido guiado 30–40 min",
     blurb:"Arte popular mexicano pieza por pieza: barro de Metepec, perritos colimones, textiles. El recorrido guiado se reserva."},
    {cat:"cultura", title:"Centro Regional de Cultura Pagaza", when:"Mar–sáb 10–18 · dom 10–15 · gratis",
     blurb:"La casa de cultura de Valle, en un edificio del siglo XVII: salas permanentes, exposiciones temporales y talleres abiertos."},
    {cat:"cultura", title:"Espacio Odisea", when:"Lun–vie 10–19 · sáb 12–17",
     blurb:"Biblioteca comunitaria en Santa María, con ciclo de cine, talleres y un bazar una vez al mes."},
    {cat:"cultura", title:"Centro Ceramista y la ruta del barro", when:"Horario variable",
     blurb:"Cuarenta años de alta temperatura en Otumba, más las galerías del centro: Zopolite, Venado Azul, Arthouse."},

    {cat:"bienestar", title:"Gran Stupa Bön", when:"A diario · 10:00–17:00",
     blurb:"Treinta y cuatro metros, el stupa más grande del hemisferio. Se puede entrar cualquier día, no solo el domingo de práctica."},
    {cat:"bienestar", title:"Temazcal con Ma Luisa", when:"Lun y mié 16:30 · sáb 18:00",
     blurb:"Temazcal tradicional con horario fijo, sin tener que armar grupo. Reserva por teléfono."},
    {cat:"bienestar", title:"Spa de Rodavento", when:"A diario, con cita",
     blurb:"Circuito de agua y tratamientos en el bosque, camino a Los Saucos. Abierto a quien no se hospeda."},

    {cat:"noche",   title:"Mestizo", when:"Desde las 16:00 · +18",
     blurb:"Rooftop de mezcal en Pagaza 321 con DJ residente todos los fines. Bellakeo, no deep house."},
    {cat:"noche",   title:"Marina 33", when:"Jue–dom · desde las 13:00",
     blurb:"Rooftop con cabina y vista al lago en Santa María. DJ en vivo los fines y promos de jueves a domingo."},
    {cat:"musica",  title:"La Mezca", when:"Jue–sáb, hasta las 2",
     blurb:"Mezcalería en Pagaza 316 que sí programa bandas en vivo, y de vez en cuando noche de stand-up."}
  ],

  checked: "Espacio Odisea (sin ciclo de cine esta semana) · Marina 33 (solo promoción de carta) · Museo de Arte Popular · Turismo y Cultura Valle de Bravo · Mestizo · Monkeys (su fecha es el puente del 11 y 12) · Altitud 1700 (programó 12 y 15 sep) · Cinco Rodavento · Surreal · Basilico · El Santuario Music (solo lanzamientos del sello) · La Pila Seca (cuenta muerta desde 2021) · R27 · Kuun · Doña Barra · eticket (sin eventos en Valle) · Federación Mexicana de Vela (nada en septiembre) · Tri Tour (su calendario ahora pide cuenta) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (nada con fecha del 7 al 9)",
  soon: "Noche Mexicana con música en vivo en Altitud 1700, sáb 12 sep · Puente de septiembre en Monkeys, 11 y 12 sep · Grito y verbena en la plaza el 15 sep, con cena y show en Altitud 1700 el mismo martes; desfile cívico el 16 · Kirtan con Swami Yatidharmananda el 1 oct y satsang el 3 · Fiesta patronal de San Francisco 4 oct · Festival de Vela 9 oct · Triatlón Valle de Bravo 24 oct · Festival de las Almas fin de oct."
};
