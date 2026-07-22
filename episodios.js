/**
 * ----------------------------------------------------------------------
 * EPISODIOS.JS - LÓGICA DE LA SERIE "HABLANDO CON PROFES"
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Helpers compartidos por profes.html, episodio.html y biblioteca.html.
 * Lee el array EPISODIOS generado por scripts/build-episodios.js.
 *
 * Los nombres van con prefijo `ep` a propósito: blog.js ya define
 * escapeHtml/driveToDownload como globales y no queremos pisarlos.
 */

/** Escapa HTML para interpolar texto sin abrir XSS. */
function epEscape(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/** Devuelve el array de episodios, o [] si el build aún no corrió. */
function epSource() {
  return typeof EPISODIOS !== 'undefined' && Array.isArray(EPISODIOS) ? EPISODIOS : [];
}

/**
 * Todos los episodios ordenados para mostrar: destacados primero y,
 * dentro de cada grupo, el número más alto (el más reciente) arriba.
 */
function epGetAll() {
  return epSource().slice().sort(function (a, b) {
    if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
    if (b.numero !== a.numero) return b.numero - a.numero;
    return new Date(b.fecha) - new Date(a.fecha);
  });
}

/**
 * Busca un episodio por slug.
 * @returns {Object|null} null si no existe (nunca otro episodio)
 */
function epFindBySlug(slug) {
  if (!slug) return null;
  var found = epSource().filter(function (e) { return e.slug === slug; });
  return found.length ? found[0] : null;
}

/**
 * Materiales publicados que alimentan la Biblioteca: episodios con
 * archivo de guía y marcados como públicos, del más reciente al más viejo.
 */
function epGetMateriales() {
  return epSource()
    .filter(function (e) { return e.guia && e.guia.archivo && e.guia.publica; })
    .sort(function (a, b) {
      var diff = new Date(b.fecha) - new Date(a.fecha);
      return diff !== 0 ? diff : b.numero - a.numero;
    });
}

/** Todos los temas únicos presentes en los materiales, ordenados alfabéticamente. */
function epGetTemasDeMateriales() {
  var set = {};
  epGetMateriales().forEach(function (e) {
    (e.temas || []).forEach(function (t) { set[t] = true; });
  });
  return Object.keys(set).sort(function (a, b) { return a.localeCompare(b, 'es'); });
}

/** Fecha legible en español, reutilizando el helper global si existe. */
function epFormatFecha(fecha) {
  if (!fecha) return '';
  if (typeof window.formatDate === 'function') return window.formatDate(fecha);
  return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Imagen de portada del episodio, con la miniatura de YouTube como respaldo. */
function epThumb(ep) {
  if (ep.miniatura) return ep.miniatura;
  if (ep.youtube_id) return 'https://img.youtube.com/vi/' + encodeURIComponent(ep.youtube_id) + '/hqdefault.jpg';
  return '';
}

/**
 * Etiqueta de temporada/episodio. El número 0 está reservado para tráileres
 * y avances: mostrar "Ep. 0" se lee mal, así que se rotula como tal.
 */
function epNumeroLabel(ep) {
  if (Number(ep.numero) === 0) return 'Tráiler';
  return 'T' + ep.temporada + ' · Ep. ' + ep.numero;
}

/** Etiqueta corta del estado, lista para pintar. */
function epEstadoBadge(ep) {
  return ep.estado === 'publicado'
    ? { texto: 'Disponible', bg: '#E8F5E9', color: '#1B5E20' }
    : { texto: 'Próximamente', bg: '#FFF3E0', color: '#C43E00' };
}

/**
 * Tarjeta de episodio para el listado de profes.html.
 * @param {Object} ep
 * @returns {string} HTML
 */
function epCard(ep) {
  var badge = epEstadoBadge(ep);
  var href = 'episodio.html?slug=' + encodeURIComponent(ep.slug);
  var thumb = epThumb(ep);

  var media = thumb
    ? '<img src="' + epEscape(thumb) + '" alt="" role="presentation" ' +
          'style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;" ' +
          'onerror="this.style.display=\'none\'">'
    : '';

  var overlay = ep.estado === 'publicado'
    ? '<div style="position:absolute; inset:0; background:rgba(0,0,0,0.35); display:grid; place-items:center;">' +
        '<span style="width:64px; height:64px; border-radius:50%; background:rgba(255,255,255,0.2); border:2px solid rgba(255,255,255,0.8); display:grid; place-items:center;">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>' +
        '</span>' +
      '</div>'
    : '<div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(26,26,46,0.85) 0%, rgba(41,98,255,0.75) 100%); display:grid; place-items:center;">' +
        '<span class="font-display font-bold text-white text-lg">Muy pronto</span>' +
      '</div>';

  var temas = (ep.temas || []).slice(0, 3).map(function (t) {
    return '<span class="px-2.5 py-1 rounded-full text-xs font-body" style="background-color:#F5F5F5; color:#484848;">' + epEscape(t) + '</span>';
  }).join('');

  var guiaChip = (ep.guia && ep.guia.archivo && ep.guia.publica)
    ? '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-display font-bold" style="background-color:#FFF3E0; color:#FF6D00;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>' +
        'Con guía</span>'
    : '';

  return '' +
  '<article class="bg-white rounded-2xl overflow-hidden scroll-animate transition-all hover:shadow-lg" style="border:2px solid #E0E0E0;">' +
    '<a href="' + href + '" style="text-decoration:none; display:block;">' +
      '<div style="position:relative; aspect-ratio:16/9; background:linear-gradient(135deg,#1a1a2e 0%,#2962FF 100%);">' +
        media + overlay +
        '<span style="position:absolute; top:12px; left:12px; background-color:' + badge.bg + '; color:' + badge.color + '; font-family:Montserrat,sans-serif; font-size:11px; font-weight:700; padding:4px 10px; border-radius:99px;">' +
          badge.texto +
        '</span>' +
      '</div>' +
    '</a>' +
    '<div class="p-6" style="border-top:4px solid #FF6D00;">' +
      '<div class="flex items-center gap-2 mb-3 flex-wrap">' +
        '<span class="px-3 py-1 rounded-full text-xs font-display font-bold" style="background-color:#E8EAF6; color:#2962FF;">' +
          epEscape(epNumeroLabel(ep)) +
        '</span>' +
        guiaChip +
        (ep.fecha ? '<span class="text-sm font-body" style="color:#757575;">' + epEscape(epFormatFecha(ep.fecha)) + '</span>' : '') +
      '</div>' +
      '<h3 class="font-display text-xl font-extrabold mb-2" style="color:#212121;">' +
        '<a href="' + href + '" style="color:#212121; text-decoration:none;">' + epEscape(ep.titulo) + '</a>' +
      '</h3>' +
      (ep.invitado ? '<p class="text-sm font-body mb-2" style="color:#2962FF;">Con ' + epEscape(ep.invitado) + '</p>' : '') +
      '<p class="font-body mb-4 leading-relaxed" style="color:#484848;">' + epEscape(ep.resumen) + '</p>' +
      (temas ? '<div class="flex flex-wrap gap-2 mb-4">' + temas + '</div>' : '') +
      '<a href="' + href + '" class="inline-flex items-center font-display font-bold text-sm" ' +
         'style="color:#2962FF; text-decoration:none;" ' +
         'onmouseover="this.style.color=\'#FF6D00\'" onmouseout="this.style.color=\'#2962FF\'">' +
        (ep.estado === 'publicado' ? 'Ver el episodio' : 'Ver detalles') +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">' +
          '<polyline points="9 18 15 12 9 6"></polyline>' +
        '</svg>' +
      '</a>' +
    '</div>' +
  '</article>';
}

/**
 * Tarjeta de material para biblioteca.html. Muestra el material completo
 * pero la descarga pasa siempre por el formulario (email-gated).
 * @param {Object} ep
 * @returns {string} HTML
 */
function epMaterialCard(ep) {
  var guia = ep.guia;
  var portada = guia.portada || epThumb(ep);

  var media = portada
    ? '<img src="' + epEscape(portada) + '" alt="Portada de ' + epEscape(guia.titulo) + '" ' +
          'style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;" ' +
          'onerror="this.style.display=\'none\'">'
    : '<div style="position:absolute; inset:0; display:grid; place-items:center;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">' +
        '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>' +
      '</div>';

  var temas = (ep.temas || []).map(function (t) {
    return '<span class="px-2.5 py-1 rounded-full text-xs font-body" style="background-color:#F5F5F5; color:#484848;">' + epEscape(t) + '</span>';
  }).join('');

  return '' +
  '<article class="bg-white rounded-2xl overflow-hidden flex flex-col scroll-animate transition-all hover:shadow-lg material-card" ' +
           'style="border:2px solid #E0E0E0;" data-temas="' + epEscape((ep.temas || []).join('|')) + '">' +
    '<div style="position:relative; aspect-ratio:4/3; background:linear-gradient(135deg,#1a1a2e 0%,#2962FF 100%);">' +
      media +
    '</div>' +
    '<div class="p-6 flex flex-col flex-1" style="border-top:4px solid #FF6D00;">' +
      '<span class="inline-block self-start px-3 py-1 rounded-full text-xs font-display font-bold mb-3" style="background-color:#E8EAF6; color:#2962FF;">' +
        epEscape(epNumeroLabel(ep)) + ' · ' + epEscape(ep.titulo) +
      '</span>' +
      '<h3 class="font-display text-lg font-extrabold mb-2" style="color:#212121;">' + epEscape(guia.titulo) + '</h3>' +
      (guia.descripcion ? '<p class="font-body text-sm mb-4 leading-relaxed flex-1" style="color:#484848;">' + epEscape(guia.descripcion) + '</p>' : '<div class="flex-1"></div>') +
      (temas ? '<div class="flex flex-wrap gap-2 mb-4">' + temas + '</div>' : '') +
      '<button type="button" class="w-full text-white font-display font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 btn-descargar" ' +
              'data-slug="' + epEscape(ep.slug) + '" ' +
              'style="background-color:#FF6D00; box-shadow:0 3px 0 #C43E00; border:none; cursor:pointer;" ' +
              'onmouseover="this.style.backgroundColor=\'#FF9E40\'" onmouseout="this.style.backgroundColor=\'#FF6D00\'">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>' +
        '</svg>' +
        'Descargar' +
      '</button>' +
      '<p class="text-xs font-body text-center mt-2" style="color:#9E9E9E;">Te pediremos unos datos rápidos</p>' +
    '</div>' +
  '</article>';
}
