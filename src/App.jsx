import React from 'react';
import Encabezado from "./components/Encabezado";
import BotonDias from './components/BotonDias';



// Componente principal App
// Este componente utiliza el componente Button y le pasa un texto como prop.
const App = () => {
  return (
    <div>
      <BotonDias label="L" />
    </div>
  );
};

export default App;


