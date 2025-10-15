import { fetchMealById, fetchDrinkById } from './modules/api.js';

function getParams() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id') || '';
  const type = (url.searchParams.get('type') || 'meal').toLowerCase();
  return { id: id.trim(), type: type === 'cocktail' ? 'cocktail' : 'meal' };
}

function buildIngredientsList(item, isDrink) {
  const out = [];
  for (let i = 1; i <= 20; i++) {
    const ing = item[`strIngredient${i}`];
    const meas = item[`strMeasure${i}`];
    if (ing && ing.trim()) {
      const text = [meas && meas.trim() ? meas.trim() : '', ing.trim()].filter(Boolean).join(' ');
      out.push(text);
    }
  }
  return out;
}

function renderDetail(root, data, type) {
  if (!root) return;
  if (!data) {
    root.innerHTML = `<p style="text-align:center;">Recipe not found.</p>`;
    return;
  }

  const isDrink = type === 'cocktail';
  const title = isDrink ? data.strDrink : data.strMeal;
  const img = isDrink ? data.strDrinkThumb : data.strMealThumb;
  const category = isDrink ? data.strCategory : data.strCategory;
  const areaOrAlcoholic = isDrink ? data.strAlcoholic : data.strArea;
  const instructions = (data.strInstructions || '').split('\n').filter(Boolean);
  const ingredients = buildIngredientsList(data, isDrink);

  root.innerHTML = `
    <section class="detail-hero">
      <div>
        <img src="${img}" alt="${title}">
      </div>
      <div class="detail-meta">
        <h1>${title}</h1>
        <div class="badges">
          ${category ? `<span class="badge">${category}</span>` : ''}
          ${areaOrAlcoholic ? `<span class="badge">${areaOrAlcoholic}</span>` : ''}
          <span class="badge">${isDrink ? 'Cocktail' : 'Meal'}</span>
        </div>
        <button id="saveBtn" class="save-btn">Save</button>
        <button id="viewSourceBtn" class="view-btn">View Source</button>
      </div>
    </section>
    <section class="section">
      <h2>Ingredients</h2>
      ${ingredients.length ? `<ul class="ingredients">${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>No ingredients listed.</p>'}
    </section>
    <section class="section">
      <h2>Instructions</h2>
      ${instructions.length ? `<ol>${instructions.map(s => `<li>${s}</li>`).join('')}</ol>` : '<p>No instructions provided.</p>'}
    </section>
  `;

  const saveBtn = root.querySelector('#saveBtn');
  saveBtn?.addEventListener('click', () => {
    // Defer import to keep details isolated
    import('./modules/storage.js').then(({ saveRecipe, renderSavedRecipes }) => {
      const id = isDrink ? data.idDrink : data.idMeal;
      const name = title;
      const image = img;
      const typeStr = isDrink ? 'cocktail' : 'meal';
      const changed = saveRecipe(id, name, image, typeStr);
      if (changed) {
        alert('Saved to your collection. Return to home to view.');
      }
    });
  });

  const viewSourceBtn = root.querySelector('#viewSourceBtn');
  viewSourceBtn?.addEventListener('click', () => {
    const id = isDrink ? data.idDrink : data.idMeal;
    const url = isDrink ? `https://www.thecocktaildb.com/drink/${id}` : `https://www.themealdb.com/meal/${id}`;
    window.open(url, '_blank');
  });
}

async function init() {
  const root = document.getElementById('detailRoot');
  const { id, type } = getParams();
  if (!id) {
    renderDetail(root, null, type);
    return;
  }

  if (type === 'cocktail') {
    const { drink, error } = await fetchDrinkById(id);
    if (error) {
      root.innerHTML = `<p style="text-align:center;">${error}</p>`;
      return;
    }
    renderDetail(root, drink, 'cocktail');
  } else {
    const { meal, error } = await fetchMealById(id);
    if (error) {
      root.innerHTML = `<p style="text-align:center;">${error}</p>`;
      return;
    }
    renderDetail(root, meal, 'meal');
  }
}

window.addEventListener('load', init);

