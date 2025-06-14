import React from 'react';

const Fila = () => {
    const [fecha, setFecha] = useState('');
    const [numC, setNumC] = useState('');
    const [unidad, setUnidad] = useState('');
    const [tema, setTema] = useState('');
    const [actividad, setActividad] = useState('');


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
          type="checkbox"/>
    <input
          type="checkbox"/>
    <input
          type="checkbox"/>
    </form>
  );
}
export default Fila;