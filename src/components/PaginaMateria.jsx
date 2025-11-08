import React, { useState } from "react";
import Materias from "./Materias";
import DiasMateria from "./DiasMateria";

const PaginaMateria = () => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  return (
    <div>
      <Materias onMateriaSeleccionada={setMateriaSeleccionada} />
      <hr />
      {materiaSeleccionada && (
        <DiasMateria materiaId={materiaSeleccionada} />
      )}
    </div>
  );
};

export default PaginaMateria;
