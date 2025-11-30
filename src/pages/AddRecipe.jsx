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
    const [serves, setServes] = useState('');
    const [stepsText, setStepsText] = useState('');

    const [image, setImage] = useState('');
    const fileRef = useRef(null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim() || !description.trim() || !time.trim() || !serves.trim() || !stepsText.trim()) {
            return setError('Please fill in all fields.');
        }

        const steps = stepsText
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        if (steps.length === 0) return setError('Please add at least one step.');

        const newRecipe = {
            id: getAllRecipes().length + 1,
            isLocal: true,
            name,
            description,
            timeToCook: time,
            serves: serves,
            image: image,
            steps,
        };

        saveLocalRecipe(newRecipe);

        setSuccess('Recipe added! Redirecting...');
        setTimeout(() => navigate('/'), 900);
    };

    return (
        <div className="recipe-page-layout">
            <div className="add-form-container">
                <form className="add-recipe-form" onSubmit={handleSubmit}>
                    <h2>Add a Recipe</h2>

                    {error && <div className="form-error">{error}</div>}
                    {success && <div className="form-success">{success}</div>}

                    <label>
                        Name
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Chocolate Cake"
                            required
                        />
                    </label>

                    <label>
                        Description
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A short description"
                            required
                        />
                    </label>

                    <div className="form-row">
                        <label>
                            Time to Cook
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                placeholder="e.g. 45 mins"
                                required
                            />
                        </label>

                        <label>
                            Serves
                            <input
                                value={serves}
                                onChange={(e) => setServes(e.target.value)}
                                placeholder="e.g. 4"
                                required
                            />
                        </label>
                    </div>

                    <label>
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

                    {image && (
                        <div className="image-preview">
                            <img src={image} alt="Preview" />
                        </div>
                    )}

                    <label>
                        Steps (one per line)
                        <textarea
                            value={stepsText}
                            onChange={(e) => setStepsText(e.target.value)}
                            rows={6}
                            placeholder={'1. Preheat oven...\n2. Mix ingredients...\n3. Bake...'}
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
                                setServes('');
                                setStepsText('');
                                setImage('');
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

