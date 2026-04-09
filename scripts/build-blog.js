// scripts/build-blog.js
// Lee archivos .md de content/blog/ y genera blog-data.js

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const BLOG_DIR = path.join(__dirname, '../content/blog');
const OUTPUT_FILE = path.join(__dirname, '../blog-data.js');

/**
 * Lee un archivo .md y retorna un objeto compatible con BLOG_POSTS.
 * @param {string} filePath - Ruta absoluta al archivo .md
 * @param {number} id - ID numérico a asignar al post
 */
function parsePost(filePath, id) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const dateStr = data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : String(data.date);

  return {
    id,
    title: data.title || '',
    slug: data.slug || path.basename(filePath, '.md'),
    date: dateStr,
    author: data.author || '',
    category: data.category || '',
    image: data.image || '',
    summary: data.summary || '',
    content: marked(content).trim(),
    pdf_url: data.pdf_url || null
  };
}

/**
 * Lee todos los archivos .md de un directorio y retorna un array de posts.
 * @param {string} dir - Ruta absoluta al directorio con los .md
 * @returns {Object[]}
 */
function generateBlogData(dir) {
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .sort();

  return files.map((file, index) =>
    parsePost(path.join(dir, file), index + 1)
  );
}

/**
 * Genera el string del archivo blog-data.js a partir del array de posts.
 * @param {Object[]} posts
 * @returns {string}
 */
function generateBlogDataSource(posts) {
  return `/**
 * AUTO-GENERATED — No editar manualmente.
 * Generado por: npm run build:blog
 * Fuente: content/blog/*.md
 */

const BLOG_POSTS = ${JSON.stringify(posts, null, 2)};

// Compatibilidad CommonJS para tests y scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BLOG_POSTS;
}
`;
}

// Punto de entrada — solo corre cuando se ejecuta directamente
if (require.main === module) {
  const posts = generateBlogData(BLOG_DIR);
  fs.writeFileSync(OUTPUT_FILE, generateBlogDataSource(posts));
  console.log(`✓ blog-data.js generado con ${posts.length} artículos`);
}

module.exports = { parsePost, generateBlogData, generateBlogDataSource };
