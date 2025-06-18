import React, {useState} from "react";


const Formulario = () =>{
    //el primer no existe, esta en blanco
    const[email, setEmail] = useState('');


const handleSubmit = (e) =>{
    //revisa que no se cargue de vuelta
    e.preventDefault();
    alert(`${email} inexistente`);
};

return(
    //creando formulario
   <form onSubmit={handleSubmit}>
          <div>
            <label>Correo electrónico</label>
            <input type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
   </form>
   
);
};

   export default Formulario;