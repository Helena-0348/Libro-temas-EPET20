import React, { useState } from "react";
import Materias from "./Materias";
import DiasMateria from "./DiasMateria";

const PaginaMateria = () => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("ID_DE_MATERIA");

  return (
    <div>
      <Materias />
      <hr />
      {/* Si ya tenés el ID de la materia (por ejemplo tras crearla), podés mostrar los días */}
      {materiaSeleccionada && <DiasMateria materiaId={materiaSeleccionada} />}
    </div>
  );
};

export default PaginaMateria;
