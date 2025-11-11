// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación componentes
import Home from "./components/Home";

import Formulario from "./components/Formulario.jsx";

import PaginaLibro from "./components/PaginaLibro";

import Registro from "./components/Registro";

import PaginaInicio from "./components/PaginaInicio";

import Inicio from "./components/Inicio.jsx";

import AltaDato from "./components/AltaDato.jsx";

import ListadoDatos from "./components/listadoDatos.jsx";

import './css/App.css'; 

import GoogleLogin from "./components/GoogleLogin.jsx";

import DiaLibro from "./components/DiaLibro.jsx";

import ShowDias from "./components/ShowDias.jsx";

import MesLibro from "./components/MesLibro.jsx";

import AppRouter from "./components/AppRouter.jsx";


function App() {
  return (
    
     
      <div >
       

        <Routes>
   
        
        
          {/* Ruta de inicio */}
          <Route path="/" element={<Home/>} />

          <Route path="/AppRouter" element={<AppRouter/>} />

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
          <Route path="/Googlelogin" element={<GoogleLogin />} />
         
          <Route path="/libro" element={<PaginaLibro />} />
         
          <Route path="/registro" element={<Registro />} />

          <Route path="/dia" element={<DiaLibro />} />

          <Route path="/muestraD" element={<ShowDias />} />

          <Route path="/mes" element={<MesLibro />} />

          <Route path="/intentoformulario" element={<Intentodeformulario />} />

          <Route path="*" element={<Inicio />} />

        </Routes>
      </div>
     
  );
}

export default App;



