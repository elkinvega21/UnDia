// src/components/UnDiaALaVez.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Play, Book, Music, MessageCircle, Heart, ChevronDown } from 'lucide-react';

const UnDiaALaVez = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');
  const [dailyVerse, setDailyVerse] = useState({ text: 'Cargando versículo...', reference: '' });
  const [bibleError, setBibleError] = useState(null);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      // Reemplaza 'YOUR_ESV_API_KEY' con tu clave API real de ESV
      // Puedes obtener una aquí: https://api.esv.org/
      const ESV_API_KEY = 'YOUR_ESV_API_KEY'; 
      const passage = 'John 3:16'; // Puedes cambiar el pasaje o hacerlo dinámico

      if (ESV_API_KEY === 'YOUR_ESV_API_KEY') {
        setBibleError("¡ADVERTENCIA! Por favor, reemplaza 'YOUR_ESV_API_KEY' con tu clave API real para leer la Biblia.");
        setDailyVerse({ text: 'Clave API no configurada. Por favor, revisa el código.', reference: 'Configuración' });
        return;
      }

      try {
        const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${passage}&include-footnotes=false&include-chapter-numbers=false&include-verse-numbers=true&include-short-copyright=false&include-passage-horizontal-lines=false&include-heading=false`, {
          headers: {
            'Authorization': `Token ${ESV_API_KEY}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.passages && data.passages.length > 0) {
          setDailyVerse({
            text: data.passages[0].trim(),
            reference: data.canonical
          });
          setBibleError(null);
        } else {
          setBibleError("No se encontró el versículo o el pasaje.");
          setDailyVerse({ text: 'No se pudo cargar el versículo.', reference: '' });
        }
      } catch (error) {
        console.error("Error al cargar el versículo de la Biblia:", error);
        setBibleError("Error al conectar con la API de la Biblia. Inténtalo de nuevo más tarde.");
        setDailyVerse({ text: 'Error al cargar el versículo.', reference: '' });
      }
    };

    fetchDailyVerse();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const navItems = [
    { name: 'INICIO', href: '#inicio', id: 'inicio' },
    { name: 'VIDEO', href: '#video', id: 'video' },
    { name: 'LECTURA', href: '#lectura', id: 'lectura' },
    { name: 'MÚSICA', href: '#musica', id: 'musica' },
    { name: 'ORACIÓN', href: '#oracion', id: 'oracion' }
  ];

  const musicTracks = [
    { title: "Paz en la Mañana", duration: "30:00", description: "Música suave para comenzar el día" },
    { title: "Meditación Vespertina", duration: "28:45", description: "Melodías para la reflexión" },
    { title: "Momento de Gratitud", duration: "32:15", description: "Sonidos de adoración silenciosa" },
    { title: "Oración Profunda", duration: "29:30", description: "Instrumental para la intercesión" },
    { title: "Descanso en Él", duration: "31:20", description: "Calma para el alma" }
  ];

  const handlePreviousReadingClick = (title) => {
    alert(`Has hecho clic en: ${title}. Aquí se cargaría el contenido de la lectura.`);
  };

  return (
    <div className="min-h-screen bg-[#fefefe] font-sans">
      {/* Custom Font Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        .font-display { font-family: 'Crimson Text', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 transition-shadow duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#E2725B] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-body font-semibold text-gray-900 tracking-tight">
                Un Día a la Vez
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-body font-medium transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'text-[#E2725B]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none"
              >
                {isMenuOpen ? <X size={22} className="transition-transform duration-200" /> : <Menu size={22} className="transition-transform duration-200" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 transition-all duration-300 ease-in-out"
               style={{ maxHeight: isMenuOpen ? '500px' : '0', opacity: isMenuOpen ? '1' : '0', overflow: 'hidden' }}>
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-body font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveTab(item.id);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Inicio */}
      <section id="inicio" className="pt-16 min-h-screen flex items-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0"> {/* Añadido padding vertical para mejor responsividad */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left"> {/* Centrado en móvil, alineado a la izquierda en desktop */}
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 bg-[#E2725B]/10 rounded-full">
                  <span className="text-xs font-body font-medium text-[#E2725B] tracking-wide uppercase">
                    Devocional Diario
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-gray-900 leading-tight">
                  Un Día
                  <br className="lg:hidden" /> {/* Salto de línea solo en pantallas grandes */}
                  <span className="text-[#E2725B]">a la Vez</span>
                </h1>

                <p className="text-lg font-body text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0"> {/* mx-auto para centrar en móvil */}
                  Un espacio para acompañarte en tu día a día con Dios.
                  Renovar fuerzas, agradecer, orar y recordar que no estás solo.
                </p>
              </div>

              <div className="pt-4">
                <blockquote className="border-l-3 border-[#E2725B] pl-4 space-y-2 max-w-md mx-auto lg:mx-0"> {/* mx-auto para centrar en móvil */}
                  <p className="font-display text-lg text-gray-700 italic">
                    "Este es el día que ha hecho el Señor;
                    Nos gozaremos y alegraremos en él"
                  </p>
                  <cite className="text-sm font-body font-medium text-gray-500">
                    — Salmos 118:24
                  </cite>
                </blockquote>
              </div>

              <button className="group inline-flex items-center px-6 py-3 bg-[#E2725B] text-white font-body font-medium rounded-lg hover:bg-[#d86650] transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#E2725B]/50">
                Comenzar Hoy
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Content - Profile Image */}
            <div className="relative flex justify-center lg:justify-end"> {/* Centrado en móvil, alineado a la derecha en desktop */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-sm"> {/* Ancho máximo para la tarjeta de imagen */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {/* Placeholder para la imagen, reemplaza con tu URL real */}
                    <div className="w-20 h-20 bg-[#E2725B] rounded-full flex items-center justify-center mx-auto overflow-hidden">
                      {/* Aquí puedes usar una imagen de tu drive. Ejemplo: */}
                      {/* <img src="URL_DE_TU_IMAGEN_DE_PERFIL" alt="Tu Foto" className="w-full h-full object-cover" /> */}
                      <span className="text-white text-3xl">📷</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-body font-medium text-gray-700">Tu Foto Aquí</p>
                      <p className="text-sm font-body text-gray-500">Foto personal/ministerial</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E2725B]/10 rounded-full hidden lg:block"></div> {/* Oculto en móvil */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#E2725B]/5 rounded-full hidden lg:block"></div> {/* Oculto en móvil */}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-400" size={24} />
        </div>
      </section>

      {/* Video Devocional Section */}
      <section id="video" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-[#E2725B]/10 rounded-full mb-4">
              <Play className="w-3 h-3 text-[#E2725B] mr-2" />
              <span className="text-xs font-body font-medium text-[#E2725B] tracking-wide uppercase">
                Video Devocional
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-gray-900 mb-6">
              Reflexiones en <span className="text-[#E2725B]">Video</span>
            </h2>
            <p className="text-lg font-body text-gray-600 max-w-2xl mx-auto">
              Momentos de reflexión diaria para fortalecer tu fe y renovar tu esperanza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Principal */}
            <div className="md:col-span-2 mb-8">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  {/* Aquí puedes usar una imagen de tu drive como overlay o poster */}
                  {/* <img src="URL_DE_TU_IMAGEN_DE_VIDEO_POSTER" alt="Video Poster" className="absolute inset-0 w-full h-full object-cover" /> */}
                  <button className="relative z-10 w-20 h-20 bg-[#E2725B] rounded-full flex items-center justify-center shadow-lg hover:bg-[#d86650] transition-colors group focus:outline-none focus:ring-4 focus:ring-[#E2725B]/50">
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-body font-semibold text-gray-900 mb-1">
                      Video Devocional de Hoy
                    </h3>
                    <p className="text-sm font-body text-gray-600">
                      Una palabra de esperanza para este día
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Videos Anteriores */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}>
                <div className="aspect-video bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {/* Aquí puedes usar imágenes de tus videos anteriores */}
                    {/* <img src={`URL_DE_TU_VIDEO_IMAGEN_${item}`} alt={`Video ${item}`} className="w-full h-full object-cover" /> */}
                  <button className="w-12 h-12 bg-[#E2725B] rounded-full flex items-center justify-center group-hover:bg-[#d86650] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E2725B]/50">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </button>
                </div>
                <h3 className="font-body font-semibold text-gray-900 mb-2">
                  Devocional Día {item}
                </h3>
                <p className="text-sm font-body text-gray-600">
                  Reflexión sobre la gracia y misericordia de Dios
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lectura Devocional Section */}
      <section id="lectura" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-[#E2725B]/10 rounded-full mb-4">
              <Book className="w-3 h-3 text-[#E2725B] mr-2" />
              <span className="text-xs font-body font-medium text-[#E2725B] tracking-wide uppercase">
                Lectura Devocional
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-gray-900 mb-6">
              Devocionales <span className="text-[#E2725B]">Escritos</span>
            </h2>
            <p className="text-lg font-body text-gray-600 max-w-2xl mx-auto">
              Textos inspiradores para meditar, resaltar y reflexionar en tu tiempo personal con Dios
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Devocional Principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <span className="text-sm font-body font-medium text-[#E2725B] mb-2 block">
                    DEVOCIONAL DE HOY
                  </span>
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                    Caminando en Fe
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="font-body text-gray-700 leading-relaxed mb-4">
                      "Por tanto, no desmayamos; antes aunque este nuestro hombre exterior se va desgastando,
                      el interior no obstante se renueva de día en día." - 2 Corintios 4:16
                    </p>
                    <p className="font-body text-gray-600 leading-relaxed">
                      Cada día es una nueva oportunidad para crecer en nuestra fe. Aunque enfrentemos desafíos
                      y dificultades, podemos confiar en que Dios está obrando en nosotros, renovando
                      nuestro espíritu y fortaleciendo nuestro corazón...
                    </p>
                  </div>
                </div>

                {/* Funciones de Lectura */}
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-medium text-gray-700">Herramientas de Lectura:</span>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-body font-medium rounded-full hover:bg-yellow-200 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-200">
                        Resaltar
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-body font-medium rounded-full hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200">
                        Nota
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block font-body font-medium text-gray-700 mb-2">
                      Enseñanza del Día:
                    </label>
                    <textarea
                      className="w-full bg-white border border-gray-200 rounded-lg p-3 font-body text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20 focus:border-[#E2725B] transition-shadow duration-200 hover:shadow-md"
                      rows="3"
                      placeholder="¿Qué te enseñó Dios hoy a través de esta lectura?"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Sección del Versículo del Día de la API */}
              <div className="bg-[#E2725B]/5 rounded-xl p-6">
                <h4 className="font-body font-semibold text-gray-900 mb-4">
                  Versículo del Día
                </h4>
                {bibleError && (
                  <p className="text-sm font-body text-red-600 mb-2">{bibleError}</p>
                )}
                <blockquote className="space-y-2">
                  <p className="font-display text-gray-700 italic">
                    {dailyVerse.text}
                  </p>
                  {dailyVerse.reference && (
                    <cite className="text-sm font-body font-medium text-gray-500">
                      — {dailyVerse.reference}
                    </cite>
                  )}
                </blockquote>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="font-body font-semibold text-gray-900 mb-4">
                  Lecturas Anteriores
                </h4>
                <div className="space-y-3">
                  {['Esperanza en Tiempos Difíciles', 'La Paz que Sobrepasa', 'Gratitud Diaria'].map((title, index) => (
                    <button
                      key={index}
                      onClick={() => handlePreviousReadingClick(title)}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left w-full focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20"
                    >
                      <span className="font-body font-medium text-gray-700 text-sm">{title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Música Section */}
      <section id="musica" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-[#E2725B]/10 rounded-full mb-4">
              <Music className="w-3 h-3 text-[#E2725B] mr-2" />
              <span className="text-xs font-body font-medium text-[#E2725B] tracking-wide uppercase">
                Música Instrumental
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-gray-900 mb-6">
              Música para <span className="text-[#E2725B]">Orar</span>
            </h2>
            <p className="text-lg font-body text-gray-600 max-w-2xl mx-auto">
              Melodías instrumentales para acompañar tus momentos de oración y meditación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicTracks.map((track, index) => (
              <div key={index} className={`bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#E2725B] rounded-full flex items-center justify-center group-hover:bg-[#d86650] transition-colors">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  <span className="text-sm font-body font-medium text-gray-500">{track.duration}</span>
                </div>

                <h3 className="font-body font-semibold text-gray-900 mb-2">
                  {track.title}
                </h3>
                <p className="text-sm font-body text-gray-600">
                  {track.description}
                </p>
              </div>
            ))}

            {/* Playlist Completa */}
            <div className="md:col-span-2 lg:col-span-3 mt-6">
              <div className="bg-gradient-to-r from-[#E2725B] to-[#d86650] rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg">
                <Music className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-body font-semibold mb-2">
                  Playlist Completa
                </h3>
                <p className="font-body opacity-90 mb-6">
                  Todas las pistas en una lista de reproducción continua para tus devocionales
                </p>
                <button className="px-6 py-3 bg-white text-[#E2725B] font-body font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20">
                  Reproducir Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pedidos de Oración Section */}
      <section id="oracion" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-[#E2725B]/10 rounded-full mb-4">
              <MessageCircle className="w-3 h-3 text-[#E2725B] mr-2" />
              <span className="text-xs font-body font-medium text-[#E2725B] tracking-wide uppercase">
                Pedidos de Oración
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-gray-900 mb-6">
              Compartir en <span className="text-[#E2725B]">Oración</span>
            </h2>
            <p className="text-lg font-body text-gray-600 max-w-2xl mx-auto">
              Comparte tus peticiones de oración con nuestra comunidad. No estás solo en este caminar
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block font-body font-medium text-gray-700 mb-2">
                    Nombre (opcional)
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-body text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20 focus:border-[#E2725B] focus:bg-white transition-shadow duration-200 hover:shadow-md"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body font-medium text-gray-700 mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-body text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20 focus:border-[#E2725B] focus:bg-white transition-shadow duration-200 hover:shadow-md"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="peticion" className="block font-body font-medium text-gray-700 mb-2">
                  Petición de Oración
                </label>
                <textarea
                  id="peticion"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-body text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20 focus:border-[#E2725B] focus:bg-white transition-shadow duration-200 hover:shadow-md"
                  rows="6"
                  placeholder="Comparte aquí tu petición de oración. Nos uniremos contigo en oración..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="w-4 h-4 text-[#E2725B] border-gray-300 rounded focus:ring-[#E2725B]/20 transition-shadow duration-200 hover:shadow-md"
                />
                <label htmlFor="anonymous" className="ml-2 font-body text-sm text-gray-600">
                  Mantener esta petición anónima
                </label>
              </div>

              <button type="submit" className="w-full py-4 bg-[#E2725B] text-white font-body font-medium rounded-lg hover:bg-[#d86650] transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#E2725B]/20">
                Enviar Petición de Oración
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="font-body text-sm text-gray-500">
                Tu petición será enviada directamente y oraremos por ti.
                <br />
                "Orad unos por otros" - Santiago 5:16
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-[#E2725B] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-body font-semibold text-gray-900">
                Un Día a la Vez
              </h3>
            </div>

            <blockquote className="max-w-2xl mx-auto">
              <p className="font-display text-lg text-gray-700 italic mb-2">
                "Este es el día que ha hecho el Señor; Nos gozaremos y alegraremos en él"
              </p>
              <cite className="font-body text-sm font-medium text-gray-500">
                — Salmos 118:24
              </cite>
            </blockquote>

            <div className="pt-6 border-t border-gray-100">
              <p className="font-body text-sm text-gray-500">
                © 2025 Un Día a la Vez. Hecho con ❤️ para la gloria de Dios
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UnDiaALaVez;