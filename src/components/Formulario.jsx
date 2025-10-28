// ...existing code...
import React, { useState } from 'react';
import '../css/formulario.css';

const initialState = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  password2: '',
  telefono: '',
  acepta: false,
};

const Registro = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Nombre requerido';
    if (!form.apellido.trim()) e.apellido = 'Apellido requerido';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email inválido';
    if (form.password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (form.password !== form.password2) e.password2 = 'Las contraseñas no coinciden';
    if (form.telefono && !/^[0-9()+\s-]{6,20}$/.test(form.telefono)) e.telefono = 'Teléfono inválido';
    if (!form.acepta) e.acepta = 'Debes aceptar los términos';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setLoading(true);
    try {
      // Ejemplo: enviar al servidor
      // await fetch('/api/registro', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });

      // Simulación de éxito
      await new Promise((r) => setTimeout(r, 800));
      setSuccess('Registro completado correctamente. Revisa tu correo.');
      setForm(initialState);
    } catch (err) {
      setErrors({ submit: 'Error al registrar. Intenta más tarde.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="registro__hero">
      <form className="registro__card" onSubmit={handleSubmit} noValidate aria-labelledby="registro-title">
        <h2 id="registro-title" className="registro__title">Crear cuenta prof@ o Prec@ — EPET N°20</h2>

        {success && <div className="registro__success" role="status">{success}</div>}
        {errors.submit && <div className="registro__error">{errors.submit}</div>}

        <div className="registro__grid">
          <label className="field">
            <span>Nombre</span>
            <input name="nombre" value={form.nombre} onChange={handleChange} aria-invalid={!!errors.nombre} />
            {errors.nombre && <small className="field__error">{errors.nombre}</small>}
          </label>

          <label className="field">
            <span>Apellido</span>
            <input name="apellido" value={form.apellido} onChange={handleChange} aria-invalid={!!errors.apellido} />
            {errors.apellido && <small className="field__error">{errors.apellido}</small>}
          </label>

          <label className="field field--full">
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
            {errors.email && <small className="field__error">{errors.email}</small>}
          </label>

          <label className="field">
            <span>Contraseña</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} aria-invalid={!!errors.password} />
            {errors.password && <small className="field__error">{errors.password}</small>}
          </label>

          <label className="field">
            <span>Confirmar contraseña</span>
            <input name="password2" type="password" value={form.password2} onChange={handleChange} aria-invalid={!!errors.password2} />
            {errors.password2 && <small className="field__error">{errors.password2}</small>}
          </label>

          <label className="field field--full">
            <span>Teléfono (opcional)</span>
            <input name="telefono" value={form.telefono} onChange={handleChange} />
            {errors.telefono && <small className="field__error">{errors.telefono}</small>}
          </label>
        </div>

        <label className="registro__terms">
          <input name="acepta" type="checkbox" checked={form.acepta} onChange={handleChange} />
          <span>Acepto los términos y condiciones</span>
        </label>
        {errors.acepta && <small className="field__error">{errors.acepta}</small>}

        <div className="registro__actions">
          <button className="btn btn--primary" type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
          <a className="btn btn--outline" href="/inicio">Volver</a>
        </div>
      </form>
    </main>
  );
};

export default Registro;
// ...existing code...