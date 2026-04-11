# Post Pages, Social Media & Blog Fixes — Design Spec

**Fecha:** 2026-04-08
**Repo:** `PacTal/PhyMaC_web_page` · branch `feature/decap-cms`

---

## Objetivo

Cuatro cambios coordinados en el sitio PhyMaC:

1. **Migrar post faltante** — "Ciencia con Sello de Mujer" existe en main pero no en `content/blog/`
2. **Páginas individuales por post** — `post.html?slug=...` reemplaza el sistema de modal
3. **Corregir links de proyectos** — config.js usa `blogId` numérico que cambió al migrar a Markdown; migrar a `blogSlug` (estable)
4. **Redes sociales** — actualizar URLs reales en `config.js`, descomentar footer, agregar TikTok

---

## 1. Post faltante — `content/blog/2026-02-11-ciencia-sello-mujer.md`

### Frontmatter
```yaml
title: "Ciencia con Sello de Mujer: Perspectivas y desafíos en la tecnología"
slug: ciencia-sello-mujer-perspectivas-desafios-tecnologia
author: "Equipo PhyMaC"
date: 2026-02-11
category: Otros
image: "https://img.youtube.com/vi/pIY0BgIwMIk/maxresdefault.jpg"
summary: "En el Día Internacional de la Mujer y la Niña en la Ciencia, compartimos las experiencias de mujeres líderes que están transformando el panorama científico en Colombia."
```

### Cuerpo
Texto + dos iframes de YouTube embebidos como HTML raw en el cuerpo Markdown. `marked()` los pasa sin modificar. El iframe horizontal es `pIY0BgIwMIk` (16:9) y el vertical es `u_IN1UNdhNI` (short, 9:16, max-width 360px).

### Impacto en build script
`scripts/build-blog.js` ya maneja HTML raw en el cuerpo vía `marked()` — no requiere cambios. El post quedará como ID 7 tras regenerar (orden alfabético de filenames).

---

## 2. Páginas individuales — `post.html`

### URL
```
/post.html?slug=accion-reaccion-rosal-fundacion-cresiendo
```
Una sola página HTML que lee `?slug` del query string y renderiza el post correspondiente de `BLOG_POSTS`.

### Layout (Variante 1, aprobada)

```
┌─────────────────────────────────────────────┐
│  NAVBAR (header.js)                          │
├─────────────────────────────────────────────┤
│  HERO IMAGEN (imagen del post, ancho total)  │
│  ┌─────────────────────────────────────────┐│
│  │  overlay negro 45%                       ││
│  │  [badge categoría]                       ││
│  │  Título del artículo (blanco, bold)      ││
│  │  Autor · Fecha · X min lectura           ││
│  └─────────────────────────────────────────┘│
├─────────────────────────────────────────────┤
│  barra naranja 4px (#FF6D00)                 │
├─────────────────────────────────────────────┤
│           CUERPO CENTRADO                    │
│           max-width: 720px                   │
│                                              │
│  [contenido HTML del post — incluyendo       │
│   iframes YouTube, imágenes, etc.]           │
│                                              │
│  [botón Descargar PDF] ← solo si pdf_url     │
│                                              │
├─────────────────────────────────────────────┤
│  CTA WHATSAPP                               │
│  fondo #FFF3E0, texto naranja               │
│  "¿Te interesa este reto?"  [Contáctanos →] │
├─────────────────────────────────────────────┤
│  FOOTER (footer.js)                          │
└─────────────────────────────────────────────┘
```

### Comportamiento de error
Si `slug` no existe en `BLOG_POSTS`: mostrar mensaje "Artículo no encontrado" con link de regreso al blog.

### Back link
Debajo del navbar, breadcrumb: `Blog › [Categoría] › Título`

### Scripts necesarios
Misma secuencia que otras páginas: `config.js → header.js → footer.js → blog-data.js → blog.js → main.js → (inline script)`.

---

## 3. Eliminar modal de blog.js — navegar a post.html

### Estado actual
`blog.js` renderiza tarjetas con `onclick="openBlogPost(id)"` que abre un modal (`<div id="blog-modal">`).

