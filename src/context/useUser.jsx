import { createContext, useContext, useState } from 'react';

// Creamos el contexto (la "caja global")
const UserContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useUser = () => useContext(UserContext);

// Proveedor del contexto: envuelve la app y permite compartir los datos del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Inicia sesión guardando los datos del usuario
  const login = (userData) => {
    setUser(userData);
  };

  // Cierra sesión borrando los datos del usuario
  const logout = () => {
    setUser(null);
  };

  // Lo que el contexto compartirá con los componentes que lo usen
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
