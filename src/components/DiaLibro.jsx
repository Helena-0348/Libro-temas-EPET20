import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [puedeConfirmar, setPuedeConfirmar] = useState(false); // ⬅ NUEVO

  // 🔹 Verificar rol del usuario logueado
  useEffect(() => {
    const obtenerRol = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().rol === "preceptor") {
        setPuedeConfirmar(true);
      }
    };

    obtenerRol();
  }, []);

  // 🔹 Cargar los días de la materia
  useEffect(() => {
    if (!materia || !materia.id) return;

    const diasRef = collection(db, "materias", materia.id, "dias");

    const unsubscribe = onSnapshot(diasRef, (snapshot) => {
      const listaDias = snapshot.docs.map((doc) => {
        const data = doc.data();

        const fechaStr = data.fecha?.toDate
          ? data.fecha.toDate().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" })
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

  // 🔹 Guardar un nuevo día
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
        fechaCreacion: new Date(),
      });

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

  // 🔹 Actualizar confirmación del preceptor
  const actualizarConfirmacion = async (diaId, valor) => {
    try {
      const ref = doc(db, "materias", materia.id, "dias", diaId);
      await updateDoc(ref, { confirmacion: valor });
    } catch (error) {
      console.error("❌ Error al actualizar confirmación:", error);
    }
  };

  if (!materia || !materia.id) {
    return <p style={{ color: "red" }}>⚠️ No se seleccionó ninguna materia.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{
          margin: "10px 0",
          padding: "8px 12px",
          cursor: "pointer",
          background: "#4ea1ac",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {mostrarFormulario ? "Cancelar" : "Agregar Día"}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
          <h2>Cargar día para {materia.nombre}</h2>

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
            title="Formato válido: DD/MM"
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

          <br />
          <button type="submit">Guardar día</button>
        </form>
      )}

      <h3 style={{ marginTop: "30px" }}>Clases registradas</h3>

      {dias.length > 0 ? (
        <ul>
          {dias.map((d) => (
            <li key={d.id} style={{ marginBottom: "10px" }}>
              <strong>{d.fecha}</strong> — Clase {d.nClase} — Unidad {d.unidad} — Tema: {d.tema} —{" "}
              {d.asistencia === "sí" ? "✅ Asistió" : "❌ No asistió"}

              {/* Checkbox nuevo dentro del listado */}
              <label style={{ marginLeft: "1rem" }}>
                <input
                  type="checkbox"
                  checked={d.confirmacion}
                  disabled={!puedeConfirmar} // Solo preceptor modifica
                  onChange={(e) => actualizarConfirmacion(d.id, e.target.checked)}
                />
                Confirmación del Preceptor
              </label>
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
