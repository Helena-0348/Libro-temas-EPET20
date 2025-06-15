import React from 'react';
import BotonDia from './BotonDia';
import "../css/Boton.css";
import "../css/Semana.css";

const Semana = () => {
  return (
    <div className='cajaDias'>
      <BotonDia props="L" />
      <BotonDia props="M" />
      <BotonDia props="X" />
      <BotonDia props="J" />
      <BotonDia props="V" />

    </div>
  );
};

export default Semana;