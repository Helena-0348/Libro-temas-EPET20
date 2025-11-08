import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Materias = () => {
  const [nombre, setNombre] = useState("");
  const [anio, setAnio] = useState("");
  const [profesor, setProfesor] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "materias"), {
        nombre,
        año: parseInt(anio),
        profesor,
        creado: new Date(),
      });
      setMensaje("✅ Materia agregada con éxito");
      setNombre("");
      setAnio("");
      setProfesor("");
    } catch (error) {
      console.error("Error al agregar materia:", error);
      setMensaje("❌ Error al guardar la materia");
    }
  };

  return (
    <div>
      <h2>Registrar nueva materia</h2>
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
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Materias;
