import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Button from '../components/Button';
import './styles/add.css';

const AddRecipe = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [serves, setServes] = useState('1');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [stepsText, setStepsText] = useState('');
    const [videoInput, setVideoInput] = useState('');

    const [image, setImage] = useState('');
    const fileRef = useRef(null);

    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQty, setIngredientQty] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAvailableTags = async () => {
            try {
                const res = await api.get('/recipes/tags');
                setAvailableTags(res.data);
            } catch (error) {
                console.error('Failed to fetch tags', error);
            }
        };
        fetchAvailableTags();
    }, []);

    const handleAddIngredient = () => {
        if (!ingredientName.trim() || !ingredientQty.trim()) return;
        setIngredients((prev) => [...prev, { item: ingredientName, quantity: ingredientQty }]);
        setIngredientName('');
        setIngredientQty('');
    };

    const removeIngredient = (index) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name.trim() || !description.trim() || !time.trim() || ingredients.length === 0) {
            setLoading(false);
            return setError('Please provide a name, description, time, and at least one ingredient.');
        }

        const steps = stepsText.split('\n').map((line) => line.trim()).filter(Boolean);
        if (steps.length === 0) {
            setLoading(false);
            return setError('Please provide the preparation steps.');
        }

        let videoUrl = '';
        if (videoInput.trim()) {
            videoUrl = videoInput.replace('watch?v=', 'embed/');
        }

        const newRecipe = {
            name,
            description,
            cookingTime: time,
            serves: Number(serves),
            image,
            videoUrl, 
            ingredients,
            steps,
            tags: selectedTags.length > 0 ? selectedTags : ["Custom"]
        };

        try {
            await api.post('/recipes', newRecipe);
            setSuccess('Your culinary creation has been published!');
            setTimeout(() => navigate('/explore'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to publish recipe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-recipe-page page-layout">
            <header className="add-header">
                <span className="add-tagline">Recipe Studio</span>
                <h1 className="add-title">Publish Your Creation</h1>
                <p className="add-desc">Share your culinary secrets with the CookSpace community.</p>
            </header>

            <div className="add-container">
                <form className="add-form" onSubmit={handleSubmit}>
                    {error && <div className="status-msg error">{error}</div>}
                    {success && <div className="status-msg success">{success}</div>}

                    <section className="form-section">
                        <h3 className="section-heading">The Basics</h3>
                        <div className="form-grid">
                            <div className="field-group full">
                                <label>Recipe Name</label>
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="e.g. Saffron Risotto with Asparagus" 
                                    required 
                                />
                            </div>
                            <div className="field-group full">
                                <label>Short Description</label>
                                <input 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    placeholder="Tell the story of your dish..." 
                                    required 
                                />
                            </div>
                            <div className="field-group">
                                <label>Cooking Time</label>
                                <input 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    placeholder="e.g. 45 mins" 
                                    required 
                                />
                            </div>
                            <div className="field-group">
                                <label>Standard Servings</label>
                                <select value={serves} onChange={(e) => setServes(e.target.value)} required>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Person' : 'People'}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field-group full">
                                <label>Select Categories / Tags</label>
                                <div className="tag-select-container">
                                    <div className="form-selected-pills">
                                        {selectedTags.map(tag => (
                                            <span key={tag} className="form-tag-pill" onClick={() => toggleTag(tag)}>
                                                {tag} <span className="pill-close">×</span>
                                            </span>
                                        ))}
                                    </div>
                                    <select 
                                        className="form-tag-dropdown"
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val && !selectedTags.includes(val)) {
                                                setSelectedTags([...selectedTags, val]);
                                            }
                                            e.target.value = "";
                                        }}
                                    >
                                        <option value="">+ Select tags...</option>
                                        {availableTags.filter(t => !selectedTags.includes(t)).map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3 className="section-heading">Visuals & Media</h3>
                        <div className="form-grid">
                            <div className="field-group">
                                <label>Cover Image</label>
                                <div className="file-upload-wrapper">
                                    <input type="file" accept="image/*" ref={fileRef} onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onload = () => setImage(reader.result);
                                        reader.readAsDataURL(file);
                                    }} required />
                                    <div className="upload-placeholder">
                                        {image ? 'Change Image' : 'Select a high-quality photo'}
                                    </div>
                                </div>
                            </div>
                            <div className="field-group">
                                <label>YouTube Link (Optional)</label>
                                <input 
                                    type="text" 
                                    value={videoInput} 
                                    placeholder="https://youtube.com/watch?v=..." 
                                    onChange={(e) => setVideoInput(e.target.value)} 
                                />
                            </div>
                        </div>
                        {image && (
                            <div className="image-preview-container">
                                <img src={image} alt="Preview" />
                            </div>
                        )}
                    </section>

                    <section className="form-section">
                        <h3 className="section-heading">Ingredients</h3>
                        <div className="ingredient-input-row">
                            <input 
                                value={ingredientName} 
                                onChange={(e) => setIngredientName(e.target.value)} 
                                placeholder="Ingredient name..." 
                            />
                            <input 
                                value={ingredientQty} 
                                onChange={(e) => setIngredientQty(e.target.value)} 
                                placeholder="Quantity..." 
                            />
                            <button type="button" className="add-ing-btn" onClick={handleAddIngredient}>Add</button>
                        </div>
                        
                        {ingredients.length > 0 && (
                            <ul className="ing-preview-list">
                                {ingredients.map((ing, idx) => (
                                    <li key={idx}>
                                        <span>{ing.item} — {ing.quantity}</span>
                                        <button type="button" onClick={() => removeIngredient(idx)}>×</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section className="form-section">
                        <h3 className="section-heading">Preparation Steps</h3>
                        <div className="field-group full">
                            <label>Steps (One per line)</label>
                            <textarea 
                                value={stepsText} 
                                onChange={(e) => setStepsText(e.target.value)} 
                                rows={8} 
                                placeholder="1. Begin by preheating your oven to 200°C..." 
                                required 
                            />
                        </div>
                    </section>

                    <footer className="form-footer">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Recipe'}
                        </button>
                        <button type="button" className="reset-btn" onClick={() => window.location.reload()}>
                            Clear All
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
