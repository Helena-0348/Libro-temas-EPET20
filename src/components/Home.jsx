//import Encabezado from '../components/Encabezado';
import Info from './components/Info';
import ContactoInfo from './ContactoInfo';
import "../css/Home.css";

const Home = () => {
    return (
        <div classname= "Home">
            <Encabezado />
            <Info/>
            <ContactoInfo/>

        </div>
    );

};
export default Home;
