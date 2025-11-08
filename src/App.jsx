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
import PaginaMateria from "./components/PaginaMateria.jsx";//import {gapi} from './gapi-script'
//import {useEffect} from 'react';
import ListadoDatos from "./components/listadoDatos.jsx";
import './css/App.css'; // añade si no está
import GoogleLogin from "./components/GoogleLogin.jsx";
import DiaLibro from "./components/DiaLibro.jsx";
import ListaMaterias from "./components/ListaMaterias.jsx";
import Cursos from "./components/Cursos.jsx";
import ListaCursos from "./components/ListaCursos.jsx";
//import FormularioNombreApellido.from "./components/formularioNombreApellido";
//import PantallaDestino from "./components/PantallaDestino";
function App() {
  return (
    
     
      <div >
       

        <Routes>
   
        
        
          {/* Ruta de inicio */}
          <Route path="/" element={<Home  />} />

          {/* Otra página de inicio */}
          <Route path="/inicio" element={<Inicio />} />

          {/* Página para agregar datos */}
          <Route path="/agregar" element={<AltaDato />} />

          {/* Página para ver listado de datos */}
          <Route path="/listado" element={<ListadoDatos />} />

          {/* Página combinada: formulario + listado */}
          <Route
            path="/todo"
            element={
              <div>
                <AltaDato />
                <hr />
                <ListadoDatos />
              </div>
            }
          />

          {/* Otras páginas que tenías */}
          <Route path="/Googlelogin" element={<GoogleLogin />} />
          <Route path="/libro" element={<PaginaLibro />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dia" element={<DiaLibro />} />

          <Route path="/materia" element={<PaginaMateria />} />
          <Route path="/lista" element={<ListaMaterias />} />

          <Route path="/cursos" element={<Cursos />} />
          <Route path="/listaC" element={<ListaCursos />} />        
          {/* Ruta comodín: si no existe, muestra Inicio */}
          <Route path="*" element={<Inicio />} />
        </Routes>
      </div>
     
  );
}

export default App;
