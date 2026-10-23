/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves.
   `days`, `week.start` y `week.end` cubren jueves→miercoles: los siete dias
   que faltan hasta la siguiente corrida. La rejilla que se ve en pantalla la
   calcula index.html sola (ventana rodante desde hoy) y no sale de aqui.    */
window.VS = {
  week: {
    label: "22 – 28 octubre 2026",
    start: "2026-10-22", end: "2026-10-28",
    updated: "2026-10-23T14:20:00-06:00",
    updatedText: "vie 23 oct, 14:20",
    next: "jueves 29 oct",
    note: "El sábado 24 junta tres cosas: el Triatlón (9 am, con cierres viales de 7 a 14 h en San Gaspar), la Orquesta Sinfónica Orpheus en el Jardín Central a las 6:30 pm, y Na-ha con música en vivo. El Cuenco no ha sacado volante desde el 13 de octubre, así que no hay line-up de fin de semana que confirmar. El resto son los fijos: Mercado El 100, tianguis (ahora en la calle Independencia), meditación en Chamma Ling, Martes de Martinis, Game Night y el Modèle Vivant de La Canica el martes 27. El Festival de las Almas arranca el 30 de octubre."
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
    {date:"2026-10-22", dow:"Jueves", s:"Jue", dn:22, m:"oct"},
    {date:"2026-10-23", dow:"Viernes", s:"Vie", dn:23, m:"oct"},
    {date:"2026-10-24", dow:"Sábado", s:"Sáb", dn:24, m:"oct"},
    {date:"2026-10-25", dow:"Domingo", s:"Dom", dn:25, m:"oct"},
    {date:"2026-10-26", dow:"Lunes", s:"Lun", dn:26, m:"oct"},
    {date:"2026-10-27", dow:"Martes", s:"Mar", dn:27, m:"oct"},
    {date:"2026-10-28", dow:"Miércoles", s:"Mié", dn:28, m:"oct"}
  ],

  events: [
    {id:"creciendo1022",date:"2026-10-22",s:630,e:750,time:"10:30 – 12:30",cat:"bienestar",title:"Creciendo Juntos",venue:"Espacio Odisea",price:"",repeat:"lunes y jueves",blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María para madres, padres y bebés.",links:[{l:"Instagram",h:"https://www.instagram.com/espacioodiseavb/"}]},

    {id:"naha1023",date:"2026-10-23",s:1230,e:1350,time:"20:30 – 22:30",cat:"musica",title:"Música en vivo en Na-ha",venue:"El Santuario, San Gaspar",price:"",repeat:"viernes y sábado",blurb:"El restaurante del Santuario programa música en vivo dos horas cada viernes y sábado, con el lago enfrente.",links:[{l:"Reservar",h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}]},

    {id:"el100_1024",date:"2026-10-24",s:540,e:960,time:"09:00 – 16:00",cat:"mercado",title:"Mercado El 100",venue:"Del Salitre 104",price:"",repeat:"cada sábado",blurb:"Lácteos, verdura, fruta y pan de productores locales, frente al puerto municipal.",links:[]},

    {id:"triatlon1024",date:"2026-10-24",s:540,e:840,time:"09:00",cat:"aire",title:"Triatlón Valle de Bravo (asdeporte)",venue:"San Gaspar del Lago",price:"",blurb:"Carrera de triatlón con salida y meta en San Gaspar del Lago; el municipio cierra a la circulación San Gaspar, El Simulador y El Arco de 7:00 a 14:00. Para verla, mejor llegar temprano.",links:[{l:"Aviso del municipio",h:"https://www.facebook.com/ayuntamientovdb"}]},

    {id:"orpheus1024",date:"2026-10-24",s:1110,e:1200,time:"18:30",cat:"musica",title:"Orquesta Sinfónica Orpheus",venue:"Jardín Central",price:"",blurb:"Concierto de la Orquesta Sinfónica Orpheus en el Jardín Central, dentro de las actividades de Día de Muertos que anuncia el municipio.",links:[{l:"Ayuntamiento",h:"https://www.facebook.com/ayuntamientovdb"}]},

    {id:"naha1024",date:"2026-10-24",s:1230,e:1350,time:"20:30 – 22:30",cat:"musica",title:"Música en vivo en Na-ha",venue:"El Santuario, San Gaspar",price:"",repeat:"viernes y sábado",blurb:"La segunda de las dos noches con música en vivo del restaurante del Santuario.",links:[{l:"Reservar",h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}]},

    {id:"brunch1025",date:"2026-10-25",s:510,e:780,time:"08:30 – 13:00",cat:"mercado",title:"Brunch dominical en Na-ha",venue:"El Santuario, San Gaspar",price:"",repeat:"cada domingo",blurb:"Brunch de domingo en el restaurante del Santuario, sobre la orilla de San Gaspar. Se reserva por OpenTable.",links:[{l:"Reservar",h:"https://www.opentable.com/r/restaurante-naha-valle-de-bravo"}]},

    {id:"tianguis1025",date:"2026-10-25",s:480,e:900,time:"Desde temprano",cat:"mercado",title:"Domingo de tianguis",venue:"Centro",price:"",repeat:"cada domingo",blurb:"El tianguis grande de la semana toma las calles del centro: fruta y verdura de la región, ropa, plantas y comida hecha ahí mismo. Por las obras de la calle Panorámica, el municipio lo reubicó temporalmente en la calle Independencia, junto a la parroquia, hasta nuevo aviso.",links:[]},

    {id:"chamma1025",date:"2026-10-25",s:750,e:870,time:"12:30",cat:"bienestar",title:"Meditación guiada en Chamma Ling",venue:"Chamma Ling",price:"Gratis",repeat:"cada domingo",blurb:"Práctica guiada de la tradición Bön al pie de la Gran Stupa, la más grande del hemisferio. Abierta a cualquiera.",links:[{l:"Ligmincha",h:"https://ligmincha.org/center-mexico-valledebravo/"}]},

    {id:"creciendo1026",date:"2026-10-26",s:630,e:750,time:"10:30 – 12:30",cat:"bienestar",title:"Creciendo Juntos",venue:"Espacio Odisea",price:"",repeat:"lunes y jueves",blurb:"Taller de estimulación temprana en la biblioteca comunitaria de Santa María para madres, padres y bebés.",links:[{l:"Instagram",h:"https://www.instagram.com/espacioodiseavb/"}]},

    {id:"tianguisav1026",date:"2026-10-26",s:540,e:960,time:"Todo el día",cat:"mercado",title:"Tianguis de Avándaro",venue:"Avándaro",price:"",repeat:"cada lunes",blurb:"El tianguis de los lunes en Avándaro: verdura, quesos, flores y comida, más tranquilo que el del centro.",links:[]},

    {id:"martinis1027",date:"2026-10-27",s:1080,e:1260,time:"18:00 – 21:00",cat:"noche",title:"Martes de Martinis",venue:"El Cuenco",price:"2x1 en martinis",repeat:"cada martes",blurb:"Tres horas de martinis al dos por uno en El Cuenco.",links:[{l:"Instagram",h:"https://www.instagram.com/elcuencovalle/"}]},

    {id:"drinkdraw1027",date:"2026-10-27",s:1140,e:1260,time:"19:00",cat:"cultura",title:"Modèle Vivant · Drink & Draw",venue:"La Canica",price:"$100–150",blurb:"Dibujo con modelo vivo y una copa en La Canica, el último martes de cada mes. Según el volante del salón; se lleva material propio.",links:[]},

    {id:"gamenight1028",date:"2026-10-28",s:1110,e:1290,time:"18:30",cat:"noche",title:"Game Night",venue:"El Cuenco",price:"Sin cover",repeat:"cada miércoles",blurb:"Juegos de mesa, dominó y billar en El Cuenco.",links:[{l:"Instagram",h:"https://www.instagram.com/elcuencovalle/"}]}
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
    {cat:"bienestar", title:"Spa de Rodavento", when:"A diario, con cita", blurb:"Circuito de agua y tratamientos en el bosque, camino a Los Saucos. Abierto a quien no se hospeda."},
    {cat:"noche", title:"Mestizo", when:"Desde las 16:00 · +18", blurb:"Rooftop de mezcal en Pagaza 321 con DJ residente todos los fines. Bellakeo, no deep house."},
    {cat:"noche", title:"Marina 33", when:"Jue–dom · desde las 13:00", blurb:"Rooftop con cabina y vista al lago en Santa María. DJ en vivo los fines y promos de jueves a domingo."},
    {cat:"musica", title:"La Mezca", when:"Jue–sáb, hasta las 2", blurb:"Mezcalería en Pagaza 316 que sí programa bandas en vivo, y de vez en cuando noche de stand-up."}
  ],

  checked: "Barrido ampliado del vie 23 oct. Facebook: Ayuntamiento de Valle de Bravo (Orquesta Orpheus, cierres del Triatlón, tianguis reubicado), Festival de las Almas Valle de Bravo (24.ª edición 30 oct–7 nov, programa sin publicar), búsqueda de eventos de Facebook (Triatlón 9 am; el resto talleres de salón de eventos y retiros de CDMX, fuera) · Instagram de El Cuenco (último volante 13 oct), Espacio Odisea, Marina 33 (Canelo vs Mbilli 31 oct), Turismo, Santuario, Cinco Rodavento, Mestizo, Monkeys, Surreal, Nevado (sin fechas de esta semana) · eticket (sin eventos) · grupo QUE TODO VALLE DE BRAVO SE ENTERE (ruido) · fmv.mx, tritour.org y Casa Sadhana (no revisados).",

  soon: "Oktoberfest en Skyline a fin de mes (sin fecha) · Canelo vs Mbilli en pantalla en Marina 33, sáb 31 oct · Mëhill en Valle de Bravo, sáb 31 oct 21:00, Rancho Los Grillos, con Mario Z, Örak B2B Paolo, Alan Zamudio y Jair (Sunset Musik; boletos por WhatsApp 726 221 6371 y en Legend Dragon Gym) · XXIV Festival de las Almas, 30 oct al 7 nov, entrada libre (programa por días aún sin publicar al 23 oct) · Meditación Vipassana en La Canica, jue 19 nov 17:30, donativo voluntario · Club Peñón Open 14–19 dic."
};
