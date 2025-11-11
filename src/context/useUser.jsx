import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase'; // ajusta ruta si hace falta

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setLoadingUser(true);
      if (!fbUser) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      // Construir objeto básico del contexto desde firebase user
      const basic = {
        uid: fbUser.uid,
        email: fbUser.email || null,
        displayName: fbUser.displayName || null,
        photoURL: fbUser.photoURL || null,
      };

      try {
        // Opcional: leer documento users/{uid} para obtener rol u otros datos
        const ref = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser({ ...basic, ...snap.data() }); // incluye rol si existe
        } else {
          setUser(basic);
        }
      } catch (err) {
        console.error('Error leyendo user doc:', err);
        setUser(basic);
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsub();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};