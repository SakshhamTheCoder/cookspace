import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links navbar-links-left">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
                    HOME
                </NavLink>
                <NavLink to="/explore" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
                    EXPLORE
                </NavLink>
            </div>

            <div className="navbar-logo">COOKSPACE</div>

            <div className="navbar-links navbar-links-right">
                <NavLink to="/add" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>
                    ADD RECIPE
                </NavLink>
                <NavLink
                    to="/bookmarks"
                    className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
                >
                    BOOKMARKS
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;

