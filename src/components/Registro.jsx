import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_epet20 from "../img/logo_epet20.jpg";


const Registro = () => {
const navigate = useNavigate(); //para navegar


const [gmail, setGmail] = useState(""); //verifica el estado
const [curso, setCurso] = useState("");
const [division, setDivision] = useState("");
const [codigo, setCodigo] = useState("");


const handleSubmit = (e) => {
  e.preventDefault();
   console.log({ gmail, curso, division, codigo });

   navigate("/libro");
}

  return (
   <form onSubmit={handleSubmit} className="registro-form">
    <div className="registro-container">
      <h1 className="registro-title">Registro</h1>
      <div className="registro-form">
        
        <input type="text" placeholder="Gmail" className="registro-input" value={gmail} onChange={(e) => setGmail(e.target.value)} />
        <input type="text" placeholder="Curso" className="registro-input" value={curso} onChange={(e) => setCurso(e.target.value)}/>
        <input type="text" placeholder="División" className="registro-input" value={division} onChange={(e) => setDivision(e.target.value)}/>
        <input type="text" placeholder="Código de Clase" className="registro-input" value={codigo} onChange={(e) => setCodigo(e.target.value)}/>

        <button type="submit" className="registro-button"> {/*<link to="/otra-pagina"  className="registro-link" /> */}
    Iniciar sesión </button>

      </div>
      <div className="registro-logo">
        <img src={logo_epet20} alt=" E.P.E.T. N° 20 NEUQUÉN " />
      </div>
      <link  type='submit' to="/otra-pagina"  className="registro-link"Ir a otra página />
    </div>
    </form>

  );
};

export default Registro;
