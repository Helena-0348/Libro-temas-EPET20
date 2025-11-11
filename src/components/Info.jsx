import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Info.css';

/**
 * Componente Info
 * Muestra presentación de la plataforma "Libro de Temas"
 * con botón de acceso a autenticación
 */
const Info = () => {
  const navigate = useNavigate();

  const handleInitiarSesion = () => {
    navigate('/Googlelogin');
  };

  return (
    <section className="info__hero" aria-labelledby="info-title">
      <div className="info__box" role="region" aria-labelledby="info-title">
        
        {/* Título principal */}
        <h1 id="info-title" className="info__title">
          📘 Libro de Temas
        </h1>

        {/* Descripción */}
        <p className="info__text">
          Este sistema fue creado para hacer tu vida más fácil. Vas a poder 
          olvidarte del papel y la burocracia para concentrarte en lo importante: 
          la enseñanza.
        </p>

        <p className="info__text">
          Con esta plataforma, la organización de tus clases y el trabajo en 
          equipo con la escuela serán mucho más rápidos y sencillos.
        </p>

        {/* Botones de acción */}
        <div className="info__actions" role="group" aria-label="Acciones principales">
          <button 
            className="btn btn--primary" 
            onClick={handleInitiarSesion}
            type="button"
            aria-label="Iniciar sesión con Google"
          >
            Iniciar Sesión
          </button>
        </div>

      </div>
    </section>
  );
};

export default Info;