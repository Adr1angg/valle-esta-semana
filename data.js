/* Valle Esta Semana — contenido de la semana. Lo unico que cambia cada jueves. */
window.VS = {
  week: {
    label: "24 – 30 agosto 2026",
    start: "2026-08-24", end: "2026-08-30",
    updated: "2026-08-27T15:04:00-06:00",
    updatedText: "jue 27 ago, 15:04",
    next: "jueves 3 sep",
    note: "Finales de agosto es temporada baja en Valle. Los calendarios del pueblo saltan del triatlón de julio directo a septiembre, así que esta semana se apoya en lo de siempre. Es la foto real, no una búsqueda floja."
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

    { id:"kirtan", date:"2026-08-27", s:1110, e:1230, time:"18:30", cat:"bienestar",
      title:"Kirtan de Pablo Narayana", venue:"Casa Sadhana", price:"$270",
      blurb:"Dos horas de canto devocional de llamada y respuesta, con Ana Prana, Durga Stef y Andrés Galindo.",
      links:[{l:"Info", h:"https://allevents.in/valle-de-bravo/kirtan-jueves-27-casa-sadhana-valle-de-bravo-con-pablo-narayana-e-invitados/100001998366938307"}] },

    { id:"isis", date:"2026-08-27", s:1260, e:1410, time:"21:00", cat:"musica",
      title:"Isis Bordetas + jam abierto", venue:"El Cuenco", price:"",
      blurb:"Un set con Jero Zoé, y después se abre a jam con quien ande por ahí con un instrumento.",
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"hongosto", date:"2026-08-28", s:1140, e:1560, time:"19:00", cat:"noche", lead:true,
      title:"Fiesta Hongosto", venue:"El Cuenco", price:"Sin cover anunciado",
      blurb:"El equipo del Cuenco armando su propia fiesta — y la única noche del pueblo esta semana programada con DJs de principio a fin. Samu, ESGO y Yisus, derecho.",
      lineup:["Samu","ESGO","Yisus"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"},
             {l:"Agendar", h:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiesta%20Hongosto&dates=20260829T010000Z/20260829T060000Z&location=El%20Cuenco%2C%20Valle%20de%20Bravo&ctz=America/Mexico_City"}] },

    { id:"el100", date:"2026-08-29", s:660, e:1080, time:"11:00 – 18:00", cat:"mercado",
      title:"Mercado El 100", venue:"Del Salitre 104", price:"", repeat:"cada sábado",
      blurb:"Todo lo que se vende aquí se cultiva o se hace a menos de cien millas. Lácteos, verdura, fruta, pan.",
      links:[] },

    { id:"akira", date:"2026-08-29", s:1140, e:1410, time:"19:00", cat:"noche",
      title:"Akira + Adris", venue:"El Cuenco", price:"",
      blurb:"Dos DJs para rematar la semana. El volante no dice género — El Cuenco se mueve entre deep house y soul.",
      lineup:["Akira","Adris"],
      links:[{l:"Instagram", h:"https://www.instagram.com/elcuencovalle/"}] },

    { id:"tianguis", date:"2026-08-30", s:480, e:900, time:"Desde temprano", cat:"mercado",
      title:"Domingo de tianguis", venue:"Centro", price:"Gratis", repeat:"cada domingo",
      blurb:"Día de plaza. El tianguis llena el centro — fruta, ropa, ferretería y la mejor comida de calle de la semana.",
      links:[] },

    { id:"medi", date:"2026-08-30", s:750, e:840, time:"12:30", cat:"bienestar",
      title:"Meditación en Chamma Ling", venue:"Chamma Ling", price:"Gratis", repeat:"cada domingo",
      blurb:"Práctica guiada por los lamas residentes, en la tradición bön. El terreno solo ya vale el viaje.",
      links:[{l:"Info", h:"https://ligmincha.org/center-mexico-valledebravo/"}] }
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
     blurb:"Por lo que Valle es famoso. Agosto es plena temporada de lluvias, así que habla antes de subir."},
    {cat:"mercado", title:"Mercado de Artesanías", when:"A diario · 11:00–19:00",
     blurb:"Cerámica, vidrio soplado, herrería y textiles, en Av. Benito Juárez."},
    {cat:"cultura", title:"La ruta del arte", when:"Horario variable",
     blurb:"Museo de Arte Popular, Galería Zopolite y el Centro Ceramista en Otumba."},
    {cat:"aire",    title:"Vela en Avándaro", when:"Fines de semana",
     blurb:"Navegación de club y clínicas. Ninguna regata con nombre cae en agosto."},
    {cat:"noche",   title:"Marina 33", when:"Jue–dom · 13:00–23:00",
     blurb:"Rooftop con cabina y vista al lago. Nada anunciado, pero abre todo el fin."},
    {cat:"mercado", title:"Tianguis de Avándaro", when:"Cada lunes",
     blurb:"El mercado tradicional de Avándaro, con comida típica."}
  ],

  checked: "Mestizo · Doña Barra · La Pila Seca · Monkeys · R27 · Kuun · Cinco Rodavento · El Santuario · Surreal · Basilico · Blue Social Club · La Playa · Los Pericos",
  soon: "Trail Run Avándaro y el Grito en septiembre · Festival de Vela 9 oct · Triatlón 24 oct · Festival de las Almas fin de oct."
};
