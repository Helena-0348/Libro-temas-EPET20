// src/components/Inicio.js

import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Bienvenido a nuestra aplicación. Haz clic en el botón para registrarte.</p>
      
      {/* Usamos <Link> para navegar sin recargar la página.
        El 'to' apunta a la ruta que definimos en App.js.
      */}
      <Link to="/registro">
        <button>
          Ir a Registro
        </button>
      </Link>

    </div>
  );
}

export default Inicio;