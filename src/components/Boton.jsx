import React from 'react';
import "../css/Boton.css";

const Boton = ({ props }) => {
  return (
    <button className='boton'>
      {props}
    </button>
  );
};

export default Boton;
