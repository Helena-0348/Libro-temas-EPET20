import React from "react";

//import Formulario from "./components/Formulario.jsx";
//import logo_epet20 from "./img/logo_epet20.jpg";
// import Formulario from './css/Formulario';
//import logo_epet20 from "./css/logo_epet20.jpg";
//import PaginaLibro from "./components/PaginaLibro";
//import Registro from ".//components/Registro";
/*import { BrowserRouter as Router } from 'react-router-dom';*/
import Registromo from "./components/registromodificacion.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./components/Inicio.jsx";

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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio/>} />
                    <Route path="/registro" element={<Registromo/>} />

                    </Routes>
    
                
                    </BrowserRouter>
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
