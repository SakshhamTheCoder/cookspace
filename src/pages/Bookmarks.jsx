import { getBookmarks } from '../utils/localRecipes';
import { Link } from 'react-router-dom';
import './styles/bookmarks.css';

const Bookmarks = () => {
    const bookmarks = getBookmarks();

    if (!bookmarks.length) {
        return <div className="bookmarks-empty">No bookmarks yet.</div>;
    }

    return (
        <div className="page-layout">
            <div className="bookmarks-title">
                <h2>Bookmarked Recipes</h2>
                <p>Here are the recipes you've bookmarked for easy access. Click on any recipe to view its details.</p>
            </div>

            <div className="bookmarks-grid">
                {bookmarks.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} className="bookmarks-card" key={recipe.id}>
                        <img src={recipe.image} alt={recipe.name} className="bookmarks-image" />
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;

