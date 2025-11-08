import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Cursos = () => {
  const [anioC, setAnioC] = useState(1);
  const [division, setDivision] = useState(1);
  const [turno, setTurno] = useState("Mañana");
  const [preceptor, setPreceptor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear curso principal
      await addDoc(collection(db, "cursos"), {
        anioC: parseInt(anioC),
        division: parseInt(division),
        turno,
        preceptor,
        creado: new Date(),
      });

      // limpiar formulario
      setAnioC(1);
      setDivision(1);
      setTurno("Mañana");
      setPreceptor("");
    } catch (error) {
      console.error("Error al agregar curso:", error);
    }
  };

  return (
    <div>
      <h2>Registrar nuevo curso</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Año del curso: </label>
          <input
            type="number"
            min="1"
            max="6"
            value={anioC}
            onChange={(e) => setAnioC(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>División: </label>
          <input
            type="number"
            min="1"
            max="6"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Turno: </label>
          <select value={turno} onChange={(e) => setTurno(e.target.value)}>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Vespertino">Vespertino</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Preceptor: </label>
          <input
            type="text"
            placeholder="Nombre del preceptor"
            value={preceptor}
            onChange={(e) => setPreceptor(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Guardar curso
        </button>
      </form>
    </div>
  );
};

export default Cursos;
