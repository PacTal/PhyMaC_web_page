/**
 * ----------------------------------------------------------------------
 * CONFIGURACIÓN CENTRALIZADA - PANEL DE CONTROL
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Este archivo actúa como el "Panel de Control" del sitio web.
 * Modifica los valores aquí para actualizar todo el sitio dinámicamente.
 */

const CONFIG = {
  // ----------------------------------------------------------------------
  // LOGO
  // ----------------------------------------------------------------------
  logo: {
    url: "imagenes/logo.svg",
    alt: "PhyMaC Logo",
    fallbackText: "PhyMaC"
  },

  // ----------------------------------------------------------------------
  // CONTACTO
  // ----------------------------------------------------------------------
  contact: {
    whatsapp: {
      number: "573197438210",
      defaultMessage: "Me encantaría participar",
      ctaText: "¡Acepta el reto!"
    },
    email: "funphymac@gmail.com",
    formspree: {
      // Endpoint general (formulario de contacto del footer)
      endpoint: "https://formspree.io/f/xkgdzeda",

      // Endpoints DEDICADOS para poder segmentar los leads en Formspree.
      // Mientras estén vacíos se usa el endpoint general de arriba (todo sigue
      // funcionando, pero los envíos llegan mezclados en la misma bandeja).
      // Para separarlos: crea dos formularios nuevos en formspree.io y pega
      // aquí sus URLs completas.
      materiales: "", // Descargas de guías (Biblioteca y episodios)
      agenda: ""      // Solicitudes de reunión (contacto.html)
    }
  },

  // ----------------------------------------------------------------------
  // REDES SOCIALES
  // ----------------------------------------------------------------------
  social: {
    instagram: "https://www.instagram.com/fundacion_phymac/",
    facebook:  "https://www.facebook.com/profile.php?id=61586652184965",
    linkedin:  "https://www.linkedin.com/company/fundacion-phymac/",
    tiktok:    "https://www.tiktok.com/@fundacion_phymac"
  },

  // ----------------------------------------------------------------------
  // MENÚ DE NAVEGACIÓN
  // ----------------------------------------------------------------------
  // Solo secciones que son páginas propias. "Inicio" lo cubre el logo y
  // "El método" es un ancla dentro del home, no un destino. Biblioteca se
  // alcanza desde Hablando con profes y desde el footer.
  menu: {
    items: [
      { text: "Servicios", href: "servicios.html" },
      { text: "Hablando con profes", href: "profes.html" },
      { text: "Blog", href: "blog.html" },
      { text: "Publicaciones", href: "publicaciones.html" },
      { text: "Contacto", href: "contacto.html" }
    ]
  },

  // ----------------------------------------------------------------------
  // SERIE "HABLANDO CON PROFES"
  // ----------------------------------------------------------------------
  serie: {
    nombre: "Hablando con profes",
    tagline: "Una serie en video de la Fundación PhyMaC para charlar con franqueza sobre lo que de verdad pasa en el aula: reírnos de los días difíciles, celebrar lo que sí funciona y recordar por qué seguimos aquí.",
    youtube: "", // Pega aquí la URL del canal cuando lo tengas
    temas: [
      { icono: "🤖", titulo: "La IA en el aula",        texto: "Cómo competir (o aliarnos) con la IA por la atención y la curiosidad de los estudiantes." },
      { icono: "🧭", titulo: "Currículo vs. realidad",  texto: "Qué hacer cuando el programa parece escrito para otro planeta y el aula pide otra cosa." },
      { icono: "🌱", titulo: "Aulas diversas",          texto: "Enseñar a grupos cada vez más distintos sin dejar a nadie atrás." },
      { icono: "🔧", titulo: "Aprender haciendo",       texto: "Metodologías activas y laboratorios low-cost que sí funcionan en contextos reales." },
      { icono: "💬", titulo: "Los días difíciles",      texto: "Reírnos de lo que salió mal y compartir cómo seguimos de pie." },
      { icono: "⭐", titulo: "Lo que sí funciona",      texto: "Celebrar las pequeñas victorias que nos recuerdan por qué elegimos enseñar." }
    ]
  },

  // ----------------------------------------------------------------------
  // AGENDAMIENTO (sección "Agenda" de contacto.html)
  // ----------------------------------------------------------------------
  agenda: {
    // Cal.com es gratuito. Crea tu cuenta en cal.com y pega aquí SOLO el
    // identificador del evento, sin el dominio. Ej: "phymac/30min"
    // Mientras esté vacío, la página avisa y ofrece WhatsApp como alternativa.
    calLink: "",
    calOrigin: "https://cal.com",

    // Regla de calificación. Un prospecto califica si cumple LAS TRES:
    //   - su rol está en rolesValidos
    //   - su plazo NO está en plazosExcluidos
    //   - su presupuesto está en presupuestosValidos
    // Ajusta estas listas para abrir o cerrar el filtro.
    reglas: {
      rolesValidos: ["decido", "recomiendo"],
      plazosExcluidos: ["explorando"],
      presupuestosValidos: ["si", "gestion"]
    },

    // Puntaje informativo (0-13) que viaja con el lead para priorizar el
    // seguimiento comercial. No decide el filtro: eso lo hacen las reglas.
    puntajes: {
      rol:           { decido: 3, recomiendo: 2, consulto: 0 },
      plazo:         { este_mes: 3, "1_3_meses": 2, explorando: 0 },
      presupuesto:   { si: 3, gestion: 2, no: 0 },
      participantes: { "1-20": 0, "21-50": 1, "51-150": 2, "mas-150": 2 },
      organizacion:  { colegio_privado: 2, universidad: 2, empresa: 2, colegio_publico: 1, fundacion: 1, independiente: 0 }
    }
  },

  // ----------------------------------------------------------------------
  // ANALÍTICA
  // ----------------------------------------------------------------------
  // Deja los IDs vacíos para no cargar nada. Al llenarlos, los scripts se
  // inyectan solos y los eventos de conversión empiezan a registrarse.
  analytics: {
    ga4Id: "",        // Ej: "G-XXXXXXXXXX"
    metaPixelId: "",  // Ej: "1234567890123456"
    debug: false      // true = imprime cada evento en la consola
  },

  // ----------------------------------------------------------------------
  // LEGAL
  // ----------------------------------------------------------------------
  legal: {
    privacidadUrl: "privacidad.html",
    consentLabel: "Autorizo el tratamiento de mis datos personales conforme a la",
    consentLinkText: "política de privacidad"
  },

  // ----------------------------------------------------------------------
  // UBICACIÓN
  // ----------------------------------------------------------------------
  location: {
    cities: ["Mosquera", "Funza", "Madrid"],
    region: "Sabana de Occidente, Colombia"
  },

  // ----------------------------------------------------------------------
  // TEXTO DEL SITIO
  // ----------------------------------------------------------------------
  content: {
    hero: {
      title: "Para entender el mundo tecnológico,",
      titleHighlight: "resuelve retos reales",
      subtitle: "Siempre hay algo por descubrir, para hacerlo tú pones el ingenio, nosotros, la lúdica y los retos."
    },
    metodo: {
      title: "Aprendizaje por retos",
      description: "Descubre la ciencia construyendo artefactos para resolver problemas. Nuestro ciclo STEM de tres fases —lo que haré, lo que necesito y lo que aplico— asegura un aprendizaje práctico en cualquier nivel educativo."
    },
    publicaciones: {
      title: "Publicaciones",
      description: "Compartimos el conocimiento generado en nuestros laboratorios vivos. Investigaciones, artículos y hallazgos educativos."
    },
    footer: {
      title: "Llevamos el laboratorio a donde estés",
      subtitle: "Déjanos tus datos y nos pondremos en contacto contigo."
    }
  },

  // ----------------------------------------------------------------------
  // PUBLICACIONES/LIBROS
  // ----------------------------------------------------------------------
  publicaciones: [
    {
      id: 1,
      title: "La alegoría del mono",
      fullTitle: "La alegoría del mono: un curioso modo de escudriñar el movimiento de proyectiles",
      author: "Prof. Paco H. Talero L.",
      description: "El libro <i>La alegoría del mono: un curioso modo de escudriñar el movimiento de proyectiles</i>, del profesor Paco H. Talero L., presenta un tratamiento alternativo y conceptualmente provocador para entender el movimiento de proyectiles. Con un enfoque inusual, el autor desafía las metodologías tradicionales para centrarse en suscitar reflexiones fundamentalmente conceptuales sobre las ideas físicas subyacentes.",
      image: "imagenes/ElMonoCH.png"
    },
    {
      id: 2,
      title: "El infinito físico de Zenón",
      fullTitle: "El infinito físico de Zenón: paradoja y sofisma en tres movimientos insólitos",
      author: "Prof. Paco H. Talero L.",
      description: "El libro <i>El infinito físico de Zenón: paradoja y sofisma en tres movimientos insólitos</i>, del profesor Paco H. Talero L., es una invitación desde PhyMaC a explorar las paradojas del movimiento asociadas con el infinito según Zenón. A través de rebotes, particiones y desplazamientos matemáticamente infinitos que se revelan finitos en el mundo físico, el autor propone al lector un disonante juego intelectual que lo lleva del infinito matemático al mundo concreto de problemas físicos concretos.",
      image: "imagenes/Ch_Libro_Verde.png"
    }
  ],

  // ----------------------------------------------------------------------
  // SERVICIOS
  // ----------------------------------------------------------------------
  servicios: [
    {
      id: 1,
      title: "Talleres para Estudiantes",
      description: "Programas educativos prácticos donde los estudiantes aprenden ciencia construyendo artefactos y resolviendo retos reales.",
      icon: "users"
    },
    {
      id: 2,
      title: "Capacitación Docente",
      description: "Formación en metodologías activas, diseño de laboratorios low-cost y estrategias de enseñanza experimental.",
      icon: "wrench"
    },
    {
      id: 3,
      title: "Programas para Adultos Mayores",
      description: "Gimnasia cerebral STEM a través de proyectos maker que promueven la plasticidad cerebral y el aprendizaje continuo.",
      icon: "brain"
    },
    {
      id: 4,
      title: "Consultoría Educativa",
      description: "Asesoría en diseño curricular, implementación de laboratorios y desarrollo de programas STEM personalizados.",
      icon: "layers"
    }
  ]
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

