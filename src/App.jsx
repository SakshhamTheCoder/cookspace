import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import AddRecipe from './pages/AddRecipe';
import Recipe from './pages/Recipe';
import Bookmarks from './pages/Bookmarks';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
        </Router>
    );
};

export default App;

