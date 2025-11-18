import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

import Home from './Home.jsx';
import Inicio from './Inicio.jsx';
import GoogleLogin from './GoogleLogin.jsx';
import Registro from './Registro.jsx';
import UserRole from './UserRole.jsx';
import PrivateRoute from './PrivateRoute';

import Formulario from './Formulario.jsx';
import PaginaLibro from './PaginaLibro.jsx';
import DiaLibro from './DiaLibro.jsx';
import ShowDias from './ShowDias.jsx';
import AltaDato from './AltaDato.jsx';
import ListadoDatos from './listadoDatos.jsx';
import ListaCursos from './ListaCursos.jsx';
import UsersList from './UsersList.jsx';

const DEFAULT_ROLE = 'profesor';

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

  if (loading) return <div style={{ padding: 10 }}>Cargando...</div>;

  const rol = userState?.rol;

  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/Googlelogin" element={<GoogleLogin />} />
      <Route path="/registro" element={<Registro />} />

      {/* ruta protegida: Inicio (acceso solo si autenticado) */}
      <Route
        path="/inicio"
        element={
          <PrivateRoute user={userState}>
            <Inicio />
          </PrivateRoute>
        }
      />

      {/* vista de la cuenta */}
      <Route
        path="/mi-rol"
        element={
          <PrivateRoute user={userState}>
            <UserRole user={userState} />
          </PrivateRoute>
        }
      />

      {/* gestión de usuarios: solo para admin */}
      <Route
        path="/usuarios"
        element={
          userState?.rol === 'admin' ? (
            <PrivateRoute user={userState}>
              <UsersList />
            </PrivateRoute>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* rutas privadas para roles */}
      {(rol === 'profesor' || rol === 'preceptor' || rol === 'admin') && (
        <>
          <Route path="/listacursos" element={<ListaCursos />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/PaginaLibro" element={<PaginaLibro />} />
          <Route path="/libro" element={<PaginaLibro />} />
          <Route path="/dia" element={<DiaLibro />} />
          <Route path="/muestraD" element={<ShowDias />} />
          <Route path="/agregar" element={<AltaDato />} />
          <Route path="/listado" element={<ListadoDatos />} />
          <Route
            path="/todo"
            element={
              <div>
                <AltaDato />
                <hr />
                <ListadoDatos />
              </div>
            }
          />
        </>
      )}

      {/* admin extra */}
      {rol === 'admin' && <Route path="/admin" element={<Home />} />}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;