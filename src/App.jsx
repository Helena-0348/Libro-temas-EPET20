<<<<<<< HEAD
import React from "react";
import Formulario from "./componentes/ingresoEmail";
import logo_epet20 from "./recursos/img/logo_epet20.jpg";
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
=======
import React from 'react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> a4c7e22a90f3556c4215ba63a922c8aecff8e2fe
