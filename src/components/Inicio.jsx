// src/components/Inicio.js (VERSIÓN FINAL)
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Inicio.css'; 
import ContactoInfo from './ContactoInfo';

function Inicio() {
  return (
    // Usa un padding top para dejar espacio al header global
    <div className="inicio-page-wrapper"> 
      
      <div className="inicio-contenido-principal">
        
        {/* Columna Izquierda: Información de Bienvenida */}
        <div className="columna-informacion">
          
          {/* Nuevo contenedor para el banderín y el título que deben estar juntos */}
          <div className="header-seccion-bienvenida">
            
            {/* Banderín - Ahora es más compacto */}
            <div className="banderin-compacto">
              <p>EPET N° 20</p>
              <p>Libro de Temas - EPET N° 20</p>
            </div>
            
            {/* Título de Bienvenida */}
            <div className="titulo-y-descripcion">
                <h1 className="titulo-seccion-principal">Bienvenido  ("prof@,prece") Libro de Temas Digital</h1>
                
                <p className="descripcion">
                  La EPET N° 20 (Escuela Provincial de Enseñanza Técnica N° 20) de Neuquén es una institución educativa técnica ubicada en Lanín 2020, Neuquén, preparando a los estudiantes con .
                </p>
                <p className="descripcion">
                  Utiliza este sistema para gestionar y consultar la información académica de los cursos : {}
                </p>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Accesos Rápidos */}
        <div className="columna-accesos">
          <h3>Accesos Rápidos</h3>
          
          
          
          <nav className="enlaces-rapidos">
            <Link to="/" className="link-rapido">Inicio</Link>
            <Link to="/libro-de-temas" className="link-rapido">Libro de temas</Link>
          </nav>
        </div>
      </div><ContactoInfo />
    </div>
      

    
  );
}

export default Inicio;