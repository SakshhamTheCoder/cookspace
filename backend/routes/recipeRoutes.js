import express from 'express';
import { 
    getRecipes, 
    getRecipeById, 
    createRecipe, 
    updateRecipe, 
    deleteRecipe,
    getTopTags,
    getAvgCookingTime,
    scaleRecipe,
    markCooked,
    updateTags,
    getTags,
} from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/tags', getTags);
router.get('/stats/top-tags', getTopTags);
router.get('/stats/avg-time', getAvgCookingTime);

router.route('/').get(getRecipes).post(protect, createRecipe);
router.route('/:id').get(getRecipeById).put(protect, updateRecipe).delete(protect, deleteRecipe);

router.patch('/:id/scale',     protect, scaleRecipe);  
router.patch('/:id/cook-stat', protect, markCooked);   
router.patch('/:id/tags',      protect, updateTags);   

export default router;
