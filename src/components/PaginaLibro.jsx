//componente para la pagina del formulario
import Encabezado from "../components/Encabezado.jsx";
import Materias from '../components/Materias.jsx';
import Semana from '../components/Semana.jsx';
import Tabla from '../components/Tabla.jsx';
import Boton from '../components/Boton.jsx';
import '../css/PaginaLibro.css';
import Inicio from './components/Inicio';

const PaginaLibro = () => {
  return (
    <div>
        <Encabezado />
      <div className='cajaElementos' >
      <div className='cajaOpcion'>
        
        <Semana />
        <div className='cajaMaterias'>

          <Materias curso="3ro 3ra" materia="Matematica" />
          <Materias curso="3ro 3ra" materia="Fisica" />
          <Materias curso="3ro 3ra" materia="Lengua y lit." />
          <Materias curso="3ro 3ra" materia="Dibujo tec." />
          <Materias curso="3ro 2da" materia="Ingles" />
          <Materias curso="3ro 2da" materia="Quimica" />
          <Materias curso="3ro 2da" materia="Geografia" />
        </div>

      <Boton props="Poec"  />
      <Boton props="Editar" />
      </div>

      <Tabla className='Tabla'/>

    </div>  
    </div>
  );
};

export default PaginaLibro;