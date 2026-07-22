/**
 * ----------------------------------------------------------------------
 * COMPONENTE LEAD-FORM - CAPTURA DE DATOS A CAMBIO DE MATERIAL
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Bloque reutilizable "Descarga la guía": pide nombre, correo y rol con
 * consentimiento obligatorio (Ley 1581 de 2012) y, tras un envío exitoso,
 * revela el enlace de descarga en pantalla.
 *
 * Uso:
 *   contenedor.innerHTML = createLeadForm({ ...opciones });
 *   initLeadForm({ ...las mismas opciones });
 *
 * Depende de: config.js (endpoints y textos legales), analytics.js (trackEvent)
 */

/* --------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------- */

/** Escapa HTML para interpolar texto en plantillas sin abrir XSS. */
function leadEscape(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Normaliza la URL del material. Los PDF subidos por el CMS llegan como
 * ruta del repo; los de Google Drive se convierten a descarga directa.
 */
function leadResolveArchivo(url) {
  if (!url) return '';
  if (url.indexOf('drive.google.com') === -1) return url;
  if (url.indexOf('/export') !== -1) return url;
  return url.replace(/\/view.*$/, '/export?format=pdf');
}

/** Endpoint de Formspree para materiales, con respaldo al general. */
function leadEndpoint() {
  if (typeof CONFIG === 'undefined' || !CONFIG.contact || !CONFIG.contact.formspree) return '';
  var fs = CONFIG.contact.formspree;
  return fs.materiales || fs.endpoint || '';
}

/** Lee un parámetro de la URL actual. */
function leadQueryParam(name) {
  try {
    return new URLSearchParams(window.location.search).get(name) || '';
  } catch (e) {
    return '';
  }
}

/** Datos recordados de una descarga anterior, para no repetir la fricción. */
function leadRecordado() {
  try {
    return JSON.parse(window.localStorage.getItem('phymac_lead') || '{}');
  } catch (e) {
    return {};
  }
}

function leadRecordar(datos) {
  try {
    window.localStorage.setItem('phymac_lead', JSON.stringify(datos));
  } catch (e) {
    /* localStorage bloqueado: seguimos sin recordar, no es crítico */
  }
}

/* --------------------------------------------------------------------
   Plantilla
   -------------------------------------------------------------------- */

var LEAD_ROLES = [
  { value: 'docente',     label: 'Docente' },
  { value: 'estudiante',  label: 'Estudiante' },
  { value: 'institucion', label: 'Institución educativa' },
  { value: 'otro',        label: 'Otro' }
];

/**
 * Genera el HTML del bloque de descarga.
 *
 * @param {Object} opts
 * @param {string} opts.id             ID único del bloque (obligatorio)
 * @param {string} opts.guiaTitulo     Título del material
 * @param {string} opts.guiaDescripcion Descripción del material
 * @param {string} opts.guiaPortada    Imagen de portada (opcional)
 * @param {string} opts.guiaArchivo    URL/ruta del archivo (obligatorio)
 * @param {string} opts.episodioSlug   Slug del episodio de origen
 * @param {string} opts.episodioTitulo Título del episodio de origen
 * @returns {string} HTML
 */
function createLeadForm(opts) {
  var o = opts || {};
  var id = o.id || 'lead-form';
  var recordado = leadRecordado();

  var privacidadUrl = 'privacidad.html';
  var consentLabel = 'Autorizo el tratamiento de mis datos personales conforme a la';
  var consentLinkText = 'política de privacidad';
  if (typeof CONFIG !== 'undefined' && CONFIG.legal) {
    privacidadUrl = CONFIG.legal.privacidadUrl || privacidadUrl;
    consentLabel = CONFIG.legal.consentLabel || consentLabel;
    consentLinkText = CONFIG.legal.consentLinkText || consentLinkText;
  }

  var inputStyle = 'border: 2px solid #E0E0E0; background-color: #F5F5F5;';
  var focusOn = "this.style.borderColor='#2962FF'; this.style.boxShadow='0 0 0 3px rgba(41, 98, 255, 0.15)'";
  var focusOff = "this.style.borderColor='#E0E0E0'; this.style.boxShadow='none'";

  var portada = o.guiaPortada
    ? '<div class="md:w-2/5 flex-shrink-0">' +
        '<img src="' + leadEscape(o.guiaPortada) + '" alt="Portada de ' + leadEscape(o.guiaTitulo) + '" ' +
             'class="w-full h-48 md:h-full object-cover" onerror="this.parentNode.style.display=\'none\'">' +
      '</div>'
    : '';

  return '' +
  '<section class="rounded-2xl overflow-hidden" style="background-color: white; border: 2px solid #E0E0E0;" aria-labelledby="' + id + '-titulo">' +
    '<div class="md:flex">' +
      portada +
      '<div class="' + (portada ? 'md:w-3/5' : 'w-full') + ' p-6 md:p-8">' +

        '<span class="inline-block px-3 py-1 rounded-full text-xs font-display font-bold mb-3" ' +
              'style="background-color: #FFF3E0; color: #FF6D00;">Material descargable</span>' +

        '<h2 id="' + id + '-titulo" class="font-display text-2xl font-extrabold mb-2" style="color: #212121;">' +
          leadEscape(o.guiaTitulo || 'Descarga la guía de este episodio') +
        '</h2>' +

        (o.guiaDescripcion
          ? '<p class="font-body mb-6" style="color: #484848;">' + leadEscape(o.guiaDescripcion) + '</p>'
          : '<p class="font-body mb-6" style="color: #484848;">Déjanos tus datos y te damos acceso inmediato al material.</p>') +

        '<form id="' + id + '-form" class="space-y-4" novalidate>' +

          '<div>' +
            '<label for="' + id + '-nombre" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">' +
              'Tu nombre <span style="color: #C43E00;" aria-hidden="true">*</span>' +
            '</label>' +
            '<input type="text" id="' + id + '-nombre" name="nombre" required autocomplete="name" ' +
                   'value="' + leadEscape(recordado.nombre || '') + '" ' +
                   'class="w-full px-4 py-3 rounded-xl outline-none transition font-body" ' +
                   'style="' + inputStyle + '" onfocus="' + focusOn + '" onblur="' + focusOff + '" ' +
                   'placeholder="Ej. Juan Pérez">' +
          '</div>' +

          '<div>' +
            '<label for="' + id + '-email" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">' +
              'Correo electrónico <span style="color: #C43E00;" aria-hidden="true">*</span>' +
            '</label>' +
            '<input type="email" id="' + id + '-email" name="email" required autocomplete="email" ' +
                   'value="' + leadEscape(recordado.email || '') + '" ' +
                   'class="w-full px-4 py-3 rounded-xl outline-none transition font-body" ' +
                   'style="' + inputStyle + '" onfocus="' + focusOn + '" onblur="' + focusOff + '" ' +
                   'placeholder="ejemplo@correo.com">' +
          '</div>' +

          '<div>' +
            '<label for="' + id + '-rol" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">' +
              '¿Cuál es tu rol? <span style="color: #C43E00;" aria-hidden="true">*</span>' +
            '</label>' +
            '<select id="' + id + '-rol" name="rol" required ' +
                    'class="w-full px-4 py-3 rounded-xl outline-none transition font-body" ' +
                    'style="' + inputStyle + '" onfocus="' + focusOn + '" onblur="' + focusOff + '">' +
              '<option value="">Selecciona una opción</option>' +
              LEAD_ROLES.map(function (r) {
                var sel = recordado.rol === r.value ? ' selected' : '';
                return '<option value="' + r.value + '"' + sel + '>' + r.label + '</option>';
              }).join('') +
            '</select>' +
          '</div>' +

          '<div>' +
            '<label for="' + id + '-institucion" class="block text-sm font-semibold mb-1 font-body" style="color: #212121;">' +
              'Institución <span style="color: #757575; font-weight: 400;">(opcional)</span>' +
            '</label>' +
            '<input type="text" id="' + id + '-institucion" name="institucion" autocomplete="organization" ' +
                   'value="' + leadEscape(recordado.institucion || '') + '" ' +
                   'class="w-full px-4 py-3 rounded-xl outline-none transition font-body" ' +
                   'style="' + inputStyle + '" onfocus="' + focusOn + '" onblur="' + focusOff + '" ' +
                   'placeholder="Ej. Colegio San José">' +
          '</div>' +

          '<div class="flex items-start gap-3 pt-1">' +
            '<input type="checkbox" id="' + id + '-consent" name="consentimiento" value="si" required ' +
                   'class="mt-1 flex-shrink-0" style="width: 18px; height: 18px; accent-color: #2962FF; cursor: pointer;">' +
            '<label for="' + id + '-consent" class="text-sm font-body" style="color: #484848; cursor: pointer;">' +
              leadEscape(consentLabel) + ' ' +
              '<a href="' + leadEscape(privacidadUrl) + '" target="_blank" rel="noopener noreferrer" ' +
                 'style="color: #2962FF; text-decoration: underline;">' + leadEscape(consentLinkText) + '</a>. ' +
              '<span style="color: #C43E00;" aria-hidden="true">*</span>' +
            '</label>' +
          '</div>' +

          '<p id="' + id + '-error" role="alert" aria-live="assertive" class="text-sm font-body hidden" ' +
             'style="color: #C43E00; background-color: #FFEBEE; border: 1px solid #FFCDD2; border-radius: 10px; padding: 10px 14px;"></p>' +

          '<button type="submit" id="' + id + '-submit" ' +
                  'class="w-full text-white font-display font-bold py-4 px-8 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2" ' +
                  'style="background-color: #FF6D00; box-shadow: 0 4px 0 #C43E00;" ' +
                  'onmouseover="this.style.backgroundColor=\'#FF9E40\'" onmouseout="this.style.backgroundColor=\'#FF6D00\'">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>' +
              '<polyline points="7 10 12 15 17 10"></polyline>' +
              '<line x1="12" y1="15" x2="12" y2="3"></line>' +
            '</svg>' +
            'Quiero la guía' +
          '</button>' +

          '<p class="text-xs font-body text-center" style="color: #9E9E9E;">' +
            'Usamos tus datos solo para enviarte material educativo. Puedes pedir su eliminación cuando quieras.' +
          '</p>' +

        '</form>' +

        '<div id="' + id + '-exito" class="hidden" tabindex="-1">' +
          '<div class="p-5 rounded-xl mb-5" style="background-color: #E8F5E9; border: 2px solid #A5D6A7;">' +
            '<p class="font-display font-bold mb-1" style="color: #1B5E20;">¡Listo! Tu material está abajo.</p>' +
            '<p class="text-sm font-body" style="color: #2E7D32;">Gracias por dejarnos tus datos. Descárgalo cuando quieras.</p>' +
          '</div>' +
          '<a id="' + id + '-descarga" href="#" target="_blank" rel="noopener noreferrer" ' +
             'class="w-full text-white font-display font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2" ' +
             'style="background-color: #2962FF; box-shadow: 0 4px 0 #0039CB; text-decoration: none;">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>' +
              '<polyline points="14 2 14 8 20 8"></polyline>' +
            '</svg>' +
            'Descargar el material' +
          '</a>' +
        '</div>' +

      '</div>' +
    '</div>' +
  '</section>';
}

/**
 * Conecta el formulario generado por createLeadForm con Formspree.
 * @param {Object} opts Las mismas opciones que se pasaron a createLeadForm
 */
function initLeadForm(opts) {
  var o = opts || {};
  var id = o.id || 'lead-form';

  var form = document.getElementById(id + '-form');
  if (!form) return;

  var errorEl = document.getElementById(id + '-error');
  var submitEl = document.getElementById(id + '-submit');
  var exitoEl = document.getElementById(id + '-exito');
  var descargaEl = document.getElementById(id + '-descarga');
  var archivoUrl = leadResolveArchivo(o.guiaArchivo);

  function mostrarError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }

  function limpiarError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }

  function revelarDescarga() {
    form.classList.add('hidden');
    if (!exitoEl) return;
    exitoEl.classList.remove('hidden');
    if (descargaEl && archivoUrl) descargaEl.href = archivoUrl;
    exitoEl.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    limpiarError();

    var nombre = form.querySelector('[name="nombre"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var rol = form.querySelector('[name="rol"]').value;
    var institucion = form.querySelector('[name="institucion"]').value.trim();
    var consent = form.querySelector('[name="consentimiento"]').checked;

    // Validación explícita: mensajes claros en vez del tooltip del navegador
    if (!nombre) { mostrarError('Escribe tu nombre para continuar.'); form.querySelector('[name="nombre"]').focus(); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      mostrarError('Escribe un correo electrónico válido (ej. nombre@correo.com).');
      form.querySelector('[name="email"]').focus();
      return;
    }
    if (!rol) { mostrarError('Cuéntanos cuál es tu rol.'); form.querySelector('[name="rol"]').focus(); return; }
    if (!consent) {
      mostrarError('Necesitamos tu autorización para tratar tus datos antes de entregarte el material.');
      form.querySelector('[name="consentimiento"]').focus();
      return;
    }

    var endpoint = leadEndpoint();
    if (!endpoint || !archivoUrl) {
      mostrarError('Este material no está disponible por ahora. Escríbenos y te lo hacemos llegar.');
      return;
    }

    var datos = new FormData();
    datos.append('nombre', nombre);
    datos.append('email', email);
    datos.append('rol', rol);
    datos.append('institucion', institucion);
    datos.append('consentimiento', 'Sí, autorizó el tratamiento de datos');
    datos.append('episodio', o.episodioTitulo || '');
    datos.append('episodio_slug', o.episodioSlug || '');
    datos.append('material', o.guiaTitulo || '');
    datos.append('origen', window.location.href);
    datos.append('utm_source', leadQueryParam('utm_source'));
    datos.append('_subject', 'Nueva descarga: ' + (o.guiaTitulo || 'material PhyMaC'));

    submitEl.disabled = true;
    submitEl.style.opacity = '0.7';
    var textoOriginal = submitEl.innerHTML;
    submitEl.textContent = 'Enviando...';

    fetch(endpoint, { method: 'POST', body: datos, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('Formspree respondió ' + res.status);
        leadRecordar({ nombre: nombre, email: email, rol: rol, institucion: institucion });

        if (typeof trackEvent === 'function') {
          trackEvent('lead_material', {
            episodio: o.episodioSlug || '',
            material: o.guiaTitulo || '',
            rol: rol
          });
        }
        revelarDescarga();
      })
      .catch(function (err) {
        console.error('Error enviando el lead:', err);
        submitEl.disabled = false;
        submitEl.style.opacity = '1';
        submitEl.innerHTML = textoOriginal;
        mostrarError('No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.');
      });
  });
}
