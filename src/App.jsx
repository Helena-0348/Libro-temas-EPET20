import React from "react";
import Formulario from "./componentes/ingresoEmail";
import logo_epet20 from "./recursos/img/logo_epet20.jpg";
import Encabezado from "./components/Encabezado";
import Materias from './components/Materias';
import Semana from './components/Semana';
import Tabla from './components/Tabla';
import Boton from './components/Boton';

/*import { BrowserRouter as Router } from 'react-router-dom';*/

function App() {
    return ( 
        /*
        <Router>
           <Routes>
                 <Route path="/" element={<Formulario titulo="Formulario Email" />} />
                 <Route path="/resultado" element={<PantallaDestino />} />
           </Routes>
        </Router>
        */
        <div>
            <img src={logo_epet20} alt="logo epet20"/>
            <h1>Iniciar sesión</h1>
            <Formulario></Formulario>
        </div>



    );
}

export default App;