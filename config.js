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
    email: "contacto@phymac.com",
    formspree: {
      endpoint: "https://formspree.io/f/xkgdzeda" // Reemplazar con tu ID de Formspree
    }
  },

  // ----------------------------------------------------------------------
  // REDES SOCIALES
  // ----------------------------------------------------------------------
  social: {
    facebook: "https://facebook.com/phymac",
    instagram: "https://instagram.com/phymac",
    linkedin: "https://linkedin.com/company/phymac",
    twitter: "https://twitter.com/phymac"
  },

  // ----------------------------------------------------------------------
  // MENÚ DE NAVEGACIÓN
  // ----------------------------------------------------------------------
  menu: {
    items: [
      { text: "Inicio", href: "index.html" },
      { text: "El método", href: "index.html#metodo" },
      { text: "Proyectos", href: "index.html#proyectos" },
      { text: "Servicios", href: "servicios.html" },
      { text: "Blog", href: "blog.html" },
      { text: "Publicaciones", href: "publicaciones.html" }
    ]
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
    proyectos: {
      title: "Así luce la ciencia en acción.",
      ctaText: "Ver más casos de éxito"
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
  // PROYECTOS/CASOS DE ÉXITO
  // ----------------------------------------------------------------------
  proyectos: [
    {
      id: 1,
      title: "Física de Cohetes",
      description: "Aprendiendo leyes de Newton lanzando proyectiles a 50 metros.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Estudiantes",
      categoryColor: "cyan-400",
      blogId: 2 // Relacionado con el artículo "Física de Cohetes: Aprendiendo las Leyes de Newton en Acción"
    },
    {
      id: 2,
      title: "Didáctica Experimental",
      description: "Capacitación en metodologías activas y diseño de laboratorios low-cost.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Docentes",
      categoryColor: "purple-400",
      blogId: 6 // Relacionado con el artículo "Capacitación Docente: Metodologías Activas en el Aula"
    },
    {
      id: 3,
      title: "Gimnasia Cerebral STEM",
      description: "Recuperando la plasticidad cerebral a través de proyectos maker.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Adulto Mayor",
      categoryColor: "orange-400",
      blogId: 4 // Relacionado con el artículo "Gimnasia Cerebral STEM: Ciencia para Adultos Mayores"
    }
  ],

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

