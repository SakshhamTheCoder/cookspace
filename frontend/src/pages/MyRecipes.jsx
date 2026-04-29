import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './styles/myrecipes.css';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyRecipes = async () => {
        try {
            const res = await api.get('/users/my-recipes');
            setRecipes(res.data);
        } catch (error) {
            console.error("Error fetching my recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyRecipes();
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;
        try {
            await api.delete(`/recipes/${id}`);
            setRecipes(recipes.filter(r => r._id !== id));
        } catch (error) {
            alert('Failed to delete recipe.');
        }
    };

    if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

    if (!recipes.length) {
        return (
            <div className="page-layout empty-state">
                <div className="empty-box">
                    <h2>Your Kitchen is Empty</h2>
                    <p>You haven't published any recipes yet. Start sharing your culinary magic!</p>
                    <Link to="/add" className="empty-btn">Create Your First Recipe</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-layout">
            <header className="myrecipes-header">
                <span className="myrecipes-tagline">Recipe Management</span>
                <h1 className="myrecipes-title">Your Culinary Studio</h1>
                <p className="myrecipes-desc">Manage and refine your published creations.</p>
            </header>

            <div className="myrecipes-grid">
                {recipes.map((recipe) => (
                    <div className="studio-card" key={recipe._id}>
                        <Link to={`/recipe/${recipe._id}`} className="card-link">
                            <div className="card-image-wrapper">
                                <img src={recipe.image} alt={recipe.name} />
                                <div className="card-overlay">
                                    <span className="view-text">View Recipe</span>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="recipe-name">{recipe.name}</h3>
                                <p className="recipe-excerpt">{recipe.description}</p>
                                <div className="recipe-meta">
                                    <span>⏱ {recipe.cookingTime}</span>
                                    <span>📊 {recipe.cookedCount} Cooks</span>
                                </div>
                            </div>
                        </Link>
                        <div className="card-actions">
                            <Link to={`/edit/${recipe._id}`} className="action-btn edit">
                                Edit
                            </Link>
                            <button onClick={(e) => handleDelete(e, recipe._id)} className="action-btn delete">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRecipes;
