import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import DiasMateria from "./DiasMateria"; // componente que muestra los días

const ListarMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  // cargar todas las materias
  useEffect(() => {
    const obtenerMaterias = async () => {
      const snapshot = await getDocs(collection(db, "materias"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMaterias(lista);
    };
    obtenerMaterias();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Lista de Materias</h2>
      <ul>
        {materias.map((m) => (
          <li key={m.id}>
            <button
              style={{
                border: "1px solid black",
                background: materiaSeleccionada?.id === m.id ? "#d0f0d0" : "white",
                cursor: "pointer",
                padding: "5px 10px",
                marginBottom: "5px",
              }}
              onClick={() => setMateriaSeleccionada(m)}
            >
              {m.nombre} — {m.anio}° año — Prof. {m.profesor}
            </button>
          </li>
        ))}
      </ul>

      {materiaSeleccionada && (
        <DiasMateria materia={materiaSeleccionada} />
      )}
    </div>
  );
};

export default ListarMaterias;
