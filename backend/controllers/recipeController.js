import Recipe from '../models/Recipe.js';

export const getRecipes = async (req, res) => {
    try {
        const { search, tags, matchAll, ingredient, ingredientCount, maxTime, limit = 10, skip = 0, sort = 'createdAt' } = req.query;
        let conditions = [];

        if (search) {
            conditions.push({ name: { $regex: search, $options: 'i' } });
        }

        if (tags) {
            const tagsArray = tags.split(',').map(t => t.trim());
            if (matchAll === 'true') {
                conditions.push({ tags: { $all: tagsArray } }); // $all
            } else {
                conditions.push({ tags: { $in: tagsArray } }); // $in
            }
        }

        if (ingredient) {
            conditions.push({
                ingredients: {
                    $elemMatch: { item: { $regex: ingredient, $options: 'i' } } // $elemMatch
                }
            });
        }

        if (ingredientCount) {
            conditions.push({ ingredients: { $size: Number(ingredientCount) } }); // $size
        }

        if (maxTime) {
            conditions.push({ cookingTime: { $lte: String(maxTime) } });
        }

        const query = conditions.length > 0 ? { $and: conditions } : {};

        const projection = { 
            name: 1, description: 1, cookingTime: 1, serves: 1, 
            image: 1, tags: 1, bookmarksCount: 1, cookedCount: 1,
            createdAt: 1, author: 1
        };

        const recipes = await Recipe.find(query, projection)
            .sort({ [sort]: -1 })
            .limit(Number(limit))
            .skip(Number(skip))
            .populate('author', 'email');

        const total = await Recipe.countDocuments(query);
        res.json({ recipes, total, limit: Number(limit), skip: Number(skip) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('author', 'email');
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRecipe = async (req, res) => {
    try {
        const recipeData = { ...req.body, author: req.user._id };
        const recipe = await Recipe.create(recipeData);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const { unset: fieldsToUnset, ...updateData } = req.body;
        const updateOps = { $set: updateData };

        if (fieldsToUnset && fieldsToUnset.length > 0) {
            const unsetMap = {};
            fieldsToUnset.forEach(f => { unsetMap[f] = ''; });
            updateOps.$unset = unsetMap; // $unset
        }

        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            updateOps,
            { new: true, runValidators: true }
        );
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        if (!recipe.author || recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const scaleRecipe = async (req, res) => {
    try {
        const { factor } = req.body;
        if (!factor || isNaN(factor) || Number(factor) <= 0) {
            return res.status(400).json({ message: 'Invalid factor' });
        }

        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $mul: { serves: Number(factor) } }, // $mul
            { new: true }
        );
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markCooked = async (req, res) => {
    try {
        const { serves } = req.body;
        if (!serves || isNaN(serves) || Number(serves) <= 0) {
            return res.status(400).json({ message: 'Invalid serves' });
        }

        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                $inc:         { cookedCount: 1 },            // $inc
                $min:         { minServes: Number(serves) },  // $min
                $max:         { maxServes: Number(serves) },  // $max
                $currentDate: { lastCookedAt: true },         // $currentDate
            },
            { new: true }
        );
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTags = async (req, res) => {
    try {
        const { tags } = req.body;
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: 'Invalid tags' });
        }

        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    tags: {
                        $each:  tags, // $each
                        $sort:  1,    // $sort
                        $slice: 15,   // $slice
                    }
                }
            },
            { new: true }
        );
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Recipe.distinct('tags');
        res.json(tags.sort());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTopTags = async (req, res) => {
    try {
        const tags = await Recipe.aggregate([
            { $unwind: '$tags' }, // $unwind
            { $group: { _id: '$tags', count: { $sum: 1 } } }, // $group
            { $sort: { count: -1 } }, // $sort
            { $limit: 10 }
        ]);
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAvgCookingTime = async (req, res) => {
    try {
        const stats = await Recipe.aggregate([
            {
                $group: {
                    _id: null,
                    avgBookmarks: { $avg: '$bookmarksCount' }, // $avg
                    totalRecipes: { $sum: 1 } // $sum
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
