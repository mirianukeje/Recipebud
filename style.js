const ingredientInput = document.getElementById('ingredientInput');
const ingredientBtn = document.getElementById('ingredientBtn');
const results = document.getElementById('results');
const savedRecipesContainer = document.getElementById('savedRecipes');

let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

// Fetch recipes by ingredient
async function searchByIngredient() {
  const ingredient = ingredientInput.value.trim();
  if (!ingredient) {
    results.innerHTML = `<p style="text-align:center;">Please enter an ingredient 🍳</p>`;
    return;
  }

  results.innerHTML = `<p style="text-align:center;">Loading recipes...</p>`;

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await res.json();

    if (!data.meals) {
      results.innerHTML = `<p style="text-align:center;">No recipes found for "${ingredient}" 😢</p>`;
      return;
    }

    displayMeals(data.meals);
  } catch (error) {
    results.innerHTML = `<p style="text-align:center;">Error fetching recipes. Please try again later.</p>`;
  }
}

// Display recipes
function displayMeals(meals) {
  results.innerHTML = meals.map(meal => `
    <div class="meal-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-info">
        <h3>${meal.strMeal}</h3>
        <button class="view-btn" onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
        <button class="save-btn" onclick="saveRecipe('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">Save</button>
      </div>
    </div>
  `).join('');
}

// View recipe (opens new tab)
function viewRecipe(id) {
  window.open(`https://www.themealdb.com/meal/${id}`, '_blank');
}

// Save recipe to localStorage
function saveRecipe(id, name, image) {
  const exists = savedRecipes.find(r => r.id === id);
  if (exists) {
    alert('You already saved this recipe!');
    return;
  }

  const recipe = { id, name, image };
  savedRecipes.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  renderSavedRecipes();
  alert('Recipe saved! ❤️');
}

// Render saved recipes
function renderSavedRecipes() {
  if (savedRecipes.length === 0) {
    savedRecipesContainer.innerHTML = `<p style="text-align:center;">No saved recipes yet.</p>`;
    return;
  }

  savedRecipesContainer.innerHTML = savedRecipes.map(meal => `
    <div class="meal-card">
      <img src="${meal.image}" alt="${meal.name}">
      <div class="meal-info">
        <h3>${meal.name}</h3>
        <button class="view-btn" onclick="viewRecipe('${meal.id}')">View Recipe</button>
      </div>
    </div>
  `).join('');
}

ingredientBtn.addEventListener('click', searchByIngredient);
ingredientInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchByIngredient();
});

// Load saved recipes on page load
window.onload = renderSavedRecipes;
