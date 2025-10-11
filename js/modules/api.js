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

