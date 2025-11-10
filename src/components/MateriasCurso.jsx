import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import DiaLibro from "./DiaLibro";

const MateriasCurso = ({ curso }) => {
  const [nombre, setNombre] = useState("");
  const [anio, setAnio] = useState("2025");
  const [profesor, setProfesor] = useState("");
  const [materias, setMaterias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 🔹 Cargar materias del curso en tiempo real
  useEffect(() => {
    if (!curso || !curso.id) return;

    const materiasRef = collection(db, "cursos", curso.id, "materias");
    const unsubscribe = onSnapshot(materiasRef, (snapshot) => {
      const listaMaterias = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        creado: doc.data().creado?.toDate
          ? doc.data().creado.toDate().toLocaleString()
          : doc.data().creado,
      }));
      setMaterias(listaMaterias);
    });

    return () => unsubscribe();
  }, [curso]);

  // 🔹 Agregar nueva materia
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curso || !curso.id) return;

    try {
      const materiasRef = collection(db, "cursos", curso.id, "materias");
      await addDoc(materiasRef, {
        nombre,
        año: parseInt(anio),
        profesor,
        creado: new Date(),
      });

      // limpiar formulario
      setNombre("");
      setAnio("2025");
      setProfesor("");
      setMostrarFormulario(false);
    } catch (error) {
      console.error("❌ Error al agregar materia:", error);
    }
  };

  if (!curso || !curso.id) {
    return <p style={{ color: "red" }}>⚠️ No se seleccionó ningún curso.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>
        📘 Materias del curso {curso.anioC}° año — División {curso.division}
      </h2>

      {/* 🔸 Botón para mostrar/ocultar el formulario */}
      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{
          margin: "10px 0",
          padding: "8px 12px",
          cursor: "pointer",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {mostrarFormulario ? "Cancelar" : "➕ Agregar Materia"}
      </button>

      {/* 🔸 Formulario condicional */}
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Nombre de la materia"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Año (ej: 4)"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre del profesor"
            value={profesor}
            onChange={(e) => setProfesor(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Guardar
          </button>
        </form>
      )}

      <h3 style={{ marginTop: "20px" }}>📋 Lista de materias</h3>

      {materias.length > 0 ? (
        <ul>
          {materias.map((m) => (
            <li key={m.id} style={{ marginBottom: "15px" }}>
              <strong>{m.nombre}</strong> — Año: {m.año} — Prof. {m.profesor}
              {/* 🔹 Mostrar los días asociados a la materia */}
              <div style={{ marginTop: "8px", marginLeft: "15px" }}>
                <DiaLibro materia={m} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay materias cargadas para este curso.</p>
      )}
    </div>
  );
};

export default MateriasCurso;
