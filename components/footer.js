/**
 * ----------------------------------------------------------------------
 * COMPONENTE FOOTER - FOOTER MODULAR
 * PhyMaC Web Page - Identidad Visual "Maker Energy"
 * ----------------------------------------------------------------------
 * Componente reutilizable del footer con formulario Formspree
 * 
 * Paleta PhyMaC:
 * - Electric Blue: #2962FF (primario)
 * - Safety Orange: #FF6D00 (CTA)
 * - Carbon Grey: #212121 (texto)
 * - Lab White: #F5F5F5 (fondo)
 */

function createFooter() {
  // Verificar que CONFIG esté disponible
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG no está definido. Asegúrate de cargar config.js antes de footer.js');
    return '';
  }

  const formspreeEndpoint = CONFIG.contact.formspree.endpoint;
  const footerTitle = CONFIG.content.footer.title;
  const footerSubtitle = CONFIG.content.footer.subtitle;
  const cities = CONFIG.location.cities;
  const region = CONFIG.location.region;
  const currentYear = new Date().getFullYear();
  const social = CONFIG.social;

  return `
    <footer class="py-16 text-center border-t-4" style="background-color: #F5F5F5; border-color: #2962FF;">
      <div class="max-w-xl mx-auto px-4">
        <div class="mb-8">
          <h2 class="font-display text-2xl font-extrabold mb-2" style="color: #2962FF;">${footerTitle}</h2>
          <p class="text-sm mt-2 font-body" style="color: #484848;">${footerSubtitle}</p>
        </div>
        
        <!-- Formulario de Contacto -->
        <form id="contact-form" action="${formspreeEndpoint}" method="POST" class="p-6 md:p-8 rounded-2xl text-left space-y-4" style="background-color: white; border: 2px solid #E0E0E0;">
          <div>
            <label for="nombre" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">Tu nombre</label>
            <input 
              type="text" 
              id="nombre"
              name="nombre"
              required
              class="w-full px-4 py-3 rounded-xl outline-none transition font-body"
              style="border: 2px solid #E0E0E0; background-color: #F5F5F5;"
              onfocus="this.style.borderColor='#2962FF'; this.style.boxShadow='0 0 0 3px rgba(41, 98, 255, 0.15)'"
              onblur="this.style.borderColor='#E0E0E0'; this.style.boxShadow='none'"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          
          <div>
            <label for="celular" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">WhatsApp / Celular</label>
            <input 
              type="tel" 
              id="celular"
              name="celular"
              required
              class="w-full px-4 py-3 rounded-xl outline-none transition font-body"
              style="border: 2px solid #E0E0E0; background-color: #F5F5F5;"
              onfocus="this.style.borderColor='#2962FF'; this.style.boxShadow='0 0 0 3px rgba(41, 98, 255, 0.15)'"
              onblur="this.style.borderColor='#E0E0E0'; this.style.boxShadow='none'"
              placeholder="Ej. 300 123 4567"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">Correo electrónico</label>
            <input 
              type="email" 
              id="email"
              name="email"
              class="w-full px-4 py-3 rounded-xl outline-none transition font-body"
              style="border: 2px solid #E0E0E0; background-color: #F5F5F5;"
              onfocus="this.style.borderColor='#2962FF'; this.style.boxShadow='0 0 0 3px rgba(41, 98, 255, 0.15)'"
              onblur="this.style.borderColor='#E0E0E0'; this.style.boxShadow='none'"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label for="mensaje" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">Mensaje (Opcional)</label>
            <textarea 
              id="mensaje"
              name="mensaje"
              rows="2"
              class="w-full px-4 py-3 rounded-xl outline-none transition font-body"
              style="border: 2px solid #E0E0E0; background-color: #F5F5F5;"
              onfocus="this.style.borderColor='#2962FF'; this.style.boxShadow='0 0 0 3px rgba(41, 98, 255, 0.15)'"
              onblur="this.style.borderColor='#E0E0E0'; this.style.boxShadow='none'"
              placeholder="¿Qué te interesa aprender o enseñar?"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="w-full text-white font-display font-bold py-4 px-8 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-4"
            style="background-color: #2962FF; box-shadow: 0 4px 0 #0039CB;"
            onmouseover="this.style.backgroundColor='#768FFF'"
            onmouseout="this.style.backgroundColor='#2962FF'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Enviar
          </button>
        </form>

        <!-- Redes Sociales - TEMPORALMENTE OCULTAS -->
        <!--
        <div class="mt-8 flex justify-center gap-4">
          ${social.facebook ? `<a href="${social.facebook}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>` : ''}
          ${social.instagram ? `<a href="${social.instagram}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>` : ''}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>` : ''}
          ${social.twitter ? `<a href="${social.twitter}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>` : ''}
        </div>
        -->

        <!-- Ubicación - TEMPORALMENTE OCULTA -->
        <!--
        <div class="mt-8 flex justify-center gap-4 text-sm flex-wrap font-body" style="color: #757575;">
          ${cities.map(city => `
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${city}
            </span>
          `).join('')}
        </div>
        -->

        <p class="mt-8 text-xs font-body" style="color: #9E9E9E;">
          &copy; ${currentYear} PhyMaC | ${region}
        </p>
      </div>
    </footer>
  `;
}

// Función para manejar el envío del formulario
function initFooterBehavior() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // El formulario se enviará a Formspree automáticamente
      // Podemos agregar feedback visual aquí si es necesario
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        submitButton.style.backgroundColor = '#768FFF';
        
        // Restaurar después de un tiempo (Formspree manejará el redirect)
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.style.backgroundColor = '#2962FF';
          submitButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Enviar
          `;
        }, 3000);
      }
    });
  }
}
