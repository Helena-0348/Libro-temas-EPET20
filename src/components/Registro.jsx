import React from 'react';
//import { Link } from 'react-router-dom';
import '../css/Registro.css';

const Registro = () => {
  return (
// Me faltaria un handle submit en donde verifique los campos si estan completos   
    <div className="registro-container">
      <h1 className="registro-title">Registro</h1>
      <div className="registro-form">
        
        <input type="text" placeholder="Gmail" className="registro-input" />
        <input type="text" placeholder="Curso" className="registro-input" />
        <input type="text" placeholder="División" className="registro-input" />
        <input type="text" placeholder="Código de Clase" className="registro-input" />
<<<<<<< HEAD
        <button  className="registro-button"><link to="/otra-pagina"  className="registro-link" /> Iniciar sesión</button>
=======

        <button  className="registro-button"><link to="/otra-pagina"  className="registro-link" />Iniciar sesión</button>
>>>>>>> 532f0d700373cd49e1d80c1169ab5fe5c55a8d11
      </div>
      <div className="registro-logo">
        <img src="/logo_epet20.jpg" alt=" E.P.E.T. N° 20 NEUQUÉN " />
      </div>
      <link  type='submit' to="/otra-pagina"  className="registro-link"Ir a otra página />
    </div>

  );
};

export default Registro;
