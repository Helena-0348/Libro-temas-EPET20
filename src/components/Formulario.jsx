import React, {useState} from "react";

function Formulario(){
   
        //el primer no existe, esta en blanco
        const[email, setEmail] = useState('');
    
    
    const handleSubmit = (e) =>{
        //revisa que no se cargue de vuelta
        e.preventDefault();
        alert(`${email} inexistente`);
    };

    return(
        //creando formulario
        <div>
       <form onSubmit={handleSubmit}>
              <div>
                <label>Correo electrónico</label>
                <input type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
              </div>
       </form>
       </div>
       
    );
    };
    

export default Formulario;