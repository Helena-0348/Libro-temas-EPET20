import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase'; //Ajusta la ruta según tu estructura real
import { useUser } from '../context/useUser'; // Asegura que esta ruta sea correcta
import '../css/GoogleLogin.css';
import logo from "../img/logo_epet20.jpg"
import googleLogo from "../img/foto_google.jpg"
<<<<<<< HEAD
import ContactoInfo from './ContactoInfo';

=======
import LetrasEpet from "./LetrasEpet";
import ContactoInfo from "./ContactoInfo"
>>>>>>> f718e30b2dc4ca2b17b2945e638bdc4a29e86db2
const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser(); // asegúrate de que exporte `login`
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

    
      if (login) {
        login({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }

<<<<<<< HEAD
      navigate('/inicio'); // ✅ Ajusta la ruta según tus rutas reales
=======
      navigate('/registro'); //Ajusta la ruta según las rutas reales
>>>>>>> f718e30b2dc4ca2b17b2945e638bdc4a29e86db2
    } catch (err) {
      console.error('Error en login con Google:', err);
      setError('Error al iniciar sesión con Google. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
<div>
<main className="google__hero" aria-label="Iniciar sesión con Google">
=======

    <div>
      <LetrasEpet/>
    <main className="google__hero" aria-label="Iniciar sesión con Google">
      
>>>>>>> f718e30b2dc4ca2b17b2945e638bdc4a29e86db2
      <div className="google__card">
        
        <div className="google__left" aria-hidden="true">
          <img
            src={logo}
            alt="Foto de la escuela"
            className="google__school"
          />
        </div>

        <div className="google__right">
          <h2 className="google__title">Iniciar sesión- Libro temas</h2>

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
<<<<<<< HEAD

    </main><ContactoInfo/>
</div>

);
=======
    </main>
    <ContactoInfo/>
    </div>
  );
>>>>>>> f718e30b2dc4ca2b17b2945e638bdc4a29e86db2
};

export default GoogleLogin;
