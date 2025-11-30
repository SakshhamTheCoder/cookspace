import { useParams, useNavigate } from 'react-router-dom';
import { getAllRecipes } from '../utils/recipeStore';
import './styles/recipe.css';
import { deleteLocalRecipe } from '../utils/localRecipes';

const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allRecipes = getAllRecipes();
    const recipe = allRecipes.find((item) => item.id === Number(id));

    if (!recipe) {
        return <div className="recipe-not-found">Recipe not found</div>;
    }

    const handleDelete = () => {
        if (window.confirm('Delete this recipe?')) {
            deleteLocalRecipe(Number(id));
            navigate('/explore');
        }
    };

    return (
        <div className="page-layout">
            <div className="recipe-layout">
                <div className="recipe-left">
                    <div className="recipe-image-section">
                        <img src={recipe.image} alt={recipe.name} className="recipe-main-image" />
                    </div>
                    <div className="recipe-info-section">
                        <h1 className="recipe-title-main">{recipe.name}</h1>
                        <p className="recipe-description">{recipe.description}</p>
                        <div className="recipe-meta">
                            <span className="meta-item">⏱ {recipe.timeToCook}</span>
                            <span className="meta-item">🍽 Serves: {recipe.serves}</span>
                        </div>
                        {recipe.isLocal && (
                            <button
                                className="local-recipe-badge"
                                style={{
                                    marginTop: 16,
                                    background: '#b00020',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 6,
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                }}
                                onClick={handleDelete}
                            >
                                Delete Recipe
                            </button>
                        )}
                    </div>
                </div>
                {recipe.steps && (
                    <div className="recipe-right">
                        <h2 className="steps-title">How to Make</h2>
                        <ol className="recipe-steps-list">
                            {recipe.steps.map((step, idx) => (
                                <li key={idx} className="recipe-step-item">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipe;
