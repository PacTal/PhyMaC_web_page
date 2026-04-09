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

  // gray-matter puede parsear la fecha como objeto Date
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

module.exports = { parsePost };
