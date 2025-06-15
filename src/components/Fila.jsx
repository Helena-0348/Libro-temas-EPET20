import React, { useState }  from 'react';

const Fila = () => {
    const [fecha, setFecha] = useState('');
    const [numC, setNumC] = useState('');
    const [unidad, setUnidad] = useState('');
    const [tema, setTema] = useState('');
    const [actividad, setActividad] = useState('');
    const [si, setSI] = useState(false);
    const [no, setNo] = useState(false);
    const [Confirma, setConfirma] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault(); };

  return (
    <form onSubmit={handleSubmit} className="glass-form">
        
    <input
        type="text"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)} />
    <input
        type="text"
        value={numC}
        onChange={(e) => setNumC(e.target.value)}/>
    <input
        type="text"
        value={unidad}
        onChange={(e) => setUnidad(e.target.value)}/>
    <input
        type="text"
        value={tema}
        onChange={(e) => setTema(e.target.value)}/>
    <input
        type="text"
        value={actividad}
        onChange={(e) => setActividad(e.target.value)}/>

    <input
          type="checkbox"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
          />
    <input
          type="checkbox"/>
    <input
          type="checkbox"/>
    </form>
  );
}
export default Fila;