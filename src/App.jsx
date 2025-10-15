import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AddRecipe from './pages/AddRecipe';
import Recipe from './pages/Recipe';
import SavedRecipe from './pages/SavedRecipe';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/saved" element={<SavedRecipe />} />
            </Routes>
        </Router>
    );
};

export default App;

