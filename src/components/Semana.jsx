import React from 'react';
import Boton from './Boton';

const Semana = () => {
  return (
    <div>
      <Boton className="botonDia" props="L" />
      <Boton className="botonDia" props="M" />
      <Boton className="botonDia" props="X" />
      <Boton className="botonDia" props="J" />
      <Boton className="botonDia" props="V" />

    </div>
  );
};

export default Semana;