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
        <button class="save-btn" onclick="saveRecipe('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}', 'meal')">Save</button>
      </div>
    </div>
  `
    )
    .join("");
}

export function displayDrinks(drinks, resultsEl) {
  if (!Array.isArray(drinks) || drinks.length === 0) {
    resultsEl.innerHTML = `<p style="text-align:center;">No cocktails found.</p>`;
    return;
  }

  resultsEl.innerHTML = drinks
    .map(
      (drink) => `
    <div class="meal-card">
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
      <div class="meal-info">
        <h3>${drink.strDrink}</h3>
        <button class="view-btn" onclick="viewCocktail('${drink.idDrink}')">View Recipe</button>
        <button class="save-btn" onclick="saveRecipe('${drink.idDrink}', '${drink.strDrink}', '${drink.strDrinkThumb}', 'cocktail')">Save</button>
      </div>
    </div>
  `
    )
    .join("");
}
