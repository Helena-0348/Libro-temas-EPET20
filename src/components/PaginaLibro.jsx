//componente para la pagina del formulario
import Encabezado from "../components/Encabezado.jsx";
import Semana from '../components/Semana.jsx';
import Tabla from '../components/Tabla.jsx';
import Boton from '../components/Boton.jsx';
import '../css/PaginaLibro.css';
import Inicio from '../components/Inicio.jsx';
import Dia from "./Dia.jsx";

const PaginaLibro = () => {
  return (
    <div>
        <Encabezado />
      <div className='cajaElementos' >
      <div className='cajaOpcion'>
        
        <Semana />

      <Boton props="Poec"  />
      <Boton props="Editar" />
      </div>

      <Tabla className='Tabla'/>

    </div>  
    </div>
  );
};

export default PaginaLibro;