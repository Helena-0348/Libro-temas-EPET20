import Header from './components/Header';
import Info from './components/Info';
import ContactoInfo from './components/ContactoInfo';
import "../css/Home.css";

const Home = () => {
    return (
        <div classname= "Home">
            <Header />
            <Info/>
            <ContactoInfo/>

        </div>
    );

};
export default Home;
