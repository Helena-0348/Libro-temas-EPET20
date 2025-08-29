import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/PaginaInicio.css";

const PaginaInicio = () =>{
    const[email, setEmail] = useState('');    //el primer no existe, esta en blanco
    const navigate = useNavigate();

const handleSubmit = (e) =>{
    //revisa que no se cargue de vuelta
    e.preventDefault();
    if(email){
    navigate("/registro"); // navegar hasta pagina registro
}else {
  
    alert(`${email} no existe`);
}
};

return(
    //creando formulario
   
               <div className="container mt-5"> 
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow p-4 rounded-4">
            <div className="text-center mb-3"></div>

                <img src="/logo_epet20.jpg" alt="logo epet20" className="img-fluid mb-3"/>
                <h1 className="h4 text-primary">Iniciar sesión</h1>
            

<form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input    type="email"
                  className="form-control"
                  value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="ejemplo@gmail.com"/>
          </div>
          <button type="submit" className="btn btn-primary w-100">
                Ingresar
              </button>
              
              <div className="mt-3 text-center">
              <button className="btn btn-outline-danger w-100">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  width="20"
                  className="me-2"
                />
                Sign in with Google
              </button>
            </div>
   </form>
   </div>
   </div>
        </div>
      </div> 
);
};
   export default PaginaInicio;