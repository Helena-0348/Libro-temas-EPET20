import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Inicio.css';
import ContactoInfo from './ContactoInfo';
import GoButton from './GoButton';
import { useUser } from '../context/useUser';

function Inicio() {
  const navigate = useNavigate();
  const ctx = useUser(); // contexto: { user, login, logout, ... }
  console.log('useUser context:', ctx); // DEBUG: ver en consola qué trae el contexto
  const user = ctx?.user ?? null;

  const handleNavigation = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="inicio-page-wrapper">
      <div className="inicio-contenido-principal">
        <div className="columna-informacion">
          <div className="header-seccion-bienvenida">
            <div className="banderin-compacto">
              <p>EPET N° 20</p>
              <p>Libro de Temas - EPET N° 20</p>
            </div>

            <div className="titulo-y-descripcion">
              <h1 className="titulo-seccion-principal">
                Bienvenido {user?.displayName } — Libro de Temas Digital
              </h1>

              <p className="descripcion">
                La EPET N° 20 (Escuela Provincial de Enseñanza Técnica N° 20) 
                de Neuquén es una institución educativa técnica ubicada en Lanín 2020.
              </p>

              <p className="descripcion">
                Utiliza este sistema para gestionar y consultar la información académica 
                de los cursos:
              </p>

              <GoButton to="/listacursos" label="Ir a libros disponibles" className="inicio-go-button" />
            </div>
          </div>
        </div>

        <div className="columna-accesos">
          <h3>Accesos Rápidos</h3>

          <nav className="enlaces-rapidos">
            <button className="link-rapido" onClick={() => handleNavigation('/')} type="button">Inicio</button>
            <button className="link-rapido" onClick={() => handleNavigation('/listacursos')} type="button">Libro de temas</button>
            <button className="link-rapido" onClick={() => handleNavigation('/mi-rol')} type="button">Mi cuenta</button>
          </nav>
        </div>
      </div>

      <ContactoInfo />
    </div>
  );
}

export default Inicio;
// ...existing code...