import React from 'react';

export const handleIngMeaDrink = (data) => {
  const filteredIngredients = data.filter((key) => key[0]
    .includes('strIngredient') && (key[1] !== null && key[1] !== ''));
  const ingArray = filteredIngredients.reduce((acc, value) => [...acc, value[1]], []);
  const filteredMeasures = data.filter((key) => key[0]
    .includes('strMeasure') && (key[1] !== null && key[1] !== ' '));
  const meaArray = filteredMeasures.reduce((acc, value) => [...acc, value[1]], []);
  const arrayToMap = ingArray.map((ing, index) => `${ing} - ${meaArray[index]}`);

  return (
    arrayToMap.map((string, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {string}
      </li>)));
};

export const handleYoutube = (url) => {
  const newUrl = url.includes('watch') ? url.replace('watch?v=', 'embed/') : url;
  return (
    <div>
      <iframe
        width="420px"
        height="360px"
        src={ newUrl }
        frameBorder="0"
        data-testid="video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </div>
  );
};

export const handleFavorite = (typer) => {
  if (typer === 'drinks') {
    const localStorage = detail.map((recipe) => (
      { id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb }
    ));
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorage));
  } else if (typer === 'foods') {
    const localStorage = detail.map((recipe) => (
      { id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb }
    ));
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorage));
  }
};

export const handleStartRecipe = (recipeId, type) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const { meals, cocktails } = inProgressRecipes;
  if (type === 'foods') {
    const obj = { meals: { ...meals, [recipeId]: [] }, cocktails: { ...cocktails } };
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(obj));
  } else {
    const obj = { meals: { ...meals }, cocktails: { ...cocktails, [recipeId]: [] } };
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(obj));
  }
};

export const startOrContinueMeals = (id, setStart) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { meals } = inProgressRecipes;
  if (meals[id] === undefined) {
    setStart(false);
  } else {
    setStart(true);
  }
};

export const startOrContinueCocktails = (id, setStart) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails } = inProgressRecipes;
  if (cocktails[id] === undefined) {
    setStart(false);
  } else {
    setStart(true);
  }
};
