import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Registro.css';

const Registro = () => {
  return (

    <div className="registro-container">
      <h1 className="registro-title">Registro</h1>
      <div className="registro-form">
        
        <input type="text" placeholder="Gmail" className="registro-input" />
        <input type="text" placeholder="Curso" className="registro-input" />
        <input type="text" placeholder="División" className="registro-input" />
        <input type="text" placeholder="Código de Clase" className="registro-input" />
        <button className="registro-button">Iniciar sesión</button>
      </div>
      <div className="registro-logo">
        <img src="/a.png" alt="E.P.E.T. N° 20 NEUQUÉN" />
      </div>
      <Link to="/otra-pagina" className="registro-link">Ir a otra página</Link>
    </div>

  );
};

export default Registro;
