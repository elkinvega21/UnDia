// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Para React 18+
import './index.css'; // Si tienes un index.css para estilos globales
import App from './App'; // Importa el componente App
import reportWebVitals from './reportWebVitals'; // Si lo estás usando para métricas

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Aquí es donde tu componente App (que contiene UnDiaALaVez) se renderiza */}
  </React.StrictMode>
);

// Si quieres medir el rendimiento de tu aplicación, puedes llamar a reportWebVitals
reportWebVitals();