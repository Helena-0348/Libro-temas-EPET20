import React from 'react';
import "../css/Boton.css";

const Materias = ({ curso, materia }) => {
  return (
    <button className='materias'>
      {curso}
      <a> </a>
      {materia}
    </button>
  );
};

export default Materias;