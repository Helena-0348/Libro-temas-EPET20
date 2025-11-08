import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const MateriasCurso = ({ curso }) => {
  const [nombre, setNombre] = useState("");
  const [anio, setAnio] = useState("2025");
  const [profesor, setProfesor] = useState("");
  const [materias, setMaterias] = useState([]);

  // Cargar las materias de ese curso en tiempo real
  useEffect(() => {
    if (!curso || !curso.id) return;

    const materiasRef = collection(db, "cursos", curso.id, "materias");

    const unsubscribe = onSnapshot(materiasRef, (snapshot) => {
      const listaMaterias = snapshot.docs.map((doc) => {
        const data = doc.data();
        const creadoStr = data.creado?.toDate
          ? data.creado.toDate().toLocaleString()
          : data.creado;

        return {
          id: doc.id,
          ...data,
          creado: creadoStr,
        };
      });

      setMaterias(listaMaterias);
    });

    return () => unsubscribe();
  }, [curso]);

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

      // Limpiar formulario
      setNombre("");
      setAnio("2025");
      setProfesor("");
    } catch (error) {
      console.error("❌ Error al agregar materia:", error);
    }
  };

  if (!curso || !curso.id) {
    return <p style={{ color: "red" }}>⚠️ No se seleccionó ningún curso.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📘 Agregar materia al curso {curso.anioC}° año — División {curso.division}</h2>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Agregar Materia</button>
      </form>

      <h3>Materias del curso</h3>
      {materias.length > 0 ? (
        <ul>
          {materias.map((m) => (
            <li key={m.id}>
              {m.nombre} — Año: {m.año} — Prof. {m.profesor} — Creado: {m.creado}
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
