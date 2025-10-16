import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { catalogos } from '../data';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

function VisorPdf() {
  const { idMarca, nombreCategoria } = useParams();
  const [numPages, setNumPages] = useState({});
  const containerRef = useRef(null); 
  const [containerWidth, setContainerWidth] = useState(0); 

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  const marcasDeCategoria = catalogos.filter(c => c.categoria.includes(nombreCategoria));
  const indiceActual = marcasDeCategoria.findIndex(c => c.id === parseInt(idMarca));
  const marcaActual = marcasDeCategoria[indiceActual];
  
  const marcaAnterior = indiceActual > 0 ? marcasDeCategoria[indiceActual - 1] : null;
  const marcaSiguiente = indiceActual < marcasDeCategoria.length - 1 ? marcasDeCategoria[indiceActual + 1] : null;

  if (!marcaActual) {
    return <div className="page-container"><h2>Catálogo no encontrado.</h2><Link to="/">Volver al inicio</Link></div>;
  }
  
  const onDocumentLoadSuccess = (pdf, { numPages }) => {
    setNumPages(prevNumPages => ({ ...prevNumPages, [pdf.url]: numPages }));
  };

  return (
    <div className="pdf-viewer">
      <h2>{marcaActual.nombre}</h2>
      

      <nav className="pdf-nav">
        {marcaAnterior && <Link to={`/catalogo/${marcaAnterior.id}/${nombreCategoria}`}>← Anterior</Link>}
        <Link to={`/categoria/${nombreCategoria}`}>Volver a la Lista</Link>
        {marcaSiguiente && <Link to={`/catalogo/${marcaSiguiente.id}/${nombreCategoria}`}>Siguiente →</Link>}
      </nav>

      <div ref={containerRef} className="pdf-main-container">
        {marcaActual.archivosPdf && marcaActual.archivosPdf.map((pdf) => (
          <div key={pdf.url} className="pdf-wrapper">
            <h3 className="pdf-title">{pdf.titulo}</h3>
            <div className="pdf-document-container">
              <Document
                file={pdf.url}
                onLoadSuccess={(data) => onDocumentLoadSuccess(pdf, data)}
                loading={<p>Cargando {pdf.titulo}...</p>}
              >
                {Array.from(new Array(numPages[pdf.url] || 0), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={containerWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))}
              </Document>
            </div>
          </div>
        ))}
      </div>

      <nav className="pdf-nav">
        {marcaAnterior && <Link to={`/catalogo/${marcaAnterior.id}/${nombreCategoria}`}>← Anterior</Link>}
        <Link to={`/categoria/${nombreCategoria}`}>Volver a la Lista</Link>
        {marcaSiguiente && <Link to={`/catalogo/${marcaSiguiente.id}/${nombreCategoria}`}>Siguiente →</Link>}
      </nav>
    </div>
  );
}

export default VisorPdf;