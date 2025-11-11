import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.jsx';

const emptyEntry = () => ({ fecha: '', diaSemana: '', tema: '', asistio: false });

const MesLibro = () => {
  const [numMes, setNumMes] = useState('');
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [profesor, setProfesor] = useState(''); // opcional: nombre o id del profesor
  const [entries, setEntries] = useState([emptyEntry()]);
  const [loading, setLoading] = useState(false);

  const addEntry = () => setEntries(prev => [...prev, emptyEntry()]);
  const removeEntry = (i) => setEntries(prev => prev.filter((_, idx) => idx !== i));

  const handleEntryChange = (i, field, value) => {
    setEntries(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      // si el campo fecha cambia, calcular el día de la semana automáticamente
      if (field === 'fecha' && value) {
        try {
          const d = new Date(value);
          const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
          next[i].diaSemana = days[d.getDay()];
        } catch { next[i].diaSemana = ''; }
      }
      return next;
    });
  };

  const validate = () => {
    if (!numMes) { alert('Selecciona un mes.'); return false; }
    if (!entries.length) { alert('Agrega al menos un día.'); return false; }
    for (let i = 0; i < entries.length; i++) {
      if (!entries[i].tema || !entries[i].fecha) {
        alert(`Completa fecha y tema en la fila ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        mes: Number(numMes),
        anio: Number(anio),
        profesor: profesor || null,
        creadoEn: new Date().toISOString(),
        clases: entries.map(ent => ({
          fecha: ent.fecha,
          diaSemana: ent.diaSemana,
          tema: ent.tema,
          asistio: !!ent.asistio,
        })),
      };
      const ref = await addDoc(collection(db, 'meses'), payload);
      alert('Datos guardados. ID: ' + ref.id);
      // limpiar
      setNumMes('');
      setProfesor('');
      setEntries([emptyEntry()]);
    } catch (err) {
      console.error(err);
      alert('Error al guardar: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: 20 }}>
      <h2>Registrar mes de clases / asistencia</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
          <label>
            Mes:
            <select value={numMes} onChange={e => setNumMes(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="">--</option>
              {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </label>

          <label>
            Año:
            <input type="number" value={anio} onChange={e => setAnio(e.target.value)} style={{ width: 100, marginLeft: 8 }} />
          </label>

          <label style={{ flex: 1 }}>
            Profesor (nombre o id):
            <input value={profesor} onChange={e => setProfesor(e.target.value)} placeholder="Ej: Juan Pérez" style={{ width: '100%', marginLeft: 8 }} />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Días / clases</strong>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {entries.map((ent, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', border: '1px solid #e6e6e6', padding: 10, borderRadius: 8 }}>
              <input
                type="date"
                value={ent.fecha}
                onChange={e => handleEntryChange(i, 'fecha', e.target.value)}
                style={{ width: 160 }}
                required
              />
              <input
                type="text"
                placeholder="Día semana"
                value={ent.diaSemana}
                onChange={e => handleEntryChange(i, 'diaSemana', e.target.value)}
                style={{ width: 120 }}
                readOnly
              />
              <input
                type="text"
                placeholder="Tema"
                value={ent.tema}
                onChange={e => handleEntryChange(i, 'tema', e.target.value)}
                style={{ flex: 1 }}
                required
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="checkbox" checked={ent.asistio} onChange={e => handleEntryChange(i, 'asistio', e.target.checked)} />
                Asistió
              </label>
              <button type="button" onClick={() => removeEntry(i)} style={{ background: '#f8d7da', border: 'none', padding: '6px 8px', borderRadius: 6 }}>
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="button" onClick={addEntry} style={{ padding: '8px 12px' }}>Agregar día</button>
          <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
            {loading ? 'Guardando...' : 'Guardar mes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MesLibro;