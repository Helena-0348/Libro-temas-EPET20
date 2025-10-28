// ...existing code...
import logo from '../img/logo_epet20.jpg';
import '../css/Titulo.css';

const Titulo = () => {
  return (
    <header className="titulo" role="banner" aria-label="Título principal">
      <div className="titulo__container">
        <div className="titulo__logoWrap" aria-hidden="false">
          <img src={logo} alt="Logo EPET N°20" className="titulo__logo" />
        </div>

        <div className="titulo__texts">
          <h1 className="titulo__main">EPET N°20</h1>
          <p className="titulo__subtitle">Escuela Provincial de Enseñanza Técnica — Neuquén</p>
        </div>

        
      </div>
    </header>
  );
};

export default Titulo;
