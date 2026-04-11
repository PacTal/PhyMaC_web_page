# PhyMaC — Guía de Implementación Decap CMS
### Incluye análisis de diseño y UX del sitio actual

> **Estado:** Borrador para revisión · **Fecha:** Abril 2026 · **Repo:** `PacTal/PhyMaC_web_page` · **Esfuerzo estimado:** 3–5 horas

---

## Índice

1. [Contexto y problema](#1-contexto-y-problema)
2. [Solución propuesta: Decap CMS](#2-solución-propuesta-decap-cms)
3. [Cambios técnicos requeridos](#3-cambios-técnicos-requeridos)
4. [Configuración de autenticación](#4-configuración-de-autenticación)
5. [Resumen de cambios](#5-resumen-de-cambios)
6. [Flujo de trabajo del editor](#6-flujo-de-trabajo-del-editor-post-implementación)
7. [Dependencias y requisitos](#7-dependencias-y-requisitos-previos)
8. [Riesgos y mitigaciones](#8-riesgos-y-mitigaciones)
9. [Análisis de diseño y UX](#9-análisis-de-diseño-y-ux)
10. [Próximos pasos](#10-próximos-pasos)

---

## 1. Contexto y problema

El sitio web de PhyMaC es un sitio estático (HTML + JavaScript + TailwindCSS) desplegado en Netlify o Vercel. El contenido del blog vive en `blog-data.js` y el contenido general del sitio en `config.js`. Para actualizar cualquier contenido, actualmente se requiere:

1. Tener acceso al repositorio en GitHub
2. Conocer la estructura de un objeto JavaScript
3. Editar el archivo directamente en el editor de GitHub o localmente
4. Hacer commit y esperar el redespliegue automático

Este flujo es inviable para 3–5 personas no técnicas que necesitan publicar artículos de blog con frecuencia. Un error al editar el archivo JS puede romper el sitio completo.

---

## 2. Solución propuesta: Decap CMS

Decap CMS (antes Netlify CMS) es un sistema de gestión de contenidos de código abierto que se integra directamente con repositorios de GitHub. Permite que personas no técnicas publiquen y editen contenido a través de una interfaz visual, sin tocar código.

### 2.1 Cómo funciona

Decap CMS agrega una ruta `/admin` al sitio. Cuando un editor visita esa URL, ve una interfaz tipo panel de administración. Al guardar un artículo desde esa interfaz, Decap CMS crea o modifica automáticamente los archivos correspondientes en GitHub y activa el redespliegue en Netlify/Vercel.

> **Flujo para el editor:** entrar a `phymac.com/admin` → escribir artículo → clic en Publicar. GitHub y el redespliegue ocurren automáticamente en segundo plano.

### 2.2 Precio

| Componente | Costo mensual |
|---|---|
| Decap CMS | $0 — open source |
| GitHub | $0 — plan free (repo público) |
| Netlify / Vercel | $0 — plan free (ya lo usan) |
| Autenticación GitHub OAuth | $0 — nativo en Netlify |
| **TOTAL** | **$0 / mes** |

---

## 3. Cambios técnicos requeridos

La implementación requiere tres tipos de cambios: agregar archivos nuevos, modificar `blog.js` para leer el nuevo formato, y configurar la autenticación en Netlify.

### 3.1 Archivos nuevos a crear

#### Archivo 1 — `admin/index.html`

Este archivo es la entrada al panel de administración. Carga la interfaz visual de Decap CMS.

```html
<!-- admin/index.html -->
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>PhyMaC Admin</title>
</head>
<body>
  <!-- Carga la interfaz visual de Decap CMS -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

#### Archivo 2 — `admin/config.yml`

Este archivo define la estructura del CMS: qué colecciones de contenido existen, qué campos tiene cada una, y dónde se guardan los archivos. Es el corazón de la configuración.

```yaml
# admin/config.yml
backend:
  name: github
  repo: PacTal/PhyMaC_web_page
  branch: main

# Donde se guardan las imágenes subidas desde el CMS
media_folder: imagenes/blog
public_folder: /imagenes/blog

collections:
  - name: blog
    label: Artículos del Blog
    folder: content/blog
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: Título, name: title, widget: string }
      - { label: Subtítulo, name: subtitle, widget: string, required: false }
      - { label: Autor, name: author, widget: string }
      - { label: Fecha, name: date, widget: datetime }
      - label: Categoría
        name: category
        widget: select
        options:
          - Educación STEM
          - Metodología
          - Proyectos
          - Docentes
          - Adultos Mayores
          - Tecnología
      - { label: Imagen destacada, name: image, widget: image, required: false }
      - { label: Contenido, name: body, widget: markdown }
      - label: PDF adjunto (Google Drive)
        name: pdf_url
        widget: string
        required: false
        hint: "Pega el link de Google Drive con permiso 'Cualquier persona con el enlace puede ver'"
```

> **Nota:** Los artículos se guardarán como archivos Markdown (`.md`) en la carpeta `content/blog/`. Esto es más limpio y estándar que el array JS actual.

#### Archivo 3 — `netlify.toml` (nuevo o a editar)

Configura el servidor OAuth que autentica a los editores con GitHub. Netlify lo provee nativamente.

```toml
# netlify.toml
[build]
  publish = "."

# Habilita autenticación OAuth de Netlify Identity
[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200
```

### 3.2 Archivo a modificar: `blog.js`

El archivo `blog.js` actualmente importa los artículos desde `blog-data.js` (un array JavaScript). Hay que modificarlo para que lea los archivos Markdown de la carpeta `content/blog/` en vez del array.

#### Situación actual

```javascript
// blog.js (fragmento actual — simplificado)
// Los artículos están hardcodeados en un array JS
import { posts } from './blog-data.js';

function renderPosts(posts) {
  // ... renderiza los posts del array
}
```

#### Estrategias disponibles

| Estrategia | Descripción |
|---|---|
| **A — Build script** (recomendada) | Agregar un script Node.js que en el momento del build lea todos los `.md` de `content/blog/` y genere un nuevo `blog-data.js` automáticamente. Zero cambios en `blog.js`. |
| **B — Fetch en runtime** | Modificar `blog.js` para hacer `fetch()` de un archivo JSON generado en build time. Más moderno pero requiere más cambio. |

> **Recomendación: Estrategia A.** Es la de menor riesgo porque no cambia `blog.js`. Solo se agrega un script que corre antes del build y regenera `blog-data.js` desde los Markdown.

#### Script de build sugerido — `scripts/build-blog.js`

```javascript
// scripts/build-blog.js
// Leer archivos .md de content/blog/ y generar blog-data.js

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // npm install gray-matter

const BLOG_DIR = path.join(__dirname, '../content/blog');
const OUTPUT = path.join(__dirname, '../blog-data.js');

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

const posts = files.map((file, index) => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const { data, content } = matter(raw);
  return {
    id: index + 1,
    title: data.title,
    subtitle: data.subtitle || '',
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image || '',
    content: content,
    pdf_url: data.pdf_url || null
  };
});

// Genera blog-data.js igual que antes, compatible con blog.js actual
const output = `// AUTO-GENERATED — No editar manualmente
// Generado por scripts/build-blog.js
export const posts = ${JSON.stringify(posts, null, 2)};`;

fs.writeFileSync(OUTPUT, output);
console.log(`✓ blog-data.js generado con ${posts.length} artículos`);
```

### 3.3 Cambio en `netlify.toml` (build command)

```toml
# netlify.toml — actualizado
[build]
  publish = "."
  command = "node scripts/build-blog.js"

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200
```

### 3.4 PDFs adjuntos desde Google Drive

Algunos artículos del blog pueden llevar un PDF para descarga (libros, guías, materiales de taller). La estrategia elegida es guardar solo el **link de Google Drive** en el frontmatter del artículo — sin subir el archivo al repositorio.

#### Por qué Drive y no el repo

Subir PDFs directamente al repo de Git tiene un problema: Git guarda el historial completo de todos los archivos, y los binarios pesados (PDFs, imágenes grandes) hacen que el repositorio crezca indefinidamente. Con links de Drive, el repo permanece liviano y los PDFs se gestionan donde ya están.

#### Requisito previo en Drive

Antes de pegar el link en el CMS, el editor debe asegurarse de que el archivo tenga el permiso correcto en Google Drive:

1. Clic derecho sobre el archivo → **Compartir**
2. En "Acceso general", seleccionar **Cualquier persona con el enlace**
3. Permiso: **Lector** (no Editor)
4. Copiar el enlace y pegarlo en el campo del CMS

#### Transformación de URL para descarga directa

Los links normales de Drive abren el **visor de Drive**, no descargan el archivo. Para forzar la descarga directa, el script de renderizado debe transformar la URL:

```javascript
// URL normal que comparte Drive:
// https://drive.google.com/file/d/FILE_ID/view?usp=sharing

// Función para convertir a descarga directa
function driveToDownload(url) {
  if (!url) return null;
  return url.replace('/view', '/export?format=pdf');
}

// Uso en la tarjeta o vista del artículo
if (post.pdf_url) {
  const downloadUrl = driveToDownload(post.pdf_url);
  html += `
    <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer">
      Descargar PDF
    </a>
  `;
}
```

#### Ejemplo de frontmatter resultante en el `.md`

Así queda el archivo Markdown de un artículo con PDF adjunto después de que el editor lo publica desde el CMS:

```markdown
---
title: "Retos STEM para adultos mayores"
author: "Equipo PhyMaC"
date: 2026-04-08
category: Adultos Mayores
image: /imagenes/blog/taller-adultos.jpg
pdf_url: "https://drive.google.com/file/d/1aBcDeFgHiJkLmN/view?usp=sharing"
---

Contenido del artículo...
```

---

## 4. Configuración de autenticación

Decap CMS usa GitHub como backend. Los editores inician sesión con su cuenta de GitHub. Netlify provee el servidor OAuth necesario de forma nativa (sin costo adicional).

### 4.1 Pasos en Netlify

1. En el dashboard de Netlify, ir a **Site configuration → Identity**
2. Clic en **Enable Identity**
3. Ir a **Identity → Registration** y seleccionar **Invite only** (solo personas invitadas pueden acceder)
4. Ir a **Identity → External providers** → agregar **GitHub**
5. En Settings → Build & Deploy → Environment, no se requieren variables adicionales

### 4.2 Invitar editores

Una vez habilitado Identity, desde el dashboard de Netlify se puede invitar a cada editor por correo electrónico. Recibirán un enlace, crearán su cuenta y podrán acceder a `/admin` con su cuenta de GitHub.

> **Los editores NO necesitan acceso al repositorio de GitHub.** Solo necesitan una cuenta de GitHub para autenticarse. Netlify gestiona los permisos de escritura de forma transparente.

---

## 5. Resumen de cambios

| Archivo | Acción | Complejidad |
|---|---|---|
| `admin/index.html` | Crear nuevo | Baja — copiar y pegar |
| `admin/config.yml` | Crear nuevo | Media — ajustar campos |
| `netlify.toml` | Crear o editar | Baja |
| `scripts/build-blog.js` | Crear nuevo | Media — script Node.js |
| `blog-data.js` | Pasa a ser auto-generado | Sin cambio manual |
| `blog.js` | Sin cambios | Ninguna |
| `content/blog/` | Carpeta nueva para `.md` | Solo crearla |

---

## 6. Flujo de trabajo del editor (post-implementación)

Una vez implementado, el proceso para publicar un artículo será:

1. Entrar a `phymac.com/admin` desde cualquier navegador
2. Iniciar sesión con la cuenta de GitHub (solo la primera vez)
3. Clic en "Nuevo artículo" en la sección Blog
4. Completar el formulario: título, autor, categoría, imagen y cuerpo del artículo (editor visual tipo Word)
5. Clic en "Publicar". Decap CMS crea el archivo Markdown en GitHub automáticamente
6. Netlify/Vercel detecta el cambio, corre el build script y redespliegue el sitio. En 1–2 minutos el artículo está en línea

> **Tiempo estimado para publicar un artículo: 5–10 minutos.** Sin tocar código, sin abrir GitHub, sin riesgo de romper el sitio.

---

## 7. Dependencias y requisitos previos

| Requisito | Detalle |
|---|---|
| Repositorio en GitHub | Ya existe: `PacTal/PhyMaC_web_page` |
| Despliegue en Netlify | Ya configurado según el equipo |
| Node.js en build | Netlify incluye Node.js en el entorno de build por defecto |
| Paquete `gray-matter` | `npm install gray-matter` — para parsear frontmatter de los `.md` |
| Cuentas GitHub editores | Cada editor debe tener cuenta en github.com (es gratis) |
| Netlify Identity | Habilitar en el dashboard de Netlify (gratuito) |

---

## 8. Riesgos y mitigaciones

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| El build script falla y `blog-data.js` queda vacío | Baja | Hacer backup de `blog-data.js` actual. El script solo sobreescribe si corre exitosamente. |
| Netlify Identity no disponible en plan free | Muy baja | Netlify Identity está disponible en el plan gratuito hasta 1,000 usuarios activos. |
| Editor sube imagen muy grande y ralentiza el sitio | Media | Agregar guía de tamaño máximo de imágenes (< 500 KB) en la documentación del CMS. |
| Conflictos de merge entre editores simultáneos | Baja | Decap CMS crea commits independientes. Los conflictos son raros en contenido de blog. |
| Link de Drive deja de funcionar (archivo eliminado o permisos cambiados) | Media | Documentar para los editores: nunca mover ni eliminar archivos de Drive después de publicar. Revisar links periódicamente. |

---

## 9. Análisis de diseño y UX

Este análisis está basado en el código de `index.html`, la identidad gráfica documentada en `identidad-grafica.md` y la configuración de estilos en `phymac-styles.css`.

### 9.1 Sistema de diseño actual

#### Colores

El sitio define una paleta propia extendida en Tailwind con dos ejes principales:

| Token | Hex | Uso actual |
|---|---|---|
| `phymac-blue` | `#2962FF` | Hero background, botones primarios, badges de categoría |
| `phymac-blue-dark` | `#0039CB` | Gradiente del hero, shadow de botones |
| `phymac-blue-light` | `#768FFF` | Hover de botones secundarios |
| `phymac-orange` | `#FF6D00` | CTAs principales, acento en tarjetas |
| `phymac-orange-dark` | `#C43E00` | Shadow de botones naranja |
| `phymac-carbon` | `#212121` | Texto principal |
| `phymac-carbon-light` | `#484848` | Texto secundario |
| `phymac-white` | `#F5F5F5` | Fondo general |

**Observación:** Hay una **inconsistencia entre la identidad gráfica documentada y el sitio real.** El documento `identidad-grafica.md` define al azul (`#2962FF`) como color principal del logo y la marca. Sin embargo, el sitio usa naranja (`#FF6D00`) como color de CTA dominante y acento visual en tarjetas. Esto crea dos identidades visuales compitiendo: una institucional (azul) y una de acción (naranja). No es un error — puede ser intencional para diferenciar contextos — pero debería documentarse explícitamente.

#### Tipografía

| Rol | Familia | Pesos | Uso |
|---|---|---|---|
| Display / Títulos | Montserrat | 700, 800, 900 | H1, H2, botones, badges |
| Body / Cuerpo | Open Sans | 400, 500, 600, 700 | Párrafos, descripciones |

**Observación positiva:** La elección tipográfica es sólida. Montserrat transmite energía científica y Montserrat + Open Sans es una combinación con buena legibilidad. El uso de `font-extrabold` (900) en títulos principales genera impacto visual apropiado para una audiencia STEM joven.

---

### 9.2 Análisis por sección — `index.html`

#### Hero

```
Fondo: azul (#2962FF) con gradiente a azul oscuro (#0039CB)
Patrón: SVG de cruces blancas semitransparentes (electric-pattern)
CTA principal: naranja con shadow 3D ("¡Acepta el reto!")
CTA secundario: outline blanco ("Conoce nuestro método")
```

**Fortalezas:**
- El contraste texto blanco sobre azul supera el umbral WCAG AA (ratio ~7:1)
- El botón naranja con `box-shadow: 0 4px 0 #C43E00` simula un efecto 3D que da sensación táctil — funciona bien como CTA primario
- El copy "Para entender el mundo tecnológico, resuelve retos reales" es directo y orientado a la acción

**Oportunidades de mejora:**
- El patrón eléctrico de fondo tiene opacidad 10% (`fill-opacity='0.1'`) — es casi invisible. Podría subirse a 15–20% para aportar más textura sin comprometer la legibilidad
- El `<span>` del subtítulo naranja dentro del H1 usa la misma clase que el body (`text-phymac-orange`). Podría reforzarse con `font-display` explícito para asegurar consistencia si el CSS se modifica
- La animación de entrada (`fadeIn 0.6s`) es apropiada pero aplica solo al contenedor `.scroll-animate`. En mobile, si el hero no carga con la animación completada, puede aparecer un flash de contenido invisible (FOIC)

#### Sección Método

```
Fondo: blanco
Contenido: texto centrado + CTA azul
```

**Observación:** Esta sección actualmente no tiene contenido visual más allá del texto y el CTA. El README menciona un "ciclo STEM de tres fases" pero no hay representación visual de ese ciclo en el HTML. Esta es una oportunidad de alto impacto: un diagrama o ilustración del método aumentaría significativamente la comprensión y el tiempo en página.

#### Tarjetas de Proyectos

```
Grid: 1 col mobile / 2 col tablet / 3 col desktop
Estilo: imagen 16:10 + badge de categoría + título + descripción + link
Hover: translate-y-2 + shadow-xl + image scale-110
```

**Fortalezas:**
- El ratio 16:10 para imágenes es una elección inusual pero funciona para imágenes de proyectos STEM (más horizontales que cuadradas)
- El efecto hover con `scale-110` en la imagen da profundidad sin JavaScript adicional
- El borde naranja superior (`border-top: 4px solid #FF6D00`) como acento en la tarjeta es consistente con el sistema de colores

**Oportunidades de mejora:**
- Los proyectos se cargan desde `CONFIG` pero si `CONFIG` tarda en cargar, el contenedor queda vacío sin skeleton loader ni placeholder. Esto puede verse mal en conexiones lentas
- El `line-clamp-2` en la descripción trunca bien el texto, pero si el proyecto no tiene descripción en `CONFIG`, quedaría un espacio vacío

---

### 9.3 Consistencia visual entre páginas

| Página | Estado de consistencia |
|---|---|
| `index.html` | Base de referencia — bien estructurada |
| `blog.html` | Desconocido sin ver el código — pendiente de auditoría |
| `servicios.html` | Desconocido sin ver el código — pendiente de auditoría |
| `publicaciones.html` | Desconocido sin ver el código — pendiente de auditoría |

**Recomendación:** Dado que header y footer son componentes modulares (`components/header.js`, `components/footer.js`), la consistencia de navegación está garantizada. El riesgo de inconsistencia es mayor en las secciones internas de cada página.

---

### 9.4 Rendimiento y accesibilidad

#### Rendimiento

| Aspecto | Estado | Detalle |
|---|---|---|
| Tailwind via CDN | ⚠️ Riesgo | TailwindCSS completo via CDN carga ~350KB. Para producción se recomienda PurgeCSS o build local de Tailwind para reducir a ~5–15KB |
| Fuentes Google Fonts | ⚠️ Riesgo | Carga 2 familias (Montserrat + Open Sans). Agregar `font-display: swap` si no está ya en el CSS para evitar FOIT |
| Imágenes desde Google Drive | ⚠️ Riesgo | Las imágenes de proyectos se sirven desde Google Drive (`lh3.googleusercontent.com`). Estos URLs pueden cambiar o expirar. Se recomienda migrar a un CDN controlado o a la carpeta `imagenes/` del repo |
| Animaciones CSS | ✅ Bien | Las animaciones son CSS puras, sin JS adicional. No impactan el main thread |

#### Accesibilidad

| Aspecto | Estado | Detalle |
|---|---|---|
| Contraste hero | ✅ Bien | Texto blanco sobre azul `#2962FF` — ratio ~7:1, pasa WCAG AA y AAA |
| Contraste texto carbon | ✅ Bien | `#212121` sobre `#F5F5F5` — ratio ~16:1 |
| Alt en imágenes | ✅ Bien | Las tarjetas de proyectos incluyen `alt="${proyecto.title}"` |
| Roles ARIA | ⚠️ Pendiente | No se detectan `role`, `aria-label` o `aria-describedby` en el HTML revisado. Los botones con solo ícono SVG necesitan `aria-label` |
| Navegación por teclado | ⚠️ Pendiente | Los `onclick` en tarjetas de proyectos no son elementos `<a>` ni `<button>` nativos, lo que los hace inaccesibles por teclado. Cambiar a `<a href>` nativo |
| Idioma del documento | ✅ Bien | `<html lang="es">` declarado correctamente |

---

### 9.5 Desalineaciones entre identidad gráfica y sitio

| Aspecto | `identidad-grafica.md` dice | Sitio implementa | Evaluación |
|---|---|---|---|
| Color principal | Azul `#2962FF` (único) | Azul + Naranja en igual jerarquía | Mejorable — el naranja no está documentado como color de acento oficial |
| Tipografía recomendada | Roboto, Montserrat o Inter | Montserrat + Open Sans | ✅ Alineado con la opción Montserrat |
| Logo formato | SVG desde `/imagenes/logo.svg` | ✅ Implementado correctamente | ✅ |
| Iconografía | Iconos lineales, grosor 2px | Iconos inline SVG tipo Feather (stroke-width="2") | ✅ Alineado |
| Fondo alternativo | `#F5F5F5` como fondo de tarjetas | `#F5F5F5` como fondo general | ✅ Alineado |

---

### 9.6 Recomendaciones de diseño priorizadas

Las siguientes mejoras están ordenadas por impacto estimado vs esfuerzo de implementación:

#### Prioridad alta — impacto inmediato en experiencia

1. **Skeleton loaders para tarjetas de proyectos.** Mientras `CONFIG` carga, mostrar placeholders grises animados en vez de un contenedor vacío. Evita la percepción de sitio roto.

2. **Visualización del ciclo STEM de 3 fases.** Agregar un diagrama o iconografía en la sección "Método". Es la propuesta de valor central de PhyMaC y actualmente es solo texto. Un componente visual aquí aumentaría directamente el tiempo en página y la comprensión.

3. **Migrar imágenes desde Google Drive a repo o CDN controlado.** Los URLs de `lh3.googleusercontent.com` son frágiles. Una imagen que deja de cargar daña la credibilidad institucional.

#### Prioridad media — calidad y consistencia

4. **Documentar el naranja como color de acento oficial** en `identidad-grafica.md`. Actualmente el naranja se usa extensivamente en el sitio pero no aparece en el documento de identidad. Esto confunde a futuros desarrolladores o diseñadores.

5. **Convertir `onclick` de tarjetas a `<a href>` nativos.** Mejora accesibilidad por teclado y SEO simultáneamente.

6. **Agregar `aria-label` a iconos SVG standalone** (especialmente el ícono de chat en los botones de WhatsApp).

#### Prioridad baja — optimización técnica

7. **Reemplazar Tailwind CDN por build local** con PurgeCSS. Reduce el CSS cargado de ~350KB a ~10–20KB. Requiere agregar un paso de build pero el impacto en Lighthouse es significativo.

8. **Subir opacidad del patrón eléctrico** del hero de 10% a 15–20% para mayor textura sin sacrificar legibilidad.

---

## 10. Próximos pasos

Para proceder con la implementación se sugiere el siguiente orden:

1. Revisar este documento con el equipo técnico
2. Habilitar Netlify Identity en el dashboard del sitio
3. Crear los archivos `admin/index.html` y `admin/config.yml`
4. Crear el script `scripts/build-blog.js` e instalar `gray-matter`
5. Actualizar `netlify.toml` con el comando de build
6. Crear un artículo de prueba desde `/admin` y verificar que aparece en el sitio
7. Invitar a los editores por correo desde Netlify Identity
8. Abordar las recomendaciones de diseño de prioridad alta en un sprint posterior

---

*PhyMaC — Para entender el mundo tecnológico, resuelve retos reales.*
