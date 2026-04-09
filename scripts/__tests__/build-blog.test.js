// scripts/__tests__/build-blog.test.js
const path = require('path');
const fs = require('fs');
const { parsePost } = require('../build-blog');

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
