// src/components/AltaDato.jsx
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase.jsx';

const AltaDato = () => {
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [gmail, setGmail] = useState('');
  const [curso, setCurso] = useState('');
  const [division, setDivision] = useState('');
  const [codigo, setCodigo] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      // Guardamos los datos en la colección "profesores"
      const docRef = await addDoc(collection(db, "profesores"), {
        nombre,
        gmail,
        curso,
        division,
        codigo,
      });

      console.log("Profesor agregado con ID:", docRef.id);

      // Limpiamos el formulario
      setNombre('');
      setGmail('');
      setCurso('');
      setDivision('');
      setCodigo('');

      alert("Profesor agregado correctamente ✅");

    } catch (error) {
      console.error("Error al agregar profesor:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Profesor</h2>
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
        <button type="submit">Agregar Profesor</button>
      </form>
    </div>
  );
};

export default AltaDato;
