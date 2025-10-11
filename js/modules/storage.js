// Saved recipes management using localStorage

let savedRecipes = [];

function loadSaved() {
  try {
    const raw = localStorage.getItem("savedRecipes");
    savedRecipes = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(savedRecipes)) savedRecipes = [];
  } catch {
    savedRecipes = [];
  }
}

function persist() {
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
}

loadSaved();

export function saveRecipe(id, name, image) {
  const exists = savedRecipes.find((r) => r.id === id);
  if (exists) {
    alert("You already saved this recipe!");
    return false;
  }

  savedRecipes.push({ id, name, image });
  persist();
  alert("Recipe saved!");
  return true;
}

export function renderSavedRecipes(containerEl) {
  // Always refresh from storage in case of external changes
  loadSaved();

  if (!containerEl) return;
  if (savedRecipes.length === 0) {
    containerEl.innerHTML = `<p style="text-align:center;">No saved recipes yet.</p>`;
    return;
  }

  containerEl.innerHTML = savedRecipes
    .map(
      (meal) => `
    <div class="meal-card">
      <img src="${meal.image}" alt="${meal.name}">
      <div class="meal-info">
        <h3>${meal.name}</h3>
        <button class="view-btn" onclick="viewRecipe('${meal.id}')">View Recipe</button>
      </div>
    </div>
  `
    )
    .join("");
}

