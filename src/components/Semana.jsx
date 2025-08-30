import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dia from './Dia';
import Materias from './Materias';
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
   
      <Routes>
        <Route path="dia1" element={<div className='cajaMaterias'>
          <Materias curso="3ro 3ra" materia="Matematica" />
          <Materias curso="3ro 3ra" materia="Fisica" />
          <Materias curso="6to 2da" materia="Sistemas G. C." />
          <Materias curso="6to 3ra" materia="Tecnología de Redes" />
        </div>} />

        <Route path="dia2" element={<div className='cajaMaterias'>
          <Materias curso="6to 1ra" materia="Filosofía" />
          <Materias curso="1ro 2da" materia="Arte" />
          <Materias curso="2do 1ra" materia="Música" />
          <Materias curso="3ro 2da" materia="Tecnología" />
          <Materias curso="4to 1ra" materia="Economía" />
        </div>} />

        <Route path="dia3" element={<div className='cajaMaterias'>
          <Materias curso="6to 1ra" materia="Sistemas G. C." />
          <Materias curso="6to 2da" materia="Tecnología de Redes" />
          <Materias curso="5to 1ra" materia="Organización y Arquitectura" />
          <Materias curso="5to 3ra" materia="Tecnología de Redes" />
          <Materias curso="4to 2da" materia="Programación Avanzada" />
        </div>} />

        <Route path="dia4" element={<div className='cajaMaterias'>
          <Materias curso="3ro 3ra" materia="Lengua y lit." />
          <Materias curso="3ro 3ra" materia="Dibujo tec." />
          <Materias curso="3ro 2da" materia="Ingles" />
          <Materias curso="3ro 2da" materia="Quimica" />
          <Materias curso="3ro 2da" materia="Geografia" />
        </div>} />

        <Route path="dia5" element={<div className='cajaMaterias'>
          <Materias curso="6to 3ra" materia="Sistemas G. C." />
          <Materias curso="5to 2da" materia="Organización y Arquitectura" />
          <Materias curso="6to 1ra" materia="Tecnología de Redes" />
          <Materias curso="5to 1ra" materia="Tecnología de Redes" />
          <Materias curso="4to 1ra" materia="Programación Avanzada" />
        </div>} />

      </Routes>
    </div>
  );
}

export default Semana;