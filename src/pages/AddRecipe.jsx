import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveLocalRecipe } from '../utils/localRecipes';
import { getAllRecipes } from '../utils/recipeStore';
import Button from '../components/Button';
import './styles/add.css';

const AddRecipe = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [serves, setServes] = useState('1');

    const [stepsText, setStepsText] = useState('');
    const [videoInput, setVideoInput] = useState('');

    const [image, setImage] = useState('');
    const fileRef = useRef(null);

    // Ingredient fields
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQty, setIngredientQty] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Add ingredient pair
    const handleAddIngredient = () => {
        if (!ingredientName.trim() || !ingredientQty.trim()) return;
        setIngredients((prev) => [...prev, `${ingredientName} : ${ingredientQty}`]);
        setIngredientName('');
        setIngredientQty('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim() || !description.trim() || !time.trim() || ingredients.length === 0) {
            return setError('Please fill all fields and add at least one ingredient.');
        }

        const steps = stepsText
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

        if (steps.length === 0) return setError('Please enter at least one step.');

        // Convert YT link → embed format
        let videoEmbed = '';
        if (videoInput.trim()) {
            videoEmbed = videoInput.replace('watch?v=', 'embed/');
        }

        const newRecipe = {
            id: getAllRecipes().length + 1,
            isLocal: true,
            name,
            description,
            timeToCook: time,
            serves,
            image,
            video: videoEmbed, // ⭐ Correct schema naming
            ingredients,
            steps,
        };

        saveLocalRecipe(newRecipe);

        setSuccess('Recipe added! Redirecting...');
        setTimeout(() => navigate('/'), 900);
    };

    return (
        <div className="page-layout">
            <h2 className="add-title">Add a Recipe</h2>

            <div className="add-form-container">
                <form className="add-recipe-form" onSubmit={handleSubmit}>
                    {error && <div className="form-error">{error}</div>}
                    {success && <div className="form-success">{success}</div>}

                    <label>
                        Name
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>

                    <div className="form-row">
                        <label style={{ flex: '0 1 50%' }}>
                            Description
                            <input value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </label>

                        <label style={{ flex: '0 1 25%' }}>
                            Time to Cook
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                placeholder="45 mins"
                                required
                            />
                        </label>

                        <label style={{ flex: '0 1 25%' }}>
                            Serves
                            <select value={serves} onChange={(e) => setServes(e.target.value)} required>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} people
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="form-row">
                        <label style={{ flex: '1 1 50%' }}>
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileRef}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = () => setImage(reader.result);
                                    reader.readAsDataURL(file);
                                }}
                                required
                            />
                        </label>

                        <label style={{ flex: '1 1 50%' }}>
                            YouTube Video Link (Optional)
                            <input
                                type="text"
                                value={videoInput}
                                placeholder="https://youtube.com/watch?v=xxxx"
                                onChange={(e) => setVideoInput(e.target.value)}
                            />
                        </label>
                    </div>

                    {image && (
                        <div className="image-preview">
                            <img src={image} alt="Preview" />
                        </div>
                    )}

                    {/* Ingredients */}
                    <h3 style={{ marginTop: '20px' }}>Ingredients</h3>

                    <div className="form-row">
                        <label style={{ flex: 1 }}>
                            Item
                            <input
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                                placeholder="Flour"
                            />
                        </label>

                        <label style={{ flex: 1 }}>
                            Quantity
                            <input
                                value={ingredientQty}
                                onChange={(e) => setIngredientQty(e.target.value)}
                                placeholder="2 cups"
                            />
                        </label>

                        <Button style={{ alignSelf: 'flex-end' }} type="button" onClick={handleAddIngredient}>
                            Add
                        </Button>
                    </div>

                    {ingredients.length > 0 && (
                        <ul className="ingredient-preview-list">
                            {ingredients.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    )}

                    <label>
                        Steps (one per line)
                        <textarea
                            value={stepsText}
                            onChange={(e) => setStepsText(e.target.value)}
                            rows={6}
                            placeholder="1. Preheat oven..."
                            required
                        />
                    </label>

                    <div className="form-actions">
                        <Button type="submit">Add Recipe</Button>

                        <Button
                            type="button"
                            onClick={() => {
                                setName('');
                                setDescription('');
                                setTime('');
                                setServes('1');
                                setStepsText('');
                                setIngredients([]);
                                setIngredientName('');
                                setIngredientQty('');
                                setImage('');
                                setVideoInput('');
                                fileRef.current.value = '';
                                setError('');
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;

