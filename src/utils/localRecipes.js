const BOOKMARKS_KEY = 'bookmarks';

export function getBookmarks() {
    try {
        return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
    } catch {
        return [];
    }
}

export function isBookmarked(id) {
    const bookmarks = getBookmarks();
    return bookmarks.some((r) => r.id === id);
}

export function saveBookmark(recipe) {
    const bookmarks = getBookmarks();
    if (!bookmarks.some((r) => r.id === recipe.id)) {
        bookmarks.push(recipe);
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
}

export function deleteBookmark(id) {
    const bookmarks = getBookmarks();
    const updated = bookmarks.filter((r) => r.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
}

export function clearBookmarks() {
    localStorage.removeItem(BOOKMARKS_KEY);
}

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

