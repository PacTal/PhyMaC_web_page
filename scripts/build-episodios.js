// scripts/build-episodios.js
// Lee archivos .md de content/episodios/ y genera episodios-data.js

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const EPISODIOS_DIR = path.join(__dirname, '../content/episodios');
const OUTPUT_FILE = path.join(__dirname, '../episodios-data.js');

const ESTADOS_VALIDOS = ['proximamente', 'publicado'];

/**
 * Extrae el ID de YouTube aunque el CMS haya recibido una URL completa.
 * Acepta el ID pelado, watch?v=, youtu.be/ y /embed/.
 * @param {string} valor
 * @returns {string} ID de 11 caracteres, o '' si no se reconoce
 */
function parseYoutubeId(valor) {
  if (!valor) return '';
  const texto = String(valor).trim();

  if (/^[A-Za-z0-9_-]{11}$/.test(texto)) return texto;

  const patrones = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /\/embed\/([A-Za-z0-9_-]{11})/,
    /\/shorts\/([A-Za-z0-9_-]{11})/
  ];

  for (const patron of patrones) {
    const m = texto.match(patron);
    if (m) return m[1];
  }
  return '';
}

/**
 * Normaliza la fecha a YYYY-MM-DD, venga como Date (YAML) o como string.
 * @param {Date|string} valor
 */
function parseFecha(valor) {
  if (!valor) return '';
  if (valor instanceof Date) return valor.toISOString().split('T')[0];
  const texto = String(valor);
  return texto.split('T')[0];
}

/**
 * Lee un .md de episodio y devuelve un objeto para EPISODIOS.
 * @param {string} filePath Ruta absoluta al archivo .md
 * @param {number} id ID numérico a asignar
 */
function parseEpisodio(filePath, id) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);

  // El cuerpo vive en el campo `contenido` (widget markdown del CMS),
  // no en el cuerpo del archivo, porque la colección define otros campos
  // de texto largo y así el CMS los mantiene separados.
  const notas = data.contenido ? marked(String(data.contenido)).trim() : '';

  const estado = ESTADOS_VALIDOS.includes(data.estado) ? data.estado : 'proximamente';
  const youtubeId = parseYoutubeId(data.youtube_id);

  // Un episodio "publicado" sin video no puede reproducir nada: lo
  // degradamos a próximamente para que la página no muestre un hueco.
  const estadoEfectivo = estado === 'publicado' && !youtubeId ? 'proximamente' : estado;

  const guiaArchivo = data.guia_archivo || '';
  const guia = guiaArchivo
    ? {
        titulo: data.guia_titulo || 'Guía del episodio',
        descripcion: data.guia_descripcion || '',
        portada: data.guia_portada || '',
        archivo: guiaArchivo,
        publica: data.guia_publica !== false
      }
    : null;

  return {
    id,
    slug: data.slug || path.basename(filePath, '.md'),
    titulo: data.titulo || '',
    numero: Number(data.numero) || 0,
    temporada: Number(data.temporada) || 1,
    fecha: parseFecha(data.fecha),
    estado: estadoEfectivo,
    youtube_id: youtubeId,
    invitado: data.invitado || '',
    miniatura: data.miniatura || '',
    resumen: data.resumen || '',
    contenido: notas,
    temas: Array.isArray(data.temas) ? data.temas.filter(Boolean).map(String) : [],
    destacado: data.destacado === true,
    guia
  };
}

/**
 * Lee todos los .md del directorio y devuelve el array de episodios.
 * @param {string} dir Ruta absoluta al directorio con los .md
 * @returns {Object[]}
 */
function generateEpisodiosData(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .sort();

  return files.map((file, index) => parseEpisodio(path.join(dir, file), index + 1));
}

/**
 * Genera el código fuente de episodios-data.js.
 * @param {Object[]} episodios
 * @returns {string}
 */
function generateEpisodiosDataSource(episodios) {
  return `/**
 * AUTO-GENERATED — No editar manualmente.
 * Generado por: npm run build:episodios
 * Fuente: content/episodios/*.md
 */

const EPISODIOS = ${JSON.stringify(episodios, null, 2)};

// Compatibilidad CommonJS para tests y scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EPISODIOS;
}
`;
}

// Punto de entrada — solo corre cuando se ejecuta directamente
if (require.main === module) {
  const episodios = generateEpisodiosData(EPISODIOS_DIR);
  fs.writeFileSync(OUTPUT_FILE, generateEpisodiosDataSource(episodios));
  const conGuia = episodios.filter(e => e.guia && e.guia.publica).length;
  console.log(`✓ episodios-data.js generado con ${episodios.length} episodios (${conGuia} con material publicado)`);
}

module.exports = {
  parseEpisodio,
  parseYoutubeId,
  parseFecha,
  generateEpisodiosData,
  generateEpisodiosDataSource
};
