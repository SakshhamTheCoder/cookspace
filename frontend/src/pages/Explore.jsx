import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './styles/explore.css';

const Explore = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [matchAll, setMatchAll] = useState(false);
    const [ingredient, setIngredient] = useState('');
    const [ingredientCount, setIngredientCount] = useState('');

    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ limit: 50 });
            if (search.trim())          params.set('search', search.trim());
            if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
            if (selectedTags.length > 0 && matchAll) params.set('matchAll', 'true');
            if (ingredient.trim())      params.set('ingredient', ingredient.trim());
            if (ingredientCount !== '') params.set('ingredientCount', ingredientCount);

            const res = await api.get(`/recipes?${params.toString()}`);
            setAllRecipes(res.data.recipes);
            setTotal(res.data.total);
        } catch (error) {
            console.error('Failed to fetch recipes', error);
        } finally {
            setLoading(false);
        }
    }, [search, selectedTags, matchAll, ingredient, ingredientCount]);

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
        fetchRecipes();
    }, [fetchRecipes]);

    const handleReset = () => {
        setSearch('');
        setSelectedTags([]);
        setMatchAll(false);
        setIngredient('');
        setIngredientCount('');
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const hasFilters = search || selectedTags.length > 0 || ingredient || ingredientCount !== '';

    return (
        <div className="explore-container page-layout">
            <header className="explore-header">
                <div className="header-text">
                    <span className="sub-title">Culinary Library</span>
                    <h1 className="main-title">Explore the Collection</h1>
                </div>
                <div className="header-stats">
                    <span className="count-badge">{total} Recipes Available</span>
                </div>
            </header>

            <section className="filter-shelf">
                <div className="filter-inner">
                    <div className="filter-main">
                        <div className="input-group">
                            <label>Recipe Name</label>
                            <input
                                placeholder="Search by name..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label>Tags</label>
                            <div className="tag-select-wrapper">
                                <div className="selected-pills">
                                    {selectedTags.map(tag => (
                                        <span key={tag} className="tag-pill" onClick={() => toggleTag(tag)}>
                                            {tag} <span className="pill-close">×</span>
                                        </span>
                                    ))}
                                </div>
                                <select 
                                    className="tag-dropdown" 
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val && !selectedTags.includes(val)) {
                                            setSelectedTags([...selectedTags, val]);
                                        }
                                        e.target.value = ""; 
                                    }}
                                >
                                    <option value="">+ Add tags...</option>
                                    {availableTags.filter(t => !selectedTags.includes(t)).map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input-group toggle-group">
                            <label>Match Mode</label>
                            <div className="mode-toggle" onClick={() => setMatchAll(!matchAll)}>
                                <div className={`toggle-pill ${matchAll ? 'active' : ''}`}>
                                    <span>Any</span>
                                    <span>All</span>
                                </div>
                                <span className="mode-text">{matchAll ? 'Strict' : 'Flexible'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="filter-advanced">
                        <div className="input-group">
                            <label>Includes Ingredient</label>
                            <input
                                placeholder="e.g. Garlic, Cream..."
                                value={ingredient}
                                onChange={e => setIngredient(e.target.value)}
                            />
                        </div>
                        <div className="input-group count-group">
                            <label>Total Ingredients</label>
                            <input
                                type="number"
                                placeholder="Exact count"
                                value={ingredientCount}
                                onChange={e => setIngredientCount(e.target.value)}
                            />
                        </div>
                        <div className="filter-actions">
                            <button className="apply-btn" onClick={fetchRecipes}>Refresh</button>
                            {hasFilters && (
                                <button className="clear-btn" onClick={handleReset}>Clear All</button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="loading-grid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="skeleton-card"></div>
                    ))}
                </div>
            ) : (
                <div className="explore-grid">
                    {allRecipes.length === 0 ? (
                        <div className="no-results">
                            <h2 className="display-font">Empty Pantry</h2>
                            <p>We couldn't find anything matching your filters.</p>
                            <button className="primary-button" onClick={handleReset}>Reset Filters</button>
                        </div>
                    ) : (
                        allRecipes.map((item, index) => (
                            <Link 
                                to={`/recipe/${item._id}`} 
                                key={item._id} 
                                className="explore-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="card-visual">
                                    <img src={item.image} alt={item.name} loading="lazy" />
                                    <div className="card-badge">⏱ {item.cookingTime}</div>
                                </div>
                                <div className="card-details">
                                    <span className="card-author-mini">By {item.author?.email || 'Chef'}</span>
                                    <h3 className="card-name">{item.name}</h3>
                                    <p className="card-summary">{item.description}</p>
                                    <div className="card-metadata">
                                        <span className="servings">🍽 {item.serves} Serves</span>
                                        <div className="card-tags">
                                            {item.tags?.slice(0, 2).map(t => (
                                                <span key={t} className="mini-tag">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Explore;
