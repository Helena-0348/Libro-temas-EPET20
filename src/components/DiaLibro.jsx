import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";

const DiaLibro = ({ materia }) => {
  const [nClase, setnClase] = useState("");
  const [unidad, setUnidad] = useState("");
  const [tema, setTema] = useState("");
  const [actividad, setActividad] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [confirmacion, setConfirmacion] = useState(false);
  const [fecha, setFecha] = useState(""); 
  const [dias, setDias] = useState([]);

  // Cargar los días de esa materia
  useEffect(() => {
    if (!materia || !materia.id) return;

    const diasRef = collection(db, "materias", materia.id, "dias");

    const unsubscribe = onSnapshot(diasRef, (snapshot) => {
      const listaDias = snapshot.docs.map((doc) => {
        const data = doc.data();

        // ✅ Convertir fecha y fechaCreacion a string si son Timestamps
        const fechaStr = data.fecha?.toDate
          ? data.fecha.toDate().toLocaleDateString("es-AR", { day: '2-digit', month: '2-digit' })
          : data.fecha;

        const fechaCreacionStr = data.fechaCreacion?.toDate
          ? data.fechaCreacion.toDate().toLocaleString()
          : data.fechaCreacion;

        return {
          id: doc.id,
          ...data,
          fecha: fechaStr,
          fechaCreacion: fechaCreacionStr,
        };
      });

      setDias(listaDias);
    });

    return () => unsubscribe();
  }, [materia]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materia || !materia.id) return;

    try {
      const diasRef = collection(db, "materias", materia.id, "dias");

      await addDoc(diasRef, {
        nClase,
        unidad,
        tema,
        actividad,
        asistencia,
        confirmacion,
        fecha, 
        fechaCreacion: new Date(), // Timestamp de Firebase
      });

      // Limpiar formulario
      setnClase("");
      setUnidad("");
      setTema("");
      setActividad("");
      setAsistencia("");
      setConfirmacion(false);
      setFecha("");
    } catch (error) {
      console.error("❌ Error al agregar día:", error);
    }
  };

  if (!materia || !materia.id) {
    return <p style={{ color: "red" }}>⚠️ No se seleccionó ninguna materia.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📘 Cargar día para {materia.nombre}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
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
          placeholder="DD/MM"
          pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])$"
          title="Formato válido: DD/MM (Ejemplo: 07/05)"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Tema de la unidad"
          required
        />

        <input
          type="text"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          placeholder="Actividad del día"
          required
        />

        <p>¿Asistió el profesor?</p>
        <label>
          <input
            type="radio"
            name="asistencia"
            value="sí"
            checked={asistencia === "sí"}
            onChange={(e) => setAsistencia(e.target.value)}
            required
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
            required
          />
          No
        </label>

        <br />

        <label style={{ display: "block", marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={confirmacion}
            onChange={(e) => setConfirmacion(e.target.checked)}
          />
          Confirmación del Preceptor
          
        </label>

        <br />
        <button type="submit">Guardar día</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>📅 Días registrados</h3>
      {dias.length > 0 ? (
        <ul>
          {dias.map((d) => (
            <li key={d.id}>
              📆 <strong>{d.fecha}</strong> — Clase {d.nClase} — Unidad {d.unidad} — Tema: {d.tema} — {d.asistencia === "sí" ? "✅ Asistió" : "❌ No asistió"} {d.confirmacion && "📜 (Confirmado)"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay días cargados aún.</p>
      )}
    </div>
  );
};

export default DiaLibro;



// import { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase.jsx';

// const DiaLibro = () => {
//   // Estados para cada campo del formulario
//   const [nClase, setnClase] = useState('');
//   const [unidad, setUnidad] = useState('');
//   const [tema, setTema] = useState('');
//   const [actividad, setActividad] = useState('');
//   const [asistencia, setAsistencia] = useState('');
//   const [confirmacion, setConfirmacion] = useState(false); 

//   // Función que se ejecuta al enviar el formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Guardamos los datos en la colección "dias"
//       const docRef = await addDoc(collection(db, "dias"), {
//         nClase,
//         unidad,
//         tema,//poner condiciones ,no caracteres esperciales, numeros si
//         actividad,
//         asistencia,
//         confirmacion,
//       });

//       console.log("Día agregado con ID:", docRef.id);

//       // Limpiamos el formulario
//       setnClase('');
//       setUnidad('');
//       setTema('');
//       setActividad('');
//       setAsistencia('');
//       setConfirmacion(false);

//       alert("Día guardado correctamente");
//     } catch (error) {
//       console.error("Error al agregar día:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Cargar día</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text" 
//           value={nClase}
//           onChange={(e) => setnClase(e.target.value)}
//           placeholder="N° de clase"
//           required
//         />
//         <input
//           type="number"
//           value={unidad}
//           onChange={(e) => setUnidad(e.target.value)}
//           placeholder="Unidad"
//           required
//         />
//         <input
//           type="text"
//           value={tema}
//           onChange={(e) => setTema(e.target.value)}
//           placeholder="Tema"
//           required
//         />
//         <input
//           type="text"
//           value={actividad}
//           onChange={(e) => setActividad(e.target.value)}
//           placeholder="Actividad del día"
//           required
//         />

//         <p>¿Asistio el profesor?</p>
//         <label>
//           <input
//             type="radio"
//             name="asistencia"
//             value="sí"
//             checked={asistencia === "sí"}
//             onChange={(e) => setAsistencia(e.target.value)}
//           />
//           Sí
//         </label>

//         <label style={{ marginLeft: "1rem" }}>
//           <input
//             type="radio"
//             name="asistencia"
//             value="no"
//             checked={asistencia === "no"}
//             onChange={(e) => setAsistencia(e.target.value)}
//           />
//           No
          
//         </label>
//           <label>
//             <input
//               type="checkbox"
//               checked={confirmacion}
//               onChange={(e) => setConfirmacion(e.target.checked)}
//             />
//             Confirmacion del Preceptor
//           </label>

//         <br /><br />
//         <button type="submit">Guardar día</button>
//       </form>
//     </div>
//   );
// };

// export default DiaLibro;
