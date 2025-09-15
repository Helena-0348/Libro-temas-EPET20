import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Formulario from "./Formulario.jsx";
//import logo_epet20 from "public/logo_epet20.jpg";
import PaginaLibro from "./PaginaLibro.jsx";
import Registro from "./Registro.jsx";





const AppRouter = ({ user }) => {
  const { rol } = user || {};
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      // Si el usuario intenta volver y está logueado, forzamos a quedarse en la ruta actual
      if (user && ['admin', 'preceptor', 'profesor'].includes(user.rol)) {
        navigate(window.location.pathname, { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user, navigate]);

  // 🔍 Fallback en caso de que el usuario no tenga rol válido
  if (!rol || !['admin', 'preceptor', 'profesor'].includes(rol)) {
    return (
      <Box p={4}>
        <Typography variant="h5" color="error">
          No tenés permisos para acceder. Por favor cerrá sesión e intentá nuevamente.
        </Typography>
      </Box>
    );
  }

  return (
    <Routes>
      {rol === 'admin' && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/PaginaLibro" element={<PaginaLibro/>} />
          <Route path="/Registro" element={<Registro />} />
          
        </>
      )}

      {rol === 'preceptor' && (
        <>
           <Route path="/Formulario" element={<Formulario />} />
          <Route path="/PaginaLibro" element={<PaginaLibro/>} />
          <Route path="/Registro" element={<Registro />} />
        </>
      )}

      {rol === 'profesor' && (
        <>
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/PaginaLibro" element={<PaginaLibro/>} />
          <Route path="/Registro" element={<Registro />} />
        </>
      )}

      {/* Fallback a inicio para cualquier ruta no válida */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;