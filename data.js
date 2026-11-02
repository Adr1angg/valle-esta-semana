/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "29 octubre – 4 noviembre 2026",
    start: "2026-10-29", end: "2026-11-04",
    updated: "2026-10-29T18:50:00-06:00",
    updatedText: "jue 29 oct, 18:50",
    next: "jueves 5 nov",
    note: "Viernes 30 de octubre arranca el fin de semana de Día de Muertos: Halloween Familiar en El Cuenco desde las 11:30, taller, desfile y concurso de altares flotantes del municipio, y el sábado 31 Jhylee y Serch BR en Marina 33 y el Desfile Metamorfosis a las 6:30 pm. Falta lo grande sin horario publicado: el Oktoberfest de Pablo's Adventure en Acatitlán (31 oct y 1 nov, entrada libre, con cerveza, comida, música en vivo, bazar y concurso de saltos MTB) y el Festival de las Almas (Ximena Sariñana el 30, Lagos el 31, Majo Aguilar el 1, Edgar Oceransky el 2, Orquesta Canela el 3, Enjambre el 4), sin sede ni hora en lo que se alcanzó a leer. El jueves 29 hay concierto de rock y pop en El Cuenco, sin hora publicada. De lunes a miércoles quedan los fijos."
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
    {date:"2026-10-29", dow:"Jueves", s:"Jue", dn:29, m:"oct"},
    {date:"2026-10-30", dow:"Viernes", s:"Vie", dn:30, m:"oct"},
    {date:"2026-10-31", dow:"Sábado", s:"Sáb", dn:31, m:"oct"},
    {date:"2026-11-01", dow:"Domingo", s:"Dom", dn:1, m:"nov"},
    {date:"2026-11-02", dow:"Lunes", s:"Lun", dn:2, m:"nov"},
    {date:"2026-11-03", dow:"Martes", s:"Mar", dn:3, m:"nov"},
    {date:"2026-11-04", dow:"Miércoles", s:"Mié", dn:4, m:"nov"}
  ],

  events: [
    {"id": "creciendo1029", "date": "2026-10-29", "s": 630, "e": 750, "time": "10:30 – 12:30", "cat": "bienestar", "title": "Creciendo Juntos", "venue": "Espacio Odisea", "price": "", "blurb": "Taller de estimulación temprana en la biblioteca comunitaria de Santa María para madres, padres y bebés.", "repeat": "lunes y jueves", "links": [{"l": "Instagram", "h": "https://www.instagram.com/espacioodiseavb/"}]},

    {"id": "manualidades1029", "date": "2026-10-29", "s": 780, "e": 1020, "time": "13:00 – 17:00", "cat": "cultura", "title": "Taller de manualidades de Día de Muertos", "venue": "Jardín Central", "price": "Gratis", "blurb": "Taller del programa de Día de Muertos del municipio, en el kiosco del Jardín Central.", "links": [{"l": "Programa del municipio", "h": "https://www.facebook.com/ayuntamientovdb"}]},

    {"id": "poesia1029", "date": "2026-10-29", "s": 990, "e": 1080, "time": "16:30", "cat": "cultura", "title": "Poesía de Día de Muertos", "venue": "Espacio Odisea", "price": "Entrada libre", "blurb": "El colectivo Letras Vivas lleva una lectura de poesía alusiva al Día de Muertos a la biblioteca comunitaria de Santa María.", "links": [{"l": "Instagram", "h": "https://www.instagram.com/espacioodiseavb/"}]},

    {"id": "halloween1030", "date": "2026-10-30", "s": 690, "e": 1260, "time": "Desde 11:30 · karaoke 19:00", "cat": "cultura", "title": "Halloween Familiar", "venue": "El Cuenco", "price": "", "blurb": "Abren a las 11:30 con menú sin alcohol; pintacaritas a las 3, cuento con Rosita Pardo a las 4:15, salida por la calaverita por las calles del centro y karaoke con Titi Bernal a las 7.", "links": [{"l": "Instagram", "h": "https://www.instagram.com/elcuencovalle/"}], "lead": true},

    {"id": "pan1030", "date": "2026-10-30", "s": 660, "e": 780, "time": "11:00", "cat": "cultura", "title": "Taller de pan de muerto", "venue": "Villa de Colorines", "price": "Gratis", "blurb": "Taller del municipio en la delegación de Villa de Colorines; cada participante lleva sus propios utensilios (lista en el cartel del Ayuntamiento).", "links": [{"l": "Ayuntamiento", "h": "https://www.facebook.com/ayuntamientovdb"}]},

    {"id": "desfileCol1030", "date": "2026-10-30", "s": 1140, "e": 1260, "time": "19:00", "cat": "cultura", "title": "Desfile Metamorfosis entre la vida y la muerte", "venue": "Villa de Colorines", "price": "Gratis", "blurb": "Desfile de Día de Muertos de la Glorieta de Colorines a la Delegación, según el programa del municipio.", "links": [{"l": "Ayuntamiento", "h": "https://www.facebook.com/ayuntamientovdb"}]},

    {"id": "altar1030", "date": "2026-10-30", "s": 1140, "e": 1260, "time": "19:00", "cat": "cultura", "title": "Concurso de embarcaciones Altar Flotante", "venue": "Embarcadero Municipal", "price": "Gratis", "blurb": "Concurso de altares flotantes en el Embarcadero Municipal, dentro del programa de Día de Muertos.", "links": [{"l": "Ayuntamiento", "h": "https://www.facebook.com/ayuntamientovdb"}]},

    {"id": "naha1030", "date": "2026-10-30", "s": 1230, "e": 1350, "time": "20:30 – 22:30", "cat": "musica", "title": "Música en vivo en Na-ha", "venue": "El Santuario, San Gaspar", "price": "", "blurb": "El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.", "repeat": "viernes y sábado", "links": [{"l": "Reservar", "h": "https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}]},

    {"id": "el100_1031", "date": "2026-10-31", "s": 540, "e": 960, "time": "09:00 – 16:00", "cat": "mercado", "title": "Mercado El 100", "venue": "Del Salitre 104", "price": "", "blurb": "Lácteos, verdura, fruta y pan de productores locales, frente al puerto municipal.", "repeat": "cada sábado", "links": []},

    {"id": "marina1031", "date": "2026-10-31", "s": 900, "e": 1200, "time": "15:00 en adelante", "cat": "noche", "title": "Jhylee y Serch BR en Marina 33", "venue": "Marina 33", "price": "", "blurb": "Dos DJs en una misma cabina: Jhylee abre de 3 a 5 pm y Serch BR toca el set principal de las 5 en adelante, con coctelería y vista al lago.", "links": [{"l": "Instagram", "h": "https://www.instagram.com/marina33terraza/"}]},

    {"id": "desfile1031", "date": "2026-10-31", "s": 1110, "e": 1200, "time": "18:30", "cat": "cultura", "title": "Desfile Metamorfosis entre la vida y la muerte", "venue": "Jardín Central", "price": "Gratis", "blurb": "Sale de la Plazoleta Joaquín Arcadio Pagaza y termina en el Jardín Central, según el programa de Día de Muertos del municipio.", "links": [{"l": "Ayuntamiento", "h": "https://www.facebook.com/ayuntamientovdb"}]},

    {"id": "naha1031", "date": "2026-10-31", "s": 1230, "e": 1350, "time": "20:30 – 22:30", "cat": "musica", "title": "Música en vivo en Na-ha", "venue": "El Santuario, San Gaspar", "price": "", "blurb": "La segunda de las dos noches con música en vivo del restaurante del Santuario.", "repeat": "viernes y sábado", "links": [{"l": "Reservar", "h": "https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}]},

    {"id": "brunch1101", "date": "2026-11-01", "s": 510, "e": 780, "time": "08:30 – 13:00", "cat": "mercado", "title": "Brunch dominical en Na-ha", "venue": "El Santuario, San Gaspar", "price": "", "blurb": "Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.", "repeat": "cada domingo", "links": [{"l": "Reservar", "h": "https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}]},

    {"id": "tianguis1101", "date": "2026-11-01", "s": 480, "e": 900, "time": "Desde temprano", "cat": "mercado", "title": "Domingo de tianguis", "venue": "Centro", "price": "", "blurb": "El tianguis grande de la semana: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo. Por las obras, el municipio lo reubicó en la calle Independencia, junto a la parroquia, hasta nuevo aviso.", "repeat": "cada domingo", "links": []},

    {"id": "chamma1101", "date": "2026-11-01", "s": 750, "e": 870, "time": "12:30", "cat": "bienestar", "title": "Meditación guiada en Chamma Ling", "venue": "Chamma Ling", "price": "Gratis", "blurb": "Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera.", "repeat": "cada domingo", "links": [{"l": "Ligmincha", "h": "https://ligmincha.org/center-mexico-valledebravo/"}]},

    {"id": "creciendo1102", "date": "2026-11-02", "s": 630, "e": 750, "time": "10:30 – 12:30", "cat": "bienestar", "title": "Creciendo Juntos", "venue": "Espacio Odisea", "price": "", "blurb": "Taller de estimulación temprana en la biblioteca comunitaria de Santa María para madres, padres y bebés.", "repeat": "lunes y jueves", "links": [{"l": "Instagram", "h": "https://www.instagram.com/espacioodiseavb/"}]},

    {"id": "tianguisav1102", "date": "2026-11-02", "s": 540, "e": 960, "time": "Todo el día", "cat": "mercado", "title": "Tianguis de Avándaro", "venue": "Avándaro", "price": "", "blurb": "El tianguis de los lunes en Avándaro: verdura, quesos, flores y comida, más tranquilo que el del centro.", "repeat": "cada lunes", "links": []},

    {"id": "martinis1103", "date": "2026-11-03", "s": 1080, "e": 1260, "time": "18:00 – 21:00", "cat": "noche", "title": "Martes de Martinis", "venue": "El Cuenco", "price": "2x1 en martinis", "blurb": "Tres horas de martinis al dos por uno en El Cuenco.", "repeat": "cada martes", "links": [{"l": "Instagram", "h": "https://www.instagram.com/elcuencovalle/"}]},

    {"id": "gamenight1104", "date": "2026-11-04", "s": 1110, "e": 1290, "time": "18:30", "cat": "noche", "title": "Game Night", "venue": "El Cuenco", "price": "Sin cover", "blurb": "Juegos de mesa, dominó y billar en El Cuenco.", "repeat": "cada miércoles", "links": [{"l": "Instagram", "h": "https://www.instagram.com/elcuencovalle/"}]},

    {"id": "labsuenos1103", "date": "2026-11-03", "s": 660, "e": 780, "time": "11:00 – 13:00", "cat": "cultura", "title": "Laboratorio de Sueños", "venue": "La Canica", "price": "", "blurb": "Sólo se sabe lo que dice su volante en La Canica: presencial todos los martes de 11 a 13, a cargo de @fdezaln. No dice de qué se trata ni cuánto cuesta; informes al 55 7944 2541.", "repeat": "cada martes", "links": []},

    {"id": "dnd1103", "date": "2026-11-03", "s": 960, "e": 1080, "time": "16:00 – 18:00", "cat": "cultura", "title": "Dungeons & Dragons para adultos", "venue": "La Canica", "price": "$350 la sesión", "blurb": "Introducción a D&D con Azul Herrera en La Canica, Santa María: una historia colaborativa para quien nunca ha jugado. $1,200 al mes o $350 la sesión suelta; informes al 722 455 6079.", "repeat": "cada martes", "links": []}
  ],

  cdmx: [],

  sinFijos: [],

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
    {cat:"bienestar", title:"Yoga Vinyasa-Yin en La Canica", when:"Sáb 10:00 · 75 min", blurb:"Clase de yoga con enfoque restaurativo con Maxime Scagnetti en La Canica, Santa María. $200 la clase suelta o $700 por cuatro; se lleva tapete."},
    {cat:"bienestar", title:"Hatha Yoga en La Canica", when:"Mar y jue 9:00–10:30", blurb:"Clase de hatha yoga en La Canica, Santa María, con primera clase de prueba gratuita. Se lleva tapete; informes por WhatsApp en el volante."},
    {cat:"cultura", title:"Taller de cerámica en La Canica", when:"Mar–jue · con reserva", blurb:"Trabajo manual mar y jue 16–18 y mié y jue 11–13, desde 12 años: $500 la sesión suelta o $1,600 por cuatro, más quema y esmalte. Torno en clase individual con horario a elegir. Reserva con Ana Sofía al 722 437 1769."},
    {cat:"bienestar", title:"Lunes de Hielo en Rancho Flor y Canto", when:"Lun 11:30–14:00", blurb:"Práctica con hielo guiada por Silvia García, con certificación en termogénesis, en el rancho de caballos de Acatitlán. El volante no trae precio ni el rancho lo anuncia en su sitio; informes al 55 4370 6107."},
    {cat:"bienestar", title:"Spa de Rodavento", when:"A diario, con cita", blurb:"Circuito de agua y tratamientos en el bosque, camino a Los Saucos. Abierto a quien no se hospeda."},
    {cat:"noche", title:"Mestizo", when:"Desde las 16:00 · +18", blurb:"Rooftop de mezcal en Pagaza 321 con DJ residente todos los fines. Bellakeo, no deep house."},
    {cat:"noche", title:"Marina 33", when:"Jue–dom · desde las 13:00", blurb:"Rooftop con cabina y vista al lago en Santa María. DJ en vivo los fines y promos de jueves a domingo."},
    {cat:"musica", title:"La Mezca", when:"Jue–sáb, hasta las 2", blurb:"Mezcalería en Pagaza 316 que sí programa bandas en vivo, y de vez en cuando noche de stand-up."}
  ],

  checked: "Barrido del jue 29 oct. Instagram: El Cuenco (Halloween Familiar vie 30; Carlos Gágaro jue 29 sin hora; sin volante semanal nuevo), Oktoberfest Valle de Bravo (31 oct–1 nov, Pablo's Adventure, sin horarios ni line-up de música), Marina 33 (sáb 31), Espacio Odisea (poesía jue 29; taller de velas 7 nov, de pago, fuera), Turismo y Cultura · Facebook: Ayuntamiento de Valle de Bravo (programa de Día de Muertos), Festival de las Almas Valle de Bravo (cartelera 30 oct–7 nov sin sede ni hora; el sitio festivaldelasalmas.com sigue en la edición 2025) · eticket (sin eventos) · no revisados esta vez: grupo de Facebook, Santuario, Mestizo, Cinco Rodavento, Surreal, Casa Sadhana, fmv.mx, tritour.org.",

  soon: "Oktoberfest en Pablo's Adventure, Acatitlán, sáb 31 oct y dom 1 nov, entrada libre, con Tutto Fritti, Faena, 42° y El Cuenco como expositores; horario por confirmar en @oktoberfest.vdb · XXIV Festival de las Almas, 30 oct al 7 nov, entrada libre: Ximena Sariñana (30), Lagos (31), Majo Aguilar (1 nov), Edgar Oceransky (2), Orquesta Canela (3), Enjambre (4), Orquesta Filarmónica del Estado de México (5), Sonora Dinamita (6) y Alejandra Guzmán (7), sede y horas sin publicar · Taller de velas artesanales en Espacio Odisea, sáb 7 nov 10–16 h, $2,000 con reserva · Meditación Vipassana en La Canica, jue 19 nov 17:30, donativo · Club Peñón Open 14–19 dic."
};
