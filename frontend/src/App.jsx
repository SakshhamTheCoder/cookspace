import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Analytics from './pages/Analytics';
import AddRecipe from './pages/AddRecipe';
import Recipe from './pages/Recipe';
import Bookmarks from './pages/Bookmarks';
import MyRecipes from './pages/MyRecipes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/add" element={ <ProtectedRoute><AddRecipe /></ProtectedRoute> } />
                <Route path="/edit/:id" element={ <ProtectedRoute><AddRecipe /></ProtectedRoute> } />
                <Route path="/bookmarks" element={ <ProtectedRoute><Bookmarks /></ProtectedRoute> } />
                <Route path="/my-recipes" element={ <ProtectedRoute><MyRecipes /></ProtectedRoute> } />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;
