// scripts/__tests__/build-sitemap.test.js
const path = require('path');
const fs = require('fs');
const os = require('os');
const {
  construirUrls,
  generarSitemap,
  escapeXml,
  normalizarBase,
  leerBaseUrl
} = require('../build-sitemap');

describe('escapeXml', () => {
  test('escapa los caracteres que rompen el XML', () => {
    expect(escapeXml('a & b')).toBe('a &amp; b');
    expect(escapeXml('<tag>')).toBe('&lt;tag&gt;');
    expect(escapeXml('a "b" \'c\'')).toBe('a &quot;b&quot; &apos;c&apos;');
  });
});

describe('normalizarBase', () => {
  test('quita la barra final', () => {
    expect(normalizarBase('https://phymac.com/')).toBe('https://phymac.com');
    expect(normalizarBase('https://phymac.com///')).toBe('https://phymac.com');
  });

  test('deja intacta una base sin barra', () => {
    expect(normalizarBase('https://phymac.com')).toBe('https://phymac.com');
  });

  test('tolera valores vacíos', () => {
    expect(normalizarBase('')).toBe('');
    expect(normalizarBase(undefined)).toBe('');
  });
});

describe('leerBaseUrl', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'phymac-sitemap-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  test('extrae CONFIG.site.url de config.js', () => {
    const p = path.join(tmpDir, 'config.js');
    fs.writeFileSync(p, 'const CONFIG = {\n  site: {\n    url: "https://ejemplo.com"\n  },\n  otro: 1\n};');
    expect(leerBaseUrl(p)).toBe('https://ejemplo.com');
  });

  test('normaliza la barra final', () => {
    const p = path.join(tmpDir, 'config.js');
    fs.writeFileSync(p, 'const CONFIG = { site: { url: "https://ejemplo.com/" } };');
    expect(leerBaseUrl(p)).toBe('https://ejemplo.com');
  });

  test('devuelve cadena vacía si no hay site.url', () => {
    const p = path.join(tmpDir, 'config.js');
    fs.writeFileSync(p, 'const CONFIG = { logo: {} };');
    expect(leerBaseUrl(p)).toBe('');
  });
});

describe('construirUrls', () => {
  let raiz;

  beforeEach(() => {
    raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'phymac-raiz-'));
    // Solo dos de las páginas fijas existen en este directorio
    fs.writeFileSync(path.join(raiz, 'index.html'), '<html></html>');
    fs.writeFileSync(path.join(raiz, 'blog.html'), '<html></html>');
  });

  afterEach(() => {
    fs.rmSync(raiz, { recursive: true });
  });

  test('omite las páginas fijas que no existen en disco', () => {
    const urls = construirUrls({ baseUrl: 'https://ejemplo.com', raiz });
    const locs = urls.map(u => u.loc);
    expect(locs).toContain('https://ejemplo.com/');
    expect(locs).toContain('https://ejemplo.com/blog.html');
    expect(locs).not.toContain('https://ejemplo.com/servicios.html');
  });

  test('la portada queda con prioridad 1.0', () => {
    const urls = construirUrls({ baseUrl: 'https://ejemplo.com', raiz });
    const home = urls.find(u => u.loc === 'https://ejemplo.com/');
    expect(home.priority).toBe('1.0');
  });

  test('agrega una URL por artículo del blog', () => {
    const urls = construirUrls({
      baseUrl: 'https://ejemplo.com',
      raiz,
      posts: [{ slug: 'mi-articulo', date: '2026-05-01' }]
    });
    const post = urls.find(u => u.loc.includes('post.html'));
    expect(post.loc).toBe('https://ejemplo.com/post.html?slug=mi-articulo');
    expect(post.lastmod).toBe('2026-05-01');
  });

  test('agrega una URL por episodio', () => {
    const urls = construirUrls({
      baseUrl: 'https://ejemplo.com',
      raiz,
      episodios: [{ slug: 'ep-01', fecha: '2026-07-09' }]
    });
    const ep = urls.find(u => u.loc.includes('episodio.html'));
    expect(ep.loc).toBe('https://ejemplo.com/episodio.html?slug=ep-01');
    expect(ep.lastmod).toBe('2026-07-09');
  });

  test('codifica slugs con tildes y signos', () => {
    const urls = construirUrls({
      baseUrl: 'https://ejemplo.com',
      raiz,
      posts: [{ slug: '¿cuándo-fue?', date: '2026-04-13' }]
    });
    const post = urls.find(u => u.loc.includes('post.html'));
    expect(post.loc).toContain('%C2%BF');       // ¿
    expect(post.loc).toContain('%C3%A1');       // á
    expect(post.loc).not.toContain('¿');
  });

  test('ignora entradas sin slug', () => {
    const urls = construirUrls({
      baseUrl: 'https://ejemplo.com',
      raiz,
      posts: [{ slug: '', date: '2026-01-01' }, { date: '2026-01-01' }],
      episodios: [{ fecha: '2026-01-01' }]
    });
    expect(urls.filter(u => u.loc.includes('post.html'))).toHaveLength(0);
    expect(urls.filter(u => u.loc.includes('episodio.html'))).toHaveLength(0);
  });

  test('no genera doble barra si la base la trae', () => {
    const urls = construirUrls({ baseUrl: 'https://ejemplo.com/', raiz });
    urls.forEach(u => {
      expect(u.loc.replace('https://', '')).not.toContain('//');
    });
  });
});

describe('generarSitemap', () => {
  const urls = [
    { loc: 'https://ejemplo.com/', lastmod: '2026-07-01', changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://ejemplo.com/post.html?slug=a&b', lastmod: '', changefreq: '', priority: '' }
  ];

  test('incluye la declaración XML y el urlset', () => {
    const xml = generarSitemap(urls);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.trim().endsWith('</urlset>')).toBe(true);
  });

  test('escapa el ampersand de las query strings', () => {
    const xml = generarSitemap(urls);
    expect(xml).toContain('slug=a&amp;b');
    expect(xml).not.toMatch(/slug=a&b/);
  });

  test('omite las etiquetas opcionales vacías', () => {
    const xml = generarSitemap([{ loc: 'https://ejemplo.com/x', lastmod: '', changefreq: '', priority: '' }]);
    expect(xml).not.toContain('<lastmod>');
    expect(xml).not.toContain('<priority>');
  });

  test('genera una entrada url por cada elemento', () => {
    const xml = generarSitemap(urls);
    expect(xml.match(/<url>/g)).toHaveLength(2);
  });
});
