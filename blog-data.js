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
    title: "Propulsión de cohetes: aprendiendo las leyes de Newton con cohetes dirigidos",
    slug: "propulsion-cohetes-leyes-newton",
    date: "2025-12-01",
    author: "PhyMaC",
    category: "Proyectos",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Un proyecto práctico donde estudiantes lanzan cohetes mientras aprenden las leyes fundamentales de la física de manera experiencial.",
    content: `
      <p>En construcción</p>
    `
  },
  {
    id: 4,
    title: "Gimnasia Cerebral STEM: actividades cognitivas para adultos mayores",
    slug: "gimnasia-cerebral-stem-adultos-mayores",
    date: "2024-03-20",
    author: "Equipo PhyMaC",
    category: "Programas",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Programa innovador que combina proyectos maker con neurociencia para promover la plasticidad cerebral en adultos mayores. Resultados prometedores en salud cognitiva.",
    content: `
      <p>En construcción</p>
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
    title: "Capacitación docente: Metodologías activas con Arduino",
    slug: "capacitacion-docente-metodologias-activas-arduino",
    date: "2026-04-01",
    author: "Equipo PhyMaC",
    category: "Capacitación",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Programa de formación para docentes que desean implementar metodologías activas y aprendizaje por proyectos en sus aulas. Herramientas prácticas y recursos listos para usar.",
    content: `
      <p>En construcción</p>
    `
  }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BLOG_POSTS;
}


