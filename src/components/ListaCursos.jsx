import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Materias from "./MateriasCurso"; // componente que maneja materias por curso

const ListaCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const [editAnioC, setEditAnioC] = useState(1);
  const [editDivision, setEditDivision] = useState(1);
  const [editTurno, setEditTurno] = useState("Mañana");
  const [editPreceptor, setEditPreceptor] = useState("");
  const [editMode, setEditMode] = useState(false);

  // cargar todos los cursos
  useEffect(() => {
    const obtenerCursos = async () => {
      const snapshot = await getDocs(collection(db, "cursos"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCursos(lista);
    };
    obtenerCursos();
  }, []);

  // inicializar campos de edición al seleccionar curso
  useEffect(() => {
    if (cursoSeleccionado) {
      setEditAnioC(cursoSeleccionado.anioC);
      setEditDivision(cursoSeleccionado.division);
      setEditTurno(cursoSeleccionado.turno);
      setEditPreceptor(cursoSeleccionado.preceptor);
      setEditMode(false); // por defecto no estamos editando
    }
  }, [cursoSeleccionado]);

  const handleActualizarCurso = async (e) => {
    e.preventDefault();
    if (!cursoSeleccionado) return;

    try {
      const cursoRef = doc(db, "cursos", cursoSeleccionado.id);
      await updateDoc(cursoRef, {
        anioC: parseInt(editAnioC),
        division: parseInt(editDivision),
        turno: editTurno,
        preceptor: editPreceptor,
      });

      // Actualizar estado local
      setCursos((prev) =>
        prev.map((c) =>
          c.id === cursoSeleccionado.id
            ? { ...c, anioC: editAnioC, division: editDivision, turno: editTurno, preceptor: editPreceptor }
            : c
        )
      );

      alert("Curso actualizado correctamente ✅");
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar curso:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Lista de Cursos</h2>
      <ul>
        {cursos.map((c) => (
          <li key={c.id}>
            <button
              style={{
                border: "1px solid black",
                background: cursoSeleccionado?.id === c.id ? "#d0f0d0" : "white",
                cursor: "pointer",
                padding: "5px 10px",
                marginBottom: "5px",
              }}
              onClick={() => setCursoSeleccionado(c)}
            >
              {c.anioC}° año — Div {c.division} — {c.turno} — Preceptor: {c.preceptor}
            </button>
          </li>
        ))}
      </ul>

      {cursoSeleccionado && (
        <div style={{ marginTop: "20px" }}>
          <h3>✏️ Editar Curso</h3>
          <button onClick={() => setEditMode(!editMode)} style={{ marginBottom: "10px" }}>
            {editMode ? "Cancelar edición" : "Modificar datos"}
          </button>

          {editMode && (
            <form onSubmit={handleActualizarCurso} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "5px" }}>
                <label>Año del curso: </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={editAnioC}
                  onChange={(e) => setEditAnioC(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <label>División: </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={editDivision}
                  onChange={(e) => setEditDivision(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <label>Turno: </label>
                <select value={editTurno} onChange={(e) => setEditTurno(e.target.value)}>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Vespertino">Vespertino</option>
                </select>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <label>Preceptor: </label>
                <input
                  type="text"
                  value={editPreceptor}
                  onChange={(e) => setEditPreceptor(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Guardar cambios</button>
            </form>
          )}

          {/* Mostrar componente de Materias para este curso */}
          <Materias curso={cursoSeleccionado} />
        </div>
      )}
    </div>
  );
};

export default ListaCursos;


