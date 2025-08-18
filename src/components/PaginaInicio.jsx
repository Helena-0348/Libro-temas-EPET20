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
   

               <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow p-4">
            <div className="text-center mb-3"></div>

                <img src="/logo_epet20" alt="logo epet20" className="img-fluid mb-3"/>
                <h1 className="h4 text-primary">Iniciar sesión</h1>
            </div>

<form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input    type="email"
                  className="form-control"
                  value={email}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary w-100">
                Ingresar
              </button>
   </form>
   </div>
        </div>
      </div>

   
);
};

   export default PaginaInicio;