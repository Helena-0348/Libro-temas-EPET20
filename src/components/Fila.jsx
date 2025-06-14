import React from 'react';

const Fila = () => {
    const [fecha, setFecha] = useState('');
    const [numC, setNumC] = useState('');
    const [unidad, setUnidad] = useState('');
    const [tema, setTema] = useState('');
    const [actividad, setActividad] = useState('');
    const [si, setSi] = useState(false);
    const [no, setNo] = useState(false);
    const [confirma, setConfirma] = useState(false);



  return (
    <input
        type="text"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}/>
  );
};
export default Fila;