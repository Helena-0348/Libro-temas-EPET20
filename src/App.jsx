import React from "react";

import Formulario from "./components/Formulario.jsx";
// import Formulario from './css/Formulario';
//import logo_epet20 from "./public/logo_epet20.jpg";
import PaginaLibro from "./components/PaginaLibro";
import Registro from ".//components/Registro";
import PaginaInicio from "./components/PaginaInicio";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // REACT ROUTER



//import FormularioNombreApellido from "./components/formularioNombreApellido";
//import PantallaDestino from "./components/PantallaDestino";



function App() {
    return ( 
        <><Router>
            <Routes>
                <Route path="/" element={<Formulario titulo="Formulario Email" />} />

                <Route path="/libro/*" element={<PaginaLibro />} />

                <Route path="/inicio" element={<PaginaInicio />} />

                <Route path="/registro" element={<Registro />} />
            </Routes>
        </Router>
</>

    );
}

export default App;




// import React from 'react'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
