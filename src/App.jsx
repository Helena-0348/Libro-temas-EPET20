import React from "react";
import Formulario from "./componentes/ingresoEmail";
import logo_epet20 from "./recursos/img/logo_epet20.jpg";

function App() {
    return ( 
        <div>
            <img src={logo_epet20} alt="logo epet20"/>
            <h1>Iniciar sesión</h1>
            <Formulario></Formulario>
        </div>
    );
}

export default App;