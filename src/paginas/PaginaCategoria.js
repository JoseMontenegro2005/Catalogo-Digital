import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { catalogos } from '../data';

function PaginaCategoria() {
  const { nombreCategoria } = useParams();
if (nombreCategoria === 'drogueria') {
    return (
      <div className="page-container en-desarrollo">
        <h1>Categoría en Desarrollo</h1>
        <p>¡Estamos trabajando en esta sección! Pronto encontrarás nuevas marcas y catálogos aquí.</p>
        <Link to="/" className="back-link">← Volver al Inicio</Link>
      </div>
    );
  }
  const marcasDeCategoria = catalogos
  .filter((catalogo) => catalogo.categoria.includes(nombreCategoria))
  .sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <div className="page-container">
      <h1 className="category-title">Marcas de: {nombreCategoria}</h1>
      <ul className="brand-list">
        {marcasDeCategoria.map((marca) => (
          <li key={marca.id}>
            <Link to={`/catalogo/${marca.id}/${nombreCategoria}`}>{marca.nombre}</Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-link">← Volver al Inicio</Link>
    </div>
  );
}

export default PaginaCategoria;