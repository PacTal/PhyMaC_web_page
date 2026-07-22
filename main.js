/**
 * ----------------------------------------------------------------------
 * MAIN.JS - SCRIPT PRINCIPAL
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Carga la configuración e inicializa componentes modulares
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar que CONFIG esté disponible
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG no está definido. Asegúrate de cargar config.js antes de main.js');
    return;
  }

  // Inicializar header
  initHeader();
  
  // Inicializar footer
  initFooter();
  
  // Inicializar scroll suave
  initSmoothScroll();
  
  // Inicializar animaciones al hacer scroll
  initScrollAnimations();
});

/**
 * Inicializar el header
 */
function initHeader() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer && typeof createHeader === 'function') {
    headerContainer.innerHTML = createHeader();
    // Inicializar comportamiento del header (menú móvil)
    if (typeof initHeaderBehavior === 'function') {
      initHeaderBehavior();
    }
  }
}

/**
 * Inicializar el footer
 */
function initFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && typeof createFooter === 'function') {
    footerContainer.innerHTML = createFooter();
    // Inicializar comportamiento del footer (formulario)
    if (typeof initFooterBehavior === 'function') {
      initFooterBehavior();
    }
  }
}

/**
 * Inicializar scroll suave para enlaces internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80; // Altura del navbar
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Inicializar animaciones al hacer scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con clase 'scroll-animate'
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Función auxiliar para generar enlace de WhatsApp con mensaje personalizado
 * Disponible globalmente
 */
window.getWhatsAppLink = function(message = null) {
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG no está definido');
    return '#';
  }
  const defaultMessage = message || CONFIG.contact.whatsapp.defaultMessage;
  return `https://wa.me/${CONFIG.contact.whatsapp.number}?text=${encodeURIComponent(defaultMessage)}`;
};

/**
 * Función auxiliar para formatear fechas
 * Disponible globalmente
 * Si el día es 1, solo muestra mes y año
 */
window.formatDate = function(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  if (day === 1) {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
  } else {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }
};

