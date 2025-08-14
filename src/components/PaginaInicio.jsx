import React, {useState} from "react";
import "../css/PaginaInicio.css";


const PaginaInicio = () =>{
    //el primer no existe, esta en blanco
    const[email, setEmail] = useState('');


const handleSubmit = (e) =>{
    //revisa que no se cargue de vuelta
    e.preventDefault();
    alert(`${email} inexistente`);
};

return(
    //creando formulario
   <form onSubmit={handleSubmit} className="formulario">

            <div className="cajaInicio">

                <img src="/logo_epet20" alt="logo epet20" />
                <h1>Iniciar sesión</h1>
            </div>

          <div className="cajaCorreo">
            <label>Correo electrónico</label>
            <input type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
   </form>
   
);
};

   export default PaginaInicio;