import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllRecipes } from '../utils/recipeStore';
import { deleteLocalRecipe, saveBookmark, deleteBookmark, isBookmarked } from '../utils/localRecipes';
import Button from '../components/Button';
import './styles/recipe.css';

const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allRecipes = getAllRecipes();
    const recipe = allRecipes.find((item) => item.id === Number(id));

    const [bookmarkState, setBookmarkState] = useState(false);

    useEffect(() => {
        setBookmarkState(isBookmarked(Number(id)));
    }, [id]);

    if (!recipe) {
        return <div className="recipe-not-found">Recipe not found</div>;
    }

    const handleDelete = () => {
        if (window.confirm('Delete this recipe?')) {
            deleteLocalRecipe(Number(id));
            navigate('/explore');
        }
    };

    const handleBookmark = () => {
        if (bookmarkState) {
            deleteBookmark(recipe.id);
            setBookmarkState(false);
        } else {
            saveBookmark(recipe);
            setBookmarkState(true);
        }
    };

    return (
        <div className="page-layout">
            <div className="recipe-layout">
                <div className="recipe-left">
                    <div className="recipe-image-section">
                        {recipe.video ? (
                            <iframe
                                width="100%"
                                height="300"
                                style={{ borderRadius: 8 }}
                                src={recipe.video}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <img src={recipe.image} alt={recipe.name} className="recipe-main-image" />
                        )}
                    </div>

                    <div className="recipe-info-section">
                        <div>
                            <h1 className="recipe-title-main">{recipe.name}</h1>
                            <p className="recipe-description">{recipe.description}</p>
                            <div className="recipe-meta">
                                <span className="meta-item">⏱ {recipe.timeToCook}</span>
                                <span className="meta-item">🍽 Serves: {recipe.serves}</span>
                                {recipe.isLocal && <span className="meta-item local-badge">Custom Recipe</span>}
                            </div>
                        </div>

                        <div className="recipe-action-buttons">
                            <Button onClick={handleBookmark}>{bookmarkState ? 'Bookmarked' : 'Bookmark'}</Button>

                            {recipe.isLocal && (
                                <Button style={{ background: '#b00020', color: '#fff' }} onClick={handleDelete}>
                                    Delete Recipe
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="recipe-right">
                    {recipe.ingredients && (
                        <div className="ingredient-section">
                            <table className="ingredient-table">
                                <thead>
                                    <tr>
                                        <th>Ingredient</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recipe.ingredients.map((ing, idx) => {
                                        const [item, qty] = ing.split(':'); // "item | qty"
                                        return (
                                            <tr key={idx}>
                                                <td>{item.trim()}</td>
                                                <td>{qty.trim()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {recipe.steps && (
                        <>
                            <h2 className="steps-title" style={{ marginTop: '24px' }}>
                                How to Make
                            </h2>
                            <ol className="recipe-steps-list">
                                {recipe.steps.map((step, idx) => (
                                    <li key={idx} className="recipe-step-item">
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recipe;

