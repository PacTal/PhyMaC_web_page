# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

No build system or dependencies required. Serve with any static file server:

```bash
python -m http.server 8000
# or
npx http-server
```

## Architecture Overview

**Static site with client-side component hydration.** No framework, no build step, no backend.

### Data Flow

All dynamic content originates from `config.js` (single source of truth). Changes there propagate across the entire site. Script load order matters:

```
config.js → components/header.js + components/footer.js → blog-data.js → main.js → blog.js (blog page only)
```

On DOMContentLoaded, `main.js` calls `initHeader()` and `initFooter()`, which inject HTML into `#header-container` and `#footer-container` divs present in every HTML page.

### Key Files

| File | Role |
|------|------|
| `config.js` | Master config: logo, contact info, WhatsApp, menu, projects, publications, services |
| `main.js` | Boot sequence: loads components, smooth scroll, scroll animations, utility functions |
| `blog-data.js` | Array of blog post objects (content, metadata) |
| `blog.js` | Renders blog posts from `blog-data.js` into `blog.html` |
| `components/header.js` | Responsive navbar, reads from `CONFIG` |
| `components/footer.js` | Footer + Formspree contact form, reads from `CONFIG` |
| `phymac-styles.css` | Custom brand styles, CSS variables, animations |

### Pages

- `index.html` — Homepage: hero, STEM method, projects gallery
- `blog.html` — Blog listing with category filtering
- `servicios.html` — Services page
- `publicaciones.html` — Publications/books page

### Brand Identity

- Electric Blue: `#2962FF` (primary, links, borders)
- Safety Orange: `#FF6D00` (CTAs, accents)
- Carbon Grey: `#212121` (body text)
- Lab White: `#F5F5F5` (backgrounds)
- Fonts: Montserrat 800 (display) + Open Sans (body) via Google Fonts CDN

Styling uses TailwindCSS (CDN) for utilities + `phymac-styles.css` for brand-specific components. Inline styles in components apply dynamic colors from `CONFIG`.

### Blog System

Posts live in `blog-data.js` as an array of objects with: `id`, `title`, `date`, `author`, `category`, `image`, `summary`, `content`. `blog.js` reads this array, sorts by date, and renders cards into the page container. Category color is defined per-post in the data file.

### External Integrations

- **Formspree**: Contact form endpoint in `CONFIG.contact.formspree.endpoint`
- **WhatsApp**: Number and default message in `CONFIG.contact.whatsapp`; use the `getWhatsAppLink()` utility from `main.js`
- **Google Drive**: Logo image hosted externally, URL in `CONFIG.logo.url`
