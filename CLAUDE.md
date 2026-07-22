# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

Content is authored as Markdown and compiled into JS data files, so run the build before serving:

```bash
npm install
npm run build          # blog-data.js + episodios-data.js
python -m http.server 8000
```

Individual builds: `npm run build:blog`, `npm run build:episodios`. Tests: `npm test` (Jest, covers the build scripts).

## Architecture Overview

**Static site with a content build step + client-side component hydration.** No framework, no backend.

Netlify runs `npm install && npm run build` (see `netlify.toml`), which regenerates the data files from `content/` on every deploy. That is why editing in the CMS is enough to publish — no code changes needed.

### Data Flow

Two sources of truth:

- **`config.js`** — site chrome and settings (menu, contact, brand copy, agenda scoring, analytics IDs, legal links). Changes propagate everywhere.
- **`content/**/*.md`** — editorial content, managed through Decap CMS.

```
content/blog/*.md      → scripts/build-blog.js      → blog-data.js      (const BLOG_POSTS)
content/episodios/*.md → scripts/build-episodios.js → episodios-data.js (const EPISODIOS)
```

Script load order in each page:

```
config.js → components/*.js → main.js → <data>.js → <render>.js → inline page script
```

On DOMContentLoaded, `main.js` calls `initHeader()` and `initFooter()`, which inject HTML into the `#header-container` and `#footer-container` divs present in every page. `post.html` is the exception: it hydrates its own header/footer inline via `#header-placeholder` / `#footer-placeholder`.

### Key Files

| File | Role |
|------|------|
| `config.js` | Master config: logo, contact, WhatsApp, menu, publications, services, serie, agenda, analytics, legal |
| `main.js` | Boot sequence: components, smooth scroll, scroll animations, `getWhatsAppLink()`, `formatDate()` |
| `blog-data.js` / `episodios-data.js` | **Auto-generated — do not edit by hand** |
| `blog.js` | Renders blog posts into `blog.html` |
| `episodios.js` | Render helpers for the series (`epGetAll`, `epFindBySlug`, `epGetMateriales`, `epCard`, `epMaterialCard`) |
| `components/header.js` | Responsive navbar, reads from `CONFIG` |
| `components/footer.js` | Footer + Formspree contact form + consent checkbox |
| `components/lead-form.js` | Reusable email-gated download block (`createLeadForm` / `initLeadForm`) |
| `components/analytics.js` | GA4 + Meta Pixel loader and `trackEvent()`; inert when no IDs are configured |
| `admin/config.yml` | Decap CMS collections (`blog`, `episodios`) |
| `phymac-styles.css` | Brand styles, CSS variables, animations |

### Pages

- `index.html` — Homepage: hero, STEM method, window onto the 3 latest blog posts
- `blog.html` / `post.html?slug=` — Blog listing and article
- `profes.html` / `episodio.html?slug=` — "Hablando con profes" series landing and episode
- `biblioteca.html` — Library of downloadable materials, built from the episodes collection
- `contacto.html` — Contact channels + qualification form gating a Cal.com calendar
- `servicios.html` — Services page
- `publicaciones.html` — Publications/books page
- `privacidad.html` — Privacy policy (Ley 1581 de 2012)

Both `post.html` and `episodio.html` must render "not found" for an unknown slug — never fall back to other content.

### Brand Identity

- Electric Blue: `#2962FF` (primary, links, borders)
- Safety Orange: `#FF6D00` (CTAs, accents)
- Carbon Grey: `#212121` (body text)
- Lab White: `#F5F5F5` (backgrounds)
- Fonts: Montserrat 800 (display) + Open Sans (body) via Google Fonts CDN

Styling uses TailwindCSS (CDN) for utilities + `phymac-styles.css` for brand-specific components. Inline styles in components apply dynamic colors from `CONFIG`. The desktop nav switches to the mobile menu below `lg`, not `md` — five sections plus the CTA do not fit below 1024px. Keep the nav to page-level destinations only; secondary links (Inicio, El método, Biblioteca) live in the footer.

### Content Systems

**Blog** — `content/blog/*.md`. Frontmatter: `title`, `slug`, `author`, `date`, `category`, `image`, `summary`, `pdf_url`; body is the article. Category colors are hardcoded maps in `blog.js` and `post.html`.

**Episodes** — `content/episodios/*.md`. Frontmatter carries everything, including the body (`contenido`, a markdown widget). Notable build rules in `scripts/build-episodios.js`: `youtube_id` accepts a bare ID or any YouTube URL; an episode marked `publicado` without a video is downgraded to `proximamente`; `guia` is `null` unless `guia_archivo` is set.

**Library** — not a separate content type. `biblioteca.html` lists every episode whose guide is present and `guia_publica`. Adding an episode with a guide makes it appear automatically.

### Lead Capture

Downloads are email-gated: `components/lead-form.js` requires name, email, role and an explicit consent checkbox, POSTs to Formspree, then reveals the download link on screen. The same component powers the episode page block and the library modal.

`CONFIG.contact.formspree` has three endpoints: `endpoint` (general contact), `materiales` and `agenda`. The last two fall back to the general one while empty, so the forms work before dedicated endpoints exist.

The footer carries the general contact form on every page. A page that already has its own form suppresses it with `<div id="footer-container" data-formulario="no">` — otherwise two forms asking the same thing stack up, as they did on `contacto.html`.

Every capture point must keep the consent checkbox and the link to `privacidad.html` — this is a legal requirement (Ley 1581 de 2012), not a UX choice.

### External Integrations

- **Decap CMS**: `/admin/`, backend `git-gateway` on `PacTal/PhyMaC_web_page`. Note: `media_folder` is deliberately global-only — Decap resolves collection-level `media_folder` relative to the entry file, which silently breaks upload paths.
- **Formspree**: endpoints in `CONFIG.contact.formspree`
- **Cal.com**: `CONFIG.agenda.calLink` (e.g. `"phymac/30min"`); the embed loads only for qualified prospects, and `contacto.html` falls back to WhatsApp when the link is empty
- **WhatsApp**: `CONFIG.contact.whatsapp`; use `getWhatsAppLink()` from `main.js`
- **Analytics**: `CONFIG.analytics.ga4Id` / `metaPixelId`. Events: `lead_material`, `agenda_calificado`, `agenda_no_calificado`, `reunion_reservada`
