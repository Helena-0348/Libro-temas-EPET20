import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.jsx';

const DiaLibro = () => {
  // Estados para cada campo del formulario
  const [nClase, setnClase] = useState('');
  const [unidad, setUnidad] = useState('');
  const [tema, setTema] = useState('');
  const [actividad, setActividad] = useState('');
  const [asistencia, setAsistencia] = useState('');
  const [confirmacion, setConfirmacion] = useState(false); 

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guardamos los datos en la colección "dias"
      const docRef = await addDoc(collection(db, "dias"), {
        nClase,
        unidad,
        tema,//poner condiciones ,no caracteres esperciales, numeros si
        actividad,
        asistencia,
        confirmacion,
      });

      console.log("Día agregado con ID:", docRef.id);

      // Limpiamos el formulario
      setnClase('');
      setUnidad('');
      setTema('');
      setActividad('');
      setAsistencia('');
      setConfirmacion(false);

      alert("Día guardado correctamente");
    } catch (error) {
      console.error("Error al agregar día:", error);
    }
  };

  return (
    <div>
      <h2>Cargar día</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={nClase}
          onChange={(e) => setnClase(e.target.value)}
          placeholder="N° de clase"
          required
        />
        <input
          type="number"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
          placeholder="Unidad"
          required
        />
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Tema"
          required
        />
        <input
          type="text"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          placeholder="Actividad del día"
          required
        />

        <p>¿Asistio el profesor?</p>
        <label>
          <input
            type="radio"
            name="asistencia"
            value="sí"
            checked={asistencia === "sí"}
            onChange={(e) => setAsistencia(e.target.value)}
          />
          Sí
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="asistencia"
            value="no"
            checked={asistencia === "no"}
            onChange={(e) => setAsistencia(e.target.value)}
          />
          No
          
        </label>
          <label>
            <input
              type="checkbox"
              checked={confirmacion}
              onChange={(e) => setConfirmacion(e.target.checked)}
            />
            Confirmacion del Preceptor
          </label>

        <br /><br />
        <button type="submit">Guardar día</button>
      </form>
    </div>
  );
};

export default DiaLibro;
