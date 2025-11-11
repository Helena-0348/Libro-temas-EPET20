import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.jsx';

const AnioLibro = () => {
  const [numMes, setNumMes] = useState('');
  const [cantD, setCantD] = useState('');
  const [dia, setDia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      const docRef = await addDoc(collection(db, "meses"), {
        numMes:Number(numMes),
        cantD:Number(cantD),
        dia,
      });

      console.log("Profesor agregado con ID:", docRef.id);

      // Limpiamos el formulario
      setNumMes('');
      setCantD('');
      setDia('');

      alert("Profesor agregado correctamente ");

    } catch (error) {
      console.error("Error al agregar profesor:", error);
    }
  };

  return (
    <div>
      <h2>Subir datos del mes</h2>
      <form onSubmit={handleSubmit}>

         <label htmlFor="mes">
            Numero de mes: {numMes}
          </label>
          <input
            id="mes"
            type="range"
            min="1"
            max="12"
            step="1"
            value={numMes}
            onChange={(e) => setNumMes(e.target.value)}
          />

         <label htmlFor="cantD">
            Cantidad de dias: {cantD}
          </label>
          <input
            id="cantD"
            type="range"
            min="1"
            max="31"
            step="1"
            value={cantD}
            onChange={(e) => setCantD(e.target.value)}
          />
        <input
          type="text"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          placeholder="Dia"
          required
        />
        <button type="submit">Agregar Profesor</button>
      </form>
    </div>
  );
};

export default AnioLibro;
