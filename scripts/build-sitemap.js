// scripts/build-sitemap.js
// Genera sitemap.xml a partir de las páginas estáticas más los artículos
// del blog y los episodios, que viven en los archivos de datos generados.

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(RAIZ, 'sitemap.xml');

// Páginas fijas del sitio. El orden no importa para los buscadores, pero
// la prioridad sí les sugiere qué mirar primero.
const PAGINAS = [
  { archivo: 'index.html',         url: '',                    priority: '1.0', changefreq: 'weekly' },
  { archivo: 'servicios.html',     url: 'servicios.html',      priority: '0.9', changefreq: 'monthly' },
  { archivo: 'profes.html',        url: 'profes.html',         priority: '0.9', changefreq: 'weekly' },
  { archivo: 'biblioteca.html',    url: 'biblioteca.html',     priority: '0.8', changefreq: 'weekly' },
  { archivo: 'blog.html',          url: 'blog.html',           priority: '0.8', changefreq: 'weekly' },
  { archivo: 'publicaciones.html', url: 'publicaciones.html',  priority: '0.7', changefreq: 'monthly' },
  { archivo: 'contacto.html',      url: 'contacto.html',       priority: '0.7', changefreq: 'monthly' },
  { archivo: 'privacidad.html',    url: 'privacidad.html',     priority: '0.3', changefreq: 'yearly' }
];

/** Escapa los caracteres que romperían el XML. */
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Quita la barra final del dominio para no generar URLs con doble barra. */
function normalizarBase(url) {
  return String(url || '').replace(/\/+$/, '');
}

/**
 * Lee CONFIG.site.url de config.js sin ejecutar el resto del archivo
 * en un contexto de navegador.
 */
function leerBaseUrl(configPath) {
  const raw = fs.readFileSync(configPath, 'utf-8');
  const m = raw.match(/site:\s*\{[^}]*url:\s*["']([^"']+)["']/);
  return m ? normalizarBase(m[1]) : '';
}

/** Fecha de modificación del archivo, en formato YYYY-MM-DD. */
function fechaArchivo(ruta) {
  try {
    return fs.statSync(ruta).mtime.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
}

/**
 * Arma la lista completa de URLs del sitio.
 * @param {Object} opciones
 * @param {string} opciones.baseUrl  Dominio canónico sin barra final
 * @param {Object[]} opciones.posts  Artículos del blog (slug, date)
 * @param {Object[]} opciones.episodios Episodios (slug, fecha)
 * @param {string} [opciones.raiz]   Carpeta donde buscar los .html
 * @returns {Object[]} { loc, lastmod, changefreq, priority }
 */
function construirUrls({ baseUrl, posts = [], episodios = [], raiz = RAIZ }) {
  const base = normalizarBase(baseUrl);
  const urls = [];

  PAGINAS.forEach(p => {
    const ruta = path.join(raiz, p.archivo);
    if (!fs.existsSync(ruta)) return; // no anunciamos páginas que no existen
    urls.push({
      loc: base + '/' + p.url,
      lastmod: fechaArchivo(ruta),
      changefreq: p.changefreq,
      priority: p.priority
    });
  });

  posts.forEach(post => {
    if (!post.slug) return;
    urls.push({
      loc: base + '/post.html?slug=' + encodeURIComponent(post.slug),
      lastmod: post.date || '',
      changefreq: 'yearly',
      priority: '0.6'
    });
  });

  episodios.forEach(ep => {
    if (!ep.slug) return;
    urls.push({
      loc: base + '/episodio.html?slug=' + encodeURIComponent(ep.slug),
      lastmod: ep.fecha || '',
      changefreq: 'monthly',
      priority: '0.7'
    });
  });

  return urls;
}

/**
 * Serializa las URLs como sitemap XML.
 * @param {Object[]} urls
 * @returns {string}
 */
function generarSitemap(urls) {
  const entradas = urls.map(u => {
    const lineas = ['    <loc>' + escapeXml(u.loc) + '</loc>'];
    if (u.lastmod) lineas.push('    <lastmod>' + u.lastmod + '</lastmod>');
    if (u.changefreq) lineas.push('    <changefreq>' + u.changefreq + '</changefreq>');
    if (u.priority) lineas.push('    <priority>' + u.priority + '</priority>');
    return '  <url>\n' + lineas.join('\n') + '\n  </url>';
  });

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!-- AUTO-GENERADO por scripts/build-sitemap.js — no editar a mano -->\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entradas.join('\n') + '\n' +
    '</urlset>\n';
}

/** Carga un archivo de datos generado (blog-data.js / episodios-data.js). */
function cargarDatos(ruta) {
  if (!fs.existsSync(ruta)) return [];
  delete require.cache[require.resolve(ruta)];
  const datos = require(ruta);
  return Array.isArray(datos) ? datos : [];
}

// Punto de entrada — solo corre cuando se ejecuta directamente
if (require.main === module) {
  const baseUrl = leerBaseUrl(path.join(RAIZ, 'config.js'));

  if (!baseUrl) {
    console.error('✗ No se encontró CONFIG.site.url en config.js. Sitemap no generado.');
    process.exit(1);
  }

  const urls = construirUrls({
    baseUrl,
    posts: cargarDatos(path.join(RAIZ, 'blog-data.js')),
    episodios: cargarDatos(path.join(RAIZ, 'episodios-data.js'))
  });

  fs.writeFileSync(OUTPUT_FILE, generarSitemap(urls));
  console.log(`✓ sitemap.xml generado con ${urls.length} URLs (base: ${baseUrl})`);
}

module.exports = { construirUrls, generarSitemap, escapeXml, normalizarBase, leerBaseUrl, PAGINAS };
