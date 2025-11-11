import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dia from './Dia';
import '../css/PaginaLibro.css';
import '../css/Semana.css';
import '../css/Boton.css'

const Semana = () => {
  return (
    <div>
      
      <nav>
        <div class="cajaDias">
        <Link class="botonDia" to="/libro/dia1">L</Link> 
        <Link class="botonDia" to="/libro/dia2">M</Link> 
        <Link class="botonDia" to="/libro/dia3">X</Link> 
        <Link class="botonDia" to="/libro/dia4">J</Link> 
        <Link class="botonDia" to="/libro/dia5">V</Link>
         </div>
      </nav>

    </div>
  );
}

export default Semana;