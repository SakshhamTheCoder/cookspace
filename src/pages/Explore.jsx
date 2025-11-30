import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes } from '../utils/recipeStore';
import './styles/explore.css';

const Explore = () => {
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        setAllRecipes(getAllRecipes());
    }, []);

    return (
        <div className="page-layout">
            <div className="explore-title">
                <h2>All Recipes</h2>
                <p>Browse all recipes, including your curated ones.</p>
            </div>
            <div className="explore-grid">
                {allRecipes.length === 0 ? (
                    <div style={{ textAlign: 'center', width: '100%' }}>No recipes found.</div>
                ) : (
                    allRecipes.map((item) => (
                        <Link to={`/recipe/${item.id}`} key={item.id} className="explore-card">
                            <img src={item.image} alt={item.name} className="explore-image" />
                            <h3>{item.name}</h3>
                            <i>{item.description}</i>
                            <p>Time to Cook: {item.timeToCook}</p>
                            <p>Serves: {item.serves}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Explore;

