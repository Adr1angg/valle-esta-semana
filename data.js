/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "15 – 21 octubre 2026",
    start: "2026-10-15", end: "2026-10-21",
    updated: "2026-10-15T12:15:00-06:00",
    updatedText: "jue 15 oct, 12:15",
    next: "jueves 22 oct",
    note: "Hoy jueves el aniversario once de Espacio Odisea trae a El Mastuerzo en acústico a las 8, con festival de taller y cine hasta el viernes. El Cuenco anuncia Funky Night en vivo el jueves (sin hora publicada), karaoke el viernes a las 9 y house con DJ Mateo el sábado a las 9. Na-ha sigue con música en vivo viernes y sábado, y el fin de semana trae además el Oktoberfest y el 70 aniversario del Club Náutico Avándaro (17 y 18, sin horario publicado). De lunes a miércoles sólo están los fijos: el volante de El Cuenco sale los lunes y a la hora de este barrido no existía."
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
    {date:"2026-10-15", dow:"Jueves", s:"Jue", dn:15, m:"oct"},
    {date:"2026-10-16", dow:"Viernes", s:"Vie", dn:16, m:"oct"},
    {date:"2026-10-17", dow:"Sábado", s:"Sáb", dn:17, m:"oct"},
    {date:"2026-10-18", dow:"Domingo", s:"Dom", dn:18, m:"oct"},
    {date:"2026-10-19", dow:"Lunes", s:"Lun", dn:19, m:"oct"},
    {date:"2026-10-20", dow:"Martes", s:"Mar", dn:20, m:"oct"},
    {date:"2026-10-21", dow:"Miércoles", s:"Mié", dn:21, m:"oct"}
  ],

  events: [
    { id:"valleee1015", date:"2026-10-15", s:660, e:720, time:"11:00", cat:"cultura",
      title:"Presentación de Valle Lee Contigo", venue:"Espacio Odisea", price:"",
      blurb:"Arranca el aniversario once de Espacio Odisea con la presentación de Valle Lee Contigo, la alianza con Fondo Alternativa para llevar libros a escuelas, barrios y comunidades de la región.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/p/DeSxdb_Gf2a/"}] },

    { id:"reconocernos1015", date:"2026-10-15", s:660, e:1140, time:"11:00 – 19:00", cat:"cultura",
      title:"Taller Re-conocernos y atelier Una ciudad imaginada", venue:"Espacio Odisea", price:"", repeat:"jueves y viernes",
      blurb:"Laboratorios creativos abiertos de corrido durante el festival Cruce de Miradas: diseño urbano, expresión plástica y convivencia a partir de imaginar la ciudad en colectivo.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/p/DeSxdb_Gf2a/"}] },

    { id:"mastuerzo1015", date:"2026-10-15", s:1200, e:1320, time:"20:00", cat:"musica", lead:true,
      title:"Francisco Barrios «El Mastuerzo» en acústico", venue:"Espacio Odisea", price:"$130 cuota de recuperación",
      blurb:"Si te tocó crecer con el rock mexicano, esta noche es de las que no se repiten en Valle: El Mastuerzo, figura de culto del rock nacional, en acústico en la biblioteca comunitaria. Abren Yair Kartter y Chata 66 a las 7.",
      lineup:["Francisco Barrios «El Mastuerzo»","Yair Kartter","Chata 66"],
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/p/DeSxdb_Gf2a/"}] },

    { id:"reconocernos1016", date:"2026-10-16", s:660, e:1140, time:"11:00 – 19:00", cat:"cultura",
      title:"Taller Re-conocernos y atelier Una ciudad imaginada", venue:"Espacio Odisea", price:"", repeat:"jueves y viernes",
      blurb:"Segundo día de los laboratorios creativos del festival Cruce de Miradas, abiertos de once a siete.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/p/DeSxdb_Gf2a/"}] },

    { id:"cine1016", date:"2026-10-16", s:1140, e:1320, time:"19:00", cat:"cultura",
      title:"Cine Odisea: El ser querido", venue:"Espacio Odisea", price:"",
      blurb:"Cine Odisea proyecta El ser querido, de Rodrigo Sorogoyen, para cerrar el festival de aniversario. Confirmar asistencia por Instagram.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/p/DeSxdb_Gf2a/"}] },

    { id:"karaoke1016", date:"2026-10-16", s:1260, e:1440, time:"21:00", cat:"noche",
      title:"Karaoke en El Cuenco", venue:"El Cuenco", price:"Sin cover",
      blurb:"Noche de karaoke sin cover en El Cuenco, desde las nueve.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/DeduULZRxGg/"}] },

    { id:"naha1016", date:"2026-10-16", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"el100_1017", date:"2026-10-17", s:540, e:960, time:"09:00 – 16:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Lácteos, verdura, fruta y pan de productores locales, frente al puerto municipal.",
      links:[] },

    { id:"mateo1017", date:"2026-10-17", s:1260, e:1560, time:"21:00", cat:"noche",
      title:"DJ Mateo · Rhythm Culture", venue:"El Cuenco", price:"",
      blurb:"House toda la noche con DJ Mateo, desde las nueve, en El Cuenco. Es house, no open format.",
      lineup:["DJ Mateo"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/p/DeduULZRxGg/"}] },

    { id:"naha1017", date:"2026-10-17", s:1230, e:1350, time:"20:30 – 22:30", cat:"musica",
      title:"Música en vivo en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"viernes y sábado",
      blurb:"La segunda de las dos noches con música en vivo del restaurante del Santuario.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"brunch1018", date:"2026-10-18", s:510, e:780, time:"08:30 – 13:00", cat:"mercado",
      title:"Brunch dominical en Na-ha", venue:"El Santuario, San Gaspar", price:"", repeat:"cada domingo",
      blurb:"Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.",
      links:[{l:"Reservar", h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}] },

    { id:"tianguis1018", date:"2026-10-18", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"", repeat:"cada domingo",
      blurb:"El tianguis grande de la semana toma las calles del centro: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo.",
      links:[] },

    { id:"chamma1018", date:"2026-10-18", s:750, e:870, time:"12:30", cat:"bienestar",
      title:"Meditación guiada en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera.",
      links:[{l:"Ligmincha", h:"https://ligmincha.org/center-mexico-valledebravo/"}] },

    { id:"creciendo1019", date:"2026-10-19", s:630, e:750, time:"10:30 – 12:30", cat:"bienestar",
      title:"Creciendo Juntos", venue:"Espacio Odisea", price:"", repeat:"lunes y jueves",
      blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María para madres, padres y bebés.",
      links:[{l:"Instagram", h:"https://www.instagram.com/espacioodiseavb/"}] },

    { id:"tianguisav1019", date:"2026-10-19", s:540, e:960, time:"Todo el día", cat:"mercado",
      title:"Tianguis de Avándaro", venue:"Avándaro", price:"", repeat:"cada lunes",
      blurb:"El tianguis de los lunes en Avándaro: verdura, quesos, flores y comida, más tranquilo que el del centro.",
      links:[] },

    { id:"martinis1020", date:"2026-10-20", s:1080, e:1260, time:"18:00 – 21:00", cat:"noche",
      title:"Martes de Martinis", venue:"El Cuenco", price:"2x1 en martinis", repeat:"cada martes",
      blurb:"Tres horas de martinis al dos por uno en El Cuenco.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"gamenight1021", date:"2026-10-21", s:1110, e:1290, time:"18:30", cat:"noche",
      title:"Game Night", venue:"El Cuenco", price:"Sin cover", repeat:"cada miércoles",
      blurb:"Juegos de mesa, dominó y billar en El Cuenco.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] }
  ],

  cdmx: [
    { id:"yuyu1017", date:"2026-10-17", time:"23:00", title:"Yu Yu Cine Club: DJ Assault + Teen Flirt + Marea Marea",
      venue:"YuYu Cine Club, Doctores", price:"Boleto por RA", genre:"electrónica · ghetto house",
      blurb:"DJ Assault, leyenda de Detroit del ghetto house y el booty bass, en la sala de la Doctores, de once de la noche a cinco de la mañana.",
      link:"https://ra.co/events/2532676" },

    { id:"sunday1018", date:"2026-10-18", time:"15:00", title:"Sunday Sunday: Oro Negro + James Axon + Groovy Kds + Eternaut",
      venue:"Sunday Sunday, Tabaqueros 16", price:"Boleto por RA", genre:"house · italo disco",
      blurb:"La terraza dominguera del Centro, de tres de la tarde a una de la mañana, con house e italo disco en domingo.",
      link:"https://ra.co/events/2560765" }
  ],

  always: [
    {cat:"aire", title:"Parapente en El Peñón y Divisadero", when:"A diario, según el clima", blurb:"Por lo que Valle es famoso. Vuelos tándem y escuela con Alas del Hombre, Flumen y Skyrides. Septiembre sigue siendo temporada de lluvias: habla antes de subir."},
    {cat:"aire", title:"El lago: kayak, SUP y lancha", when:"A diario · 09:00–19:00", blurb:"Explora Valle y Rio Adventure rentan desde el embarcadero. También velero, wakeboard y esquí."},
    {cat:"aire", title:"Bici de montaña en Monte Alto", when:"Mar cerrado · resto de la semana", blurb:"Living for Bikes renta bici y guía catorce rutas: Las Eses, Los Laberintos, La Torera, Agua Bendita."},
    {cat:"aire", title:"Vela en Avándaro", when:"Fines de semana", blurb:"Navegación de club y clínicas en el Náutico Avándaro y El Zarco. El Oktoberfest y el 70 aniversario del Náutico Avándaro son el 17 y 18 de octubre."},
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

  checked: "Barrido del jue 15 oct. El Cuenco (volante semanal: Funky Night en vivo con Nayeli y Andy el jueves sin hora publicada, karaoke el viernes 21:00, DJ Mateo el sábado 21:00; lunes a miércoles por sus fijos) · Espacio Odisea (programa completo del aniversario, ver eventos) · Marina 33 (jueves de carta al 2x1; publicó que viene ambiente de Día de Muertos, sin fechas) · Turismo Valle de Bravo (sólo ruta de pan de muerto y promoción de hoteles para el triatlón) · El Santuario (sin evento nuevo con fecha) · Surreal, Cinco Rodavento, Mestizo, Monkeys (sin fechas de esta semana) · Club Náutico Avándaro (Oktoberfest y 70 aniversario 17 y 18 oct, sin horario publicado) · eticket (sin eventos en Valle) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (buscado con en vivo: puro ruido) · Casa Sadhana, fmv.mx y tritour.org (no revisados esta corrida).",

  soon: "Oktoberfest · 70 aniversario del Club Náutico Avándaro 17 y 18 oct · Triatlón Valle de Bravo 24 oct · Oktoberfest en Skyline a fin de mes · Festival de las Almas fin de oct a 2 nov · Club Peñón Open 14–19 dic."
};
