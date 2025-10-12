// API utilities for fetching meals by ingredient

export async function fetchMealsByIngredient(ingredient) {
  const trimmed = (ingredient || "").trim();
  if (!trimmed) return { meals: null, error: "Please enter an ingredient." };

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { meals: data.meals || null, error: null };
  } catch (err) {
    return { meals: null, error: "Error fetching recipes. Please try again later." };
  }
}

export async function fetchDrinksByIngredient(ingredient) {
  const trimmed = (ingredient || "").trim();
  if (!trimmed) return { drinks: null, error: "Please enter an ingredient." };

  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { drinks: data.drinks || null, error: null };
  } catch (err) {
    return { drinks: null, error: "Error fetching cocktails. Please try again later." };
  }
}

// Fetch full details by ID
export async function fetchMealById(id) {
  const trimmed = (id || "").trim();
  if (!trimmed) return { meal: null, error: "Missing meal id." };
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { meal: (data.meals && data.meals[0]) || null, error: null };
  } catch (err) {
    return { meal: null, error: "Error fetching meal details." };
  }
}

export async function fetchDrinkById(id) {
  const trimmed = (id || "").trim();
  if (!trimmed) return { drink: null, error: "Missing drink id." };
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { drink: (data.drinks && data.drinks[0]) || null, error: null };
  } catch (err) {
    return { drink: null, error: "Error fetching drink details." };
  }
}
