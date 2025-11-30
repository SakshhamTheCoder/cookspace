import { getBookmarks } from '../utils/localRecipes';
import { Link } from 'react-router-dom';
import './styles/bookmarks.css';

const Bookmarks = () => {
    const bookmarks = getBookmarks();

    if (!bookmarks.length) {
        return <div className="bookmarks-empty">No bookmarks yet.</div>;
    }

    return (
        <div className="bookmarks-page-layout">
            <h2 className="bookmarks-title">Bookmarked Recipes</h2>
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

