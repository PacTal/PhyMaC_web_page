# PhyMaC Web Page

Sitio web institucional de PhyMaC, una plataforma educativa enfocada en aprendizaje STEM por retos. El sitio está diseñado con una arquitectura modular y un sistema de configuración centralizado que permite personalizar todo el contenido desde un único archivo.

## 📋 Descripción

PhyMaC es una iniciativa educativa que promueve el aprendizaje de ciencia, tecnología, ingeniería y matemáticas (STEM) a través de metodologías activas y proyectos prácticos. El sitio web presenta:

- **Aprendizaje por retos**: Metodología educativa basada en resolver problemas reales
- **Proyectos educativos**: Casos de éxito en diferentes niveles (estudiantes, docentes, adultos mayores)
- **Publicaciones**: Libros y artículos académicos
- **Servicios**: Talleres, capacitaciones y consultoría educativa
- **Blog**: Artículos sobre educación STEM y metodologías activas

## 🚀 Características Principales

- ✅ **Configuración centralizada**: Todo el contenido se gestiona desde `config.js`
- ✅ **Componentes modulares**: Header y footer reutilizables
- ✅ **Diseño responsive**: Optimizado para móviles, tablets y desktop
- ✅ **Animaciones suaves**: Efectos de scroll y transiciones
- ✅ **Integración WhatsApp**: CTAs directos para contacto
- ✅ **Formulario de contacto**: Integración con Formspree
- ✅ **Blog dinámico**: Sistema de artículos con datos centralizados
- ✅ **SEO optimizado**: Meta tags y estructura semántica

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **TailwindCSS**: Framework CSS utility-first (via CDN)
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Formspree**: Manejo de formularios
- **Google Drive**: Almacenamiento de imágenes

## 📁 Estructura del Proyecto

```
PhyMaC_web_page/
├── config.js              # ⚙️ Panel de control centralizado
├── index.html             # Página principal
├── blog.html              # Página del blog
├── servicios.html         # Página de servicios
├── publicaciones.html     # Página de publicaciones
├── main.js                # Script principal de inicialización
├── blog-data.js           # Datos de los artículos del blog
├── blog.js                # Lógica del blog
├── components/
│   ├── header.js          # Componente del header/navegación
│   └── footer.js          # Componente del footer
├── imagenes/              # Imágenes locales (libros, etc.)
│   ├── ElMonoCH.png
│   └── Ch_Libro_Verde.png
└── README.md              # Este archivo
```

## ⚙️ Configuración

### Panel de Control (`config.js`)

El archivo `config.js` actúa como el **Panel de Control** del sitio web. Modifica los valores aquí para actualizar todo el sitio dinámicamente:

#### 1. Logo
```javascript
logo: {
  url: "https://lh3.googleusercontent.com/d/1LWeAcoOmXDmEiHkdGytXOQRKYrRs62DE",
  alt: "PhyMaC Logo",
  fallbackText: "PhyMaC"
}
```

#### 2. Contacto
```javascript
contact: {
  whatsapp: {
    number: "573112000000",
    defaultMessage: "Me encantaría participar",
    ctaText: "¡Acepta el reto!"
  },
  email: "contacto@phymac.com",
  formspree: {
    endpoint: "https://formspree.io/f/xkgdzeda"
  }
}
```

#### 3. Redes Sociales
```javascript
social: {
  facebook: "https://facebook.com/phymac",
  instagram: "https://instagram.com/phymac",
  linkedin: "https://linkedin.com/company/phymac",
  twitter: "https://twitter.com/phymac"
}
```

#### 4. Menú de Navegación
```javascript
menu: {
  items: [
    { text: "Inicio", href: "index.html" },
    { text: "El método", href: "index.html#metodo" },
    { text: "Proyectos", href: "index.html#proyectos" },
    { text: "Servicios", href: "servicios.html" },
    { text: "Blog", href: "blog.html" },
    { text: "Publicaciones", href: "publicaciones.html" }
  ]
}
```

