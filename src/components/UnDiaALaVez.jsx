// src/components/UnDiaALaVez.jsx
import React, { useState } from 'react';
import { ArrowRight, Menu, X, Play, Book, Music, MessageCircle, Heart, ChevronDown } from 'lucide-react';

const UnDiaALaVez = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // La información y los datos se mantienen intactos
  const [dailyVerse] = useState({
    text: '"Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo..."',
    reference: 'Josué 1:9'
  });

  const navItems = [
    { name: 'Video', href: '#video' },
    { name: 'Lectura', href: '#lectura' },
    { name: 'Música', href: '#musica' },
    { name: 'Oración', href: '#oracion' }
  ];

  const musicTracks = [
    { title: "Paz en la Mañana", duration: "30:00", description: "Música suave para comenzar el día" },
    { title: "Meditación Vespertina", duration: "28:45", description: "Melodías para la reflexión" },
    { title: "Momento de Gratitud", duration: "32:15", description: "Sonidos de adoración silenciosa" },
  ];

  const handlePreviousReadingClick = (title) => {
    alert(`Has hecho clic en: ${title}. Aquí se cargaría el contenido de la lectura.`);
  };

  const handleMobileMenuClick = (href) => {
    setIsMenuOpen(false);
    // Navegación suave
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Componentes de la UI
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

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-custom">
      {/* --- ESTILOS Y FUENTE PERSONALIZADA --- */}
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
        /* CAMBIO: Subrayado más grueso y con mejor espaciado */
        .underline-doodle::after {
          content: '';
          position: absolute;
          bottom: -10px; 
          left: 0;
          right: 0;
          height: 5px; /* Más grueso */
          background-image: url('data:image/svg+xml;utf8,<svg width="100" height="5" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg"><path d="M0,2.5 Q25,-2.5 50,2.5 T100,2.5" stroke="%23E95A2B" stroke-width="4" fill="none" /></svg>');
          background-repeat: repeat-x;
          background-size: 20px 5px;
        }

        .circle-doodle {
           text-decoration: none;
           position: relative;
           display: inline-block;
        }
        /* CAMBIO: Círculo más grueso y con mejor espaciado */
        .circle-doodle::before {
          content: '';
          position: absolute;
          top: -25px;      /* Más espacio arriba */
          bottom: -20px;   /* Más espacio abajo */
          left: -25px;     /* Más espacio a los lados */
          right: -25px;
          border: 4px solid #E95A2B; /* Borde más grueso */
          border-radius: 50% / 60%;
          transform: rotate(-3deg);
          pointer-events: none;
        }
        /* CAMBIO: Sombra más pronunciada para el efecto de bloque */
        .card-shadow {
            box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
        }
      `}</style>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full bg-[#F3F3F3]/80 backdrop-blur-md z-50">
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
        {/* CAMBIO: Contenedor con más padding para bajar el título */}
        <div className="max-w-4xl mx-auto pt-32 pb-8">
            <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-tight">
                UN DÍA <span className="circle-doodle">A LA VEZ</span>, EL ESPACIO QUE SERÁ <span className="underline-doodle">LA BASE DE TU FE</span>
            </h1>
            <p className="mt-12 text-xl text-gray-600 max-w-2xl mx-auto">
                Juntos construiremos un cimiento fuerte para tu vida espiritual, sin importar las circunstancias.
            </p>
        </div>
        <div className="mt-12">
            <div className="w-40 h-40 bg-orange-200 rounded-full flex items-center justify-center animate-bounce" style={{animationDuration: '2s'}}>
                <Heart className="w-16 h-16 text-[#E95A2B]"/>
            </div>
        </div>
        <a href="#video" className="absolute bottom-8 animate-bounce">
          <ChevronDown className="text-[#E95A2B]" size={32} />
        </a>
      </section>
      
      {/* --- SECCIONES DE CONTENIDO --- */}
      <main className="space-y-24 py-24 px-4">

        {/* Video Section */}
        <section id="video">
          <SectionTitle>Reflexiones en <span className="text-[#E95A2B]">Video</span></SectionTitle>
          <SectionSubtitle>Momentos de reflexión diaria para fortalecer tu fe y renovar tu esperanza.</SectionSubtitle>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(item => (
                <div key={item} className="bg-white rounded-2xl p-6 border-2 border-black card-shadow transition-transform hover:scale-105">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <Play className="w-12 h-12 text-[#E95A2B]"/>
                    </div>
                    <h3 className="text-xl font-bold">Devocional Día {item}</h3>
                    <p className="text-gray-600 mt-1">Una palabra de esperanza para este día.</p>
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
            </div>
            <div className="space-y-6">
                <div className="bg-orange-100 rounded-2xl p-6 border-2 border-black card-shadow">
                    <h4 className="font-bold text-lg mb-2">Versículo del Día</h4>
                    <p className="text-gray-700 italic">{dailyVerse.text} <br/> <span className="font-semibold not-italic">— {dailyVerse.reference}</span></p>
                </div>
                 <div className="bg-white rounded-2xl p-6 border-2 border-black card-shadow">
                    <h4 className="font-bold text-lg mb-3">Lecturas Anteriores</h4>
                    <div className="space-y-2">
                         {['Esperanza en Tiempos Difíciles', 'La Paz que Sobrepasa'].map((title, i) => (
                             <button key={i} onClick={() => handlePreviousReadingClick(title)} className="w-full text-left font-semibold text-gray-600 hover:text-black">› {title}</button>
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