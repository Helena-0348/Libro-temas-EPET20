import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.jsx';

const DiaLibro = () => {
  // Estados para cada campo del formulario
  const [fecha, setFecha] = useState('');
  const [nClase, setnClase] = useState('');
  const [unidad, setUnidad] = useState('');
  const [tema, setTema] = useState('');
  const [codigo, setCodigo] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      // Guardamos los datos en la colección "profesores"
      const docRef = await addDoc(collection(db, "dias"), {
        fecha,
        nClase,
        unidad,
        tema,
        codigo,
      });

      console.log("dia agregado con ID:", docRef.id);

      // Limpiamos el formulario
      setFecha('');
      setnClase('');
      setUnidad('');
      setTema('');
      setCodigo('');

      alert("Dia guardado correctamente");

    } catch (error) {
      console.error("Error al agregar dia:", error);
    }
  };

  return (
    <div>
      <h2>Cargar dia</h2>ñ
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          placeholder="Fecha"
          required
        />
        <input
          type="tetx"
          value={nClase}
          onChange={(e) => setnClase(e.target.value)}
          placeholder="nClase"
          required
        />
        <input
          type="text"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
          placeholder="unidad"
          required
        />
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="tema"
          required
        />
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código"
          required
        />
        <button type="submit">Guardar dia</button>
      </form>
    </div>
  );
};

export default DiaLibro;
