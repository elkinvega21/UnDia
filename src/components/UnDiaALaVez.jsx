import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Menu, X, Play, Book, Music, MessageCircle, Heart, ChevronDown, 
  Youtube, Instagram, Facebook, Twitter, Share2, MessageSquare, ThumbsUp, 
  Calendar, CreditCard, DollarSign, Laptop, Home, // Icons for modality selection
  ChevronLeft, ChevronRight, User, Mail, Phone, Lock // Icons for form and calendar
} from 'lucide-react'; 

const UnDiaALaVez = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentDevotional, setCurrentDevotional] = useState(null); 

  // State for the step-by-step counseling section
  const [counselingStep, setCounselingStep] = useState('overview'); // 'overview', 'modality', 'calendar', 'confirmation', 'payment'
  const [selectedModality, setSelectedModality] = useState(null); // 'virtual' or 'presencial'
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // Placeholder for time
  const [paymentMethod, setPaymentMethod] = useState(null); // 'nequi', 'paypal', 'card'

  const [dailyVerse] = useState({
    text: '"Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo..."',
    reference: 'Josué 1:9'
  });

  const navItems = [
    { name: 'Devocional', href: '#devocional' },
    { name: 'Lectura', href: '#lectura' },
    { name: 'Música', href: '#musica' },
    { name: 'Oración', href: '#oracion' },
    { name: 'Consejería', href: '#consejerias' },
    { name: '4Praise Music', href: '#4praise-music' }, // Updated nav item
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLikeDevotional = (devotionalId) => {
    setCurrentDevotional(prevDev => {
      if (!prevDev || prevDev.id !== devotionalId) return prevDev;
      return { ...prevDev, likes: (prevDev.likes || 0) + 1 };
    });
  };

  const handleCommentSubmit = (devotionalId, comment) => {
    if (comment.trim() === "") return;
    setCurrentDevotional(prevDev => {
      if (!prevDev || prevDev.id !== devotionalId) return prevDev;
      return { ...prevDev, comments: [...(prevDev.comments || []), comment] };
    });
  };

  const handleShareDevotional = (devotional) => {
    const shareText = `Lee este devocional inspirador: ${devotional.title} - "${devotional.excerpt}" #UnDiaALaVez`;
    if (navigator.share) {
      navigator.share({
        title: devotional.title,
        text: shareText,
        url: window.location.href 
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

  // Simulación de datos para el calendario
  const currentMonth = "Julio 2025";
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const calendarDays = [
    null, null, 1, 2, 3, 4, 5, 
    { date: 6, available: true },
    { date: 7, available: true },
    { date: 8, available: false }, 
    { date: 9, available: true },
    { date: 10, available: false }, 
    { date: 11, available: true },
    { date: 12, available: true },
    { date: 13, available: false }, 
    { date: 14, available: true },
    { date: 15, available: true },
    { date: 16, available: false }, 
    { date: 17, available: true },
    { date: 18, available: true },
    { date: 19, available: false }, 
    { date: 20, available: true },
    { date: 21, available: true },
    { date: 22, available: true },
    { date: 23, available: true },
    { date: 24, available: false }, 
    { date: 25, available: true },
    { date: 26, available: true },
    { date: 27, available: true },
    { date: 28, available: true },
    { date: 29, available: true },
    { date: 30, available: true },
    { date: 31, available: false },
  ];

  const handleDayClick = (day) => {
    if (day && day.available) {
      setSelectedDate(day.date);
      // Simulate selecting a time after day selection
      setSelectedTime("10:00 AM"); // Example time
      alert(`Día ${day.date} de Julio seleccionado. Se ha elegido 10:00 AM como hora provisional.`);
    } else if (day && !day.available) {
      alert(`El día ${day.date} de Julio no está disponible.`);
    }
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

  // If a devotional is selected, render only the devotional view
  if (currentDevotional) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] font-custom">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

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
          <button 
            onClick={() => setCurrentDevotional(null)} 
            className="flex items-center space-x-2 text-black mb-8 px-4 py-2 rounded-lg bg-gray-100 border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
          >
            <ArrowRight size={20} className="rotate-180 mr-1" /> Volver a Lecturas
          </button>

          <article className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12 border-2 border-black card-shadow mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2 leading-tight">
              {currentDevotional.title}
            </h1>
            <p className="text-gray-600 mb-8 text-md">
              {currentDevotional.author} • {currentDevotional.date}
            </p>
            <div 
              className="devotional-content text-black" 
              dangerouslySetInnerHTML={{ __html: currentDevotional.fullContent }}
            ></div>
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-center items-center">
              <button 
                onClick={() => alert('La función de subrayar texto real requeriría un editor de texto enriquecido o JS avanzado para interactuar con el DOM de la selección.')} 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-black border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <Book size={20} />
                <span>Subrayar</span>
              </button>
              <button 
                onClick={() => handleLikeDevotional(currentDevotional.id)} 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-black border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <ThumbsUp size={20} />
                <span>Me gusta ({currentDevotional.likes || 0})</span>
              </button>
              <button 
                onClick={() => handleShareDevotional(currentDevotional)} 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-black border-2 border-black card-shadow hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                <Share2 size={20} />
                <span>Compartir</span>
              </button>
            </div>
          </article>

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

        /* Social Media Icons */
        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px; 
          height: 56px; 
          border-radius: 50%;
          background-color: #E95A2B; 
          color: white;
          transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
        }
        .social-icon-link:hover {
          transform: translateY(-3px);
          background-color: #C5441F; 
        }
        .social-icon-link svg {
          width: 32px; 
          height: 32px;
        }

        /* Animations */
        @keyframes appleFadeInScaleUp {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          70% { opacity: 1; transform: scale(1.01) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .hero-title-animated {
          animation: appleFadeInScaleUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .slide-in-right {
            animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
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
                Un día <span className="circle-doodle">a la vez</span>, un espacio para <span className="underline-doodle">conectar con Dios</span>.
            </h1>
            <p className="mt-12 text-xl text-gray-600 max-w-2xl mx-auto">
                Juntos construiremos una relación fuerte, cercana y personal con Dios, bajo cualquier circunstancia.
            </p>
        </div>
        <a href="#devocional" className="absolute bottom-8 animate-bounce">
          <ChevronDown className="text-[#E95A2B]" size={32} />
        </a>
      </section>
      
      {/* --- SECCIONES DE CONTENIDO --- */}
      <main className="space-y-24 py-24 px-4">

        {/* Devocional Section (YouTube Videos) */}
        <section id="devocional">
          <SectionTitle>Devocionales en <span className="text-[#E95A2B]">Video</span></SectionTitle>
          <SectionSubtitle>Dale play a tu devocional diario.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
              </div>
            ))}
          </div>
        </section>

        {/* Lectura Section */}
        <section id="lectura">
          <SectionTitle>Devocionales <span className="text-[#E95A2B]">Escritos</span></SectionTitle>
          <SectionSubtitle>Para ti que disfrutas de una buena lectura.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-black card-shadow">
                <span className="font-bold text-[#E95A2B]">DEVOCIONAL DE HOY</span>
                <h3 className="text-3xl font-bold mt-2 mb-4">Caminando en Fe</h3>
                <div className="space-y-4 text-gray-700">
                    <p className="font-semibold italic">"Por tanto, no desmayamos..." - 2 Corintios 4:16</p>
                    <p>Cada día es una nueva oportunidad para crecer. Aunque enfrentemos desafíos, podemos confiar en que Dios está obrando en nosotros, renovando nuestro espíritu.</p>
                </div>
                <button 
                  onClick={() => handleReadMoreDevotional(devotionalTexts[0])} 
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
                            {devotionalTexts.slice(1).map((dev, i) => ( 
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
          <SectionSubtitle>Dale un fondo musical a tu momento de oración.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-black card-shadow flex flex-col items-center justify-center transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">{ambientMusic.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{ambientMusic.description}</p>
              <div className="aspect-video w-full max-w-2xl bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${ambientMusic.youtubeId}?autoplay=1&loop=1&playlist=${ambientMusic.youtubeId}`}
                  title={ambientMusic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            {musicTracks.map((track, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-2 border-black card-shadow flex flex-col items-center justify-center">
                <Music size={48} className="text-[#E95A2B] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-center">{track.title}</h3>
                <p className="text-gray-600 text-center">{track.description}</p>
                <span className="text-sm text-gray-500 mt-2">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prayer Request Section */}
        <section id="oracion" className="max-w-4xl mx-auto text-center px-4">
          <SectionTitle>Peticiones de <span className="text-[#E95A2B]">Oración</span></SectionTitle>
          <SectionSubtitle>Comparte tus intenciones y oraremos contigo, juntos en fe.</SectionSubtitle>
          <div className="bg-white rounded-2xl p-8 border-2 border-black card-shadow mt-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-black">Envía tu Petición</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="prayer-request" className="sr-only">Tu petición de oración</label>
                <textarea
                  id="prayer-request"
                  rows="5"
                  className="w-full p-4 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black placeholder-gray-500"
                  placeholder="Escribe aquí tu petición de oración..."
                ></textarea>
              </div>
              <div>
                <label htmlFor="name" className="sr-only">Tu nombre (opcional)</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black placeholder-gray-500"
                  placeholder="Tu nombre (opcional)"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={24} />
                <span>Enviar Petición</span>
              </button>
            </form>
          </div>
        </section>

        {/* Consejería Espiritual - Step-by-Step */}
        <section id="consejerias" className="max-w-6xl mx-auto text-center px-4">
          <SectionTitle>Consejería <span className="text-[#E95A2B]">Espiritual</span></SectionTitle>
          <SectionSubtitle>
            Acompañamiento personalizado para fortalecer tu camino de fe.
          </SectionSubtitle>
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-black card-shadow mt-16 overflow-hidden relative min-h-[700px] flex items-center justify-center">
            
            {/* Step 1: Overview and Counselor Bio */}
            {counselingStep === 'overview' && (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10 fade-in w-full max-w-4xl">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-4 lg:pr-8">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-[#E95A2B] shadow-lg">
                    <img 
                      src={"https://via.placeholder.com/192x192?text=Cristian+Suarez"} 
                      alt="Cristian Suárez" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="text-4xl font-extrabold mb-2 text-black">Cristian Suárez</h3>
                  <p className="text-[#E95A2B] text-xl font-semibold mb-4">
                    Teólogo, Pastor, Músico y Capellán
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Con una sólida formación y una Maestría en Consejería Bíblica, Cristian se dedica a ofrecer un acompañamiento espiritual profundo y personalizado. Su pasión es guiarte en la construcción de una relación más fuerte y personal con Dios, brindándote apoyo, discernimiento y sabiduría bíblica en cada paso de tu camino.
                  </p>
                  <ul className="text-gray-800 text-lg space-y-2 text-left">
                    <li className="flex items-center">
                      <Book size={20} className="text-[#E95A2B] mr-3 flex-shrink-0" />
                      <span>Maestría en Consejería Bíblica</span>
                    </li>
                    <li className="flex items-center">
                      <Heart size={20} className="text-[#E95A2B] mr-3 flex-shrink-0" />
                      <span>Acompañamiento espiritual y emocional</span>
                    </li>
                    <li className="flex items-center">
                      <MessageSquare size={20} className="text-[#E95A2B] mr-3 flex-shrink-0" />
                      <span>Enfoque centrado en la fe y principios bíblicos</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-auto mt-8 lg:mt-0 text-center lg:text-left">
                  <button 
                    onClick={() => setCounselingStep('modality')}
                    className="w-full max-w-xs bg-black text-white font-semibold px-8 py-4 rounded-lg text-xl hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3 card-shadow"
                  >
                    <span>Iniciar Reserva</span>
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Modality Selection */}
            {counselingStep === 'modality' && (
              <div className="flex flex-col items-center fade-in w-full max-w-2xl text-center">
                <h3 className="text-3xl font-extrabold text-black mb-8">Paso 1: Elige tu Modalidad</h3>
                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                  <button 
                    onClick={() => setSelectedModality('virtual')} 
                    className={`flex-1 min-w-0 sm:min-w-[unset] p-8 rounded-2xl border-2 border-black card-shadow flex flex-col items-center justify-center space-y-4 transition-transform hover:scale-105 ${selectedModality === 'virtual' ? 'bg-[#E95A2B] text-white' : 'bg-gray-100 text-black'}`}
                  >
                    <Laptop size={48} className={`${selectedModality === 'virtual' ? 'text-white' : 'text-[#E95A2B]'}`} />
                    <span className="text-2xl font-bold">Virtual</span>
                    <p className={`text-md ${selectedModality === 'virtual' ? 'text-white/90' : 'text-gray-600'}`}>
                      Desde la comodidad de tu hogar, vía videollamada.
                    </p>
                  </button>
                  <button 
                    onClick={() => setSelectedModality('presencial')} 
                    className={`flex-1 min-w-0 sm:min-w-[unset] p-8 rounded-2xl border-2 border-black card-shadow flex flex-col items-center justify-center space-y-4 transition-transform hover:scale-105 ${selectedModality === 'presencial' ? 'bg-[#E95A2B] text-white' : 'bg-gray-100 text-black'}`}
                  >
                    <Home size={48} className={`${selectedModality === 'presencial' ? 'text-white' : 'text-[#E95A2B]'}`} />
                    <span className="text-2xl font-bold">Presencial</span>
                    <p className={`text-md ${selectedModality === 'presencial' ? 'text-white/90' : 'text-gray-600'}`}>
                      En nuestra ubicación designada para un encuentro personal.
                    </p>
                  </button>
                </div>
                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => setCounselingStep('overview')}
                    className="bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                  >
                    <ChevronLeft size={20} />
                    <span>Anterior</span>
                  </button>
                  <button 
                    onClick={() => setCounselingStep('calendar')} 
                    disabled={!selectedModality}
                    className={`bg-black text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${!selectedModality ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  >
                    <span>Siguiente</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Calendar & Time Selection */}
            {counselingStep === 'calendar' && (
              <div className="flex flex-col items-center fade-in w-full max-w-xl text-center">
                <h3 className="text-3xl font-extrabold text-black mb-8">Paso 2: Elige Fecha y Hora</h3>
                <div className="w-full bg-orange-50 rounded-lg p-6 border border-gray-300 shadow-inner">
                    <div className="flex justify-between items-center mb-4">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                        <span className="text-xl font-semibold text-black">{currentMonth}</span>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <ChevronRight size={24} className="text-gray-700" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-sm font-semibold text-gray-500 mb-2">
                        {daysOfWeek.map(day => (
                            <div key={day} className="text-center">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, index) => (
                            <div 
                                key={index} 
                                className={`
                                    flex items-center justify-center aspect-square rounded-lg transition-colors text-lg font-bold
                                    ${day === null ? 'bg-transparent text-gray-300 cursor-not-allowed' : ''}
                                    ${day && day.available ? 'bg-green-100 text-green-800 border border-green-200 cursor-pointer hover:bg-green-200' : ''}
                                    ${day && !day.available ? 'bg-red-50 text-red-600 border border-red-100 cursor-not-allowed line-through opacity-70' : ''}
                                    ${selectedDate === day?.date ? 'border-2 border-[#E95A2B] ring-2 ring-[#E95A2B]' : ''}
                                `}
                                onClick={() => handleDayClick(day)}
                                style={{ minWidth: '30px', minHeight: '30px' }}
                            >
                                {day?.date || ''}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-6 text-sm">
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-full bg-green-100 border border-green-200 mr-2"></span>
                            <span>Disponible</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-full bg-red-50 border border-red-100 mr-2"></span>
                            <span>No Disponible</span>
                        </div>
                    </div>
                </div>
                {selectedDate && (
                    <div className="mt-6 w-full text-center fade-in">
                        <p className="text-xl font-semibold text-black mb-4">Horarios disponibles para el {selectedDate} de {currentMonth.split(' ')[0]}:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {/* Simulated time slots */}
                            {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"].map(time => (
                                <button 
                                    key={time} 
                                    onClick={() => setSelectedTime(time)}
                                    className={`px-5 py-2 rounded-lg border-2 border-black font-semibold transition-colors ${selectedTime === time ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => setCounselingStep('modality')}
                    className="bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                  >
                    <ChevronLeft size={20} />
                    <span>Anterior</span>
                  </button>
                  <button 
                    onClick={() => setCounselingStep('confirmation')} 
                    disabled={!selectedDate || !selectedTime}
                    className={`bg-black text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${!selectedDate || !selectedTime ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  >
                    <span>Siguiente</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {counselingStep === 'confirmation' && (
              <div className="flex flex-col items-center fade-in w-full max-w-2xl text-center">
                <h3 className="text-3xl font-extrabold text-black mb-8">Paso 3: Confirma tu Reserva</h3>
                <div className="bg-orange-50 rounded-lg p-8 border-2 border-black card-shadow w-full">
                  <h4 className="text-2xl font-bold text-black mb-4">Resumen de la Cita:</h4>
                  <ul className="text-lg text-gray-800 space-y-3 text-left">
                    <li className="flex items-center"><User size={20} className="mr-3 text-[#E95A2B]" /> <strong>Consejero:</strong> Cristian Suárez</li>
                    <li className="flex items-center"><Laptop size={20} className="mr-3 text-[#E95A2B]" /> <strong>Modalidad:</strong> {selectedModality === 'virtual' ? 'Virtual' : 'Presencial'}</li>
                    <li className="flex items-center"><Calendar size={20} className="mr-3 text-[#E95A2B]" /> <strong>Fecha:</strong> {selectedDate} de {currentMonth.split(' ')[0]}, {currentMonth.split(' ')[1]}</li>
                    <li className="flex items-center"><img src={"https://img.icons8.com/ios-filled/24/null/time.png"} alt="Time Icon" className="h-5 w-5 mr-3" /> <strong>Hora:</strong> {selectedTime}</li>
                    <li className="flex items-center"><DollarSign size={20} className="mr-3 text-[#E95A2B]" /> <strong>Costo:</strong> $80.000 COP (simulado)</li>
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-6">
                    Por favor, revisa cuidadosamente los detalles antes de proceder al pago.
                  </p>
                </div>
                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => setCounselingStep('calendar')}
                    className="bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                  >
                    <ChevronLeft size={20} />
                    <span>Anterior</span>
                  </button>
                  <button 
                    onClick={() => setCounselingStep('payment')}
                    className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <span>Confirmar y Continuar al Pago</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Payment Form */}
            {counselingStep === 'payment' && (
              <div className="flex flex-col items-center fade-in w-full max-w-2xl text-center">
                <h3 className="text-3xl font-extrabold text-black mb-8">Paso 4: Realiza tu Pago</h3>
                <div className="bg-orange-50 rounded-lg p-8 border-2 border-black card-shadow w-full text-left">
                  <p className="text-gray-700 text-lg mb-6">
                    Completa la información a continuación para asegurar tu cita. Todas las transacciones son seguras y cifradas.
                  </p>

                  <form className="space-y-6">
                    <div>
                      <label htmlFor="payer-name" className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo:</label>
                      <div className="relative">
                        <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" id="payer-name" placeholder="Tu Nombre Completo" className="w-full p-3 pl-10 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="payer-email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" id="payer-email" placeholder="tu.email@ejemplo.com" className="w-full p-3 pl-10 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="payer-phone" className="block text-gray-700 text-sm font-bold mb-2">Número de Teléfono:</label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="tel" id="payer-phone" placeholder="Ej: 300 123 4567" className="w-full p-3 pl-10 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" />
                      </div>
                    </div>

                    <div className="border-t border-gray-300 pt-6 mt-6">
                      <h4 className="text-xl font-bold text-black mb-4">Selecciona tu Método de Pago:</h4>
                      <div className="space-y-4">
                        {/* Nequi */}
                        <label className="flex items-center p-4 border-2 border-black rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="radio" name="payment-method" value="nequi" className="form-radio h-5 w-5 text-[#E95A2B] focus:ring-[#E95A2B]" onChange={() => setPaymentMethod('nequi')} checked={paymentMethod === 'nequi'} />
                          <img src={"https://via.placeholder.com/60x30?text=Nequi"} alt="Nequi Logo" className="h-6 w-auto object-contain ml-4" />
                          <span className="ml-3 font-semibold text-gray-800">Nequi</span>
                          <span className="ml-auto text-sm text-gray-500">Pago móvil</span>
                        </label>

                        {/* PayPal */}
                        <label className="flex items-center p-4 border-2 border-black rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="radio" name="payment-method" value="paypal" className="form-radio h-5 w-5 text-[#E95A2B] focus:ring-[#E95A2B]" onChange={() => setPaymentMethod('paypal')} checked={paymentMethod === 'paypal'} />
                          <img src={"https://via.placeholder.com/80x30?text=PayPal"} alt="PayPal Logo" className="h-6 w-auto object-contain ml-4" />
                          <span className="ml-3 font-semibold text-gray-800">PayPal</span>
                          <span className="ml-auto text-sm text-gray-500">Internacional</span>
                        </label>

                        {/* Card/PSE */}
                        <label className="flex items-center p-4 border-2 border-black rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="radio" name="payment-method" value="card" className="form-radio h-5 w-5 text-[#E95A2B] focus:ring-[#E95A2B]" onChange={() => setPaymentMethod('card')} checked={paymentMethod === 'card'} />
                          <img src={"https://via.placeholder.com/100x30?text=Tarjetas/PSE"} alt="Cards/PSE Logo" className="h-6 w-auto object-contain ml-4" />
                          <span className="ml-3 font-semibold text-gray-800">Tarjeta de Crédito/Débito o PSE</span>
                        </label>
                      </div>

                      {/* Dynamic payment input based on selection (simulated) */}
                      {paymentMethod === 'nequi' && (
                        <div className="mt-6 fade-in">
                          <label htmlFor="nequi-number" className="block text-gray-700 text-sm font-bold mb-2">Número Nequi:</label>
                          <input type="text" id="nequi-number" placeholder="Ej: 3001234567" className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" disabled={!paymentMethod} />
                        </div>
                      )}
                      {paymentMethod === 'paypal' && (
                        <div className="mt-6 fade-in">
                          <label htmlFor="paypal-email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico PayPal:</label>
                          <input type="email" id="paypal-email" placeholder="tu.paypal@ejemplo.com" className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" disabled={!paymentMethod} />
                        </div>
                      )}
                      {paymentMethod === 'card' && (
                        <div className="mt-6 space-y-4 fade-in">
                          <div>
                            <label htmlFor="card-number" className="block text-gray-700 text-sm font-bold mb-2">Número de Tarjeta:</label>
                            <input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" disabled={!paymentMethod} />
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1/2">
                              <label htmlFor="expiry-date" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Vencimiento (MM/AA):</label>
                              <input type="text" id="expiry-date" placeholder="MM/AA" className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" disabled={!paymentMethod} />
                            </div>
                            <div className="w-1/2">
                              <label htmlFor="cvc" className="block text-gray-700 text-sm font-bold mb-2">CVC:</label>
                              <input type="text" id="cvc" placeholder="XXX" className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E95A2B] text-black" disabled={!paymentMethod} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                  <p className="text-2xl font-bold text-black mt-8 text-center">Total a Pagar: <span className="text-[#E95A2B]">$80.000 COP</span></p>

                  <div className="mt-8 flex gap-4 justify-center">
                    <button 
                        onClick={() => setCounselingStep('confirmation')}
                        className="bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                    >
                        <ChevronLeft size={20} />
                        <span>Anterior</span>
                    </button>
                    <button 
                        onClick={() => alert('Simulando pago. ¡Próximamente se procesará tu pago y reserva!')}
                        className="bg-black text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3 cursor-not-allowed opacity-50"
                        disabled
                    >
                        <Lock size={24} />
                        <span>Pagar y Confirmar Cita</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Sección: Conoce 4Praise Music */}
        <section id="4praise-music" className="max-w-5xl mx-auto text-center px-4">
          <SectionTitle>Conoce <span className="text-[#E95A2B]">4Praise Music</span></SectionTitle>
          <SectionSubtitle>Adoración que eleva tu espíritu y transforma tu día.</SectionSubtitle>
          <div className="bg-white rounded-2xl p-8 border-2 border-black card-shadow mt-12 max-w-lg mx-auto flex flex-col items-center transition-transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-6 text-black">Explora su Música</h3>
            <img 
              src={"image_acc045.png"}
              alt="4Praise Logo" 
              className="w-full max-w-xs rounded-lg mb-6 border-2 border-black" 
            />
            <p className="text-gray-700 text-lg mb-6">
              Descubre las melodías inspiradoras de 4Praise, un proyecto musical dedicado a llevar mensajes de fe y esperanza a través de la adoración. Sumérgete en su sonido y permite que sus canciones acompañen tus momentos de conexión con Dios.
            </p>
            <a 
              href="https://www.youtube.com/@4PraiseMusic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-black text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
            >
              <Youtube size={24} />
              <span>Visitar Canal de YouTube</span>
            </a>
          </div>
        </section>

        {/* Social Media Section */}
        <section id="redes-sociales" className="max-w-4xl mx-auto text-center px-4">
          <SectionTitle>Conecta en <span className="text-[#E95A2B]">Redes Sociales</span></SectionTitle>
          <SectionSubtitle>Síguenos para devocionales diarios, actualizaciones y más contenido inspirador.</SectionSubtitle>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-link"
                aria-label={`Visita nuestro ${link.name}`}
              >
                <link.icon />
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-12 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Un Día a la Vez</h3>
          <p className="text-gray-400 mb-6">
            Construyendo una relación fuerte, cercana y personal con Dios, bajo cualquier circunstancia.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <link.icon size={24} />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Un Día a la Vez. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UnDiaALaVez;