import React from 'react';

const Tabla = () => {
  return (
    <table>
          <thead>
          <tr>
            <th>Fecha</th>
            <th>N° Clase</th>
            <th>Unidad</th>
            <th>Tema</th>
            <th>Actividad del dia</th>
            <th>si</th>
            <th>no</th>
            <th>Confirmacion Preceptor</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td><input
                  type="text"
                  value={fecha}
                  onChange={(e) => setNombre(e.target.value)}/> </td>
          </tr>
        </tbody>
    </table>
  );
};

export default Tabla;