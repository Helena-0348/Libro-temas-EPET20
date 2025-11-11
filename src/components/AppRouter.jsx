// ...existing code...
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase'; // ajusta ruta si es distinta

import Formulario from "./Formulario.jsx";
import PaginaLibro from "./PaginaLibro.jsx";
import Registro from "./Registro.jsx";
import Home from "./Home.jsx"; // si lo usás en rutas admin
import GoogleLogin from './GoogleLogin.jsx';
import UserRole from './UseRole.jsx'; // <-- nuevo import

const DEFAULT_ROLE = 'profesor'; // cambia si querés otro rol por defecto

const AppRouter = () => {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (!firebaseUser) {
        setUserState(null);
        setLoading(false);
        return;
      }

      try {
        const uid = firebaseUser.uid;
        const userRef = doc(db, 'users', uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          // Crear documento nuevo con rol por defecto y algunos datos básicos
          const newUser = {
            uid,
            email: firebaseUser.email || null,
            displayName: firebaseUser.displayName || null,
            photoURL: firebaseUser.photoURL || null,
            rol: DEFAULT_ROLE,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newUser, { merge: true });
          setUserState(newUser);
        } else {
          const data = snap.data();
          // si el documento existe pero no tiene rol, asignar por defecto
          if (!data.rol) {
            await setDoc(userRef, { rol: DEFAULT_ROLE }, { merge: true });
            data.rol = DEFAULT_ROLE;
          }
          setUserState({ uid, ...data });
        }
      } catch (err) {
        console.error('Error al obtener/crear usuario en Firestore:', err);
        setUserState({ uid: firebaseUser.uid, email: firebaseUser.email });
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Cargando...</div>;
  }

  const rol = userState?.rol;

  // Si no hay rol o el rol no está permitido, mostrar mensaje simple
  if (!rol || !['admin', 'preceptor', 'profesor'].includes(rol)) {
    return (
      <div style={{ padding: 20 }}>
        <h3>No tenés permisos para acceder</h3>
        <p>Iniciá sesión con una cuenta autorizada o contactá al administrador.</p>
      </div>
    );
  }

  return (
    <Routes>
      {rol === 'admin' && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/PaginaLibro" element={<PaginaLibro/>} />
          <Route path="/Registro" element={<Registro />} />

          {/* ruta para ver el rol/usuario */}
          <Route path="/mi-rol" element={<UserRole user={userState} />} />
        </>
      )}

      {(rol === 'preceptor' || rol === 'profesor') && (
        <>
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/PaginaLibro" element={<PaginaLibro/>} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/" element={<PaginaLibro/>} /> {/* ruta por defecto para profesores/preceptores */}

          {/* ruta para ver el rol/usuario */}
          <Route path="/mi-rol" element={<UserRole user={userState} />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
// ...existing code...