import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import DiaLibro from "./DiaLibro";
import "../css/ListaCursos.css";

const MateriasCurso = ({ curso }) => {
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoDocente, setNuevoDocente] = useState("");
  const [editandoDocente, setEditandoDocente] = useState(false);
  const [nombre, setNombre] = useState("");
  const [anio, setAnio] = useState("2025");
  const [profesor, setProfesor] = useState("");

  // 🔹 Cargar materias del curso
  useEffect(() => {
    if (!curso?.id) return;
    const materiasRef = collection(db, "cursos", curso.id, "materias");
    const unsubscribe = onSnapshot(materiasRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMaterias(lista);
    });
    return () => unsubscribe();
  }, [curso]);

  // 🔹 Agregar materia
  const handleAgregarMateria = async (e) => {
    e.preventDefault();
    const materiasRef = collection(db, "cursos", curso.id, "materias");
    await addDoc(materiasRef, {
      nombre,
      año: parseInt(anio),
      profesor,
      creado: new Date(),
    });
    setNombre("");
    setAnio("2025");
    setProfesor("");
    setMostrarFormulario(false);
  };

  // 🔹 Cambiar docente
  const handleActualizarDocente = async (e) => {
    e.preventDefault();
    if (!materiaSeleccionada) return;
    const materiaRef = doc(db, "cursos", curso.id, "materias", materiaSeleccionada.id);
    await updateDoc(materiaRef, { profesor: nuevoDocente });
    setMateriaSeleccionada({ ...materiaSeleccionada, profesor: nuevoDocente });
    setEditandoDocente(false);
  };

  return (
    <div className="materias-container">
      {/* IZQUIERDA */}
      <div className="columna-izquierda">
        <h3>Materias</h3>
        <div className="lista-materias">
          {materias.map((m) => (
            <button
              key={m.id}
              className={`boton-materia ${
                materiaSeleccionada?.id === m.id ? "seleccionada" : ""
              }`}
              onClick={() => setMateriaSeleccionada(m)}
            >
              {m.nombre}
            </button>
          ))}
          <button
            className="boton-agregar-materia"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Cancelar" : "Agregar materia"}
          </button>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleAgregarMateria} className="formulario-materia">
            <input
              type="text"
              placeholder="Nombre de la materia"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Año"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              required
            />
            <button type="submit">Guardar</button>
          </form>
        )}
      </div>

      {/* DERECHA */}
      <div className="columna-derecha">
        {materiaSeleccionada ? (
          <div className="detalle-materia">
            <div className="header-materia">
              <h4>{materiaSeleccionada.nombre}</h4>
              {!editandoDocente ? (
                <button onClick={() => setEditandoDocente(true)}>Cambiar docente</button>
              ) : (
                <form onSubmit={handleActualizarDocente} className="form-docente">
                  <input
                    type="text"
                    placeholder="Nuevo docente"
                    value={nuevoDocente}
                    onChange={(e) => setNuevoDocente(e.target.value)}
                    required
                  />
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditandoDocente(false)}>
                    Cancelar
                  </button>
                </form>
              )}
            </div>

            <p><strong>Docente:</strong> {materiaSeleccionada.profesor}</p>
            <p><strong>Año:</strong> {materiaSeleccionada.año}</p>

            <DiaLibro materia={materiaSeleccionada} />
          </div>
        ) : (
          <p>Selecciona una materia para ver los detalles.</p>
        )}
      </div>
    </div>
  );
};

export default MateriasCurso;
