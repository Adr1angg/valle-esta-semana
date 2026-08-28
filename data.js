/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves. */
window.VS = {
  week: {
    label: "24 – 30 agosto 2026",
    start: "2026-08-24", end: "2026-08-30",
    updated: "2026-08-28T15:45:00-06:00",
    updatedText: "vie 28 ago, 15:45",
    next: "jueves 3 sep",
    note: "Barrido grande esta semana: además de los bares de siempre revisamos museos, la biblioteca comunitaria, temazcales, clubes de vela y bici, y los mercados de a diario. Agosto sigue siendo temporada baja de eventos con fecha, pero la lista de lo que está abierto todo el año creció mucho."
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
    {date:"2026-08-24", dow:"Lunes",     s:"Lun", dn:24, m:"ago"},
    {date:"2026-08-25", dow:"Martes",    s:"Mar", dn:25, m:"ago"},
    {date:"2026-08-26", dow:"Miércoles", s:"Mié", dn:26, m:"ago"},
    {date:"2026-08-27", dow:"Jueves",    s:"Jue", dn:27, m:"ago"},
    {date:"2026-08-28", dow:"Viernes",   s:"Vie", dn:28, m:"ago"},
    {date:"2026-08-29", dow:"Sábado",    s:"Sáb", dn:29, m:"ago"},
    {date:"2026-08-30", dow:"Domingo",   s:"Dom", dn:30, m:"ago"}
  ],

  events: [
    { id:"avandaro", date:"2026-08-24", s:600, e:900, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"Gratis", repeat:"cada lunes",
      blurb:"El mercado tradicional de Avándaro, con comida típica y puestos de siempre.",
      links:[] },

    { id:"martinis", date:"2026-08-25", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1", repeat:"cada martes",
      blurb:"Dos por uno en martinis de seis a nueve. La única razón real para salir un martes en Valle.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"gamenight", date:"2026-08-26", s:1110, e:1320, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar. Sin DJ, sin cover, entre semana.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"kirtan", date:"2026-08-27", s:1110, e:1230, time:"18:30", cat:"bienestar",
      title:"Kirtan de Pablo Narayana", venue:"Casa Sadhana", price:"$270",
      blurb:"Dos horas de canto devocional de llamada y respuesta, con Ana Prana, Durga Stef y Andrés Galindo.",
      links:[{l:"Info", h:"https://allevents.in/valle-de-bravo/kirtan-jueves-27-casa-sadhana-valle-de-bravo-con-pablo-narayana-e-invitados/100001998366938307"}] },

    { id:"isis", date:"2026-08-27", s:1260, e:1410, time:"21:00", cat:"musica",
      title:"Isis Bordetas + jam abierto", venue:"El Cuenco", price:"",
      blurb:"Un set con Jero Zoé, y después se abre a jam con quien ande por ahí con un instrumento.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"cineodisea", date:"2026-08-28", s:1140, e:1290, time:"19:00", cat:"cultura",
      title:"Cine Odisea: Amrum", venue:"Espacio Odisea", price:"Entrada libre",
      blurb:"Drama de iniciación de Fatih Akin, 2025: un niño de doce años sostiene a su familia en una isla alemana mientras se cae el régimen nazi. En la biblioteca comunitaria de Santa María.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"},
             {l:"Espacio Odisea", h:"https://espacioodisea.org/"}] },

    { id:"hongosto", date:"2026-08-28", s:1140, e:1560, time:"19:00", cat:"noche", lead:true,
      title:"Fiesta Hongosto", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"El equipo del Cuenco armando su propia fiesta — y la única noche del pueblo esta semana programada con DJs de principio a fin. Abre a las siete, los DJ sets arrancan a las nueve: Samu, ESGO y Yisus, derecho.",
      lineup:["Samu","ESGO","Yisus"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"},
             {l:"Agendar", h:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiesta%20Hongosto&dates=20260829T010000Z/20260829T060000Z&location=El%20Cuenco%2C%20Valle%20de%20Bravo&ctz=America/Mexico_City"}] },

    { id:"el100", date:"2026-08-29", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan. Frente al puerto municipal.",
      links:[] },

    { id:"akira", date:"2026-08-29", s:1080, e:1440, time:"18:00 · DJ sets 21:00", cat:"noche",
      title:"Akira + Adris", venue:"El Cuenco", price:"",
      blurb:"Lounge desde las seis y los decks a partir de las nueve. El volante los marca house y techno.",
      lineup:["Akira","Adris"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"naha", date:"2026-08-29", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis", date:"2026-08-30", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"Gratis", repeat:"cada domingo",
      blurb:"Día de plaza. El tianguis llena el centro — fruta, ropa, ferretería y la mejor comida de calle de la semana.",
      links:[] },

    { id:"medi", date:"2026-08-30", s:750, e:840, time:"12:30", cat:"bienestar",
      title:"Meditación en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada por los lamas residentes, en la tradición bön, a los pies del Gran Stupa. El terreno solo ya vale el viaje.",
      links:[{l:"Info", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    { id:"brunchnaha", date:"2026-08-30", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch largo frente al lago en San Gaspar, el domingo entero hasta la una.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] }
  ],

  cdmx: [
    { id:"pangaea", date:"2026-08-28", time:"23:00", title:"Pangaea", venue:"Fünk", price:"$300 – 600",
      genre:"UK garage · bass",
      blurb:"Cofundador de Hessle Audio, quince años metido en UK garage y bass. Lo mejor al alcance este fin, si tienes el sábado para recuperarte.",
      link:"https://ra.co/events/2497141" },
    { id:"brc", date:"2026-08-29", time:"23:00", title:"Black Rave Culture", venue:"YuYu", price:"",
      genre:"club · house",
      blurb:"Trío de Washington DC en el filo rápido y percusivo entre house y club.",
      link:"https://ra.co/events/2496966" }
  ],

  always: [
    {cat:"aire",    title:"Parapente en El Peñón y Divisadero", when:"A diario, según el clima",
     blurb:"Por lo que Valle es famoso. Vuelos tándem y escuela con Alas del Hombre, Flumen y Skyrides. Agosto es plena temporada de lluvias: habla antes de subir."},
    {cat:"aire",    title:"El lago: kayak, SUP y lancha", when:"A diario · 09:00–19:00",
     blurb:"Explora Valle y Rio Adventure rentan desde el embarcadero. También velero, wakeboard y esquí."},
    {cat:"aire",    title:"Bici de montaña en Monte Alto", when:"Mar cerrado · resto de la semana",
     blurb:"Living for Bikes renta bici y guía catorce rutas: Las Eses, Los Laberintos, La Torera, Agua Bendita."},
    {cat:"aire",    title:"Vela en Avándaro", when:"Fines de semana",
     blurb:"Navegación de club y clínicas en el Náutico Avándaro y El Zarco. Ninguna regata con nombre cae en agosto."},
    {cat:"aire",    title:"La Peña y la cascada Velo de Novia", when:"Con luz de día",
     blurb:"La subida corta y empinada al mirador sobre el lago, y la cascada rumbo a Los Saucos. Rapel guiado si lo quieres con cuerda."},

    {cat:"mercado", title:"Mercado de Artesanías y Plaza Mazahua", when:"A diario · 11:00–19:00",
     blurb:"Cerámica, vidrio soplado, herrería y textiles en Av. Benito Juárez; a unos pasos, los bordados y tapetes mazahuas."},
    {cat:"mercado", title:"Mercado municipal", when:"A diario · desde las 07:00",
     blurb:"Cecina vallesana, queso fresco y pan de elmo, con el mostrador de fondas adentro."},
    {cat:"mercado", title:"Callejón del Hambre", when:"A diario · 17:00–23:00",
     blurb:"Cinco puestos de tacos al lado de la parroquia: pastor, deshebrada, barbacoa y quesadillas."},

    {cat:"cultura", title:"Museo de Arte Popular", when:"Entrada gratuita",
     blurb:"Arte popular mexicano pieza por pieza: barro de Metepec, perritos colimones, textiles."},
    {cat:"cultura", title:"Centro Regional de Cultura Pagaza", when:"Mar–sáb 10–18 · dom 10–15 · gratis",
     blurb:"La casa de cultura del pueblo, en un edificio del siglo XVII: salas permanentes, exposiciones temporales y talleres abiertos."},
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
    {cat:"noche",   title:"Marina 33", when:"Jue–dom · 13:00–23:00",
     blurb:"Rooftop con cabina y vista al lago en Santa María. Jueves Vallesano y promos de jueves a domingo."},
    {cat:"musica",  title:"La Mezca", when:"Jue–sáb, hasta las 2",
     blurb:"Mezcalería en Pagaza 316 que sí programa bandas en vivo, y de vez en cuando noche de stand-up."}
  ],

  checked: "Doña Barra · La Pila Seca (cuenta muerta desde 2021) · Monkeys · R27 (solo teasers) · Kuun · Cinco Rodavento · El Santuario Music (sin publicar desde julio) · Surreal · Basilico (dormido) · La Playa · Los Pericos · Altitud 1700 · Cervecería Nevado · Museo de Arte Popular · Temazcal Ixtlán · Turismo y Cultura Valle de Bravo · grupos de Facebook del pueblo",
  soon: "Masterclass y degustación de té chino con Awei en El Cuenco, vie 4 sep 17:00 ($800) y sáb 5 sep 11:00 en El Sauna de Acatitlán ($900) · Puente de septiembre en Monkeys, 11 y 12 sep · Grito y verbena en la plaza el 15 sep, desfile cívico el 16 · Kirtan con Swami Yatidharmananda el 1 oct y satsang el 3 · Fiesta patronal de San Francisco 4 oct · Festival de Vela 9 oct · Triatlón 24 oct · Festival de las Almas fin de oct."
};
