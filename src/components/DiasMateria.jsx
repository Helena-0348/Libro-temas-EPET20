import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const DiasMateria = ({ materia }) => {
  const [dias, setDias] = useState([]);
  const [nuevoDia, setNuevoDia] = useState("");

  // cargar días de la materia seleccionada
  useEffect(() => {
    const obtenerDias = async () => {
      if (!materia?.id) return;
      const diasRef = collection(db, "materias", materia.id, "dias");
      const snapshot = await getDocs(diasRef);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDias(lista);
    };

    obtenerDias();
  }, [materia]);

  // agregar un nuevo día
  const agregarDia = async () => {
    if (!nuevoDia.trim()) return;
    const diasRef = collection(db, "materias", materia.id, "dias");
    await addDoc(diasRef, { dia: nuevoDia, fecha: serverTimestamp() });
    setNuevoDia("");
    // recargar lista
    const snapshot = await getDocs(diasRef);
    setDias(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
      <h3>📅 Días de {materia.nombre}</h3>
      <ul>
        {dias.map((d) => (
          <li key={d.id}>
            {d.dia} —{" "}
            {d.fecha?.seconds
              ? new Date(d.fecha.seconds * 1000).toLocaleDateString()
              : "Sin fecha"}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nuevo día..."
        value={nuevoDia}
        onChange={(e) => setNuevoDia(e.target.value)}
      />
      <button onClick={agregarDia}>Agregar Día</button>
    </div>
  );
};

export default DiasMateria;
