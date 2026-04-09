// scripts/__tests__/build-blog.test.js
const path = require('path');
const fs = require('fs');
const { parsePost, generateBlogData, generateBlogDataSource } = require('../build-blog');

const FIXTURE = path.join(__dirname, 'fixtures/sample-post.md');

describe('parsePost', () => {
  let post;

  beforeAll(() => {
    post = parsePost(FIXTURE, 1);
  });

  test('extrae el título del frontmatter', () => {
    expect(post.title).toBe('Reto de prueba');
  });

  test('extrae el slug del frontmatter', () => {
    expect(post.slug).toBe('reto-de-prueba');
  });

  test('extrae el autor', () => {
    expect(post.author).toBe('Equipo PhyMaC');
  });

  test('extrae la fecha como string ISO', () => {
    expect(post.date).toBe('2026-04-08');
  });

  test('extrae la categoría', () => {
    expect(post.category).toBe('Metodología');
  });

  test('extrae la imagen', () => {
    expect(post.image).toBe('/imagenes/blog/reto.jpg');
  });

  test('extrae pdf_url', () => {
    expect(post.pdf_url).toBe('https://drive.google.com/file/d/1aBcDeFgHiJk/view?usp=sharing');
  });

  test('convierte el cuerpo Markdown a HTML', () => {
    expect(post.content).toContain('<h2>');
    expect(post.content).toContain('<strong>negrita</strong>');
    expect(post.content).toContain('<em>cursiva</em>');
    expect(post.content).toContain('<li>Item uno</li>');
  });

  test('asigna el id según el parámetro', () => {
    expect(post.id).toBe(1);
  });

  test('genera summary vacío si no está en frontmatter', () => {
    expect(post.summary).toBe('');
  });
});

describe('generateBlogData', () => {
  const os = require('os');
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'phymac-test-'));

    fs.writeFileSync(path.join(tmpDir, '2024-01-01-post-a.md'), [
      '---',
      'title: Post A',
      'slug: post-a',
      'author: Autor',
      'date: 2024-01-01',
      'category: Proyectos',
      '---',
      'Contenido de post A.'
    ].join('\n'));

    fs.writeFileSync(path.join(tmpDir, '2024-06-01-post-b.md'), [
      '---',
      'title: Post B',
      'slug: post-b',
      'author: Autor',
      'date: 2024-06-01',
      'category: Metodología',
      '---',
      'Contenido de post B.'
    ].join('\n'));
  });

  test('retorna array vacío si el directorio no existe', () => {
    const result = generateBlogData('/ruta/que/no/existe/jamas');
    expect(result).toEqual([]);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  test('retorna un array con todos los posts de la carpeta', () => {
    const posts = generateBlogData(tmpDir);
    expect(posts).toHaveLength(2);
  });

  test('los posts tienen ids secuenciales', () => {
    const posts = generateBlogData(tmpDir);
    const ids = posts.map(p => p.id).sort();
    expect(ids).toEqual([1, 2]);
  });

  test('cada post tiene los campos requeridos', () => {
    const posts = generateBlogData(tmpDir);
    const postA = posts.find(p => p.slug === 'post-a');
    expect(postA).toBeDefined();
    expect(postA.title).toBe('Post A');
    expect(postA.category).toBe('Proyectos');
  });

  test('genera el string de blog-data.js con const BLOG_POSTS', () => {
    const posts = generateBlogData(tmpDir);
    const output = generateBlogDataSource(posts);
    expect(output).toContain('const BLOG_POSTS =');
    expect(output).toContain('Post A');
    expect(output).toContain('module.exports');
  });
});
