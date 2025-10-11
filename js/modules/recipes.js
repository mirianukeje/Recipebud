// Actions related to recipes

export function viewRecipe(id) {
  if (!id) return;
  window.open(`https://www.themealdb.com/meal/${id}`, "_blank");
}

export function viewCocktail(id) {
  if (!id) return;
  window.open(`https://www.thecocktaildb.com/drink/${id}`, "_blank");
}
