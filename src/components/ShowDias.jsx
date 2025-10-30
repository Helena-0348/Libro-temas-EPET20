import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ShowDias() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const coleccionRef = collection(db, "dias");
      const snapshot = await getDocs(coleccionRef);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDatos(docs);
    };

    obtenerDatos();
  }, []);
  return (
    <div>
      <h2>Datos de la colección dias</h2>
      <ul>
        {datos.map(item => (
          <li key={item.id}>
            <strong>Numero de Clase:</strong> {item.nClase} <br />
            <strong>Unidad:</strong> {item.unidad} <br />
            <strong>Tema:</strong> {item.tema} <br />
            <strong>Actividad:</strong> {item.actividad} <br />
            <strong>Asistencia del profesor:</strong> {item.asistencia} <br />
            <strong>Confirmacion:</strong> {item.confirmacion} <br />

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowDias