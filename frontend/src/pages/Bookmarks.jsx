import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './styles/bookmarks.css';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const res = await api.get('/users/bookmarks');
                setBookmarks(res.data);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

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

export default Bookmarks;
