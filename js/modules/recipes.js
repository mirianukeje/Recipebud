// Actions related to recipes

export function viewRecipe(id) {
  if (!id) return;
  window.location.href = `details.html?type=meal&id=${encodeURIComponent(id)}`;
}

export function viewCocktail(id) {
  if (!id) return;
  window.location.href = `details.html?type=cocktail&id=${encodeURIComponent(id)}`;
}
