import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="main-nav">
            <div className="nav-container">
                <div className="nav-group left">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Home
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Explore
                    </NavLink>
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        Analytics
                    </NavLink>
                </div>

                <Link to="/" className="nav-logo">
                    CookSpace
                </Link>

                <div className="nav-group right">
                    {user ? (
                        <>
                            <NavLink to="/add" className="nav-publish-btn">
                                <span>+</span> Create
                            </NavLink>
                            <NavLink to="/bookmarks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                Bookmarks
                            </NavLink>
                            <NavLink to="/my-recipes" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                Studio
                            </NavLink>
                            <button onClick={logout} className="nav-auth-btn logout">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item">Login</Link>
                            <Link to="/register" className="nav-auth-btn signup">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
