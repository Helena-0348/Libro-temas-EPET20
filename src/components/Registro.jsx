// ...existing code...
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_epet20 from "../img/logo_epet20.jpg";
import "../css/Registro.css";
import ContactoInfo from './ContactoInfo';

const Registro = () => {
  const navigate = useNavigate(); // para navegar

  const [nombre, setNombre] = useState(""); // nuevo campo
  const [gmail, setGmail] = useState("");
  const [curso, setCurso] = useState("");
  const [division, setDivision] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, gmail, curso, division, codigo });
    navigate("/libro");
  }

  return (
    <form onSubmit={handleSubmit} className="registro-form">
      <div className="registro-container">
        <h1 className="registro-title">Bienvenido(a) Profesor(a) o Preceptor(a) - Inicie Sesión</h1>

        <div className="registro-form">
          <input
            type="text"
            placeholder="Nombre"
            className="registro-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Gmail"
            className="registro-input"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Curso"
            className="registro-input"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />

          <input
            type="text"
            placeholder="División"
            className="registro-input"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          />

          <input
            type="text"
            placeholder="Código de Clase"
            className="registro-input"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <button type="submit" className="registro-button">
            Iniciar sesión
          </button>
        </div>

        <div className="registro-logo">
          <img src={logo_epet20} alt="E.P.E.T. N° 20 NEUQUÉN" />
        </div>


        <ContactoInfo />
      </div>
    </form>
  );
};

export default Registro;
// ...existing code...