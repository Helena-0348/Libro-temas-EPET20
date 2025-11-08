import React, { useState } from "react";
import Materias from "./Materias";
import DiaLibro from "./DiaLibro";

const PaginaMateria = () => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  return (
    <div>
      <Materias onMateriaSeleccionada={setMateriaSeleccionada} />
    </div>
  );
};

export default PaginaMateria;
