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

export function saveRecipe(id, name, image, type = 'meal') {
  const exists = savedRecipes.find((r) => r.id === id);
  if (exists) {
    alert("You already saved this recipe!");
    return false;
  }

  savedRecipes.push({ id, name, image, type });
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
    .map((item) => {
      const isCocktail = item.type === 'cocktail';
      const viewHandler = isCocktail ? `viewCocktail('${item.id}')` : `viewRecipe('${item.id}')`;
      const displayName = (item.name && String(item.name).trim()) ? item.name : `${isCocktail ? 'Cocktail' : 'Meal'} ${item.id}`;
      return `
    <div class="meal-card">
      <img src="${item.image}" alt="${displayName}">
      <div class="meal-info">
        <h3>${displayName}</h3>
        <button class="view-btn" onclick="${viewHandler}">View Recipe</button>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    </div>`;
    })
    .join("");
}

export function removeRecipe(id) {
  if (!id) return false;
  const before = savedRecipes.length;
  savedRecipes = savedRecipes.filter((r) => r.id !== id);
  if (savedRecipes.length !== before) {
    persist();
    return true;
  }
  return false;
}
