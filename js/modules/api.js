// API utilities for fetching meals by ingredient
import { getCache, setCache } from './cache.js';

const SEARCH_TTL = 6 * 60 * 60 * 1000; // 6 hours
const DETAILS_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchMealsByIngredient(ingredient) {
  const trimmed = (ingredient || "").trim();
  if (!trimmed) return { meals: null, error: "Please enter an ingredient." };

  const cacheKey = `meals:byIng:${trimmed.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached !== null) return { meals: cached, error: null };

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const meals = data.meals || null;
    setCache(cacheKey, meals, SEARCH_TTL);
    return { meals, error: null };
  } catch (err) {
    return { meals: null, error: "Error fetching recipes. Please try again later." };
  }
}

export async function fetchDrinksByIngredient(ingredient) {
  const trimmed = (ingredient || "").trim();
  if (!trimmed) return { drinks: null, error: "Please enter an ingredient." };

  const cacheKey = `drinks:byIng:${trimmed.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached !== null) return { drinks: cached, error: null };

  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const drinks = data.drinks || null;
    setCache(cacheKey, drinks, SEARCH_TTL);
    return { drinks, error: null };
  } catch (err) {
    return { drinks: null, error: "Error fetching cocktails. Please try again later." };
  }
}

// Fetch full details by ID
export async function fetchMealById(id) {
  const trimmed = (id || "").trim();
  if (!trimmed) return { meal: null, error: "Missing meal id." };
  try {
    const cacheKey = `meal:byId:${trimmed}`;
    const cached = getCache(cacheKey);
    if (cached !== null) return { meal: cached, error: null };

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const meal = (data.meals && data.meals[0]) || null;
    setCache(cacheKey, meal, DETAILS_TTL);
    return { meal, error: null };
  } catch (err) {
    return { meal: null, error: "Error fetching meal details." };
  }
}

export async function fetchDrinkById(id) {
  const trimmed = (id || "").trim();
  if (!trimmed) return { drink: null, error: "Missing drink id." };
  try {
    const cacheKey = `drink:byId:${trimmed}`;
    const cached = getCache(cacheKey);
    if (cached !== null) return { drink: cached, error: null };

    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const drink = (data.drinks && data.drinks[0]) || null;
    setCache(cacheKey, drink, DETAILS_TTL);
    return { drink, error: null };
  } catch (err) {
    return { drink: null, error: "Error fetching drink details." };
  }
}
