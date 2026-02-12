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
        <li><strong>Lo que haré:</strong> Diseñar y planificar la solución</li>
        <li><strong>Lo que necesito:</strong> Identificar los conocimientos y recursos necesarios</li>
        <li><strong>Lo que aplico:</strong> Poner en práctica los conocimientos adquiridos</li>
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
    date: "2025-11-01",
    author: "Equipo PhyMaC",
    category: "Capacitación",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Programa de formación para docentes que desean implementar metodologías activas y aprendizaje por proyectos en sus aulas. Herramientas prácticas y recursos listos para usar.",
    content: `
      <p>En construcción</p>
    `
  },
  {
    id: 7,
    title: "¡Acción y reacción en el Rosal! Un reto de ingeniería con la fundación CreSiendo",
    slug: "accion-reaccion-rosal-fundacion-cresiendo",
    date: "2026-02-05",
    author: "Equipo PhyMaC",
    category: "Proyectos",
    image: "imagenes/img1.jpeg",
    summary: "Experiencia educativa en la vereda El Rosal donde niños y jóvenes construyeron cohetes propulsados por aire para comprender la tercera ley de Newton de forma práctica y colaborativa.",
    content: `
      <p>En PhyMaC explicamos la ciencia más allá de un tablero; la descubrimos construyendo. Recientemente, aceptamos un nuevo desafío: llevar nuestro laboratorio a la fundación CreSiendo en la vereda El Rosal, donde disfrutamos del ingenio de niños y jóvenes que movieron un objeto aprovechando el aire.</p>
      
      <h3>El reto: cohetes propulsados por aire (Newton en la vida real)</h3>
      <p>Para entender la tercera ley de Newton (acción y reacción), hay que verla funcionar. La actividad principal consistió en la construcción de un artefacto sencillo pero poderoso: un cohete impulsado por aire.</p>
      
      <p>Los participantes, con edades entre los ocho y quince años, tuvieron que manipular materiales como cintas, palillos y globos. Durante la actividad reflexionaron sobre:</p>
      <ul>
        <li>¿Qué voy a hacer?</li>
        <li>¿Qué necesito?</li>
        <li>¿Cómo aplico lo aprendido?</li>
      </ul>
      
      <p>Este enfoque hace parte de nuestro ciclo STEM de tres fases, diseñado para promover un aprendizaje práctico donde la experimentación es el centro del proceso.</p>
      
      <h3>Ingenio colaborativo: "makers" apoyando a "makers"</h3>
      <p>La jornada presentó desafíos reales. Para los niños más pequeños (8-10 años), la manipulación de los materiales y la lógica del cohete resultaron ser un reto exigente. Sin embargo, aquí es donde brilla el aprendizaje colaborativo.</p>
      
      <p>Dos jóvenes de quince años asumieron el rol de monitores, guiando a sus pares más pequeños y ayudándoles a resolver problemas técnicos sobre la marcha. Gracias a este apoyo y al acompañamiento de nuestro equipo facilitador, todos lograron involucrarse y ver sus prototipos en acción.</p>
      
      <h3>Así luce la ciencia en acción</h3>
      <div style="text-align: center; margin: 2rem 0;">
        <img src="imagenes/img2.jpeg" alt="Niño construyendo cohete propulsado por aire" style="max-width: 500px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem; font-style: italic;">Un participante ensambla su cohete de globo con ayuda de un facilitador</p>
      </div>
      
      <h3>Resultados y proyección</h3>
      <p>Más allá de la diversión, buscábamos que los niños reconocieran la física detrás del juego: la relación entre la dirección del aire expulsado y el movimiento del cohete. Se observó una comprensión inicial del fenómeno, validando que la construcción de artefactos es una estrategia efectiva para aprender ciencia.</p>
      
      <p>Para continuar el aprendizaje, dejamos planteado el reto llamado, <strong>El cohete dirigido</strong>. En casa los niños diseñarán un nuevo cohete, lo dibujarán y explicarán porque llegará más alto.</p>
      
      <p style="text-align: center; margin: 1.5rem 0;">
        <a href="https://drive.google.com/file/d/1ZWCNQd9gN3YVZn8MV01qZty2YMOFh4xJ/view?usp=sharing" 
           target="_blank" 
           rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all"
           style="background-color: #2962FF; color: white; text-decoration: none; box-shadow: 0 3px 0 #0039CB;"
           onmouseover="this.style.backgroundColor='#768FFF'"
           onmouseout="this.style.backgroundColor='#2962FF'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Descargar guía del reto: El Cohete Dirigido (PDF)
        </a>
      </p>
      
      <h3>Agradecimientos</h3>
      <p>Agradecemos a la Fundación CreSiendo por abrirnos sus puertas y confiar en propuestas educativas que fomentan el aprendizaje activo. Fue una jornada de ciencia viva, donde demostramos una vez más que aprender ciencia es explorar, preguntar, crear y compartir.</p>
      
      <h3>¿Listo para llevar el enfoque Maker a tu comunidad?</h3>
      <p>¿Te gustaría que PhyMaC diseñe un reto STEM a la medida para tu institución o grupo? Conversemos sobre cómo transformar la teoría en artefactos tangibles.</p>
    `
  },
  {
    id: 8,
    title: "Ciencia con Sello de Mujer: Perspectivas y desafíos en la tecnología",
    slug: "ciencia-sello-mujer-perspectivas-desafios-tecnologia",
    date: "2026-02-11",
    author: "Equipo PhyMaC",
    category: "Otros",
    image: "https://img.youtube.com/vi/pIY0BgIwMIk/maxresdefault.jpg",
    summary: "En el Día Internacional de la Mujer y la Niña en la Ciencia, compartimos las experiencias de mujeres líderes que están transformando el panorama científico en Colombia.",
    content: `
      <p>En PhyMaC celebramos la ciencia que nace de la curiosidad y se fortalece con la persistencia. En el marco del <em>Día Internacional de la Mujer y la Niña en la Ciencia</em>, compartimos las experiencias de mujeres líderes que están transformando el panorama científico en Colombia.</p>

      <h3>El mensaje: "Este camino también es de ustedes"</h3>
      <p>Las protagonistas coinciden en que las brechas de género se derrotan con acciones concretas. Sus consejos para las niñas que sienten interés por la física, la química o la biología son directos:</p>
      <ol>
        <li><strong>Persiste:</strong> La ciencia nace de la curiosidad con la que se convive toda la vida.</li>
        <li><strong>Arriésgate:</strong> No pasa nada si se falla o se pierde una materia; lo importante es ser disciplinada.</li>
        <li><strong>Tu voz cuenta:</strong> Las opiniones y perspectivas femeninas son válidas y necesarias para el avance del conocimiento.</li>
      </ol>

      <h3>Perspectivas en video</h3>
      <p>Te invitamos a conocer estas historias de viva voz y a descubrir por qué "sí se puede" hacer carrera en las ciencias básicas e ingeniería:</p>

      <div style="text-align: center; margin: 2rem 0;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
          <iframe 
            src="https://www.youtube.com/embed/pIY0BgIwMIk" 
            title="Perspectivas y desafíos en la tecnología - Completo"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
          </iframe>
        </div>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.75rem; font-style: italic;">Perspectivas y desafíos en la tecnología — Video completo</p>
      </div>

      <div style="text-align: center; margin: 2rem auto;">
        <div style="position: relative; padding-bottom: 177.78%; height: 0; overflow: hidden; max-width: 360px; margin: 0 auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
          <iframe 
            src="https://www.youtube.com/embed/u_IN1UNdhNI" 
            title="Testimonio Mary Verdugo - Short"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
          </iframe>
        </div>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.75rem; font-style: italic;">Testimonio Mari Verdugo — Short</p>
      </div>

      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e0e0e0;">

      <p><em>¿Buscas fomentar el liderazgo femenino en STEM?</em><br>
      En PhyMaC diseñamos experiencias educativas para inspirar a las próximas generaciones de científicas. ¿Te gustaría conocer más sobre nuestros proyectos? ¡Hablemos!</p>
    `
  }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BLOG_POSTS;
}


