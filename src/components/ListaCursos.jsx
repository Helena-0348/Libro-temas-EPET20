import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import MateriasCurso from "./MateriasCurso";
import Cursos from "./Cursos";
import "../css/ListaCursos.css";

const ListaCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editAnioC, setEditAnioC] = useState(1);
  const [editDivision, setEditDivision] = useState(1);
  const [editTurno, setEditTurno] = useState("Mañana");
  const [editPreceptor, setEditPreceptor] = useState("");

  useEffect(() => {
    const obtenerCursos = async () => {
      const snapshot = await getDocs(collection(db, "cursos"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCursos(lista);
    };
    obtenerCursos();
  }, []);

  useEffect(() => {
    if (cursoSeleccionado) {
      setEditAnioC(cursoSeleccionado.anioC);
      setEditDivision(cursoSeleccionado.division);
      setEditTurno(cursoSeleccionado.turno);
      setEditPreceptor(cursoSeleccionado.preceptor);
      setEditMode(false);
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
    <div className="lista-cursos-container">
      {/* 🔹 Encabezado */}
      <div className="encabezado">
        <h2 className="titulo">EPET N°20</h2>

        <div className="acciones-derecha">
          {cursoSeleccionado && (
            <button
              className="boton-modificar"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancelar edición" : "Modificar curso"}
            </button>
          )}

          <select
            className="selector-curso"
            onChange={(e) => {
              const curso = cursos.find((c) => c.id === e.target.value);
              setCursoSeleccionado(curso || null);
            }}
            value={cursoSeleccionado?.id || ""}
          >
            <option value="">Seleccionar curso</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.anioC}° — Div {c.division} — {c.turno}
              </option>
            ))}
          </select>

          <button
            className="boton-agregar"
            onClick={() => setMostrarAgregar(!mostrarAgregar)}
          >
            {mostrarAgregar ? "Cerrar formulario" : "Agregar curso"}
          </button>
        </div>
      </div>

      {/* 🔹 Contenido principal */}
      <div className="contenido-principal">
        {editMode && (
          <div className="contenedor-edicion">
            <form onSubmit={handleActualizarCurso}>
              <div>
                <label>Año del curso:</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={editAnioC}
                  onChange={(e) => setEditAnioC(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>División:</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={editDivision}
                  onChange={(e) => setEditDivision(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Turno:</label>
                <select
                  value={editTurno}
                  onChange={(e) => setEditTurno(e.target.value)}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Vespertino">Vespertino</option>
                </select>
              </div>
              <div>
                <label>Preceptor:</label>
                <input
                  type="text"
                  value={editPreceptor}
                  onChange={(e) => setEditPreceptor(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="boton-guardar">
                Guardar cambios
              </button>
            </form>
          </div>
        )}

        {mostrarAgregar && <Cursos />}

        {/* 🔹 Contenedor dividido en dos columnas */}
        {cursoSeleccionado && (
          <div className="panel-doble">
            <MateriasCurso curso={cursoSeleccionado} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaCursos;