### Cambio
- Las tarjetas del blog pasan a ser `<a href="post.html?slug=SLUG">` nativos.
- Se elimina la función `openBlogPost()` y el HTML del modal.
- Se elimina el `<div id="blog-modal">` de `blog.html`.

### Impacto en index.html
El inline script de proyectos en `index.html` usa `openBlogPost(id)` como fallback. Se actualiza a `href="post.html?slug=SLUG"` directo.

---

## 4. Config.js — migrar blogId → blogSlug

### Problema
`config.js` usa `blogId: 7` (numérico). Los IDs se reasignan cada vez que se regenera `blog-data.js` desde los archivos Markdown (orden alfabético). El post "Acción y reacción" era ID 7 en el array original, ahora es ID 6 (o 7 tras agregar el post faltante).

### Fix
Cambiar a `blogSlug` (string del filename Markdown, estable):

```js
// Antes (frágil)
{ id: 4, title: "Acción y reacción en el Rosal", blogId: 7, ... }

// Después (estable)
{ id: 4, title: "Acción y reacción en el Rosal", blogSlug: "accion-reaccion-rosal-fundacion-cresiendo", ... }
```

### Todos los proyectos actualizados

| Proyecto | blogSlug |
|---|---|
| Acción y reacción en el Rosal | `accion-reaccion-rosal-fundacion-cresiendo` |
| Física de Cohetes | `propulsion-cohetes-leyes-newton` |
| Didáctica Experimental | `capacitacion-docente-metodologias-activas-arduino` |
| Gimnasia Cerebral STEM | `gimnasia-cerebral-stem-adultos-mayores` |

### Búsqueda en index.html
```js
// Antes
BLOG_POSTS.find(post => post.id === proyecto.blogId)

// Después
BLOG_POSTS.find(post => post.slug === proyecto.blogSlug)
```

---

## 5. Redes Sociales

### config.js — URLs actualizadas
```js
social: {
  instagram: "https://www.instagram.com/fundacion_phymac/",
  facebook:  "https://www.facebook.com/profile.php?id=61586652184965",
  linkedin:  "https://www.linkedin.com/company/fundacion-phymac/",
  tiktok:    "https://www.tiktok.com/@fundacion_phymac"
}
```

> `twitter` se elimina. TikTok es nuevo.

### components/footer.js
La sección de redes sociales está comentada con `<!-- Redes Sociales - TEMPORALMENTE OCULTAS -->`. Se descomenta y se actualizan/agregan los íconos:

- **Instagram** — ícono SVG outline (cámara cuadrada redondeada)
- **Facebook** — ícono SVG outline (f)
- **LinkedIn** — ícono SVG outline (in)
- **TikTok** — ícono SVG outline (nota musical + círculo) — nuevo

Los íconos leen del objeto `CONFIG.social` para que cualquier cambio de URL futuro sea solo en `config.js`.

### Ubicación
Solo en el footer. No en el header (ya tiene el CTA de WhatsApp como única acción).

---

## Archivos que cambian

| Archivo | Cambio |
|---|---|
| `content/blog/2026-02-11-ciencia-sello-mujer.md` | **Crear** — post faltante |
| `blog-data.js` | Regenerar (7 posts tras agregar el .md) |
| `post.html` | **Crear** — página individual de artículo |
| `blog.js` | Eliminar modal, tarjetas → `<a href="post.html?slug=...">` |
| `blog.html` | Eliminar `<div id="blog-modal">` |
| `config.js` | `blogId` → `blogSlug`, URLs sociales actualizadas |
| `components/footer.js` | Descomentar social, agregar TikTok, leer CONFIG.social |
| `index.html` | Proyectos: buscar por `blogSlug`, link a `post.html?slug=...` |

---

## Lo que NO cambia

- `scripts/build-blog.js` — sin cambios, ya maneja HTML raw
- `admin/config.yml` — sin cambios
- `netlify.toml` — sin cambios
- `phymac-styles.css` — sin cambios
- `servicios.html`, `publicaciones.html` — sin cambios
