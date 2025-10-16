import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaInicio from './paginas/PaginaInicio';
import PaginaCategoria from './paginas/PaginaCategoria';
import VisorPdf from './paginas/VisorPdf';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/categoria/:nombreCategoria" element={<PaginaCategoria />} />
          <Route path="/catalogo/:idMarca/:nombreCategoria" element={<VisorPdf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;