import React from 'react';
import Encabezado from "./components/Encabezado";
import Materias from './components/Materias';
import Semana from './components/Semana';


const App = () => {
  return (
    <div>
      <Semana />
      <Materias curso="3ro 3ra" materia="Matematica" />
      <Materias curso="3ro 3ra" materia="Fisica" />
      <Materias curso="3ro 3ra" materia="Lengua y lit." />
      <Materias curso="3ro 3ra" materia="Dibujo tec." />
      <Materias curso="3ro 2da" materia="Ingles" />
      <Materias curso="3ro 2da" materia="Quimica" />
      <Materias curso="3ro 2da" materia="Geografia" />


    </div>
  );
};

export default App;


