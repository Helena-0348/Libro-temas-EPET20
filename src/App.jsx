// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación de tus componentes
import Home from "./components/Home";
import Formulario from "./components/Formulario.jsx";
import PaginaLibro from "./components/PaginaLibro";
import Registro from "./components/Registro";
import PaginaInicio from "./components/PaginaInicio";
import Inicio from "./components/Inicio.jsx";
import AltaDato from "./components/AltaDato.jsx";



//import FormularioNombreApellido from "./components/formularioNombreApellido";
//import PantallaDestino from "./components/PantallaDestino";



function App() {
    return ( 
        <><Router>
            <Routes>

                <Route path="/" element={<Home titulo="Formulario Email" />} />
                <Route path="/" element={<Inicio/>} />
                <Route path="/*" element={<AltaDato />} />

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
