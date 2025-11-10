import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import MateriaCurso from "./MateriasCurso"; // componente que maneja materias por curso
import Cursos from "./Cursos";

const ListaCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const [editAnioC, setEditAnioC] = useState(1);
  const [editDivision, setEditDivision] = useState(1);
  const [editTurno, setEditTurno] = useState("Mañana");
  const [editPreceptor, setEditPreceptor] = useState("");
  const [editMode, setEditMode] = useState(false);

  // 🔹 Cargar todos los cursos al montar el componente
  useEffect(() => {
    const obtenerCursos = async () => {
      const snapshot = await getDocs(collection(db, "cursos"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCursos(lista);
    };
    obtenerCursos();
  }, []);

  // 🔹 Inicializar campos de edición cuando se selecciona un curso
  useEffect(() => {
    if (cursoSeleccionado) {
      setEditAnioC(cursoSeleccionado.anioC);
      setEditDivision(cursoSeleccionado.division);
      setEditTurno(cursoSeleccionado.turno);
      setEditPreceptor(cursoSeleccionado.preceptor);
      setEditMode(false);
    }
  }, [cursoSeleccionado]);

  // 🔹 Actualizar datos del curso
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

      // Actualizar localmente
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

  // 🔹 Manejar selección del curso desde el select
  const handleSeleccionCurso = (e) => {
    const idSeleccionado = e.target.value;
    const curso = cursos.find((c) => c.id === idSeleccionado);
    setCursoSeleccionado(curso || null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Lista de Cursos</h2>

      {/* 🔸 Menú desplegable con los cursos */}
      <select
        onChange={handleSeleccionCurso}
        value={cursoSeleccionado?.id || ""}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <option value="">Seleccionar un curso...</option>
        {cursos.map((c) => (
          <option key={c.id} value={c.id}>
            {c.anioC}° año — División {c.division} — {c.turno} — Preceptor: {c.preceptor}
          </option>
        ))}
      </select>

      {/* 🔹 Mostrar detalles solo si hay curso seleccionado */}
      {cursoSeleccionado && (
        <div style={{ marginTop: "20px" }}>
          <h3>✏️ Editar Curso</h3>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              marginBottom: "10px",
              padding: "6px 12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
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

          {/* 🔹 Mostrar materias del curso seleccionado */}
          <MateriaCurso curso={cursoSeleccionado} />

          {/* (Opcional) componente adicional */}
          <Cursos />
        </div>
      )}
    </div>
  );
};

export default ListaCursos;
