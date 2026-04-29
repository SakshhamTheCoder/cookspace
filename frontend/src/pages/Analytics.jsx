import { useEffect, useState } from 'react';
import api from '../utils/api';
import './styles/analytics.css';

const Analytics = () => {
    const [topTags, setTopTags] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const [tagsRes, statsRes] = await Promise.all([
                    api.get('/recipes/stats/top-tags'),
                    api.get('/recipes/stats/avg-time')
                ]);
                setTopTags(tagsRes.data);
                setStats(statsRes.data[0]);
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

    return (
        <div className="analytics-page page-layout">
            <header className="analytics-header">
                <h1 className="analytics-title">Culinary Intelligence</h1>
                <p className="analytics-desc">Real-time aggregation of global recipe trends and engagement metrics.</p>
            </header>

            <div className="analytics-grid">
                <section className="analytics-card main-stats">
                    <h3 className="card-title">Library Overview</h3>
                    <div className="stats-row">
                        <div className="stat-box">
                            <span className="stat-value">{stats?.totalRecipes || 0}</span>
                            <span className="stat-label">Total Recipes</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-value">{stats?.totalCooks || 0}</span>
                            <span className="stat-label">Total Cooks</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-value">{stats?.avgBookmarks || 0}</span>
                            <span className="stat-label">Avg. Bookmarks</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-value">{stats?.avgCookedCount || 0}</span>
                            <span className="stat-label">Avg. Cooked</span>
                        </div>
                    </div>
                    <p className="card-note">Aggregated using MongoDB <b>$group</b>, <b>$avg</b>, and <b>$sum</b> operators across the entire collection.</p>
                </section>

                <section className="analytics-card trending-tags">
                    <h3 className="card-title">Trending Categories</h3>
                    <div className="tags-list">
                        {topTags.map((tag, index) => (
                            <div key={tag._id} className="tag-row">
                                <span className="tag-rank">#{index + 1}</span>
                                <span className="tag-name">{tag._id}</span>
                                <div className="tag-bar-container">
                                    <div 
                                        className="tag-bar" 
                                        style={{ width: `${(tag.count / topTags[0].count) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="tag-count">{tag.count}</span>
                            </div>
                        ))}
                    </div>
                    <p className="card-note">Computed via a multi-stage <b>$unwind</b> and <b>$group</b> aggregation pipeline.</p>
                </section>
            </div>
        </div>
    );
};

export default Analytics;
