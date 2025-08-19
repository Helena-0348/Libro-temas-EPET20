import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_epet20 from "../img/logo_epet20.jpg";

const Registro = () => {
    // 1. Estados para almacenar los valores del formulario
    const [gmail, setGmail] = useState('');
    const [curso, setCurso] = useState('');
    const [division, setDivision] = useState('');
    const [codigoClase, setCodigoClase] = useState('');
    const navigate = useNavigate();

    // 2. Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 3. Verificación de campos
        if (!gmail || !curso || !division || !codigoClase) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // 4. Lógica de login simulado
        // Si el gmail y el código coinciden con valores predefinidos,
        // consideramos que el login es exitoso.
        if (gmail === 'test@test.com' && codigoClase === '1234') {
            alert('¡Registro exitoso!');
            // 5. Redirige al usuario a la página de inicio (o a la que desees)
            navigate('/home'); 
        } else {
            alert('Datos incorrectos. Por favor, verifica tu Gmail y Código de Clase.');
        }
    };

    return (
        <div className="registro-container">
            <h1 className="registro-title">Registro</h1>
            <form className="registro-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Gmail" 
                    className="registro-input"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)} // Actualiza el estado
                />
                <input 
                    type="text" 
                    placeholder="Curso" 
                    className="registro-input"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="División" 
                    className="registro-input"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Código de Clase" 
                    className="registro-input"
                    value={codigoClase}
                    onChange={(e) => setCodigoClase(e.target.value)}
                />

                <button type="submit" className="registro-button">
                    Registrarse
                </button>
            </form>

            <div className="registro-logo">
                <img src={logo_epet20} alt=" E.P.E.T. N° 20 NEUQUÉN " />
            </div>
            
            {/* Si quieres un enlace aparte para ir a otro lugar */}
            <button className="registro-button" onClick={() => navigate('/otra-pagina')}>
                Ir a otra página
            </button>
        </div>
    );
};

export default Registro;