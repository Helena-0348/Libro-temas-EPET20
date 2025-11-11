// ...existing code...
import React from 'react';
import '../css/UserRole.css';

const UserRole = ({ user }) => {
  if (!user) {
    return (
      <main className="user-role user-role__unauth">
        <h2>Usuario no autenticado</h2>
        <p>Iniciá sesión para ver tu rol.</p>
      </main>
    );
  }

  return (
    <main className="user-role">
      <h2 className="user-role__title">Mi cuenta</h2>
      <div className="user-role__box">
        <p><strong>Nombre:</strong> {user.displayName || '—'}</p>
        <p><strong>Email:</strong> {user.email || '—'}</p>
        <p><strong>UID:</strong> {user.uid || '—'}</p>
        <p><strong>Rol:</strong> <span className="user-role__role">{user.rol || '—'}</span></p>
        {user.photoURL && <img src={user.photoURL} alt="avatar" style={{ width: 80, height: 80, borderRadius: 8, marginTop: 12 }} />}
      </div>
    </main>
  );
};

export default UserRole;
// ...existing code...