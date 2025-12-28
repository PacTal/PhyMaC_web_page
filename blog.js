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
      'Capacitación': { bg: '#FCE4EC', text: '#C2185B' }
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
                ${post.category}
              </span>
              <span class="text-sm font-body" style="color: #757575;">${formattedDate}</span>
            </div>
            <h2 class="font-display text-2xl font-extrabold mb-3" style="color: #212121;">
              ${post.title}
            </h2>
            <p class="mb-4 leading-relaxed flex-1 font-body" style="color: #484848;">
              ${post.summary}
            </p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-sm font-body" style="color: #757575;">Por ${post.author}</span>
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
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Inicializar animaciones de scroll
  initScrollAnimations();
}

// Función para abrir un artículo completo (modal o página)
// Disponible globalmente
window.openBlogPost = function(postId) {
  if (typeof BLOG_POSTS === 'undefined') {
    console.error('BLOG_POSTS no está definido');
    return;
  }

  const post = BLOG_POSTS.find(p => p.id === postId);
  if (!post) {
    console.error('Artículo no encontrado');
    return;
  }

  // Crear modal con el contenido completo - Estilo PhyMaC
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
  modal.style.backgroundColor = 'rgba(33, 33, 33, 0.8)';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" style="border: 3px solid #2962FF;">
      <div class="sticky top-0 bg-white px-6 py-4 flex justify-between items-center" style="border-bottom: 3px solid #2962FF;">
        <h2 class="font-display text-2xl font-extrabold" style="color: #212121;">${post.title}</h2>
        <button onclick="this.closest('.fixed').remove()" class="transition-colors" style="color: #9E9E9E;" onmouseover="this.style.color='#FF6D00'" onmouseout="this.style.color='#9E9E9E'">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="p-6">
          <div class="mb-6">
            <img src="${post.image}" alt="${post.title}" class="w-full h-64 object-cover rounded-xl mb-4" />
            <div class="flex items-center gap-4 text-sm mb-4 font-body" style="color: #757575;">
              <span>Por ${post.author}</span>
              <span>•</span>
              <span>${window.formatDate ? window.formatDate(post.date) : new Date(post.date).toLocaleDateString('es-ES')}</span>
            <span>•</span>
            <span class="px-3 py-1 rounded-full font-display font-bold text-xs" style="background-color: #E8EAF6; color: #2962FF;">${post.category}</span>
          </div>
        </div>
        <div class="prose max-w-none font-body" style="color: #212121;">
          ${post.content}
        </div>
        <div class="mt-8 pt-6" style="border-top: 2px solid #E0E0E0;">
          <a 
            href="${window.getWhatsAppLink ? window.getWhatsAppLink(`Me interesa saber más sobre: ${post.title}`) : '#'}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-white font-display font-bold px-6 py-3 rounded-full transition-all transform hover:-translate-y-0.5"
            style="background-color: #FF6D00; box-shadow: 0 4px 0 #C43E00;"
            onmouseover="this.style.backgroundColor='#FF9E40'"
            onmouseout="this.style.backgroundColor='#FF6D00'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Consultar sobre este tema
          </a>
        </div>
      </div>
    </div>
  `;
  
      document.body.appendChild(modal);
      
      // Cerrar al hacer clic fuera del modal
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.remove();
        }
      });
};

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
            onclick="filterByCategory('${cat}')"
            class="category-filter px-5 py-2.5 rounded-full text-sm font-display font-bold transition-all"
            data-category="${cat}"
            style="background-color: #EEEEEE; color: #484848;"
            onmouseover="if(this.style.backgroundColor !== 'rgb(41, 98, 255)') this.style.backgroundColor='#E0E0E0'"
            onmouseout="if(this.style.backgroundColor !== 'rgb(41, 98, 255)') this.style.backgroundColor='#EEEEEE'"
          >
            ${cat}
          </button>
        `).join('')}
      `;
    }
  } else {
    console.error('BLOG_POSTS no está definido. Asegúrate de cargar blog-data.js antes de blog.js');
  }
});
