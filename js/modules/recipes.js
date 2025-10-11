// Actions related to recipes

export function viewRecipe(id) {
  if (!id) return;
  window.open(`https://www.themealdb.com/meal/${id}`, "_blank");
}

