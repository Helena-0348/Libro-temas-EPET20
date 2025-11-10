import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Cursos = () => {
  const [anioC, setAnioC] = useState("");
  const [division, setDivision] = useState("");
  const [turno, setTurno] = useState("Mañana");
  const [preceptor, setPreceptor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cursos"), {
        anioC: parseInt(anioC),
        division: parseInt(division),
        turno,
        preceptor,
      });
      alert("Curso agregado correctamente ✅");
      setAnioC("");
      setDivision("");
      setPreceptor("");
      setTurno("Mañana");
    } catch (error) {
      console.error("Error al agregar curso:", error);
    }
  };

  return (
    <div>
        <div className="contenedor-edicion">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Año: </label>
              <input
                type="number"
                min="1"
                max="6"
                value={anioC}
                onChange={(e) => setAnioC(e.target.value)}
                required
              />
            </div>

            <div>
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

            <div>
              <label>Turno: </label>
              <select
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
              >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>

            <div>
              <label>Preceptor: </label>
              <input
                type="text"
                value={preceptor}
                onChange={(e) => setPreceptor(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="boton-guardar">
              Guardar curso
            </button>
          </form>
        </div>
    </div>
  );
};

export default Cursos;
