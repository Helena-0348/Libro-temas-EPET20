import React from "react";

import Home from "./components/Home";
import Formulario from "./components/Formulario.jsx";
// import Formulario from './css/Formulario';
//import logo_epet20 from "./public/logo_epet20.jpg";
import PaginaLibro from "./components/PaginaLibro";
import Registro from ".//components/Registro";
import PaginaInicio from "./components/PaginaInicio";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // REACT ROUTER
import Inicio from "./components/Inicio.jsx";
import AltaDato from "./components/AltaDato.jsx";

import {gapi} from './gapi-script'
import {GoogleLogin} from 'react';
import {useEffect} from 'react';



//import FormularioNombreApellido from "./components/formularioNombreApellido";
//import PantallaDestino from "./components/PantallaDestino";



function App() {
    const clientID = "708906424877-o70nuhn5qnk6gcjm9sc3rcvbkdh3o4b8.apps.googleusercontent.com"
    useEffect()=> {
        const start = () => {
            gapi.auth2.init({

            clientID: clientID;
            })
        }
        gapi.load("client:auth2", start)
    }, [])
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
