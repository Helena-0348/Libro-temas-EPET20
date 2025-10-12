import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const ListadoDatos = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profesores"));
        const listaDeDatos = [];
        querySnapshot.forEach((doc) => {
          // El método .data() te da los datos del documento
          // El .id es el identificador único de cada documento
          listaDeDatos.push({ id: doc.id, ...doc.data() });
        });
        setDatos(listaDeDatos);
      } catch (e) {
        console.error("Error al cargar datos : ", e);
      }
    };
    obtenerDatos();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <div>
      <h2>Listado de Datos</h2>
      <ul>
        {datos.map((dato) => (
          <li key={dato.id}>
            {/* Muestra las propiedades de tu documento. Por ejemplo: */}
            Nombre: {dato.nombre}
            {/* Aquí puedes agregar un botón para eliminar o actualizar */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListadoDatos;