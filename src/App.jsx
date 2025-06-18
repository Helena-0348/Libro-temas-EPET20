import React from "react";
import Formulario from "./components/Formulario.jsx";
import logo_epet20 from "./css/logo_epet20.jpg";
// import Formulario from './css/Formulario';

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
            <Formulario />
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
