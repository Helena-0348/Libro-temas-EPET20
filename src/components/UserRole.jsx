// ...existing code...
import React from 'react';

const UserRole = ({ user }) => {
  if (!user) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Usuario no autenticado</h2>
        <p>Iniciá sesión para ver tu rol.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 840, margin: '0 auto' }}>
      <h2>Mi cuenta</h2>
      <div style={{ marginTop: 12, padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
        <p><strong>Nombre:</strong> {user.displayName || '—'}</p>
        <p><strong>Email:</strong> {user.email || '—'}</p>
        <p><strong>UID:</strong> {user.uid || '—'}</p>
        <p><strong>Rol:</strong> <span style={{ textTransform: 'capitalize' }}>{user.rol || '—'}</span></p>
        {user.photoURL && <img src={user.photoURL} alt="avatar" style={{ width: 80, height: 80, borderRadius: 8, marginTop: 12 }} />}
      </div>
    </main>
  );
};

export default UserRole;
// ...existing code...