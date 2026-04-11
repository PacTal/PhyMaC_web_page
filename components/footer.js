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

        <!-- Redes Sociales -->
        <div class="mt-8 flex justify-center gap-5">
          ${social.instagram ? `<a href="${social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>` : ''}
          ${social.facebook ? `<a href="${social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>` : ''}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>` : ''}
          ${social.tiktok ? `<a href="${social.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            </svg>
          </a>` : ''}
        </div>

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
