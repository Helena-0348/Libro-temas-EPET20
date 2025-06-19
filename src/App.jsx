import React from "react";

import Formulario from "./components/Formulario.jsx";
import logo_epet20 from "./css/logo_epet20.jpg";
// import Formulario from './css/Formulario';

import logo_epet20 from "./recursos/img/logo_epet20.jpg";
import PaginaLibro from "./components/PaginaLibro";
import Registro from ".//components/Registro";
/*import { BrowserRouter as Router } from 'react-router-dom';*/

function App() {
    return ( 
        /*
        <Router>
           <Routes>
                 <Route path="/" element={<Formulario titulo="Formulario Email" />} />

                 pagina a añadir para futura navegacion
                 <Route path="/libro" element={<PaginaLibro />} />
           </Routes>
        </Router>
        */
        <div>
            <Registro/>
            <img src="/logo_epet20" alt="logo epet20"/>
            <h1>Iniciar sesión</h1>
        </div>
       



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
