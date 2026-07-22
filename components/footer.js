/**
 * ----------------------------------------------------------------------
 * COMPONENTE FOOTER - FOOTER MODULAR
 * PhyMaC Web Page - Identidad Visual "Maker Energy"
 * ----------------------------------------------------------------------
 * Footer reutilizable que lee datos de CONFIG.
 *
 * El formulario de contacto vivía aquí y se repetía en todas las páginas.
 * Ahora que existe contacto.html, el footer solo lleva un CTA corto que
 * apunta hacia allá: una sola implementación del formulario, con su
 * consentimiento, en lugar de la misma captura duplicada en cada página.
 *
 * Paleta PhyMaC:
 * - Electric Blue: #2962FF (primario)
 * - Safety Orange: #FF6D00 (CTA)
 * - Carbon Grey: #212121 (texto)
 * - Lab White: #F5F5F5 (fondo)
 */

/**
 * @param {Object}  [opciones]
 * @param {boolean} [opciones.cta=true] Incluir el bloque de llamado a la acción.
 *   Ponlo en false en contacto.html, donde invitar a ir a contacto es redundante.
 */
function createFooter(opciones) {
  // Verificar que CONFIG esté disponible
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG no está definido. Asegúrate de cargar config.js antes de footer.js');
    return '';
  }

  const conCta = !opciones || opciones.cta !== false;

  const footerTitle = CONFIG.content.footer.title;
  const footerSubtitle = CONFIG.content.footer.subtitle;
  const region = CONFIG.location.region;
  const currentYear = new Date().getFullYear();
  const social = CONFIG.social;

  const legal = CONFIG.legal || {};
  const privacidadUrl = legal.privacidadUrl || 'privacidad.html';

  const whatsappUrl = `https://wa.me/${CONFIG.contact.whatsapp.number}?text=${encodeURIComponent(CONFIG.contact.whatsapp.defaultMessage)}`;

  const enlaces = [
    { texto: 'Inicio',              href: 'index.html' },
    { texto: 'El método',           href: 'index.html#metodo' },
    { texto: 'Hablando con profes', href: 'profes.html' },
    { texto: 'Biblioteca',          href: 'biblioteca.html' },
    { texto: 'Contacto y agenda',   href: 'contacto.html' },
    { texto: 'Política de privacidad', href: privacidadUrl }
  ];

  const bloqueCta = !conCta ? '' : `
        <div class="mb-10">
          <h2 class="font-display text-2xl font-extrabold mb-2" style="color: #2962FF;">${footerTitle}</h2>
          <p class="text-sm mb-6 font-body" style="color: #484848;">${footerSubtitle}</p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="contacto.html"
              class="inline-flex items-center justify-center gap-2 text-white font-display font-bold px-6 py-3 rounded-full transition-all transform hover:-translate-y-0.5"
              style="background-color: #2962FF; box-shadow: 0 4px 0 #0039CB; text-decoration: none;"
              onmouseover="this.style.backgroundColor='#768FFF'"
              onmouseout="this.style.backgroundColor='#2962FF'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Escríbenos
            </a>
            <a
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 text-white font-display font-bold px-6 py-3 rounded-full transition-all transform hover:-translate-y-0.5"
              style="background-color: #FF6D00; box-shadow: 0 4px 0 #C43E00; text-decoration: none;"
              onmouseover="this.style.backgroundColor='#FF9E40'"
              onmouseout="this.style.backgroundColor='#FF6D00'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
  `;

  return `
    <footer id="contacto" class="py-14 text-center border-t-4" style="background-color: #F5F5F5; border-color: #2962FF;">
      <div class="max-w-xl mx-auto px-4">
        ${bloqueCta}

        <!-- Redes Sociales -->
        <div class="flex justify-center gap-5">
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

        <!-- Enlaces del sitio: aquí viven las secciones que no están en el
             menú principal, para que el navbar se mantenga corto. -->
        <nav class="mt-8 flex justify-center gap-x-5 gap-y-2 flex-wrap text-sm font-body" aria-label="Enlaces del pie de página">
          ${enlaces.map(e => `<a href="${e.href}" style="color: #757575;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#757575'">${e.texto}</a>`).join('')}
        </nav>

        <p class="mt-6 text-xs font-body" style="color: #9E9E9E;">
          &copy; ${currentYear} PhyMaC | ${region}
        </p>
      </div>
    </footer>
  `;
}

/**
 * Enganches de comportamiento del footer.
 * El formulario se mudó a contacto.html, así que hoy no hay nada que
 * inicializar. Se mantiene la función porque varias páginas la invocan
 * tras inyectar el footer.
 */
function initFooterBehavior() {
  /* sin comportamiento propio */
}
