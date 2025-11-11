// src/App.jsx
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación componentes


import AppRouter from './components/AppRouter';
import Home from "./components/Home";

import './css/App.css'; 

import GoogleLogin from "./components/GoogleLogin.jsx";


function App() {
  return (
    
     
 <div>
      <Routes>
              {/* Ruta de inicio */}
              <Route path="/" element={<Home/>} />
              <Route path="/Googlelogin" element={<GoogleLogin/>} />
              <Route path="/appRouter/*" element={<AppRouter/>} />
      </Routes>
 </div>
     
  );
}

export default App;





