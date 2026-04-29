import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './styles/auth.css';

const Signup = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try a different email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page page-layout">
            <div className="auth-container">
                <header className="auth-header">
                    <h1 className="auth-title">Join CookSpace</h1>
                    <p className="auth-subtitle">Start sharing and discovering recipes today.</p>
                </header>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && <div className="auth-error">{error}</div>}
                    
                    <div className="auth-field">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="chef@cookspace.com"
                            required 
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Minimum 6 characters"
                            required 
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <footer className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login" className="auth-link">Sign in instead</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Signup;
