import '../css/ContactoInfo.css';

const ContactoInfo = () => {
  return (
    <footer className="contacto" role="contentinfo">
      <div className="contacto__container">
        <div className="contacto__item">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          </svg>
          <span>Lanín 2020, Nqn Arg</span>
        </div>

        <div className="contacto__item">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          </svg>
          <a className="contacto__link" href="tel:+542994478052">(+54) 299 447-8052</a>
        </div>

        <div className="contacto__item">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          </svg>
          <a className="contacto__link" href="https://epet20.edu.ar/" target="_blank" rel="noopener noreferrer">Pagina oficial </a>
        </div>
      </div>

      <div className="contacto__footerNote">
        © {new Date().getFullYear()} EPET 20 
      </div>
    </footer>
  );
};

export default ContactoInfo;