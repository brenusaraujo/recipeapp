export async function fetchCategories() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchNationalities() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchImages(ingrediente) {
  const url = `https://www.themealdb.com/images/ingredients/${ingrediente}-Small.png`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchMeals() { // retorna lista de meals
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
}

export async function fetchFoodsList(endPointType) {
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  if (endPointType === 'drinks') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
}

export async function foodsCategoriesAPI(endPointType) {
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  if (endPointType === 'drinks') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }
  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
}

export async function searchFoods(endPointType, query) {
  let endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;

  if (endPointType === 'drinks') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`;
  }

  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
}

export async function foodDetailAPI(id) { // api para retornar os detalhes da comida.
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await request.json();
  return data;
}

// ------ requisito 11 ------
// ------ realiza pesquisa pelo nome do igrediente ------

export async function fetchIngredients(ingrediente) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// ------ realiza pesquisa pelo nome da receita ------

export async function fetchNames(name) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// ------ realiza pesquisa pela primeira letra do nome da receita ------

export async function fetchFirstLetter(FirstLetter) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
