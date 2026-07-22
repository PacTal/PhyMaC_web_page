/**
 * ----------------------------------------------------------------------
 * COMPONENTE FOOTER - FOOTER MODULAR
 * PhyMaC Web Page - Identidad Visual "Maker Energy"
 * ----------------------------------------------------------------------
 * Footer reutilizable que lee datos de CONFIG.
 *
 * El formulario de contacto vivía aquí y se repetía en todas las páginas.
 * Ahora que existe contacto.html, el footer no llama a la acción: solo
 * cierra la página con redes, enlaces y créditos. Las llamadas a la acción
 * viven donde tienen contexto, no repetidas al pie de cada página.
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

  const region = CONFIG.location.region;
  const currentYear = new Date().getFullYear();
  const social = CONFIG.social;

  const legal = CONFIG.legal || {};
  const privacidadUrl = legal.privacidadUrl || 'privacidad.html';

  const enlaces = [
    { texto: 'Inicio',              href: 'index.html' },
    { texto: 'El método',           href: 'index.html#metodo' },
    { texto: 'Hablando con profes', href: 'profes.html' },
    { texto: 'Biblioteca',          href: 'biblioteca.html' },
    { texto: 'Contacto y agenda',   href: 'contacto.html' },
    { texto: 'Política de privacidad', href: privacidadUrl }
  ];

  return `
    <footer id="contacto" class="py-14 text-center border-t-4" style="background-color: #F5F5F5; border-color: #2962FF;">
      <div class="max-w-xl mx-auto px-4">

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
