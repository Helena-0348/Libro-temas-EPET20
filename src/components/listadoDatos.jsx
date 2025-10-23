// src/components/ListadoDatos.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc,getFirestore, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase.jsx';

const ListadoDatos = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Obtenemos todos los documentos de la colección "profesores"
        const querySnapshot = await getDocs(collection(db, "profesores"));
        const listaDeDatos = [];
        querySnapshot.forEach((doc) => {
          // El método .data() te da los datos del documento
          // El .id es el identificador único de cada documento
          listaDeDatos.push({ id: doc.id, ...doc.data() });
        });
        setDatos(listaDeDatos); // Guardamos los datos en el estado
      } catch (e) {
        console.error("Error al cargar datos : ", e);
      }
    };

    obtenerDatos();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función opcional para eliminar un documento
  const eliminarDato = async (id) => {
    try {
      await deleteDoc(doc(db, "profesores", id));
      // Filtramos el estado para quitar el elemento eliminado sin recargar
      setDatos(datos.filter((d) => d.id !== id));
    } catch (e) {
      console.error("Error al eliminar documento: ", e);
    }
  };

  return (
    <div>
      <h2>Listado de Profesores</h2>

      {/* Mostramos un mensaje si no hay datos */}
      {datos.length === 0 ? (
        <p>No hay profesores registrados.</p>
      ) : (
        <ul>
          {datos.map((dato) => (
            <li key={dato.id} style={{ marginBottom: '15px' }}>
              {/* Mostramos las propiedades de cada documento */}
              Nombre: {dato.nombre} <br />
              Gmail: {dato.gmail} <br />
              Curso: {dato.curso}° {dato.division} <br />
              Código: {dato.codigo} <br />

              {/* Botón para eliminar el registro */}
              <button onClick={() => eliminarDato(dato.id)}>Eliminar</button>

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoDatos;
