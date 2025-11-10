import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import DiaLibro from "./DiaLibro";

const ListarMateriasCurso = ({ cursoId }) => {
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  const [editNombre, setEditNombre] = useState("");
  const [editProfesor, setEditProfesor] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Cargar materias de la subcolección del curso seleccionado
  useEffect(() => {
    if (!cursoId) return;

    const obtenerMaterias = async () => {
      const snapshot = await getDocs(collection(db, "cursos", cursoId, "materias"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMaterias(lista);
    };
    obtenerMaterias();
  }, [cursoId]);

  // Inicializar campos de edición al seleccionar materia
  useEffect(() => {
    if (materiaSeleccionada) {
      setEditNombre(materiaSeleccionada.nombre);
      setEditProfesor(materiaSeleccionada.profesor);
      setEditMode(false);
    }
  }, [materiaSeleccionada]);

  const handleActualizarMateria = async (e) => {
    e.preventDefault();
    if (!materiaSeleccionada || !cursoId) return;

    try {
      const materiaRef = doc(db, "cursos", cursoId, "materias", materiaSeleccionada.id);
      await updateDoc(materiaRef, {
        nombre: editNombre,
        profesor: editProfesor,
      });

      // Actualizar estado local
      setMaterias((prev) =>
        prev.map((m) =>
          m.id === materiaSeleccionada.id
            ? { ...m, nombre: editNombre, profesor: editProfesor }
            : m
        )
      );

      alert("Materia actualizada correctamente ✅");
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar materia:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Materias del curso</h2>
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
              {m.nombre} — Prof. {m.profesor}
            </button>
          </li>
        ))}
      </ul>

      {materiaSeleccionada && (
        <div style={{ marginTop: "20px" }}>
          <h3>✏️ Editar Materia</h3>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{ marginBottom: "10px" }}
          >
            {editMode ? "Cancelar edición" : "Modificar datos"}
          </button>

          {editMode && (
            <form onSubmit={handleActualizarMateria} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "5px" }}>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  placeholder="Nombre de la materia"
                  required
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <input
                  type="text"
                  value={editProfesor}
                  onChange={(e) => setEditProfesor(e.target.value)}
                  placeholder="Profesor"
                  required
                />
              </div>
              <button type="submit">Guardar cambios</button>
            </form>
          )}

          {/* Mostrar componente DiaLibro */}
          <DiaLibro materia={materiaSeleccionada} />
        </div>
      )}
    </div>
  );
};

export default ListarMateriasCurso;
