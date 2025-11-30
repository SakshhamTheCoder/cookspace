const STORAGE_KEY = 'recipes';

export function getLocalRecipes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

export function saveLocalRecipe(recipe) {
    const recipes = getLocalRecipes();
    recipes.push(recipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function clearLocalRecipes() {
    localStorage.removeItem(STORAGE_KEY);
}

export function deleteLocalRecipe(id) {
    const recipes = getLocalRecipes();
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
}

