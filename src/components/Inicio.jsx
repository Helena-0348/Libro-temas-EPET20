import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Inicio.css';
import ContactoInfo from './ContactoInfo';
import GoButton from './GoButton';

/**
 * Componente Inicio
 * Página de bienvenida con información sobre la EPET N°20
 * y accesos rápidos a las principales secciones
 */
function Inicio() {
  return (
    <div className="inicio-page-wrapper">
      
      {/* Contenido principal: dos columnas */}
      <div className="inicio-contenido-principal">
        
        {/* Columna izquierda: información y bienvenida */}
        <div className="columna-informacion">
          <div className="header-seccion-bienvenida">
            
            {/* Banderín con identificación de la escuela */}
            <div className="banderin-compacto">
              <p>EPET N° 20</p>
              <p>Libro de Temas - EPET N° 20</p>
            </div>

            {/* Título y descripción principal */}
            <div className="titulo-y-descripcion">
              <h1 className="titulo-seccion-principal">
                Bienvenido (prof@, prece) — Libro de Temas Digital
              </h1>

              <p className="descripcion">
                La EPET N° 20 (Escuela Provincial de Enseñanza Técnica N° 20) 
                de Neuquén es una institución educativa técnica ubicada en Lanín 2020, 
                preparando a los estudiantes con conocimientos técnicos y prácticos.
              </p>

              <p className="descripcion">
                Utiliza este sistema para gestionar y consultar la información académica 
                de los cursos:
              </p>

              {/* Botón para ir a libros */}
              <GoButton to="/PaginaLibro" label="Ir a libros disponibles" className="inicio-go-button" />
            </div>
          </div>
        </div>

        {/* Columna derecha: accesos rápidos */}
        <div className="columna-accesos">
          <h3>Accesos Rápidos</h3>

          <nav className="enlaces-rapidos">
            <Link to="/" className="link-rapido">Inicio</Link>
            <Link to="/Libro" className="link-rapido">Libro de temas</Link>
            <Link to="/mi-rol" className="link-rapido">Mi cuenta</Link>
          </nav>
        </div>
      </div>

      {/* Footer: información de contacto */}
      <ContactoInfo />
    </div>
  );
}

export default Inicio;