import React from 'react';
import "../css/Encabezado.css";
import "../../public/cuenta.png"
import "../../public/opciones.png"

function Encabezado() {

  return (
    <div>
      <header className='header'>
        <a>EPET 20</a>
        <p className='cuenta'>cuenta</p>
      </header>

    </div>
  );
}
export default Encabezado;

/* import { useNavigate } from 'react-router-dom';

  const navigate = useNavigate();
  };
        <select onChange={handleChange} defaultValue="">
          <option value="/home">Inicio</option>
          <option value="/login">Login</option>
        </select>

    const handleChange = (e) => {
    const ruta = e.target.value;
    if (ruta) {
      navigate(ruta);
    }
        */
