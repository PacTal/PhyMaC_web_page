# Post Pages, Social Media & Blog Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add individual post pages (`post.html?slug=...`), migrate project links from modal to dedicated pages, add real social media links (Instagram, Facebook, LinkedIn, TikTok), and create the missing "Ciencia con Sello de Mujer" blog post.

**Architecture:** Static site with client-side JS hydration. No bundler. Build pipeline: `content/blog/*.md` → `scripts/build-blog.js` → `blog-data.js` (global `BLOG_POSTS` array). Script load order: `config.js → header.js → footer.js → blog-data.js → blog.js → main.js`. `post.html` reads `?slug=` from query string and renders matching entry from `BLOG_POSTS`.

**Tech Stack:** Vanilla JS, TailwindCSS CDN, Montserrat + Open Sans (Google Fonts), Node.js build script (gray-matter + marked), PhyMaC brand colors (#2962FF blue, #FF6D00 orange, #212121 carbon).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `content/blog/2026-02-11-ciencia-sello-mujer.md` | **Create** | Missing post with YouTube iframes |
| `blog-data.js` | **Regenerate** | Run build script → 7 posts |
| `config.js` | **Modify** | `blogId` → `blogSlug`, real social URLs, remove twitter |
| `post.html` | **Create** | Individual post page (Variante 1 layout) |
| `blog.js` | **Modify** | Remove `openBlogPost()` modal; cards → `<a href="post.html?slug=...">` |
| `components/footer.js` | **Modify** | Uncomment social section, add TikTok SVG icon, read CONFIG.social |
| `index.html` | **Modify** | Project cards use `blogSlug`, navigate to `post.html?slug=...` |

---

## Task 1: Create missing blog post + regenerate blog-data.js

**Files:**
- Create: `content/blog/2026-02-11-ciencia-sello-mujer.md`
- Regenerate: `blog-data.js`

- [ ] **Step 1: Create the markdown file**

Create `content/blog/2026-02-11-ciencia-sello-mujer.md` with this exact content:

```markdown
---
title: "Ciencia con Sello de Mujer: Perspectivas y desafíos en la tecnología"
slug: ciencia-sello-mujer-perspectivas-desafios-tecnologia
author: "Equipo PhyMaC"
date: 2026-02-11
category: Otros
image: "https://img.youtube.com/vi/pIY0BgIwMIk/maxresdefault.jpg"
summary: "En el Día Internacional de la Mujer y la Niña en la Ciencia, compartimos las experiencias de mujeres líderes que están transformando el panorama científico en Colombia."
---

En el Día Internacional de la Mujer y la Niña en la Ciencia (11 de febrero), PhyMaC celebra el papel fundamental que tienen las mujeres en la construcción del conocimiento científico y tecnológico en Colombia.

Compartimos dos conversaciones inspiradoras con mujeres líderes que están transformando el panorama científico desde diferentes frentes.

## Video horizontal: Perspectivas en tecnología

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:1.5rem 0;">
  <iframe
    src="https://www.youtube.com/embed/pIY0BgIwMIk"
    title="Ciencia con Sello de Mujer - Perspectivas en tecnología"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="position:absolute;top:0;left:0;width:100%;height:100%;">
  </iframe>
</div>

## Video vertical: Historias desde el laboratorio

<div style="max-width:360px;margin:1.5rem auto;">
  <div style="position:relative;padding-bottom:177.78%;height:0;overflow:hidden;">
    <iframe
      src="https://www.youtube.com/embed/u_IN1UNdhNI"
      title="Ciencia con Sello de Mujer - Historias desde el laboratorio"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;">
    </iframe>
  </div>
</div>

Desde PhyMaC creemos que la diversidad en ciencia no es solo un ideal — es una necesidad para construir soluciones más completas y justas. ¡Feliz día a todas las científicas, tecnólogas e ingenieras que inspiran con su trabajo!
```

- [ ] **Step 2: Regenerate blog-data.js**

```bash
node scripts/build-blog.js
```

Expected output: no errors. `blog-data.js` now has 7 posts. Verify:

```bash
grep -c '"id"' blog-data.js
```

Expected: `7`

- [ ] **Step 3: Verify the new post appears with correct slug**

```bash
grep "ciencia-sello-mujer" blog-data.js
```

Expected: one matching line with the slug.

- [ ] **Step 4: Commit**

```bash
git add content/blog/2026-02-11-ciencia-sello-mujer.md blog-data.js
git commit -m "feat: add missing 'Ciencia con Sello de Mujer' post and regenerate blog-data.js"
```

---

## Task 2: Update config.js — blogSlug + real social URLs

**Files:**
- Modify: `config.js`

- [ ] **Step 1: Replace the social block**

In `config.js`, replace:

```js
  social: {
    facebook: "https://facebook.com/phymac",
    instagram: "https://instagram.com/phymac",
    linkedin: "https://linkedin.com/company/phymac",
    twitter: "https://twitter.com/phymac"
  },
```

With:

```js
  social: {
    instagram: "https://www.instagram.com/fundacion_phymac/",
    facebook:  "https://www.facebook.com/profile.php?id=61586652184965",
    linkedin:  "https://www.linkedin.com/company/fundacion-phymac/",
    tiktok:    "https://www.tiktok.com/@fundacion_phymac"
  },
```

- [ ] **Step 2: Replace all four `blogId` entries with `blogSlug`**

Replace the four proyecto objects. Find and replace the full proyectos array entries:

For proyecto id:4 (Acción y reacción), change:
```js
      blogId: 7 // Relacionado con el artículo "¡Acción y reacción en el Rosal!"
```
to:
```js
      blogSlug: "accion-reaccion-rosal-fundacion-cresiendo"
```

For proyecto id:1 (Física de Cohetes), change:
```js
      blogId: 2 // Relacionado con el artículo "Física de Cohetes: Aprendiendo las Leyes de Newton en Acción"
```
to:
```js
      blogSlug: "propulsion-cohetes-leyes-newton"
```

For proyecto id:2 (Didáctica Experimental), change:
```js
      blogId: 6 // Relacionado con el artículo "Capacitación Docente: Metodologías Activas en el Aula"
```
to:
```js
      blogSlug: "capacitacion-docente-metodologias-activas-arduino"
```

For proyecto id:3 (Gimnasia Cerebral STEM), change:
```js
      blogId: 4 // Relacionado con el artículo "Gimnasia Cerebral STEM: Ciencia para Adultos Mayores"
```
to:
```js
      blogSlug: "gimnasia-cerebral-stem-adultos-mayores"
```

- [ ] **Step 3: Verify no `blogId` remains**

```bash
grep "blogId" config.js
```

Expected: no output (zero matches).

- [ ] **Step 4: Commit**

```bash
git add config.js
git commit -m "feat: migrate config.js blogId to blogSlug, update real social media URLs"
```

---

## Task 3: Update footer.js — uncomment social section + add TikTok

**Files:**
- Modify: `components/footer.js`

- [ ] **Step 1: Replace the commented social block**

In `components/footer.js`, replace this entire block (lines 113–137):

```js
        <!-- Redes Sociales - TEMPORALMENTE OCULTAS -->
        <!--
        <div class="mt-8 flex justify-center gap-4">
          ${social.facebook ? `<a href="${social.facebook}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>` : ''}
          ${social.instagram ? `<a href="${social.instagram}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>` : ''}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>` : ''}
          ${social.twitter ? `<a href="${social.twitter}" target="_blank" rel="noopener noreferrer" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>` : ''}
        </div>
        -->
```

With this live (uncommented) version:

```js
        <!-- Redes Sociales -->
        <div class="mt-8 flex justify-center gap-5">
          ${social.instagram ? `<a href="${social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>` : ''}
          ${social.facebook ? `<a href="${social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>` : ''}
          ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>` : ''}
          ${social.tiktok ? `<a href="${social.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="transition" style="color: #9E9E9E;" onmouseover="this.style.color='#2962FF'" onmouseout="this.style.color='#9E9E9E'">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            </svg>
          </a>` : ''}
        </div>
```

- [ ] **Step 2: Verify twitter reference is gone**

```bash
grep "twitter" components/footer.js
```

Expected: no output.

- [ ] **Step 3: Verify tiktok icon is present**

```bash
grep "tiktok" components/footer.js
```

Expected: one line with `social.tiktok`.

- [ ] **Step 4: Commit**

```bash
git add components/footer.js
git commit -m "feat: enable social media icons in footer, add TikTok, read from CONFIG.social"
```

---

## Task 4: Create post.html — individual post page (Variante 1)

**Files:**
- Create: `post.html`

- [ ] **Step 1: Create post.html**

Create `/mnt/c/Users/johan/Documents/05_Proyectos_Codigo/phymac/web/PhyMaC_web_page/post.html` with this full content:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artículo — PhyMaC</title>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="imagenes/logo.svg">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- TailwindCSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'phymac': {
              'white': '#F5F5F5',
              'blue': '#2962FF',
              'blue-dark': '#0039CB',
              'blue-light': '#768FFF',
              'orange': '#FF6D00',
              'orange-dark': '#C43E00',
              'orange-light': '#FF9E40',
              'carbon': '#212121',
              'carbon-light': '#484848',
            }
          },
          fontFamily: {
            'display': ['Montserrat', 'system-ui', 'sans-serif'],
            'body': ['Open Sans', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Estilos PhyMaC -->
  <link rel="stylesheet" href="phymac-styles.css">

  <style>
    /* Prose styles for post body */
    .post-body h2 { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 800; color: #212121; margin: 2rem 0 0.75rem; }
    .post-body h3 { font-family: 'Montserrat', sans-serif; font-size: 1.25rem; font-weight: 700; color: #212121; margin: 1.5rem 0 0.5rem; }
    .post-body p  { font-family: 'Open Sans', sans-serif; color: #484848; line-height: 1.8; margin-bottom: 1.25rem; }
    .post-body ul, .post-body ol { font-family: 'Open Sans', sans-serif; color: #484848; margin: 0 0 1.25rem 1.5rem; line-height: 1.8; }
    .post-body ul { list-style: disc; }
    .post-body ol { list-style: decimal; }
    .post-body a  { color: #2962FF; text-decoration: underline; }
    .post-body a:hover { color: #FF6D00; }
    .post-body img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
    .post-body iframe { max-width: 100%; }
    .post-body strong { font-weight: 700; color: #212121; }
    .post-body blockquote { border-left: 4px solid #2962FF; padding-left: 1rem; margin: 1.5rem 0; color: #757575; font-style: italic; }
  </style>
</head>
<body style="background-color: #F5F5F5;">

  <!-- Header (injected by header.js) -->
  <div id="header-placeholder"></div>

  <!-- Main content -->
  <main id="post-main">
    <!-- Rendered by inline script below -->
  </main>

  <!-- Footer (injected by footer.js) -->
  <div id="footer-placeholder"></div>

  <!-- Script load order: config → header → footer → blog-data → blog → main → inline -->
  <script src="config.js"></script>
  <script src="components/header.js"></script>
  <script src="components/footer.js"></script>
  <script src="blog-data.js"></script>
  <script src="blog.js"></script>
  <script src="main.js"></script>

  <script>
    (function() {
      // Read slug from query string
      var params = new URLSearchParams(window.location.search);
      var slug = params.get('slug');

      // Render header and footer
      var headerEl = document.getElementById('header-placeholder');
      if (headerEl && typeof createHeader === 'function') {
        headerEl.innerHTML = createHeader();
        if (typeof initHeaderBehavior === 'function') initHeaderBehavior();
      }
      var footerEl = document.getElementById('footer-placeholder');
      if (footerEl && typeof createFooter === 'function') {
        footerEl.innerHTML = createFooter();
        if (typeof initFooterBehavior === 'function') initFooterBehavior();
      }

      var main = document.getElementById('post-main');

      // Resolve post
      if (!slug || typeof BLOG_POSTS === 'undefined') {
        renderNotFound(main);
        return;
      }
      var post = BLOG_POSTS.find(function(p) { return p.slug === slug; });
      if (!post) {
        renderNotFound(main);
        return;
      }

      // Update page title and meta description
      document.title = post.title + ' — PhyMaC';
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.summary);

      // Category colors
      var categoryColors = {
        'Metodología':    { bg: '#E8EAF6', text: '#2962FF' },
        'Proyectos':      { bg: '#E8F5E9', text: '#2E7D32' },
        'Programas':      { bg: '#FFF3E0', text: '#FF6D00' },
        'Publicaciones':  { bg: '#E3F2FD', text: '#1565C0' },
        'Capacitación':   { bg: '#FCE4EC', text: '#C2185B' },
        'Educación STEM': { bg: '#E8F5E9', text: '#1B5E20' },
        'Docentes':       { bg: '#EDE7F6', text: '#4527A0' },
        'Adultos Mayores':{ bg: '#FFF8E1', text: '#E65100' },
        'Tecnología':     { bg: '#E0F7FA', text: '#006064' },
        'Otros':          { bg: '#EEEEEE', text: '#212121' }
      };
      var catStyle = categoryColors[post.category] || { bg: '#EEEEEE', text: '#212121' };

      // Format date
      var formattedDate = typeof window.formatDate === 'function'
        ? window.formatDate(post.date)
        : new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

      // Reading time (rough: 200 wpm)
      var wordCount = post.content ? post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length : 0;
      var readTime = Math.max(1, Math.round(wordCount / 200));

      // PDF button (only if pdf_url exists)
      var pdfBtn = '';
      if (post.pdf_url && typeof driveToDownload === 'function') {
        var pdfHref = driveToDownload(post.pdf_url);
        if (pdfHref) {
          pdfBtn = '<div class="mt-8">' +
            '<a href="' + pdfHref + '" target="_blank" rel="noopener noreferrer" ' +
            'class="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-display font-bold text-sm transition-all" ' +
            'style="background-color: #2962FF; box-shadow: 0 3px 0 #0039CB; text-decoration: none;">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
            '<polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' +
            '</svg>Descargar PDF</a></div>';
        }
      }

      // WhatsApp CTA
      var waMsg = encodeURIComponent('Me interesa saber más sobre: ' + post.title);
      var waNumber = (typeof CONFIG !== 'undefined' && CONFIG.contact && CONFIG.contact.whatsapp)
        ? CONFIG.contact.whatsapp.number
        : '573197438210';
      var waUrl = 'https://wa.me/' + waNumber + '?text=' + waMsg;

      main.innerHTML =
        // Breadcrumb
        '<nav class="max-w-5xl mx-auto px-4 pt-4 pb-2 text-sm font-body" style="color: #9E9E9E;" aria-label="Breadcrumb">' +
          '<a href="blog.html" style="color: #2962FF; text-decoration: none;">Blog</a>' +
          ' <span aria-hidden="true">›</span> ' +
          '<span style="background-color: ' + catStyle.bg + '; color: ' + catStyle.text + '; padding: 2px 10px; border-radius: 99px; font-size: 12px; font-weight: 700;">' + escapeHtml(post.category) + '</span>' +
          ' <span aria-hidden="true">›</span> ' +
          '<span style="color: #484848;">' + escapeHtml(post.title.length > 48 ? post.title.slice(0, 48) + '…' : post.title) + '</span>' +
        '</nav>' +

        // Hero section
        '<div style="position: relative; min-height: 320px; max-height: 480px; overflow: hidden; background: linear-gradient(135deg, #1a1a2e 0%, #2962FF 100%);">' +
          '<img src="' + post.image + '" alt="" role="presentation" ' +
               'style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.5;" ' +
               'onerror="this.style.display=\'none\'">' +
          '<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.45);"></div>' +
          '<div style="position: relative; z-index: 1; max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem 2.5rem;">' +
            '<span style="display: inline-block; background-color: #FF6D00; color: white; font-size: 12px; font-weight: 700; font-family: Montserrat, sans-serif; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 12px; border-radius: 99px; margin-bottom: 1rem;">' + escapeHtml(post.category) + '</span>' +
            '<h1 style="font-family: Montserrat, sans-serif; font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 900; color: white; line-height: 1.2; margin-bottom: 1rem;">' + escapeHtml(post.title) + '</h1>' +
            '<p style="font-family: Open Sans, sans-serif; font-size: 14px; color: rgba(255,255,255,0.8);">' +
              escapeHtml(post.author) + ' · ' + formattedDate + ' · ' + readTime + ' min lectura' +
            '</p>' +
          '</div>' +
        '</div>' +

        // Orange accent bar
        '<div style="height: 4px; background-color: #FF6D00;"></div>' +

        // Post body
        '<article class="max-w-3xl mx-auto px-4 py-10 post-body">' +
          post.content +
          pdfBtn +
        '</article>' +

        // WhatsApp CTA strip
        '<div style="background-color: #FFF3E0; border-top: 1px solid #FFE0B2; border-bottom: 1px solid #FFE0B2; padding: 1.5rem 1rem;">' +
          '<div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">' +
            '<p style="font-family: Montserrat, sans-serif; font-size: 1rem; font-weight: 700; color: #FF6D00; margin: 0;">¿Te interesa este reto en tu institución?</p>' +
            '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" ' +
               'class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-display font-bold text-sm transition-all" ' +
               'style="background-color: #FF6D00; box-shadow: 0 3px 0 #C43E00; text-decoration: none; white-space: nowrap;">' +
              'Contáctanos →' +
            '</a>' +
          '</div>' +
        '</div>';

      // Scroll animations
      if (typeof initScrollAnimations === 'function') initScrollAnimations();

      function renderNotFound(container) {
        container.innerHTML =
          '<div class="max-w-xl mx-auto px-4 py-20 text-center">' +
            '<h1 class="font-display text-3xl font-extrabold mb-4" style="color: #212121;">Artículo no encontrado</h1>' +
            '<p class="font-body mb-8" style="color: #484848;">El artículo que buscas no existe o fue movido.</p>' +
            '<a href="blog.html" class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-display font-bold" style="background-color: #2962FF; text-decoration: none;">← Volver al Blog</a>' +
          '</div>';
      }
    })();
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify the file was created**

```bash
ls -la post.html
```

Expected: file exists.

- [ ] **Step 3: Test locally by opening in browser**

Run a local server if not already running:
```bash
python3 -m http.server 8000 &
```

Open: `http://localhost:8000/post.html?slug=accion-reaccion-rosal-fundacion-cresiendo`

Verify:
- Page title changes to the post title
- Hero image renders with dark overlay
- Post title and meta (author, date, read time) appear in white over the hero
- Orange bar separates hero from body
- Post body content (HTML from Markdown) renders
- WhatsApp CTA strip appears at bottom

Test slug not found: `http://localhost:8000/post.html?slug=does-not-exist`

Verify: "Artículo no encontrado" message with back link to blog.

- [ ] **Step 4: Commit**

```bash
git add post.html
git commit -m "feat: create post.html individual article page with hero overlay layout"
```

---

## Task 5: Update blog.js — remove modal, cards link to post.html

**Files:**
- Modify: `blog.js`

- [ ] **Step 1: Replace the "Leer más" button with a link in renderBlogPosts**

In `blog.js`, find and replace the button element inside `renderBlogPosts` (lines 95–106):

```js
              <button
                onclick="openBlogPost(${post.id})"
                class="inline-flex items-center font-display font-bold text-sm transition-colors"
                style="color: #2962FF;"
                onmouseover="this.style.color='#FF6D00'"
                onmouseout="this.style.color='#2962FF'"
              >
                Leer más
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
```

With:

```js
              <a
                href="post.html?slug=${escapeHtml(post.slug)}"
                class="inline-flex items-center font-display font-bold text-sm transition-colors"
                style="color: #2962FF; text-decoration: none;"
                onmouseover="this.style.color='#FF6D00'"
                onmouseout="this.style.color='#2962FF'"
              >
                Leer más
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
```

- [ ] **Step 2: Remove the openBlogPost function (lines 133–204)**

Delete the entire `window.openBlogPost` function block — from:
```js
// Función para abrir un artículo completo (modal o página)
// Disponible globalmente
window.openBlogPost = function(postId) {
```
through the closing:
```js
};
```

(Approximately lines 133–204 in blog.js)

- [ ] **Step 3: Verify no openBlogPost reference remains**

```bash
grep "openBlogPost" blog.js
```

Expected: no output.

- [ ] **Step 4: Verify Leer más link uses slug**

```bash
grep "post.html?slug" blog.js
```

Expected: one match.

- [ ] **Step 5: Open blog.html in browser and verify**

Open: `http://localhost:8000/blog.html`

Verify:
- All cards render correctly
- "Leer más" links navigate to `post.html?slug=...` (check href in DevTools)
- No modal appears when clicking cards

- [ ] **Step 6: Commit**

```bash
git add blog.js
git commit -m "feat: replace blog modal with links to post.html individual pages"
```

---

## Task 6: Update index.html — project cards use blogSlug

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the project card rendering script block**

In `index.html`, find the block starting with:
```js
            if (typeof BLOG_POSTS !== 'undefined' && proyecto.blogId) {
              const blogPost = BLOG_POSTS.find(post => post.id === proyecto.blogId);
              if (blogPost) {
                href = 'blog.html';
                onclickAttr = `onclick="if(typeof openBlogPost === 'function') { event.preventDefault(); openBlogPost(${blogPost.id}); }"`;
                linkText = 'Leer artículo';
              }
            }
```

Replace with:

```js
            if (typeof BLOG_POSTS !== 'undefined' && proyecto.blogSlug) {
              const blogPost = BLOG_POSTS.find(post => post.slug === proyecto.blogSlug);
              if (blogPost) {
                href = 'post.html?slug=' + encodeURIComponent(blogPost.slug);
                linkText = 'Leer artículo';
              }
            }
```

Also remove the now-unused `onclickAttr` variable declaration and its usage in the template literal. Find:
```js
            let extraAttrs = '';
            let onclickAttr = '';
```
and remove `let onclickAttr = '';` (keep `extraAttrs`).

Find in the template literal:
```js
              <a href="${href}" ${extraAttrs} ${onclickAttr}
```
and change to:
```js
              <a href="${href}" ${extraAttrs}
```

- [ ] **Step 2: Verify no blogId or openBlogPost references remain in index.html**

```bash
grep -n "blogId\|openBlogPost" index.html
```

Expected: no output.

- [ ] **Step 3: Verify blogSlug is used**

```bash
grep "blogSlug" index.html
```

Expected: one match (the `proyecto.blogSlug` lookup).

- [ ] **Step 4: Open index.html in browser and verify**

Open: `http://localhost:8000/index.html`

Verify:
- Project cards render (Acción y reacción, Física de Cohetes, Didáctica, Gimnasia Cerebral)
- Each card's "Leer artículo" link points to `post.html?slug=...` (check href in DevTools)
- Clicking the link opens the post page correctly

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: update index.html project cards to use blogSlug and link to post.html"
```

---

## Self-Review

**Spec coverage check:**
1. ✅ Missing post "Ciencia con Sello de Mujer" — Task 1 creates `content/blog/2026-02-11-ciencia-sello-mujer.md` and regenerates `blog-data.js`
2. ✅ `post.html?slug=...` individual pages — Task 4 creates the page with Variante 1 layout (hero overlay, orange bar, CTA strip)
3. ✅ `config.js` `blogId` → `blogSlug` + real social URLs + remove twitter — Task 2
4. ✅ Footer social section uncommented + TikTok added + reads CONFIG.social — Task 3
5. ✅ `blog.js` modal removed, cards → `<a href="post.html?slug=...">` — Task 5
6. ✅ `index.html` project cards use `blogSlug` lookup → `post.html?slug=...` — Task 6
7. ✅ `blog.html` — spec says remove `<div id="blog-modal">` but the modal is created dynamically by JS (no static div in HTML), so removing `openBlogPost` from `blog.js` (Task 5) fully handles this.

**Placeholder scan:** No TBD/TODO in tasks. All code blocks are complete.

**Type consistency:** `post.slug` (string), `proyecto.blogSlug` (string), `BLOG_POSTS.find(p => p.slug === ...)` — consistent across Tasks 2, 4, 5, 6. `driveToDownload()` called in post.html — defined in `blog.js` which loads before the inline script. `escapeHtml()` called in post.html inline script — also from `blog.js`, loaded before inline script. ✅