#### 5. Contenido del Sitio
- Textos del hero, método, proyectos, publicaciones y footer
- Lista de proyectos/casos de éxito
- Lista de publicaciones/libros
- Lista de servicios ofrecidos

### Personalización Rápida

Para personalizar el sitio, simplemente edita `config.js`:

1. **Cambiar logo**: Actualiza la URL en `logo.url`
2. **Actualizar contacto**: Modifica número de WhatsApp y email
3. **Agregar proyectos**: Añade objetos al array `proyectos[]`
4. **Modificar textos**: Edita los valores en `content.*`
5. **Actualizar servicios**: Modifica el array `servicios[]`

## 🚀 Instalación y Uso

### Requisitos

No se requieren dependencias ni instalación. El sitio funciona completamente con archivos estáticos.

### Ejecución Local

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. O usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

### Despliegue

El sitio puede desplegarse en cualquier servicio de hosting estático:

- **Netlify**: Arrastra y suelta la carpeta
- **Vercel**: Conecta el repositorio
- **GitHub Pages**: Activa Pages en la configuración del repositorio
- **Servidor tradicional**: Sube los archivos vía FTP

## 📝 Páginas del Sitio

### `index.html`
Página principal con:
- Hero section con CTAs
- Sección del método educativo
- Galería de proyectos destacados
- Footer con formulario de contacto

### `blog.html`
Página del blog con:
- Lista de artículos
- Sistema de filtrado por categorías
- Vista detallada de cada artículo
- Relación con proyectos

### `servicios.html`
Página de servicios que muestra:
- Talleres para estudiantes
- Capacitación docente
- Programas para adultos mayores
- Consultoría educativa

### `publicaciones.html`
Página de publicaciones con:
- Libros y artículos académicos
- Información de autores
- Descripciones detalladas

## 🔧 Componentes Modulares

### Header (`components/header.js`)
- Navegación responsive
- Menú móvil
- Logo dinámico desde `CONFIG`
- Enlaces generados automáticamente

### Footer (`components/footer.js`)
- Información de contacto
- Enlaces a redes sociales
- Formulario de contacto (Formspree)
- Ubicación y datos de la organización

## 📱 Funcionalidades

### Integración WhatsApp
Los botones de WhatsApp generan enlaces automáticos con mensajes predefinidos:
```javascript
https://wa.me/573112000000?text=Me%20encantar%C3%ADa%20participar
```

### Formulario de Contacto
El formulario del footer se envía a Formspree. Para configurarlo:
1. Crea una cuenta en [Formspree](https://formspree.io)
2. Crea un nuevo formulario
3. Reemplaza el `endpoint` en `config.js`

### Animaciones
- Fade-in al hacer scroll
- Transiciones suaves en enlaces
- Efectos hover en tarjetas

## 🎨 Personalización de Estilos

El sitio usa TailwindCSS via CDN. Para personalizar estilos:

1. **Colores**: Modifica las clases de Tailwind en los HTML
2. **Fuentes**: Cambia `font-sans` por otras fuentes de Tailwind
3. **Espaciado**: Ajusta padding/margin con utilidades de Tailwind
4. **Animaciones**: Edita las animaciones CSS en `<style>` de cada HTML

## 📚 Datos del Blog

Los artículos del blog se gestionan en `blog-data.js`. Cada artículo incluye:
- ID único
- Título y subtítulo
- Autor y fecha
- Categoría
- Contenido completo
- Imagen destacada
- Relación con proyectos (opcional)

## 🔗 Enlaces Relacionados

- **Ubicación**: Sabana de Occidente, Colombia (Mosquera, Funza, Madrid)
- **Metodología**: Aprendizaje por retos con ciclo STEM de tres fases
- **Enfoque**: Educación práctica y experimental

## 📄 Licencia

Este proyecto es propiedad de PhyMaC. Todos los derechos reservados.

## 👥 Contacto

- **Email**: contacto@phymac.com
- **WhatsApp**: +57 311 200 0000
- **Redes Sociales**: Ver `config.js` para enlaces completos

---

**PhyMaC** - Para entender el mundo tecnológico, resuelve retos reales.
