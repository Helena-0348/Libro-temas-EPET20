import { useState } from "react";
import { useMonth } from "../hooks/useMonth";

const DiaMes = () => {
  // Campos del mes
  const [numMes, setNumMes] = useState("");
  const [nombreMes, setNombreMes] = useState("");

  // Campos del día
  const [nClase, setnClase] = useState("");
  const [tema, setTema] = useState("");
  const [actividad, setActividad] = useState("");

  const { addMonth, addDayToMonth } = useMonth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Primero creamos el mes
      const monthId = await addMonth({
        idMonth: Number(numMes),
        nameMonth: nombreMes
      });

      // 2️⃣ Luego agregamos un día dentro de ese mes (subcolección "days")
      await addDayToMonth(monthId, {
        nClase,
        tema,
        actividad
      });

      alert("Mes y día guardados correctamente");

      // Limpiar campos
      setNumMes("");
      setNombreMes("");
      setnClase("");
      setTema("");
      setActividad("");
    } catch (error) {
      console.error("Error al guardar mes y día:", error);
    }
  };

  return (
    <div>
      <h2>Cargar Mes y Día</h2>
      <form onSubmit={handleSubmit}>
        <h3>Datos del mes</h3>
        <label>
          Número de mes:
          <input
            type="number"
            value={numMes}
            onChange={(e) => setNumMes(e.target.value)}
            required
          />
        </label>
        <label>
          Cantidad de días:
          <input
            type="number"
            value={cantD}
            onChange={(e) => setCantD(e.target.value)}
            required
          />
        </label>

        <h3>Datos del día</h3>
        <label>
          N° de clase:
          <input
            type="text"
            value={nClase}
            onChange={(e) => setnClase(e.target.value)}
            required
          />
        </label>
        <label>
          Tema:
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            required
          />
        </label>
        <label>
          Actividad:
          <input
            type="text"
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
            required
          />
        </label>

        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DiaMes;
