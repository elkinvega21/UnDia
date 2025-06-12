// src/App.js
import React from 'react';
import './App.css'; // Esto es para estilos globales de App, si los tienes.
import UnDiaALaVez from './components/UnDiaALaVez'; // Importa tu componente

function App() {
  return (
    <div className="App">
      {/* Aquí es donde se renderiza tu componente UnDiaALaVez */}
      <UnDiaALaVez />
    </div>
  );
}

export default App;