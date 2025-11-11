// ...existing code...
import React from 'react';
import '../css/Info.css';

const Info = () => {
  return (
    <section className="info__hero" aria-labelledby="info-title">
      <div className="info__box" role="region" aria-labelledby="info-title">
        <h1 id="info-title" className="info__title"> Libro de temas  </h1>

        <p className="info__text">
         Este sistema fue creado para hacer tu vida más fácil. Vas a poder olvidarte del papel y la burocracia para concentrarte en lo importante: la enseñanza.

Con esta plataforma, la organización de tus clases y el trabajo en equipo con la escuela serán mucho más rápidos y sencillos.</p>

        <div className="info__actions" role="group" aria-label="Acciones principales">
          <a className="btn btn--primary" href="/AppRouter" title="Iniciar Sesion">Iniciar Sesion</a>
          
        </div>
      </div>
    </section>
  );
};

export default Info;
// ...existing code...