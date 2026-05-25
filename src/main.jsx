import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // <-- Asegúrate de tener esta línea

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Envolvemos App aquí */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);