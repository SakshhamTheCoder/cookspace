import express from 'express';
import { getBookmarks, addBookmark, removeBookmark, getMyRecipes } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All bookmark/user routes should be protected
router.get('/bookmarks', protect, getBookmarks);
router.post('/bookmark/:recipeId', protect, addBookmark);
router.delete('/bookmark/:recipeId', protect, removeBookmark);

// Recipe Ownership Route
router.get('/my-recipes', protect, getMyRecipes);

export default router;
