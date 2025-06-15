import React from 'react';
import BotonDia from './BotonDia';
import "../css/Boton.css";

const Semana = () => {
  return (
    <div>
      <BotonDia className="botonDia" props="L" />
      <BotonDia className="botonDia" props="M" />
      <BotonDia className="botonDia" props="X" />
      <BotonDia className="botonDia" props="J" />
      <BotonDia className="botonDia" props="V" />

    </div>
  );
};

export default Semana;