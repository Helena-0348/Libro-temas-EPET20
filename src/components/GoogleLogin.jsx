import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase'; //Ajusta la ruta según tu estructura real
import { useUser } from '../context/useUser'; // Asegura que esta ruta sea correcta
import '../css/GoogleLogin.css';
import logo from "../img/logo_epet20.jpg"
import googleLogo from "../img/foto_google.jpg"
import LetrasEpet from "./LetrasEpet";
import ContactoInfo from "./ContactoInfo"
const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser(); // asegúrate de que tu contexto exporte `login`
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Si tu UserContext usa otra estructura, ajusta esto
      if (login) {
        login({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }

      navigate('/registro'); // ✅ Ajusta la ruta según tus rutas reales
    } catch (err) {
      console.error('Error en login con Google:', err);
      setError('Error al iniciar sesión con Google. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
      <LetrasEpet/>
    <main className="google__hero" aria-label="Iniciar sesión con Google">
      
      <div className="google__card">
        
        <div className="google__left" aria-hidden="true">
          <img
            src={logo}
            alt="Foto de la escuela"
            className="google__school"
          />
        </div>

        <div className="google__right">
          <h2 className="google__title">Iniciar sesión</h2>

          {error && (
            <div className="google__error" role="alert">
              {error}
            </div>
          )}

          <button
            className="google__btn"
            onClick={handleGoogle}
            disabled={loading}
            aria-disabled={loading}
          >
            <img
              src={googleLogo}
              alt="Logo de Google"
              className="google__logo"
              width="18"
              height="18"
            />
            <span>{loading ? 'Redirigiendo...' : 'Iniciar sesión con Google'}</span>
          </button>
        </div>
      </div>
    </main>
    <ContactoInfo/>
    </div>
  );
};

export default GoogleLogin;
