import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    item: { type: String, required: true },
    quantity: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        description: { type: String, required: true },
        cookingTime: { type: String, required: true },
        serves: { type: Number, required: true },
        ingredients: [ingredientSchema],
        steps: [{ type: String, required: true }],
        image: { type: String },
        videoUrl: { type: String },
        tags: [{ type: String }],
        bookmarksCount: { type: Number, default: 0 },
        cookedCount:  { type: Number, default: 0 },
        lastCookedAt: { type: Date },
        minServes:    { type: Number },
        maxServes:    { type: Number },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

recipeSchema.index({ tags: 1, cookingTime: 1 });

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
