//import Encabezado from '../components/Encabezado';
import Info from './Info';
import Titulo from './Titulo';
import ContactoInfo from './ContactoInfo';
import "../css/Home.css";

const Home = () => {
    return (
        <div classname= "Home">
            <Titulo/>
            <Info/>
            <ContactoInfo/>

        </div>
    );

};
export default Home;