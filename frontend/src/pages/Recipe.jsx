import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import './styles/recipe.css';

const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookmarkState, setBookmarkState] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Feature states
    const [cookServes, setCookServes] = useState('');
    const [cookMsg, setCookMsg] = useState('');
    const [cookLoading, setCookLoading] = useState(false);
    const [scaleFactor, setScaleFactor] = useState('');
    const [scaleMsg, setScaleMsg] = useState('');
    const [scaleLoading, setScaleLoading] = useState(false);
    const [newTagsInput, setNewTagsInput] = useState('');
    const [tagsMsg, setTagsMsg] = useState('');
    const [tagsLoading, setTagsLoading] = useState(false);

    const isOwner = user && recipe && recipe.author === user._id;

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await api.get(`/recipes/${id}`);
                setRecipe(res.data);
                if (user && user.bookmarks) {
                    setBookmarkState(user.bookmarks.includes(id));
                }
            } catch (error) {
                console.error('Error fetching recipe', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id, user]);

    const executeDelete = async () => {
        try {
            await api.delete(`/recipes/${id}`);
            navigate('/explore');
        } catch {
            alert('Failed to delete.');
        }
    };

    const handleBookmark = async () => {
        if (!user) return navigate('/login');
        try {
            if (bookmarkState) {
                await api.delete(`/users/bookmark/${id}`);
                setBookmarkState(false);
                const index = user.bookmarks.indexOf(id);
                if (index > -1) user.bookmarks.splice(index, 1);
            } else {
                await api.post(`/users/bookmark/${id}`);
                setBookmarkState(true);
                user.bookmarks.push(id);
            }
            localStorage.setItem('authData', JSON.stringify(user));
        } catch (error) {
            console.error('Bookmark failed', error);
        }
    };

    const handleMarkCooked = async () => {
        if (!user) return navigate('/login');
        if (!cookServes || Number(cookServes) <= 0) return setCookMsg('Invalid serves.');
        setCookLoading(true);
        try {
            const res = await api.patch(`/recipes/${id}/cook-stat`, { serves: Number(cookServes) });
            setRecipe(res.data);
            setCookMsg('✓ Session logged!');
            setCookServes('');
        } catch {
            setCookMsg('× Error logging.');
        } finally {
            setCookLoading(false);
        }
    };

    const handleScale = async () => {
        if (!scaleFactor || Number(scaleFactor) <= 0) return setScaleMsg('Invalid multiplier.');
        setScaleLoading(true);
        try {
            const res = await api.patch(`/recipes/${id}/scale`, { factor: Number(scaleFactor) });
            setRecipe(res.data);
            setScaleMsg(`✓ Scaled to ${res.data.serves}.`);
            setScaleFactor('');
        } catch {
            setScaleMsg('× Error scaling.');
        } finally {
            setScaleLoading(false);
        }
    };

    const handleUpdateTags = async () => {
        const tags = newTagsInput.split(',').map(t => t.trim()).filter(Boolean);
        if (tags.length === 0) return setTagsMsg('Invalid tags.');
        setTagsLoading(true);
        try {
            const res = await api.patch(`/recipes/${id}/tags`, { tags });
            setRecipe(res.data);
            setTagsMsg('✓ Tags updated.');
            setNewTagsInput('');
        } catch {
            setTagsMsg('× Error updating.');
        } finally {
            setTagsLoading(false);
        }
    };

    const handleRemoveVideo = async () => {
        try {
            const res = await api.put(`/recipes/${id}`, { unset: ['videoUrl'] });
            setRecipe(res.data);
        } catch {
            alert('Failed to remove.');
        }
    };

    if (loading) return <div className="page-loading"><div className="spinner"></div></div>;
    if (!recipe) return <div className="page-layout no-recipe"><h2>Recipe not found</h2></div>;

    return (
        <article className="recipe-page">
            <header className="recipe-header">
                <div className="header-meta">
                    <span className="recipe-tagline">By {recipe.author?.email || 'Anonymous Chef'}</span>
                    <h1 className="recipe-title">{recipe.name}</h1>
                    <p className="recipe-description">{recipe.description}</p>
                    
                    <div className="recipe-pills">
                        <div className="pill">⏱ {recipe.cookingTime}</div>
                        <div className="pill">🍽 {recipe.serves} Servings</div>
                        <div className="pill save-pill" onClick={handleBookmark}>
                            {bookmarkState ? '🔖 Saved' : '⭐ Save'}
                        </div>
                    </div>
                </div>

                <div className="recipe-hero">
                    {recipe.videoUrl ? (
                        <div className="video-wrapper">
                            <iframe src={recipe.videoUrl} title="Recipe Video" frameBorder="0" allowFullScreen />
                        </div>
                    ) : (
                        <div className="image-wrapper">
                            <img src={recipe.image} alt={recipe.name} />
                        </div>
                    )}
                </div>
            </header>

            <div className="recipe-body">
                <aside className="recipe-sidebar">
                    <section className="stats-box">
                        <h3 className="sidebar-title">Chef's Stats</h3>
                        <div className="stat-grid">
                            <div className="stat-item">
                                <label>Cooked</label>
                                <span>{recipe.cookedCount}×</span>
                            </div>
                            <div className="stat-item">
                                <label>Smallest Batch</label>
                                <span>{recipe.minServes || '-'}</span>
                            </div>
                            <div className="stat-item">
                                <label>Largest Batch</label>
                                <span>{recipe.maxServes || '-'}</span>
                            </div>
                        </div>
                        {recipe.lastCookedAt && (
                            <p className="last-cooked">Last made {new Date(recipe.lastCookedAt).toLocaleDateString()}</p>
                        )}
                    </section>

                    {/* Community Tool - Log Cook Session (Available to all users) */}
                    <section className="cook-tool-box">
                        <h3 className="sidebar-title">Cooked this?</h3>
                        <p className="tool-desc">Log your session to contribute to the chef's stats!</p>
                        <div className="tool-input">
                            <input type="number" placeholder="Serves..." value={cookServes} onChange={e => setCookServes(e.target.value)} />
                            <button onClick={handleMarkCooked}>Log</button>
                        </div>
                        {cookMsg && <span className="tool-feedback">{cookMsg}</span>}
                    </section>

                    <section className="ingredients-box">
                        <h3 className="sidebar-title">Ingredients</h3>
                        <ul className="ingredient-list">
                            {recipe.ingredients?.map((ing, i) => (
                                <li key={i}>
                                    <span className="ing-name">{ing.item}</span>
                                    <span className="ing-qty">{ing.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {recipe.tags?.length > 0 && (
                        <section className="tags-box">
                            <h3 className="sidebar-title">Categories</h3>
                            <div className="tag-cloud">
                                {recipe.tags.map(t => <span key={t} className="cloud-tag">{t}</span>)}
                            </div>
                        </section>
                    )}
                </aside>

                <main className="recipe-instructions">
                    <h2 className="section-heading">Preparation Steps</h2>
                    <div className="steps-container">
                        {recipe.steps?.map((step, i) => (
                            <div key={i} className="step-item">
                                <div className="step-number">{i + 1}</div>
                                <p className="step-text">{step}</p>
                            </div>
                        ))}
                    </div>

                    {isOwner && (
                        <section className="management-zone">
                            <div className="zone-header">
                                <h2 className="section-heading">Kitchen Studio</h2>
                                <p>Manage your culinary intellectual property.</p>
                            </div>

                            <div className="tool-grid">
                                <div className="tool-card">
                                    <h4>Scale Serving</h4>
                                    <p className="tool-card-desc">Adjust the serves in-place using $mul.</p>
                                    <div className="tool-input">
                                        <input type="number" placeholder="Factor..." value={scaleFactor} onChange={e => setScaleFactor(e.target.value)} />
                                        <button onClick={handleScale}>Adjust</button>
                                    </div>
                                    {scaleMsg && <span className="tool-feedback">{scaleMsg}</span>}
                                </div>

                                <div className="tool-card">
                                    <h4>Update Tags</h4>
                                    <p className="tool-card-desc">Push new tags using $each, $sort, $slice.</p>
                                    <div className="tool-input">
                                        <input placeholder="Commas..." value={newTagsInput} onChange={e => setNewTagsInput(e.target.value)} />
                                        <button onClick={handleUpdateTags}>Save</button>
                                    </div>
                                    {tagsMsg && <span className="tool-feedback">{tagsMsg}</span>}
                                </div>

                                {recipe.videoUrl && (
                                    <div className="tool-card danger">
                                        <h4>Media Control</h4>
                                        <p className="tool-card-desc">Clear videoUrl using $unset.</p>
                                        <button className="danger-btn" onClick={handleRemoveVideo}>Remove Video</button>
                                    </div>
                                )}
                            </div>

                            <div className="danger-zone">
                                <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>Delete Recipe Permanently</button>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {showDeleteConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-dialog">
                        <h3>Irreversible Action</h3>
                        <p>This will permanently remove <b>{recipe.name}</b> from the global library. Are you absolutely certain?</p>
                        <div className="dialog-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>Keep Recipe</button>
                            <button className="confirm-btn" onClick={executeDelete}>Confirm Deletion</button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

export default Recipe;
