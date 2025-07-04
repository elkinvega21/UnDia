import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Menu, X, Play, Book, Music, MessageCircle, Heart, ChevronDown, 
  Youtube, Instagram, Facebook, Twitter, Share2, MessageSquare, ThumbsUp // Iconos para funcionalidades
} from 'lucide-react'; 

const UnDiaALaVez = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentDevotional, setCurrentDevotional] = useState(null); // Para el devocional específico

  const [dailyVerse] = useState({
    text: '"Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo..."',
    reference: 'Josué 1:9'
  });

  const navItems = [
    { name: 'Devocional', href: '#devocional' },
    { name: 'Lectura', href: '#lectura' },
    { name: 'Música', href: '#musica' },
    { name: 'Oración', href: '#oracion' },
    { name: 'Conóceme', href: '#conoceme' },
    { name: 'Redes', href: '#redes-sociales' }
  ];

  const musicTracks = [
    { title: "Paz en la Mañana", duration: "30:00", description: "Música suave para comenzar el día" },
    { title: "Meditación Vespertina", duration: "28:45", description: "Melodías para la reflexión" },
    { title: "Momento de Gratitud", duration: "32:15", description: "Sonidos de adoración silenciosa" },
  ];

  const devotionalVideos = [
    { 
      id: 'devotional-video-1',
      title: "Devocional de Hoy: Un Mensaje de Esperanza", 
      description: "Una palabra de esperanza para este día.", 
      youtubeId: "VIDEO_ID_1", // Reemplaza con el ID real de tu video de YouTube
    },
    { 
      id: 'devotional-video-2',
      title: "Segundo Devocional: Fortaleza en la Adversidad", 
      description: "Encuentra consuelo y fuerza en cada desafío.", 
      youtubeId: "VIDEO_ID_2", // Reemplaza con el ID real de tu segundo video de YouTube
    },
  ];

  const devotionalTexts = [
    {
      id: 'devotional-text-1',
      title: "Caminando en Fe",
      author: "Capellán Christian Suarez",
      date: "Julio 3, 2025",
      excerpt: "Cada día es una nueva oportunidad para crecer. Aunque enfrentemos desafíos, podemos confiar en que Dios está obrando en nosotros, renovando nuestro espíritu.",
      fullContent: `
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-center">Caminando en Fe</h2>
        <p class="mb-4 text-xl text-gray-700 font-semibold italic text-center">"Por tanto, no desmayamos..." - 2 Corintios 4:16</p>
        <div class="prose max-w-none text-gray-800 leading-relaxed text-lg mx-auto">
          <p>Cada día es una nueva oportunidad para crecer. Aunque enfrentemos desafíos, podemos confiar en que Dios está obrando en nosotros, renovando nuestro espíritu. El camino de la fe no siempre es fácil, pero es un camino de constante aprendizaje y fortaleza.</p>
          <p>En 2 Corintios 4:16 se nos recuerda: "Por tanto, no desmayamos; antes aunque este nuestro hombre exterior se va desgastando, el interior no obstante se renueva de día en día." Esta escritura es un faro de esperanza en medio de las dificultades. Nos enseña que, aunque nuestro cuerpo físico pueda sentir el cansancio y el paso del tiempo, nuestro espíritu, alimentado por la fe, se fortalece y se renueva diariamente por la gracia de Dios.</p>
          <p>Aferrarse a esta verdad nos permite enfrentar los desafíos con una perspectiva diferente. Las pruebas no son el fin, sino oportunidades para que la fortaleza de Dios se manifieste en nuestra debilidad. Mantengamos nuestros ojos fijos en Jesús, el autor y consumador de nuestra fe, sabiendo que Él nos capacita para todo.</p>
          <p class="mt-8 pt-4 border-t border-gray-200 text-sm italic text-gray-600">Este devocional es una guía para reflexionar sobre la perseverancia en la fe.</p>
        </div>
      `,
      likes: 125,
      comments: ["¡Excelente mensaje, muy inspirador!", "Gracias por estas palabras de aliento.", "Necesitaba esto hoy."]
    },
    {
      id: 'devotional-text-2',
      title: "Esperanza en Tiempos Difíciles",
      author: "Capellán Christian Suarez",
      date: "Julio 2, 2025",
      excerpt: "Incluso en la oscuridad, la luz de Dios brilla más fuerte, ofreciéndonos una esperanza inquebrantable.",
      fullContent: `
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-center">Esperanza en Tiempos Difíciles</h2>
        <p class="mb-4 text-xl text-gray-700 font-semibold italic text-center">"Porque yo sé los planes que tengo para vosotros, planes de bienestar..." - Jeremías 29:11</p>
        <div class="prose max-w-none text-gray-800 leading-relaxed text-lg mx-auto">
          <p>En tiempos de incertidumbre y dificultad, es natural sentirse desanimado. Sin embargo, la Biblia nos ofrece promesas de esperanza que trascienden cualquier circunstancia. Jeremías 29:11 es un recordatorio poderoso de que Dios tiene un propósito para cada uno de nosotros, un plan lleno de esperanza y un futuro.</p>
          <p>No permitas que las circunstancias actuales dicten tu fe o tu futuro. Dios es soberano y tiene el control. Confía en Su bondad y en Su provisión, sabiendo que Él obra todas las cosas para el bien de aquellos que le aman (Romanos 8:28).</p>
          <p>Mantén tu esperanza viva, pues es un ancla para el alma, firme y segura (Hebreos 6:19). Dios está contigo, aun en los valles más profundos, y te guiará hacia Su luz.</p>
          <p class="mt-8 pt-4 border-t border-gray-200 text-sm italic text-gray-600">Un mensaje para encontrar luz en la oscuridad.</p>
        </div>
      `,
      likes: 80,
      comments: ["Dios es fiel.", "Amén.", "Me dio mucha paz leer esto."]
    },
    {
      id: 'devotional-text-3',
      title: "La Paz que Sobrepasa",
      author: "Capellán Christian Suarez",
      date: "Julio 1, 2025",
      excerpt: "Descubre la paz que Dios ofrece, una paz que supera todo entendimiento y guarda nuestros corazones.",
      fullContent: `
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-center">La Paz que Sobrepasa</h2>
        <p class="mb-4 text-xl text-gray-700 font-semibold italic text-center">"Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestras mentes en Cristo Jesús." - Filipenses 4:7</p>
        <div class="prose max-w-none text-gray-800 leading-relaxed text-lg mx-auto">
          <p>Vivir en un mundo lleno de ansiedad y preocupación puede ser agotador. Pero Dios nos ofrece una paz que no depende de las circunstancias externas, una paz que es profunda y duradera. Filipenses 4:7 nos invita a experimentar esta paz divina.</p>
          <p>Esta paz es un regalo, una promesa para aquellos que confían en Él. No se trata de la ausencia de problemas, sino de la presencia de Dios en medio de ellos. Al entregar nuestras preocupaciones a Dios a través de la oración y la súplica, con acción de gracias, su paz inundará nuestros corazones y mentes.</p>
          <p>Permite que la paz de Dios sea tu guía y tu consuelo hoy. Ella te guardará de la inquietud y te permitirá vivir con confianza en Su amor y Su plan perfecto para tu vida.</p>
          <p class="mt-8 pt-4 border-t border-gray-200 text-sm italic text-gray-600">Encuentra la verdadera paz en Cristo.</p>
        </div>
      `,
      likes: 200,
      comments: ["Verdadera paz.", "Gracias, Capellán.", "Siempre hay esperanza en Él."]
    }
  ];

  // Configuración para la música ambiental (YouTube Embed)
  const ambientMusic = {
    title: "Música Ambiental para Orar",
    description: "Melodías instrumentales para acompañar tus momentos de oración y meditación.",
    youtubeId: "AMBIENT_MUSIC_VIDEO_ID", // Reemplaza con el ID real del video de YouTube (ej. Lr9NnLgT9gQ para música tranquila)
    spotifyTrackId: "YOUR_SPOTIFY_TRACK_ID" // TODO: Esto se mantendrá como placeholder para una futura implementación
  };

  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/@capellanchristiansuarez', icon: Youtube }, 
    { name: 'Instagram', url: 'https://www.instagram.com/christian_suarezoficial/', icon: Instagram },
    { name: 'Facebook', url: 'https://www.facebook.com/christiansuarezoficial/', icon: Facebook },
    { name: 'X', url: 'https://x.com/christiansuarez', icon: Twitter },
  ];

  // Función para manejar "Leer más" de devocionales escritos
  const handleReadMoreDevotional = (devotional) => {
    setCurrentDevotional(devotional);
    // Asegurarse de que el scroll vaya al inicio de la página del devocional
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLikeDevotional = (devotionalId) => {
    setCurrentDevotional(prevDev => {
      if (!prevDev || prevDev.id !== devotionalId) return prevDev;
      return { ...prevDev, likes: (prevDev.likes || 0) + 1 };
    });
    // Opcional: mostrar una alerta o animación de "like"
    // alert('¡Gracias por tu like!'); // Puedes quitar esta alerta en producción
  };

  const handleCommentSubmit = (devotionalId, comment) => {
    if (comment.trim() === "") return;
    setCurrentDevotional(prevDev => {
      if (!prevDev || prevDev.id !== devotionalId) return prevDev;
      return { ...prevDev, comments: [...(prevDev.comments || []), comment] };
    });
    // Opcional: mostrar una alerta de éxito
    // alert('Comentario enviado: ' + comment); // Puedes quitar esta alerta en producción
  };

  const handleShareDevotional = (devotional) => {
    const shareText = `Lee este devocional inspirador: ${devotional.title} - "${devotional.excerpt}" #UnDiaALaVez`;
    if (navigator.share) {
      navigator.share({
        title: devotional.title,
        text: shareText,
        url: window.location.href // Considerar una URL específica si tuvieras enrutamiento para devocionales
      }).then(() => console.log('Contenido compartido con éxito'))
        .catch((error) => console.error('Error al compartir', error));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleMobileMenuClick = (href) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY]);

  const SectionTitle = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tighter text-center">
      {children}
    </h2>
  );
  
  const SectionSubtitle = ({ children }) => (
    <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mt-4">
      {children}
    </p>
  );

  // Si hay un devocional seleccionado, renderizamos solo la vista del devocional
  if (currentDevotional) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] font-custom">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap'); /* Fuente para el cuerpo del texto */

          .font-custom { 
              font-family: 'Poppins', sans-serif; 
          }
          .prose {
            font-family: 'Merriweather', serif;
          }
          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            font-family: 'Poppins', sans-serif;
            margin-bottom: 1em;
            margin-top: 1.5em;
          }
          .prose p {
            margin-bottom: 1em;
          }
          .prose strong {
            font-weight: 700;
          }
          .prose em {
            font-style: italic;
          }
          .prose a {
            color: #E95A2B;
            text-decoration: underline;
          }
          .prose ul, .prose ol {
            margin-left: 1.5em;
            list-style-type: disc;
          }
          .prose ol {
            list-style-type: decimal;
          }
          .prose li {
            margin-bottom: 0.5em;
          }
          .card-shadow {
              box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
          }
        `}</style>
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          {/* Botón Volver - Más consistente con el diseño */}
          <button 
            onClick={() => setCurrentDevotional(null)} 
            className="flex items-center space-x-2 text-black mb-8 px-4 py-2 rounded-lg bg-gray-100 border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
          >
            <ArrowRight size={20} className="rotate-180 mr-1" /> Volver a Lecturas
          </button>

          <article className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12 border-2 border-black card-shadow mb-12">
            {/* Título y metadatos del devocional */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2 leading-tight">
              {currentDevotional.title}
            </h1>
            <p className="text-gray-600 mb-8 text-md">
              {currentDevotional.author} • {currentDevotional.date}
            </p>

            {/* Contenido del devocional */}
            <div 
              className="devotional-content text-black" 
              dangerouslySetInnerHTML={{ __html: currentDevotional.fullContent }}
            ></div>

            {/* Acciones del Devocional - Estilo acorde */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-center items-center">
              {/* Botón de Subrayar (simulado) */}
              <button 
                onClick={() => alert('La función de subrayar texto real requeriría un editor de texto enriquecido o JS avanzado para interactuar con el DOM de la selección.')} 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-black border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <Book size={20} />
                <span>Subrayar</span>
              </button>
              
              {/* Botón de Like */}
              <button 
                onClick={() => handleLikeDevotional(currentDevotional.id)} 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-black border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <ThumbsUp size={20} />
                <span>Me gusta ({currentDevotional.likes || 0})</span>
              </button>
              
              {/* Botón de Compartir */}
              <button 
                onClick={() => handleShareDevotional(currentDevotional)} 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-black border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <Share2 size={20} />
                <span>Compartir</span>
              </button>
            </div>
          </article>

          {/* Sección de Comentarios */}
          <section className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-black card-shadow">
            <h3 className="text-2xl font-bold mb-6 text-black">Comentarios ({currentDevotional.comments ? currentDevotional.comments.length : 0})</h3>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {currentDevotional.comments && currentDevotional.comments.length > 0 ? (
                currentDevotional.comments.map((comment, i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Sé el primero en comentar.</p>
              )}
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const commentInput = e.target.elements.comment;
              handleCommentSubmit(currentDevotional.id, commentInput.value);
              commentInput.value = ''; 
            }} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                name="comment"
                placeholder="Añade un comentario..." 
                className="flex-grow p-3 bg-gray-100 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black"
                aria-label="Añadir comentario"
              />
              <button 
                type="submit" 
                className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Comentar</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-custom">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        .font-custom { 
            font-family: 'Poppins', sans-serif; 
        }
        
        .underline-doodle {
          text-decoration: none;
          position: relative;
          display: inline-block;
        }
        .underline-doodle::after {
          content: '';
          position: absolute;
          bottom: -10px; 
          left: 0;
          right: 0;
          height: 5px;
          background-image: url('data:image/svg+xml;utf8,<svg width="100" height="5" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg"><path d="M0,2.5 Q25,-2.5 50,2.5 T100,2.5" stroke="%23E95A2B" stroke-width="4" fill="none" /></svg>');
          background-repeat: repeat-x;
          background-size: 20px 5px;
        }

        .circle-doodle {
           text-decoration: none;
           position: relative;
           display: inline-block;
        }
        .circle-doodle::before {
          content: '';
          position: absolute;
          top: -25px;
          bottom: -20px;
          left: -25px;
          right: -25px;
          border: 4px solid #E95A2B;
          border-radius: 50% / 60%;
          transform: rotate(-3deg);
          pointer-events: none;
        }
        .card-shadow {
            box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
        }

        /* Estilos para los íconos de redes sociales */
        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px; /* Tamaño del icono */
          height: 56px; /* Tamaño del icono */
          border-radius: 50%;
          background-color: #E95A2B; /* Color de fondo */
          color: white;
          transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
        }
        .social-icon-link:hover {
          transform: translateY(-3px);
          background-color: #C5441F; /* Un tono más oscuro al pasar el ratón */
        }
        .social-icon-link svg {
          width: 32px; /* Tamaño del SVG dentro del círculo */
          height: 32px;
        }

        /* Animación del Título Hero (Estilo Apple) */
        @keyframes appleFadeInScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          70% {
            opacity: 1;
            transform: scale(1.01) translateY(-2px); /* Ligero overshoot */
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .hero-title-animated {
          animation: appleFadeInScaleUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* Curva de easing para suavidad */
        }
      `}</style>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full bg-[#F3F3F3]/80 backdrop-blur-md z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#inicio" className="text-2xl font-bold text-black tracking-tighter">
              Un Día a la Vez
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="font-semibold text-gray-700 hover:text-black transition-colors">
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <a href="#oracion" className="hidden md:block bg-black text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                  Pide Oración
              </a>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-black focus:outline-none"
                  aria-label="Abrir menú"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 border-t border-gray-200' : 'max-h-0'}`}>
            <div className="bg-[#F3F3F3] px-6 py-4 space-y-4">
              {navItems.map((item) => (
                  <a key={item.name} href={item.href} className="block font-semibold text-gray-700 hover:text-black text-lg" onClick={() => handleMobileMenuClick(item.href)}>
                    {item.name}
                  </a>
              ))}
               <a href="#oracion" className="block w-full text-center mt-2 bg-black text-white font-semibold px-5 py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors" onClick={() => handleMobileMenuClick('#oracion')}>
                  Pide Oración
               </a>
             </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl mx-auto pt-32 pb-8">
            <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-tight hero-title-animated">
                UN DÍA <span className="circle-doodle">A LA VEZ</span>, EL ESPACIO QUE SERÁ <span className="underline-doodle">LA BASE DE TU FE</span>
            </h1>
            <p className="mt-12 text-xl text-gray-600 max-w-2xl mx-auto">
                Juntos construiremos un cimiento fuerte para tu vida espiritual, sin importar las circunstancias.
            </p>
        </div>
        {/* Aquí se eliminó el corazón, solo queda la flecha */}
        <a href="#devocional" className="absolute bottom-8 animate-bounce">
          <ChevronDown className="text-[#E95A2B]" size={32} />
        </a>
      </section>
      
      {/* --- SECCIONES DE CONTENIDO --- */}
      <main className="space-y-24 py-24 px-4">

        {/* Devocional Section (YouTube Videos) */}
        <section id="devocional">
          <SectionTitle>Devocionales en <span className="text-[#E95A2B]">Video</span></SectionTitle>
          <SectionSubtitle>Momentos de reflexión diaria para fortalecer tu fe y renovar tu esperanza.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Grid para 2 videos */}
            {devotionalVideos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-2xl p-6 border-2 border-black card-shadow transition-transform hover:scale-105"
              >
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  <p className="text-gray-600 mt-1">{video.description}</p>
                  {/* No hay botón "Leer más" para videos, ya que el contenido es el video */}
              </div>
            ))}
          </div>
        </section>

        {/* Lectura Section */}
        <section id="lectura">
          <SectionTitle>Devocionales <span className="text-[#E95A2B]">Escritos</span></SectionTitle>
          <SectionSubtitle>Textos inspiradores para meditar en tu tiempo personal con Dios.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-black card-shadow">
                <span className="font-bold text-[#E95A2B]">DEVOCIONAL DE HOY</span>
                <h3 className="text-3xl font-bold mt-2 mb-4">Caminando en Fe</h3>
                <div className="space-y-4 text-gray-700">
                    <p className="font-semibold italic">"Por tanto, no desmayamos..." - 2 Corintios 4:16</p>
                    <p>Cada día es una nueva oportunidad para crecer. Aunque enfrentemos desafíos, podemos confiar en que Dios está obrando en nosotros, renovando nuestro espíritu.</p>
                </div>
                <button 
                  onClick={() => handleReadMoreDevotional(devotionalTexts[0])} // Asumiendo que el primero es "Caminando en Fe"
                  className="mt-6 bg-black text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
                >
                  Leer Completo <ArrowRight size={16} className="inline-block ml-1" />
                </button>
            </div>
            <div className="space-y-6">
                <div className="bg-orange-100 rounded-2xl p-6 border-2 border-black card-shadow">
                    <h4 className="font-bold text-lg mb-2">Versículo del Día</h4>
                    <p className="text-gray-700 italic">{dailyVerse.text} <br/> <span className="font-semibold not-italic">— {dailyVerse.reference}</span></p>
                </div>
                   <div className="bg-white rounded-2xl p-6 border-2 border-black card-shadow">
                    <h4 className="font-bold text-lg mb-3">Lecturas Anteriores</h4>
                    <div className="space-y-2">
                           {devotionalTexts.slice(1).map((dev, i) => ( // Excluye el primero que ya se muestra
                               <button 
                                 key={dev.id} 
                                 onClick={() => handleReadMoreDevotional(dev)} 
                                 className="w-full text-left font-semibold text-gray-600 hover:text-black"
                               >
                                 › {dev.title}
                               </button>
                           ))}
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        {/* Música Section */}
        <section id="musica">
          <SectionTitle>Música para <span className="text-[#E95A2B]">Orar</span></SectionTitle>
          <SectionSubtitle>Melodías instrumentales para acompañar tus momentos de oración y meditación.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Música Ambiental de YouTube (con opción futura a Spotify) */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-black card-shadow flex flex-col items-center justify-center transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">{ambientMusic.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{ambientMusic.description}</p>
              <div className="aspect-video w-full max-w-2xl bg-gray-200 rounded-lg overflow-hidden">
                {/* Actualmente YouTube Embed */}
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${ambientMusic.youtubeId}?autoplay=1&loop=1&playlist=${ambientMusic.youtubeId}`} // Autoplay y loop
                  title={ambientMusic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
                {/* FUTURO: Botón para Spotify (comentado, requiere implementación de API) */}
                {/*
                <button
                  onClick={() => alert('Integrar reproductor de Spotify aquí con el track ID: ' + ambientMusic.spotifyTrackId)}
                  className="mt-4 bg-green-500 text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-colors hidden"
                >
                  Reproducir en Spotify
                </button>
                */}
              </div>
            </div>
            
            {/* Otros tracks de música */}
            {musicTracks.map((track, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-2 border-black card-shadow flex flex-col justify-between transition-transform hover:scale-105">
                  <div>
                      <h3 className="text-xl font-bold">{track.title}</h3>
                      <p className="text-gray-600 mt-1">{track.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-semibold text-gray-500">{track.duration}</span>
                      <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1"/>
                      </button>
                  </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conóceme Section */}
        <section id="conoceme">
          <SectionTitle>Conoce al <span className="text-[#E95A2B]">Capellán</span></SectionTitle>
          <SectionSubtitle>Un vistazo a la vida y misión del Capellán Christian Suarez.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 border-2 border-black card-shadow text-center">
              <img 
                src="/assets/images/A7407939.jpg" 
                alt="Capellán Christian Suarez 1" 
                className="w-full h-auto rounded-xl object-cover mb-6 border-2 border-black card-shadow"
              />
              <h3 className="text-2xl font-bold mb-3">Christian Suarez</h3>
              <p className="text-gray-700 leading-relaxed">
                El Capellán Christian Suarez es un siervo dedicado con un corazón apasionado por llevar la palabra de Dios. Su ministerio se enfoca en la edificación espiritual y el acompañamiento en la fe.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-black card-shadow text-center">
              <img 
                src="/assets/images/A7407940.jpg" 
                alt="Capellán Christian Suarez 2" 
                className="w-full h-auto rounded-xl object-cover mb-6 border-2 border-black card-shadow"
              />
              <h3 className="text-2xl font-bold mb-3">Su Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                A través de devocionales, música y mensajes inspiradores, el Capellán Suarez busca guiar a las personas a encontrar fortaleza y consuelo en su caminar diario con Cristo.
              </p>
            </div>
          </div>
           {/* Sección para 4Praise MEJORADA */}
           <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl p-8 border-2 border-black card-shadow text-center">
             <img 
                src="/assets/images/4praise.jpg" 
                alt="Grupo 4Praise" 
                className="w-full h-auto rounded-xl object-cover mb-6 border-2 border-black card-shadow"
              />
             <h3 className="text-2xl font-bold mb-3">4Praise: Voces de Adoración</h3>
             <p className="text-gray-700 leading-relaxed">
               El Capellán Christian Suarez es un miembro integral de 4Praise, un grupo vocal dedicado a elevar la adoración a través de la música. Con armonías cautivadoras y letras que profundizan en la fe, 4Praise busca inspirar y conectar corazones con mensajes de esperanza y el amor de Dios. Su ministerio musical es una extensión del propósito de Capellán Christian, llevando consuelo y gozo a través del canto.
             </p>
             <a href="URL_DE_4PRAISE_YOUTUBE_O_REDES" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center bg-[#E95A2B] text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-[#C5441F] transition-colors">
                Conoce más de 4Praise <ArrowRight size={20} className="ml-2" />
             </a>
           </div>
        </section>

        {/* Redes Sociales Section */}
        <section id="redes-sociales">
          <SectionTitle>Conéctate con nosotros</SectionTitle>
          <SectionSubtitle>Encuéntranos en nuestras plataformas sociales para más contenido y actualizaciones.</SectionSubtitle>
          <div className="max-w-xl mx-auto mt-12 flex justify-center items-center gap-8 py-4 px-6 bg-white rounded-2xl border-2 border-black card-shadow">
            {socialLinks.map((link) => {
              const IconComponent = link.icon; 
              return (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Visita nuestro ${link.name}`}
                  className="social-icon-link"
                >
                  {IconComponent && <IconComponent />}
                  {!IconComponent && <span className="text-xl font-bold">{link.name.substring(0,1)}</span>}
                </a>
              );
            })}
          </div>
        </section>

        {/* Oración Section */}
        <section id="oracion">
          <SectionTitle>Compartir en <span className="text-[#E95A2B]">Oración</span></SectionTitle>
          <SectionSubtitle>Comparte tus peticiones de oración con nuestra comunidad. No estás solo.</SectionSubtitle>
            <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl p-8 border-2 border-black card-shadow">
                       <form className="space-y-6">
                         <div>
                             <label htmlFor="peticion" className="text-lg font-bold text-black mb-2 block">Tu Petición de Oración</label>
                             <textarea id="peticion" rows="5" placeholder="Escribe aquí tu petición..." className="w-full p-4 bg-gray-100 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#E95A2B]"></textarea>
                         </div>
                         <div>
                             <label htmlFor="nombre" className="text-lg font-bold text-black mb-2 block">Tu Nombre (opcional)</label>
                             <input type="text" id="nombre" placeholder="Tu nombre" className="w-full p-4 bg-gray-100 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#E95A2B]"/>
                         </div>
                           <button type="submit" className="w-full py-4 bg-black text-white font-bold rounded-lg text-lg hover:bg-gray-800 transition-colors">
                             Enviar Petición
                           </button>
                       </form>
            </div>
        </section>

      </main>
      
      {/* --- FOOTER --- */}
      <footer className="py-12 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-black">Un Día a la Vez</h3>
            <p className="mt-4 text-gray-600">"Este es el día que ha hecho el Señor; Nos gozaremos y alegraremos en él" — Salmos 118:24</p>
            <p className="mt-6 text-sm text-gray-500">© 2025 Un Día a la Vez. Hecho con ❤️ para la gloria de Dios.</p>
        </div>
      </footer>
    </div>
  );
};

export default UnDiaALaVez;