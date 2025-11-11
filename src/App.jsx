// src/App.jsx
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación componentes
import AppRouter from './components/AppRouter';
import Home from "./components/Home";

import './css/App.css'; 

import GoogleLogin from "./components/GoogleLogin.jsx";

import Inicio from "./components/Inicio.jsx";
import AltaDato from "./components/AltaDato.jsx";
import ListadoDatos from "./components/listadoDatos.jsx";
import PaginaLibro from "./components/PaginaLibro.jsx";
import Registro from "./components/Registro.jsx";

import DiaLibro from "./components/DiaLibro.jsx";
import ShowDias from "./components/ShowDias.jsx";
//import MesLibro from "./components/MesLibro.jsx";
//import FormularioNombreApellido.from "./components/formularioNombreApellido";
//import PantallaDestino from "./components/PantallaDestino";

function App() {
  return (
    
     
 <div>
      <Routes>
              {/* Ruta de inicio */}
              <Route path="/" element={<Home/>} />

              <Route path="/Googlelogin" element={<GoogleLogin/>} />


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

          {/* Ruta comodín: si no existe, muestra Inicio */}
          <Route path="*" element={<Inicio />} />

        </Routes>
      </div>
     
  );
}

export default App;





