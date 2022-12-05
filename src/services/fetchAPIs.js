export async function requestFilteredDrinks(text, radio) {
  if (radio === 'ingredient') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`,
    );
    const result = await response.json();
    return result;
  }
  if (radio === 'name') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`,
    );
    const result = await response.json();
    return result;
  }
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`,
  );
  const result = await response.json();
  return result;
}

export async function requestFilteredFoods(text, radio) {
  if (radio === 'ingredient') {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`,
    );
    const result = await response.json();
    return result;
  }
  if (radio === 'name') {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`,
    );
    const result = await response.json();
    return result;
  }
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`,
  );
  const result = await response.json();
  return result;
}

export async function fetchAPIRandomFoodOrDrink(category) {
  const urlByCategory = category === 'food' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(
    `https://www.${urlByCategory}.com/api/json/v1/1/random.php`,
  );
  const result = await response.json();
  return result;
}

export async function requestFoodsOrDrinks(urlByCategory) {
  const response = await fetch(
    `https://www.${urlByCategory}.com/api/json/v1/1/search.php?s=`,
  );
  const result = await response.json();
  return result;
}

export async function requestCategories(urlByCategory) {
  const response = await fetch(
    `https://www.${urlByCategory}.com/api/json/v1/1/list.php?c=list`,
  );
  const result = await response.json();
  return result;
}

export async function requestRecipesByCategory(category, urlByCategory) {
  const response = await fetch(
    `https://www.${urlByCategory}.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const result = await response.json();
  return result;
}

export async function requestRecipesById(id, urlByCategory) {
  const response = await fetch(
    `https://www.${urlByCategory}.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const result = await response.json();
  return result;
}

export async function requestIngredients(urlByCategory) {
  const response = await fetch(
    `https://www.${urlByCategory}.com/api/json/v1/1/list.php?i=list`,
  );
  const result = await response.json();
  return result;
}

export async function requestAreas() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await response.json();
  return result;
}

export async function requestRecipesByArea(area) {
  if (area === 'All') {
    return requestFoodsOrDrinks('themealdb');
  }
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const result = await response.json();
  return result;
}
