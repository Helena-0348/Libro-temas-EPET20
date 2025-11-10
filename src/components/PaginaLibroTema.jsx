import React from "react";
import ListarCursos from "../components/ListarCursos"; // Ajusta la ruta según tu proyecto
import ListarMaterias from "./ListaMaterias";

const PaginaLibroTema = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Gestión de Cursos y Materias</h1>
      <ListarCursos />
      <ListarMaterias />
    </div>
  );
};

export default PaginaLibroTema;