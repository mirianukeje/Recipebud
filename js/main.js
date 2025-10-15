import { fetchMealsByIngredient, fetchDrinksByIngredient } from './modules/api.js';
import { displayMeals, displayDrinks } from './modules/ui.js';
import { saveRecipe as saveRecipeToStorage, renderSavedRecipes, removeRecipe as removeRecipeFromStorage } from './modules/storage.js';
import { viewRecipe, viewCocktail } from './modules/recipes.js';

const ingredientInput = document.getElementById('ingredientInput');
const ingredientBtn = document.getElementById('ingredientBtn');
const results = document.getElementById('results');
const savedRecipesContainer = document.getElementById('savedRecipes');

async function searchByIngredient() {
  const ingredient = ingredientInput.value.trim();
  const typeInput = document.querySelector('input[name="searchType"]:checked');
  const searchType = typeInput ? typeInput.value : 'meal';

  if (!ingredient) {
    results.innerHTML = `<p style="text-align:center;">Please enter an ingredient.</p>`;
    return;
  }

  results.innerHTML = `<p style="text-align:center;">Loading recipes...</p>`;

  if (searchType === 'cocktail') {
    const { drinks, error } = await fetchDrinksByIngredient(ingredient);
    if (error) {
      results.innerHTML = `<p style="text-align:center;">${error}</p>`;
      return;
    }
    if (!drinks) {
      results.innerHTML = `<p style="text-align:center;">No cocktails found for "${ingredient}"</p>`;
      return;
    }
    displayDrinks(drinks, results);
  } else {
    const { meals, error } = await fetchMealsByIngredient(ingredient);
    if (error) {
      results.innerHTML = `<p style="text-align:center;">${error}</p>`;
      return;
    }
    if (!meals) {
      results.innerHTML = `<p style="text-align:center;">No recipes found for "${ingredient}"</p>`;
      return;
    }
    displayMeals(meals, results);
  }
}

ingredientBtn.addEventListener('click', searchByIngredient);
ingredientInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchByIngredient();
});

// Delegate save button clicks to avoid inline handler quoting issues
results.addEventListener('click', (e) => {
  const btn = e.target.closest('.save-btn');
  if (!btn) return;
  const { id, name, image, type } = btn.dataset;
  if (!id) return;
  const changed = saveRecipeToStorage(id, name || '', image || '', type || 'meal');
  if (changed) renderSavedRecipes(savedRecipesContainer);
});

// Delegate remove button clicks in saved section
savedRecipesContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;
  const { id } = btn.dataset;
  if (!id) return;
  const removed = removeRecipeFromStorage(id);
  if (removed) renderSavedRecipes(savedRecipesContainer);
});

// Expose functions used by inline onclick handlers
window.viewRecipe = viewRecipe;
window.viewCocktail = viewCocktail;
// Keeping window.saveRecipe for backward compatibility if referenced elsewhere
window.saveRecipe = (id, name, image, type = 'meal') => {
  const changed = saveRecipeToStorage(id, name, image, type);
  if (changed) renderSavedRecipes(savedRecipesContainer);
};

// Load saved recipes on page load
window.addEventListener('load', () => {
  renderSavedRecipes(savedRecipesContainer);
});
