/**
 * ----------------------------------------------------------------------
 * BLOG.JS - LÓGICA ESPECÍFICA DEL BLOG
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Renderiza artículos dinámicamente desde blog-data.js
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
        <p class="text-gray-500">No hay artículos disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  // Ordenar por fecha (más recientes primero)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  blogContainer.innerHTML = sortedPosts.map(post => {
    const formattedDate = window.formatDate ? window.formatDate(post.date) : new Date(post.date).toLocaleDateString('es-ES');
    const categoryColors = {
      'Metodología': 'bg-blue-100 text-blue-800',
      'Proyectos': 'bg-green-100 text-green-800',
      'Programas': 'bg-orange-100 text-orange-800',
      'Publicaciones': 'bg-indigo-100 text-indigo-800',
      'Capacitación': 'bg-pink-100 text-pink-800'
    };
    const categoryColor = categoryColors[post.category] || 'bg-gray-100 text-gray-800';

    return `
      <article class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden scroll-animate">
        <div class="md:flex">
          <div class="md:w-1/3 h-48 md:h-auto">
            <img 
              src="${post.image}" 
              alt="${post.title}" 
              class="w-full h-full object-cover"
              onerror="this.src='https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'"
            />
          </div>
          <div class="md:w-2/3 p-6 md:p-8 flex flex-col">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}">
                ${post.category}
              </span>
              <span class="text-sm text-gray-500">${formattedDate}</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-3">
              ${post.title}
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed flex-1">
              ${post.summary}
            </p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-sm text-gray-500">Por ${post.author}</span>
              <button 
                onclick="openBlogPost(${post.id})"
                class="inline-flex items-center text-indigo-700 font-semibold text-sm hover:text-indigo-900 transition"
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

  // Crear modal con el contenido completo
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">${post.title}</h2>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="p-6">
          <div class="mb-6">
            <img src="${post.image}" alt="${post.title}" class="w-full h-64 object-cover rounded-lg mb-4" />
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>Por ${post.author}</span>
              <span>•</span>
              <span>${window.formatDate ? window.formatDate(post.date) : new Date(post.date).toLocaleDateString('es-ES')}</span>
            <span>•</span>
            <span class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">${post.category}</span>
          </div>
        </div>
        <div class="prose max-w-none">
          ${post.content}
        </div>
        <div class="mt-8 pt-6 border-t border-gray-200">
          <a 
            href="${window.getWhatsAppLink ? window.getWhatsAppLink(`Me interesa saber más sobre: ${post.title}`) : '#'}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full transition"
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
  
  // Actualizar botones de filtro
  document.querySelectorAll('.category-filter').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('bg-indigo-900', 'text-white');
      btn.classList.remove('bg-gray-100', 'text-gray-700');
    } else {
      btn.classList.remove('bg-indigo-900', 'text-white');
      btn.classList.add('bg-gray-100', 'text-gray-700');
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
    
    // Renderizar filtros de categoría
    const categories = getCategories();
    const filterContainer = document.getElementById('blog-filters');
    
    if (filterContainer && categories.length > 0) {
      filterContainer.innerHTML = `
        <button 
          onclick="filterByCategory('all')"
          class="category-filter px-4 py-2 rounded-full text-sm font-semibold bg-indigo-900 text-white transition"
          data-category="all"
        >
          Todos
        </button>
        ${categories.map(cat => `
          <button 
            onclick="filterByCategory('${cat}')"
            class="category-filter px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            data-category="${cat}"
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

