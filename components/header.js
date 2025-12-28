/**
 * ----------------------------------------------------------------------
 * COMPONENTE HEADER - NAVBAR MODULAR
 * PhyMaC Web Page - Identidad Visual "Maker Energy"
 * ----------------------------------------------------------------------
 * Componente reutilizable del navbar que lee datos de CONFIG
 * 
 * Paleta PhyMaC:
 * - Electric Blue: #2962FF (primario)
 * - Safety Orange: #FF6D00 (CTA)
 * - Carbon Grey: #212121 (texto)
 */

function createHeader() {
  // Verificar que CONFIG esté disponible
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG no está definido. Asegúrate de cargar config.js antes de header.js');
    return '';
  }

  const whatsappUrl = `https://wa.me/${CONFIG.contact.whatsapp.number}?text=${encodeURIComponent(CONFIG.contact.whatsapp.defaultMessage)}`;
  const logoUrl = CONFIG.logo.url;
  const logoAlt = CONFIG.logo.alt;
  const logoFallback = CONFIG.logo.fallbackText;
  const ctaText = CONFIG.contact.whatsapp.ctaText;
  const menuItems = CONFIG.menu.items;

  return `
    <nav class="bg-white border-b-2 border-gray-200 fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          
          <!-- ZONA DEL LOGO -->
          <a href="index.html" class="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            
            <!-- CONTENEDOR PARA LA IMAGEN DEL LOGO -->
            <div class="h-12 w-12 flex items-center justify-center relative transition-all">
              <img 
                id="logo-img"
                src="${logoUrl}" 
                alt="${logoAlt}" 
                class="h-full w-full object-contain" 
                referrerpolicy="no-referrer"
                onerror="this.style.display='none'; document.getElementById('logo-fallback').style.display='flex';"
              />
              <div id="logo-fallback" class="hidden flex-col items-center justify-center text-center h-full w-full">
                <span class="font-bold text-lg tracking-tighter font-display leading-none" style="color: #2962FF;">${logoFallback}</span>
              </div>
            </div>
            
            <span class="font-extrabold text-3xl tracking-tighter font-display border-b-3 pb-0.5 hidden sm:block transition-colors group-hover:text-phymac-orange group-hover:border-phymac-orange" style="color: #2962FF; border-bottom: 3px solid #2962FF;">${logoFallback}</span>
          </a>
          
          <!-- MENÚ DE ESCRITORIO -->
          <div class="hidden md:flex space-x-6 items-center text-sm font-semibold font-body">
            ${menuItems.map(item => {
              let href = item.href;
              // Si el href empieza con #, agregar index.html antes para que funcione desde cualquier página
              if (href.startsWith('#') && !href.startsWith('index.html')) {
                href = 'index.html' + href;
              }
              return `<a href="${href}" class="transition menu-link hover:text-phymac-orange" style="color: #484848;" data-href="${item.href}">${item.text}</a>`;
            }).join('')}
            <a 
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all transform hover:-translate-y-0.5 font-display font-bold"
              style="background-color: #FF6D00; box-shadow: 0 3px 0 #C43E00;"
              onmouseover="this.style.backgroundColor='#FF9E40'"
              onmouseout="this.style.backgroundColor='#FF6D00'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              ${ctaText}
            </a>
          </div>

          <!-- BOTÓN MENÚ MÓVIL -->
          <div class="md:hidden flex items-center">
            <button id="menu-toggle" class="focus:outline-none transition-colors" style="color: #2962FF;">
              <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <svg id="close-icon" class="hidden" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- MENÚ MÓVIL DESPLEGABLE -->
      <div id="mobile-menu" class="hidden md:hidden bg-white border-t-2 p-4 space-y-2 text-center" style="border-color: #E0E0E0;">
        ${menuItems.map(item => {
          let href = item.href;
          // Si el href empieza con #, agregar index.html antes para que funcione desde cualquier página
          if (href.startsWith('#') && !href.startsWith('index.html')) {
            href = 'index.html' + href;
          }
          return `<a href="${href}" class="block py-3 font-display font-bold menu-link transition-colors" style="color: #212121;" data-href="${item.href}">${item.text}</a>`;
        }).join('')}
        <a 
          href="${whatsappUrl}" 
          class="block mt-4 text-white px-4 py-3 rounded-full font-display font-bold text-lg"
          style="background-color: #FF6D00;"
        >
          ${ctaText}
        </a>
      </div>
    </nav>
  `;
}

// Función para inicializar el comportamiento del menú móvil
function initHeaderBehavior() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuToggle && mobileMenu) {
    // Remover listeners anteriores si existen
    const newToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newToggle, menuToggle);
    
    const newMenu = mobileMenu.cloneNode(true);
    mobileMenu.parentNode.replaceChild(newMenu, mobileMenu);
    
    // Obtener referencias frescas
    const freshToggle = document.getElementById('menu-toggle');
    const freshMenu = document.getElementById('mobile-menu');
    const freshMenuIcon = document.getElementById('menu-icon');
    const freshCloseIcon = document.getElementById('close-icon');

    if (freshToggle && freshMenu) {
      freshToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = freshMenu.classList.contains('hidden');
        
        if (isHidden) {
          freshMenu.classList.remove('hidden');
          if (freshMenuIcon) freshMenuIcon.classList.add('hidden');
          if (freshCloseIcon) freshCloseIcon.classList.remove('hidden');
        } else {
          freshMenu.classList.add('hidden');
          if (freshMenuIcon) freshMenuIcon.classList.remove('hidden');
          if (freshCloseIcon) freshCloseIcon.classList.add('hidden');
        }
      });

      // Cerrar menú al hacer clic en un enlace
      const mobileLinks = freshMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Pequeño delay para permitir la navegación
          setTimeout(() => {
            freshMenu.classList.add('hidden');
            if (freshMenuIcon) freshMenuIcon.classList.remove('hidden');
            if (freshCloseIcon) freshCloseIcon.classList.add('hidden');
          }, 100);
        });
      });

      // Cerrar menú al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (freshMenu && !freshMenu.contains(e.target) && !freshToggle.contains(e.target)) {
          if (!freshMenu.classList.contains('hidden')) {
            freshMenu.classList.add('hidden');
            if (freshMenuIcon) freshMenuIcon.classList.remove('hidden');
            if (freshCloseIcon) freshCloseIcon.classList.add('hidden');
          }
        }
      });
    }
  }

  // Ajustar enlaces del menú según la página actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('.menu-link');
  
  menuLinks.forEach(link => {
    const originalHref = link.getAttribute('data-href');
    if (originalHref && originalHref.startsWith('#') && currentPage !== 'index.html') {
      link.href = 'index.html' + originalHref;
    }
  });
}
