// scripts/__tests__/build-episodios.test.js
const path = require('path');
const fs = require('fs');
const os = require('os');
const {
  parseEpisodio,
  parseYoutubeId,
  parseFecha,
  generateEpisodiosData,
  generateEpisodiosDataSource
} = require('../build-episodios');

describe('parseYoutubeId', () => {
  test('acepta un ID pelado de 11 caracteres', () => {
    expect(parseYoutubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('extrae el ID de una URL watch?v=', () => {
    expect(parseYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('extrae el ID de un enlace corto youtu.be', () => {
    expect(parseYoutubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('extrae el ID de una URL de embed', () => {
    expect(parseYoutubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('devuelve cadena vacía si no hay ID reconocible', () => {
    expect(parseYoutubeId('no es una url')).toBe('');
    expect(parseYoutubeId('')).toBe('');
    expect(parseYoutubeId(undefined)).toBe('');
  });
});

describe('parseFecha', () => {
  test('normaliza un Date a YYYY-MM-DD', () => {
    expect(parseFecha(new Date('2026-08-15T14:00:00.000Z'))).toBe('2026-08-15');
  });

  test('recorta la hora de un string ISO', () => {
    expect(parseFecha('2026-08-15T09:00:00.000-05:00')).toBe('2026-08-15');
  });

  test('devuelve cadena vacía si no hay fecha', () => {
    expect(parseFecha('')).toBe('');
  });
});

describe('parseEpisodio', () => {
  let tmpDir;

  function escribirEpisodio(nombre, frontmatter) {
    const ruta = path.join(tmpDir, nombre);
    fs.writeFileSync(ruta, ['---', frontmatter, '---', ''].join('\n'));
    return ruta;
  }

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'phymac-eps-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  test('extrae los campos base del frontmatter', () => {
    const ruta = escribirEpisodio('ep-01.md', [
      'titulo: Primer episodio',
      'slug: ep-01-primero',
      'numero: 1',
      'temporada: 2',
      'fecha: 2026-08-15T09:00:00.000-05:00',
      'estado: publicado',
      'youtube_id: dQw4w9WgXcQ',
      'invitado: Profe Ana',
      'resumen: Un resumen corto.'
    ].join('\n'));

    const ep = parseEpisodio(ruta, 7);

    expect(ep.id).toBe(7);
    expect(ep.titulo).toBe('Primer episodio');
    expect(ep.slug).toBe('ep-01-primero');
    expect(ep.numero).toBe(1);
    expect(ep.temporada).toBe(2);
    expect(ep.fecha).toBe('2026-08-15');
    expect(ep.estado).toBe('publicado');
    expect(ep.youtube_id).toBe('dQw4w9WgXcQ');
    expect(ep.invitado).toBe('Profe Ana');
    expect(ep.resumen).toBe('Un resumen corto.');
  });

  test('usa el nombre del archivo como slug si falta el campo', () => {
    const ruta = escribirEpisodio('ep-sin-slug.md', 'titulo: Sin slug');
    expect(parseEpisodio(ruta, 1).slug).toBe('ep-sin-slug');
  });

  test('convierte el campo contenido de Markdown a HTML', () => {
    const ruta = escribirEpisodio('ep-notas.md', [
      'titulo: Con notas',
      'contenido: |-',
      '  ## Un título',
      '',
      '  Texto en **negrita**.'
    ].join('\n'));

    const ep = parseEpisodio(ruta, 1);
    expect(ep.contenido).toContain('<h2>Un título</h2>');
    expect(ep.contenido).toContain('<strong>negrita</strong>');
  });

  test('degrada a proximamente si está publicado pero sin video', () => {
    const ruta = escribirEpisodio('ep-sin-video.md', [
      'titulo: Publicado sin video',
      'estado: publicado',
      'youtube_id: ""'
    ].join('\n'));

    expect(parseEpisodio(ruta, 1).estado).toBe('proximamente');
  });

  test('normaliza un estado desconocido a proximamente', () => {
    const ruta = escribirEpisodio('ep-raro.md', [
      'titulo: Estado raro',
      'estado: publicadisimo'
    ].join('\n'));

    expect(parseEpisodio(ruta, 1).estado).toBe('proximamente');
  });

  test('extrae el ID aunque el CMS reciba la URL completa de YouTube', () => {
    const ruta = escribirEpisodio('ep-url.md', [
      'titulo: Con URL',
      'estado: publicado',
      'youtube_id: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ].join('\n'));

    const ep = parseEpisodio(ruta, 1);
    expect(ep.youtube_id).toBe('dQw4w9WgXcQ');
    expect(ep.estado).toBe('publicado');
  });

  test('guia es null cuando no hay archivo adjunto', () => {
    const ruta = escribirEpisodio('ep-sin-guia.md', [
      'titulo: Sin guía',
      'guia_titulo: Una guía que no existe',
      'guia_archivo: ""'
    ].join('\n'));

    expect(parseEpisodio(ruta, 1).guia).toBeNull();
  });

  test('arma el objeto guia cuando hay archivo', () => {
    const ruta = escribirEpisodio('ep-con-guia.md', [
      'titulo: Con guía',
      'guia_titulo: Guía de evaluación',
      'guia_descripcion: Una descripción',
      'guia_portada: /imagenes/blog/portada.jpg',
      'guia_archivo: /imagenes/blog/guia.pdf',
      'guia_publica: true'
    ].join('\n'));

    const guia = parseEpisodio(ruta, 1).guia;
    expect(guia).not.toBeNull();
    expect(guia.titulo).toBe('Guía de evaluación');
    expect(guia.descripcion).toBe('Una descripción');
    expect(guia.portada).toBe('/imagenes/blog/portada.jpg');
    expect(guia.archivo).toBe('/imagenes/blog/guia.pdf');
    expect(guia.publica).toBe(true);
  });

  test('respeta guia_publica en false', () => {
    const ruta = escribirEpisodio('ep-guia-privada.md', [
      'titulo: Guía privada',
      'guia_archivo: /imagenes/blog/guia.pdf',
      'guia_publica: false'
    ].join('\n'));

    expect(parseEpisodio(ruta, 1).guia.publica).toBe(false);
  });

  test('normaliza temas ausentes a array vacío', () => {
    const ruta = escribirEpisodio('ep-sin-temas.md', 'titulo: Sin temas');
    expect(parseEpisodio(ruta, 1).temas).toEqual([]);
  });

  test('conserva la lista de temas', () => {
    const ruta = escribirEpisodio('ep-temas.md', [
      'titulo: Con temas',
      'temas:',
      '  - IA',
      '  - Evaluación'
    ].join('\n'));

    expect(parseEpisodio(ruta, 1).temas).toEqual(['IA', 'Evaluación']);
  });
});

describe('generateEpisodiosData', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'phymac-eps-dir-'));

    fs.writeFileSync(path.join(tmpDir, 'ep-01.md'), [
      '---', 'titulo: Uno', 'slug: ep-01', 'numero: 1', '---', ''
    ].join('\n'));

    fs.writeFileSync(path.join(tmpDir, 'ep-02.md'), [
      '---', 'titulo: Dos', 'slug: ep-02', 'numero: 2', '---', ''
    ].join('\n'));

    // Un archivo que no es markdown: debe ignorarse
    fs.writeFileSync(path.join(tmpDir, 'notas.txt'), 'no soy un episodio');
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  test('devuelve array vacío si el directorio no existe', () => {
    expect(generateEpisodiosData('/ruta/que/no/existe/jamas')).toEqual([]);
  });

  test('lee solo los archivos .md', () => {
    expect(generateEpisodiosData(tmpDir)).toHaveLength(2);
  });

  test('asigna ids secuenciales', () => {
    const ids = generateEpisodiosData(tmpDir).map(e => e.id).sort();
    expect(ids).toEqual([1, 2]);
  });

  test('genera el fuente de episodios-data.js con const EPISODIOS', () => {
    const salida = generateEpisodiosDataSource(generateEpisodiosData(tmpDir));
    expect(salida).toContain('const EPISODIOS =');
    expect(salida).toContain('ep-01');
    expect(salida).toContain('module.exports');
  });
});
