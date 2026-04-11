/**
 * ----------------------------------------------------------------------
 * BLOG.JS - LÓGICA ESPECÍFICA DEL BLOG
 * PhyMaC Web Page - Identidad Visual "Maker Energy"
 * ----------------------------------------------------------------------
 * Renderiza artículos dinámicamente desde blog-data.js
 * 
 * Paleta PhyMaC:
 * - Electric Blue: #2962FF (primario)
 * - Safety Orange: #FF6D00 (CTA)
 * - Carbon Grey: #212121 (texto)
 */

// Transforma URL de Google Drive de visor a descarga directa de PDF
function driveToDownload(url) {
  if (!url) return null;
  if (url.includes('/export')) return url;
  return url.replace(/\/view.*$/, '/export?format=pdf');
}

// Escapa caracteres HTML en campos de texto para prevenir XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Función para renderizar artículos del blog
function renderBlogPosts(posts = []) {
  const blogContainer = document.getElementById('blog-container');
  if (!blogContainer) {
    console.error('No se encontró el contenedor de blog');
    return;
  }

  if (!posts || posts.length === 0) {
    blogContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="font-body" style="color: #484848;">No hay artículos disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  // Ordenar por fecha (más recientes primero)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  blogContainer.innerHTML = sortedPosts.map(post => {
    const formattedDate = window.formatDate ? window.formatDate(post.date) : new Date(post.date).toLocaleDateString('es-ES');
    
    // Colores de categoría con identidad PhyMaC
    const categoryColors = {
      'Metodología': { bg: '#E8EAF6', text: '#2962FF' },
      'Proyectos': { bg: '#E8F5E9', text: '#2E7D32' },
      'Programas': { bg: '#FFF3E0', text: '#FF6D00' },
      'Publicaciones': { bg: '#E3F2FD', text: '#1565C0' },
      'Capacitación': { bg: '#FCE4EC', text: '#C2185B' },
      'Educación STEM': { bg: '#E8F5E9', text: '#1B5E20' },
      'Docentes':       { bg: '#EDE7F6', text: '#4527A0' },
      'Adultos Mayores': { bg: '#FFF8E1', text: '#E65100' },
      'Tecnología':     { bg: '#E0F7FA', text: '#006064' }
    };
    const categoryStyle = categoryColors[post.category] || { bg: '#EEEEEE', text: '#212121' };

    return `
      <article class="bg-white rounded-2xl overflow-hidden scroll-animate transition-all hover:shadow-lg" style="border: 2px solid #E0E0E0;">
        <div class="md:flex">
          <div class="md:w-1/3 h-48 md:h-auto">
            <img 
              src="${post.image}" 
              alt="${post.title}" 
              class="w-full h-full object-cover"
              onerror="this.src='https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'"
            />
          </div>
          <div class="md:w-2/3 p-6 md:p-8 flex flex-col" style="border-left: 4px solid #FF6D00;">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full text-xs font-display font-bold" style="background-color: ${categoryStyle.bg}; color: ${categoryStyle.text};">
                ${escapeHtml(post.category)}
              </span>
              <span class="text-sm font-body" style="color: #757575;">${formattedDate}</span>
            </div>
            <h2 class="font-display text-2xl font-extrabold mb-3" style="color: #212121;">
              ${escapeHtml(post.title)}
            </h2>
            <p class="mb-4 leading-relaxed flex-1 font-body" style="color: #484848;">
              ${escapeHtml(post.summary)}
            </p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-sm font-body" style="color: #757575;">Por ${escapeHtml(post.author)}</span>
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
            </div>
            ${post.pdf_url ? `
              <a href="${driveToDownload(post.pdf_url)}"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-bold transition-all"
                 style="background-color: #2962FF; color: white; text-decoration: none; box-shadow: 0 3px 0 #0039CB;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Descargar PDF
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Inicializar animaciones de scroll
  initScrollAnimations();
}

// Función para filtrar por categoría
// Disponible globalmente
window.filterByCategory = function(category) {
  if (typeof BLOG_POSTS === 'undefined') {
    console.error('BLOG_POSTS no está definido');
    return;
  }

  const filtered = category === 'all' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === category);
  
  renderBlogPosts(filtered);
  
  // Actualizar botones de filtro con colores PhyMaC
  document.querySelectorAll('.category-filter').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.style.backgroundColor = '#2962FF';
      btn.style.color = '#FFFFFF';
      btn.style.boxShadow = '0 3px 0 #0039CB';
    } else {
      btn.style.backgroundColor = '#EEEEEE';
      btn.style.color = '#484848';
      btn.style.boxShadow = 'none';
    }
  });
};

// Función para obtener categorías únicas
function getCategories() {
  if (typeof BLOG_POSTS === 'undefined') return [];
  
  const categories = [...new Set(BLOG_POSTS.map(post => post.category))];
  return categories.sort();
}

// Inicializar el blog cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  if (typeof BLOG_POSTS !== 'undefined') {
    renderBlogPosts(BLOG_POSTS);
    
    // Renderizar filtros de categoría con estilo PhyMaC
    const categories = getCategories();
    const filterContainer = document.getElementById('blog-filters');
    
    if (filterContainer && categories.length > 0) {
      filterContainer.innerHTML = `
        <button 
          onclick="filterByCategory('all')"
          class="category-filter px-5 py-2.5 rounded-full text-sm font-display font-bold transition-all"
          data-category="all"
          style="background-color: #2962FF; color: #FFFFFF; box-shadow: 0 3px 0 #0039CB;"
        >
          Todos
        </button>
        ${categories.map(cat => `
          <button
            onclick="filterByCategory('${escapeHtml(cat)}')"
            class="category-filter px-5 py-2.5 rounded-full text-sm font-display font-bold transition-all"
            data-category="${escapeHtml(cat)}"
            style="background-color: #EEEEEE; color: #484848;"
            onmouseover="if(this.style.backgroundColor !== 'rgb(41, 98, 255)') this.style.backgroundColor='#E0E0E0'"
            onmouseout="if(this.style.backgroundColor !== 'rgb(41, 98, 255)') this.style.backgroundColor='#EEEEEE'"
          >
            ${escapeHtml(cat)}
          </button>
        `).join('')}
      `;
    }
  } else {
    console.error('BLOG_POSTS no está definido. Asegúrate de cargar blog-data.js antes de blog.js');
  }
});
