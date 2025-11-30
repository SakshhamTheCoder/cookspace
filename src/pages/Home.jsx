import './styles/home.css';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { getAllRecipes } from '../utils/recipeStore';

const items = getAllRecipes().filter((recipe) => !recipe.isLocal);

const Home = () => {
    return (
        <>
            <div className="page-layout">
                <div className="home-image">
                    <img src="/home-bowl.png" alt="Cooking" />
                </div>
                <div className="home-content">
                    <h1>Welcome to CookSpace</h1>
                    <p>Your one-stop solution for all your cooking needs</p>
                </div>
            </div>
            <div className="recipe-content">
                <div className="recipe-title">
                    <h2>Discover New Recipes</h2>
                    <p>Browse through a wide variety of recipes from around the world.</p>
                </div>
                <div className="recipe-grid">
                    {items.map((item, index) => (
                        <Link to={`/recipe/${index}`} key={index} className="recipe-card">
                            <img src={item.image} alt={item.name} className="recipe-image" />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Time to Cook: {item.timeToCook}</p>
                            <p>Serves: {item.serves}</p>
                        </Link>
                    ))}
                </div>
                <Button to="/explore">View All Recipes</Button>
            </div>
        </>
    );
};

export default Home;

