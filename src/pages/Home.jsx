import './styles/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page-layout">
            <div className="home-image">
                <img src="/home-bowl.png" alt="Cooking" />
            </div>
            <div className="home-content">
                <h1>Welcome to CookSpace</h1>
                <p>Your one-stop solution for all your cooking needs</p>
            </div>
            <Link to="/explore" className="explore-link">
                Explore Recipes
            </Link>
        </div>
    );
};

export default Home;

