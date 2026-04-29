import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

// GET /users/bookmarks
export const getBookmarks = async (req, res) => {
    try {
        // Populate embedded documents
        const user = await User.findById(req.user._id).populate('bookmarks');
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /users/bookmark/:recipeId
export const addBookmark = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const user = await User.findById(req.user._id);

        if (user.bookmarks.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe already bookmarked' });
        }

        // 1. Add to user bookmarks using $addToSet — prevents duplicates at the DB level
        await User.updateOne({ _id: user._id }, { $addToSet: { bookmarks: recipeId } });  // $addToSet

        // 2. Increment Recipe bookmark count
        await Recipe.updateOne({ _id: recipeId }, { $inc: { bookmarksCount: 1 } });

        res.json({ message: 'Bookmark added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /users/bookmark/:recipeId
export const removeBookmark = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const user = await User.findById(req.user._id);

        if (!user.bookmarks.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe not bookmarked' });
        }

        // 1. Remove from user bookmarks (using $pull array operator)
        await User.updateOne({ _id: user._id }, { $pull: { bookmarks: recipeId } });

        // 2. Decrement Recipe bookmark count
        await Recipe.updateOne({ _id: recipeId }, { $inc: { bookmarksCount: -1 } });

        res.json({ message: 'Bookmark removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /users/my-recipes
export const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.user._id }).sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
