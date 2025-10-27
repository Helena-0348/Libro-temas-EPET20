import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase.jsx';

const AltaDato = () => {
  const [nombre, setNombre] = useState('');
  const [gmail, setGmail] = useState('');
  const [curso, setCurso] = useState('');
  const [division, setDivision] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "profesores"), {
        nombre: nombre,
        gmail: gmail,
        curso: curso,
        division: division,
        codigo: codigo,
      });
      console.log("Documento escrito con ID: ", docRef.id);

      // Limpiar el formulario
      setNombre('');
      setGmail('');
      setCurso('');
      setDivision('');
      setCodigo('');
    } catch (e) {
      console.error("Error al agregar documento: ", e);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Dato</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del profesor"
          required
        />
        <input
          type="email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          placeholder="Gmail"
          required
        />
        <input
          type="text"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          placeholder="Curso"
          required
        />
        <input
          type="text"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          placeholder="División"
          required
        />
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código"
          required
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AltaDato;
