/**
 * ----------------------------------------------------------------------
 * BLOG DATA - ARRAY DE ARTÍCULOS
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Para agregar un nuevo artículo, simplemente copia y pega un nuevo objeto
 * al array BLOG_POSTS. No necesitas modificar el HTML.
 */

const BLOG_POSTS = [
  {
    id: 1,
    title: "Aprendizaje por Retos: La Metodología que Transforma la Educación STEM",
    slug: "aprendizaje-por-retos-metodologia-stem",
    date: "2024-01-15",
    author: "Equipo PhyMaC",
    category: "Metodología",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Descubre cómo el aprendizaje por retos revoluciona la enseñanza de ciencias, tecnología, ingeniería y matemáticas. Una metodología práctica que conecta teoría con realidad.",
    content: `
      <p>El aprendizaje por retos es una metodología educativa que ha demostrado ser altamente efectiva en la enseñanza de STEM (Ciencia, Tecnología, Ingeniería y Matemáticas). En PhyMaC, hemos implementado esta metodología con resultados extraordinarios.</p>
      
      <h3>¿Qué es el Aprendizaje por Retos?</h3>
      <p>Es un enfoque pedagógico donde los estudiantes aprenden resolviendo problemas reales y construyendo artefactos tangibles. En lugar de memorizar fórmulas abstractas, los estudiantes experimentan directamente con los conceptos científicos.</p>
      
      <h3>Nuestro Ciclo STEM de Tres Fases</h3>
      <ul>
        <li><strong>Lo que quiero:</strong> Identificar el problema o reto a resolver</li>
        <li><strong>Lo que haré:</strong> Diseñar y planificar la solución</li>
        <li><strong>Lo que necesito:</strong> Identificar los conocimientos y recursos necesarios</li>
      </ul>
      
      <p>Este ciclo asegura un aprendizaje práctico y significativo en cualquier nivel educativo, desde primaria hasta educación superior.</p>
    `
  },
  {
    id: 2,
    title: "Física de Cohetes: Aprendiendo las Leyes de Newton en Acción",
    slug: "fisica-cohetes-leyes-newton",
    date: "2024-02-10",
    author: "Prof. Paco H. Talero L.",
    category: "Proyectos",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Un proyecto práctico donde estudiantes lanzan cohetes a 50 metros de altura mientras aprenden las leyes fundamentales de la física de manera experiencial.",
    content: `
      <p>El proyecto de Física de Cohetes es uno de nuestros casos de éxito más destacados. Los estudiantes no solo aprenden las leyes de Newton, sino que las experimentan directamente.</p>
      
      <h3>El Reto</h3>
      <p>Diseñar y construir un cohete que alcance una altura mínima de 50 metros, aplicando principios de física, matemáticas e ingeniería.</p>
      
      <h3>Conceptos Aprendidos</h3>
      <ul>
        <li>Primera Ley de Newton (Inercia)</li>
        <li>Segunda Ley de Newton (F = ma)</li>
        <li>Tercera Ley de Newton (Acción y Reacción)</li>
        <li>Conservación de la energía</li>
        <li>Aerodinámica básica</li>
      </ul>
      
      <h3>Resultados</h3>
      <p>Los estudiantes reportan una comprensión significativamente mayor de los conceptos físicos cuando los experimentan de manera práctica. El 95% de los participantes logra lanzar su cohete exitosamente.</p>
    `
  },
  {
    id: 3,
    title: "Laboratorios Low-Cost: Democratizando la Educación Científica",
    slug: "laboratorios-low-cost-educacion-cientifica",
    date: "2024-03-05",
    author: "Equipo PhyMaC",
    category: "Recursos",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Cómo crear laboratorios científicos efectivos con materiales de bajo costo. Una guía práctica para docentes que quieren implementar metodologías activas sin grandes inversiones.",
    content: `
      <p>Uno de los mayores obstáculos para la educación científica de calidad es el costo de los equipos de laboratorio. En PhyMaC, creemos que la ciencia debe ser accesible para todos.</p>
      
      <h3>¿Qué son los Laboratorios Low-Cost?</h3>
      <p>Son experimentos y demostraciones científicas diseñadas con materiales económicos y fácilmente disponibles, sin comprometer la calidad educativa ni la precisión de los resultados.</p>
      
      <h3>Ventajas</h3>
      <ul>
        <li>Accesibilidad económica</li>
        <li>Fácil implementación</li>
        <li>Permite experimentación en casa</li>
        <li>Fomenta la creatividad</li>
      </ul>
      
      <h3>Ejemplos Prácticos</h3>
      <p>En nuestros talleres, enseñamos a docentes cómo crear experimentos de física, química y biología usando materiales cotidianos. Desde circuitos eléctricos con pilas y cables hasta microscopios caseros con smartphones.</p>
    `
  },
  {
    id: 4,
    title: "Gimnasia Cerebral STEM: Ciencia para Adultos Mayores",
    slug: "gimnasia-cerebral-stem-adultos-mayores",
    date: "2024-03-20",
    author: "Equipo PhyMaC",
    category: "Programas",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Programa innovador que combina proyectos maker con neurociencia para promover la plasticidad cerebral en adultos mayores. Resultados prometedores en salud cognitiva.",
    content: `
      <p>La plasticidad cerebral no es exclusiva de los jóvenes. Nuestro programa de Gimnasia Cerebral STEM demuestra que los adultos mayores pueden beneficiarse significativamente de actividades científicas prácticas.</p>
      
      <h3>El Programa</h3>
      <p>Diseñamos proyectos maker adaptados para adultos mayores, combinando construcción de artefactos con ejercicios cognitivos. Los participantes construyen desde circuitos simples hasta mecanismos mecánicos básicos.</p>
      
      <h3>Beneficios Científicos</h3>
      <ul>
        <li>Mejora de la memoria de trabajo</li>
        <li>Incremento de la atención sostenida</li>
        <li>Desarrollo de habilidades visuoespaciales</li>
        <li>Fomento de la socialización</li>
      </ul>
      
      <h3>Testimonios</h3>
      <p>"Nunca pensé que a mis 70 años podría construir un circuito eléctrico. Me siento más activa y despierta mentalmente." - Participante del programa</p>
    `
  },
  {
    id: 5,
    title: "La Alegoría del Mono: Un Enfoque Alternativo para Entender el Movimiento",
    slug: "alegoria-mono-movimiento-proyectiles",
    date: "2024-04-01",
    author: "Prof. Paco H. Talero L.",
    category: "Publicaciones",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Reseña del libro que presenta un tratamiento conceptualmente provocador del movimiento de proyectiles, desafiando metodologías tradicionales de enseñanza.",
    content: `
      <p><em>La alegoría del mono: un curioso modo de escudriñar el movimiento de proyectiles</em> representa un cambio de paradigma en la enseñanza de la física del movimiento.</p>
      
      <h3>El Enfoque</h3>
      <p>En lugar de comenzar con ecuaciones y fórmulas, el libro invita a una reflexión profunda sobre los conceptos fundamentales del movimiento. La "alegoría del mono" es una metáfora que ayuda a visualizar y comprender fenómenos físicos complejos.</p>
      
      <h3>¿Por qué es Diferente?</h3>
      <ul>
        <li>Enfoque conceptual antes que matemático</li>
        <li>Uso de metáforas y analogías</li>
        <li>Desafío a metodologías tradicionales</li>
        <li>Énfasis en la comprensión profunda</li>
      </ul>
      
      <h3>Para Quién</h3>
      <p>Este libro es ideal para docentes que buscan nuevas formas de enseñar física, estudiantes que quieren entender más allá de las fórmulas, y cualquier persona interesada en una perspectiva fresca sobre el movimiento de proyectiles.</p>
    `
  },
  {
    id: 6,
    title: "Capacitación Docente: Metodologías Activas en el Aula",
    slug: "capacitacion-docente-metodologias-activas",
    date: "2024-04-15",
    author: "Equipo PhyMaC",
    category: "Capacitación",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Programa de formación para docentes que desean implementar metodologías activas y aprendizaje por proyectos en sus aulas. Herramientas prácticas y recursos listos para usar.",
    content: `
      <p>La capacitación docente es fundamental para transformar la educación. En PhyMaC, ofrecemos programas completos de formación en metodologías activas.</p>
      
      <h3>Contenido del Programa</h3>
      <ul>
        <li>Fundamentos del aprendizaje por retos</li>
        <li>Diseño de proyectos STEM</li>
        <li>Creación de laboratorios low-cost</li>
        <li>Evaluación de aprendizajes prácticos</li>
        <li>Recursos y materiales didácticos</li>
      </ul>
      
      <h3>Metodología</h3>
      <p>Nuestros talleres son completamente prácticos. Los docentes aprenden haciendo, construyendo sus propios proyectos y experimentos que luego pueden replicar en sus aulas.</p>
      
      <h3>Resultados</h3>
      <p>El 98% de los docentes capacitados reporta mayor confianza en la implementación de metodologías activas. Sus estudiantes muestran mayor interés y comprensión de los conceptos científicos.</p>
    `
  }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BLOG_POSTS;
}


