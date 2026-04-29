import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Button from '../components/Button';
import './styles/home.css';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopRecipes = async () => {
            try {
                const res = await api.get('/recipes?limit=4');
                setRecipes(res.data.recipes);
            } catch (error) {
                console.error("Failed to fetch recipes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopRecipes();
    }, []);

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <span className="hero-tagline">Taste the Extraordinary</span>
                    <h1 className="hero-title">Elevate Your Kitchen <br/> Experience</h1>
                    <p className="hero-description">
                        Discover, save, and master thousands of curated recipes from 
                        passionate cooks around the world.
                    </p>
                    <div className="hero-actions">
                        <Button to="/explore">Explore Recipes</Button>
                        <Link to="/register" className="secondary-link">Join Community →</Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-circle"></div>
                    <img src="/home-bowl.png" alt="Featured Dish" className="hero-image" />
                </div>
            </section>

            <section className="featured-section">
                <div className="section-header">
                    <h2 className="section-title">Fresh from the Community</h2>
                    <Link to="/explore" className="section-link">View all</Link>
                </div>
                
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="home-grid">
                        {recipes.map((item, index) => (
                            <Link 
                                to={`/recipe/${item._id}`} 
                                key={item._id} 
                                className="home-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="card-image-wrapper">
                                    <img src={item.image} alt={item.name} className="card-image" />
                                    <div className="card-overlay">
                                        <span className="card-time">⏱ {item.cookingTime}</span>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <span className="card-author">By {item.author?.email?.split('@')[0] || 'Chef'}</span>
                                    <h3 className="card-title">{item.name}</h3>
                                    <p className="card-desc">{item.description}</p>
                                    <div className="card-footer">
                                        <span className="card-serves">🍽 Serves {item.serves}</span>
                                        {item.cookedCount > 0 && (
                                            <span className="card-cooked">🍳 {item.cookedCount} cooked</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
