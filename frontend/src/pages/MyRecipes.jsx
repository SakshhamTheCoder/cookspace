import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
// Reusing Bookmarks layout since they look identical
import './styles/bookmarks.css';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchMyRecipes();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    if (!recipes.length) {
        return <div className="bookmarks-empty">You haven't added any recipes yet. Time to get cooking!</div>;
    }

    return (
        <div className="page-layout">
            <div className="bookmarks-title">
                <h2>My Custom Recipes</h2>
                <p>Welcome to your personal kitchen space. Here are all the unique creations you've published to CookSpace.</p>
            </div>

            <div className="bookmarks-grid">
                {recipes.map((recipe) => (
                    <Link to={`/recipe/${recipe._id}`} className="bookmarks-card" key={recipe._id}>
                        <img src={recipe.image} alt={recipe.name} className="bookmarks-image" />
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyRecipes;
