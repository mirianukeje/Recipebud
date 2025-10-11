// UI helpers for rendering meals

export function displayMeals(meals, resultsEl) {
  if (!Array.isArray(meals) || meals.length === 0) {
    resultsEl.innerHTML = `<p style="text-align:center;">No recipes found.</p>`;
    return;
  }

  resultsEl.innerHTML = meals
    .map(
      (meal) => `
    <div class="meal-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-info">
        <h3>${meal.strMeal}</h3>
        <button class="view-btn" onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
        <button class="save-btn" onclick="saveRecipe('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">Save</button>
      </div>
    </div>
  `
    )
    .join("");
}

