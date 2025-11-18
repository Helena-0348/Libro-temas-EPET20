import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import '../css/UsersList.css';
import LetrasEpet from './LetrasEpet';

const ROLES = ['profesor', 'preceptor', 'admin'];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const snap = await getDocs(collection(db, 'users'));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setUsers(list);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
        setError('No se pudieron cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChangeRole = (id, value) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, rol: value } : u)));
  };

  const handleSave = async (userId, rol) => {
    setSavingId(userId);
    setError('');
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { rol });
      // opcional: mostrar mensaje de éxito
      setError('');
    } catch (err) {
      console.error('Error actualizando rol:', err);
      setError('Error al guardar cambios.');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <main className="userslist-main">
        <p>Cargando usuarios…</p>
      </main>
    );
  }

  return (
    <div>
      <LetrasEpet />
      <main className="userslist-main">
        <div className="userslist-header">
          <h2 className="userslist-title">Gestión de usuarios</h2>
        </div>

        {error && <div className="userslist-error">{error}</div>}

        <table className="userslist-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td data-label="Nombre">{u.displayName || '—'}</td>
                <td data-label="Email">{u.email || '—'}</td>
                <td data-label="Rol">
                  <select
                    className="userslist-select"
                    value={u.rol || 'profesor'}
                    onChange={(e) => handleChangeRole(u.id, e.target.value)}
                    aria-label={`Rol de ${u.displayName || u.email}`}
                  >
                    {ROLES.map(r => (
                      <option key={r} value={r}>
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td data-label="Acción">
                  <button
                    className="userslist-btn"
                    onClick={() => handleSave(u.id, u.rol)}
                    disabled={savingId === u.id}
                    type="button"
                  >
                    {savingId === u.id ? 'Guardando…' : 'Guardar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={{ marginTop: 12, color: '#666' }}>No hay usuarios registrados.</p>
        )}
      </main>
    </div>
  );
};

export default UsersList;