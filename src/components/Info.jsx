// ...existing code...
import React from 'react';
import '../css/Info.css';

const Info = () => {
  return (
    <section className="info__hero" aria-labelledby="info-title">
      <div className="info__box" role="region" aria-labelledby="info-title">
        <h1 id="info-title" className="info__title">Escuela Tecnica Programación </h1>

        <p className="info__text">
          La EPET N°20 es una escuela técnica ubicada en Lanín 2020, Neuquén. Formamos estudiantes con conocimientos prácticos y tecnológicos, fomentando el trabajo en equipo y el vínculo con la comunidad.
        </p>

        <div className="info__actions" role="group" aria-label="Acciones principales">
          <a className="btn btn--primary" href="/Googlelogin" title="Iniciar Sesion">Iniciar Sesion</a>
          
        </div>
      </div>
    </section>
  );
};

export default Info;
// ...existing code...