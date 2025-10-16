import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png'

function PaginaInicio() {
  return (
    <div className="page-container">
      <h1>Catálogo Distrimayor</h1>
      <img src={Logo} className='Logo'/>
      <p>Selecciona una categoría para ver las marcas asociadas.</p>
      <nav className="category-nav">
        <Link to="/categoria/drogueria" className="category-link">Droguería</Link>
        <Link to="/categoria/tradicional" className="category-link">Tradicional</Link>
        <Link to="/categoria/belleza" className="category-link">Belleza</Link>
      </nav>
    </div>
  );
}

export default PaginaInicio;