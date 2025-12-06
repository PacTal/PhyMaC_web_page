import React, { useState } from 'react';
import { Rocket, Brain, Code, Wrench, MessageCircle, MapPin, CheckCircle, Menu, X, ChevronRight, Users, Activity, Layers, Send, FileText, BookOpen } from 'lucide-react';

/**
 * ----------------------------------------------------------------------
 * CONFIGURACIÓN DEL LOGO
 * ID del archivo: 1LWeAcoOmXDmEiHkdGytXOQRKYrRs62DE
 * ----------------------------------------------------------------------
 */
const LOGO_URL = "https://lh3.googleusercontent.com/d/1LWeAcoOmXDmEiHkdGytXOQRKYrRs62DE";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    email: '',
    mensaje: ''
  });

  const whatsappLink = "https://wa.me/573112000000?text=Me%20encantar%C3%ADa%20participar";

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Enviar formulario a WhatsApp incluyendo el email
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola PhyMaC, mi nombre es ${formData.nombre}. Mi número es ${formData.celular}. Mi correo es ${formData.email}. ${formData.mensaje ? 'Mensaje: ' + formData.mensaje : 'Me gustaría más información.'}`;
    const url = `https://wa.me/573112000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* ZONA DEL LOGO */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              
              {/* CONTENEDOR CIRCULAR PARA LA IMAGEN DEL LOGO */}
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-900 flex items-center justify-center bg-white p-0.5 relative">
                {!imageError ? (
                  /* IMAGEN DEL LOGO */
                  <img 
                    src={LOGO_URL} 
                    alt="PhyMaC Logo" 
                    className="h-full w-full object-cover transform scale-125" 
                    referrerPolicy="no-referrer" 
                    onError={(e) => {
                      console.log("Error cargando imagen, verifica permisos en Drive");
                      setImageError(true); 
                    }}
                  />
                ) : (
                  /* FALLBACK: TEXTO SI LA IMAGEN FALLA */
                  <div className="flex flex-col items-center justify-center text-center h-full w-full">
                     <span className="font-bold text-lg tracking-tighter text-indigo-900 font-serif leading-none">PhyMaC</span>
                  </div>
                )}
              </div>
              
              <span className="font-bold text-3xl tracking-tighter text-indigo-900 font-serif border-b-2 border-indigo-900 pb-0.5 hidden sm:block">PhyMaC</span>
            </div>
            
            {/* MENÚ DE ESCRITORIO */}
            <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
              <a href="#metodo" className="text-gray-600 hover:text-indigo-600 transition">El método</a>
              <a href="#proyectos" className="text-gray-600 hover:text-indigo-600 transition">Proyectos</a>
              <a href="#publicaciones" className="text-gray-600 hover:text-indigo-600 transition">Publicaciones</a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <MessageCircle size={16} />
                ¡Acepta el reto!
              </a>
            </div>

            {/* BOTÓN MENÚ MÓVIL */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2 text-center shadow-lg">
              <a href="#metodo" className="block py-2 text-gray-700 font-medium">El método</a>
              <a href="#proyectos" className="block py-2 text-gray-700 font-medium">Proyectos</a>
              <a href="#publicaciones" className="block py-2 text-gray-700 font-medium">Publicaciones</a>
              <a href={whatsappLink} className="block mt-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                ¡Acepta el reto!
              </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-indigo-900 text-white text-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/90"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Para entender el mundo tecnológico,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              resuelve retos reales
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-indigo-100/90 leading-relaxed mb-10">
            Siempre hay algo por descubrir, para hacerlo tú pones el ingenio, nosotros, la lúdica y los retos.
          </p>
        </div>
      </section>

      {/* SECCIÓN UNIFICADA: MÉTODO + PÚBLICO */}
      <section id="metodo" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Aprendizaje por retos</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Descubre la ciencia construyendo artefactos para resolver problemas. Nuestro ciclo STEM de tres fases —lo que quiero, lo que haré y lo que necesito— asegura un aprendizaje práctico en cualquier nivel educativo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
             {/* Las tarjetas han sido retiradas según solicitud */}
          </div>

        </div>
      </section>

      {/* EXPERIENCIAS & PÚBLICO UNIFICADO */}
      <section id="proyectos" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Así luce la ciencia en acción.</h2>
            </div>
            <a href={whatsappLink} className="hidden md:flex text-green-400 font-semibold items-center hover:text-green-300 mt-4 md:mt-0 text-sm">
              Ver más casos de éxito <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="group relative rounded-xl overflow-hidden aspect-[16/9] cursor-pointer border border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Cohetería" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                <div className="flex items-center gap-2 mb-1 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Users size={14} /> Estudiantes
                </div>
                <h3 className="text-xl font-bold">Física de Cohetes</h3>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">Aprendiendo leyes de Newton lanzando proyectiles a 50 metros.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-xl overflow-hidden aspect-[16/9] cursor-pointer border border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Docentes" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                <div className="flex items-center gap-2 mb-1 text-purple-400 text-xs font-bold uppercase tracking-wider">
                  <Wrench size={14} /> Docentes
                </div>
                <h3 className="text-xl font-bold">Didáctica Experimental</h3>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">Capacitación en metodologías activas y diseño de laboratorios low-cost.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-xl overflow-hidden aspect-[16/9] cursor-pointer border border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Adultos Mayores" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                <div className="flex items-center gap-2 mb-1 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  <Brain size={14} /> Adulto Mayor
                </div>
                <h3 className="text-xl font-bold">Gimnasia Cerebral STEM</h3>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">Recuperando la plasticidad cerebral a través de proyectos maker.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN PUBLICACIONES */}
      <section id="publicaciones" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publicaciones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compartimos el conocimiento generado en nuestros laboratorios vivos. Investigaciones, artículos y hallazgos educativos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {/* LIBRO 1: La Alegoría del Mono */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden flex flex-col h-full">
                <div className="h-64 w-full bg-gray-100 relative">
                   <img 
                     src="https://lh3.googleusercontent.com/d/1uf-I-SuJyg1_gS7ehSj7czFr3x6RSP3t" 
                     alt="Portada Libro La alegoría del mono" 
                     className="w-full h-full object-contain p-4"
                     referrerPolicy="no-referrer"
                   />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">La alegoría del mono</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-1">
                    El libro <i>La alegoría del mono: un curioso modo de escudriñar el movimiento de proyectiles</i>, del profesor Paco H. Talero L., presenta un tratamiento alternativo y conceptualmente provocador para entender el movimiento de proyectiles. Con un enfoque inusual, el autor desafía las metodologías tradicionales para centrarse en suscitar reflexiones fundamentalmente conceptuales sobre las ideas físicas subyacentes.
                  </p>
                  <a href={whatsappLink} className="inline-flex items-center text-indigo-700 font-bold text-sm hover:text-indigo-900 transition mt-auto">
                    Consultar disponibilidad <ChevronRight size={16} />
                  </a>
                </div>
             </div>

             {/* LIBRO 2: El Infinito Físico de Zenón */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden flex flex-col h-full">
                <div className="h-64 w-full bg-gray-100 relative">
                   {/* Imagen portada actualizada */}
                   <img 
                     src="https://lh3.googleusercontent.com/d/1GuMySPofjcCFW39whBSO7BHmNUYfV-9o"
                     alt="Portada Libro El infinito físico de Zenón"
                     className="w-full h-full object-contain p-4"
                     referrerPolicy="no-referrer"
                   />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">El infinito físico de Zenón</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-1">
                    El libro <i>El infinito físico de Zenón: paradoja y sofisma en tres movimientos insólitos</i>, del profesor Paco H. Talero L., es una invitación desde PhyMaC a explorar las paradojas del movimiento asociadas con el infinito según Zenón. A través de rebotes, particiones y desplazamientos matemáticamente infinitos que se revelan finitos en el mundo físico, el autor propone al lector un disonante juego intelectual que lo lleva del infinito matemático al mundo concreto de problemas físicos concretos.
                  </p>
                  <a href={whatsappLink} className="inline-flex items-center text-indigo-700 font-bold text-sm hover:text-indigo-900 transition mt-auto">
                    Consultar disponibilidad <ChevronRight size={16} />
                  </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER CON FORMULARIO */}
      <footer className="bg-white py-16 text-center border-t border-gray-200">
        <div className="max-w-xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">Llevamos el laboratorio a donde estés</h2>
            <p className="text-gray-500 text-sm mt-2">Déjanos tus datos y nos pondremos en contacto contigo.</p>
          </div>
          
          {/* Formulario de Contacto */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 text-left space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Tu nombre</label>
              <input 
                type="text" 
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            
            <div>
              <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Celular</label>
              <input 
                type="tel" 
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Ej. 300 123 4567"
              />
            </div>

            {/* CAMPO DE EMAIL AÑADIDO */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje (Opcional)</label>
              <textarea 
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="¿Qué te interesa aprender o enseñar?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-4"
            >
              <Send size={20} />
              Enviar
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
             <span className="flex items-center gap-1"><MapPin size={14}/> Mosquera</span>
             <span className="flex items-center gap-1"><MapPin size={14}/> Funza</span>
             <span className="flex items-center gap-1"><MapPin size={14}/> Madrid</span>
          </div>

          <p className="mt-8 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} PhyMaC | Sabana de Occidente, Colombia.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;