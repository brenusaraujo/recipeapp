export const style = {
  textDecorationLine: '',
};

// export function handleCheckbox(estilo) {
//   if (estilo.textDecorationLine === '') {
//     estilo.textDecorationLine = 'line-through';
//   } else {
//     estilo.textDecorationLine = '';
//   }
// }

export const handleShare = (pathname, func) => {
  const copyText = `http://localhost:3000${pathname}`;
  navigator.clipboard.writeText(copyText);
  func(true);
};

export const handleFavorite = (type, array, setFav, objImg) => {
  const favoriteButton = document.getElementById('favorite-btn');
  const { nodeValue } = favoriteButton.attributes.src;

  if (type === 'drinks') {
    const localStorage = array.map((recipe) => (
      { id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb }
    ));
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorage));
    setFav((prevState) => [...prevState, array[0].idDrink]);
    if (nodeValue.includes('white')) {
      favoriteButton.setAttribute('src', objImg.black);
    } else if (nodeValue.includes('black')) {
      favoriteButton.setAttribute('src', objImg.white);
    }
  } else if (type === 'foods') {
    const localStorage = array.map((recipe) => (
      { id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb }
    ));
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(localStorage));
    setFav((prevState) => [...prevState, array[0].idMeal]);
    if (nodeValue.includes('white')) {
      favoriteButton.setAttribute('src', objImg.black);
    } else if (nodeValue.includes('black')) {
      favoriteButton.setAttribute('src', objImg.white);
    }
  }
};

export const handleHeart = (id, white, black, fav) => {
  if (fav.includes(id)) {
    return black;
  }
  return white;
};

export const handleDoneRecipe = (history, setDoneRecipes, doneRecipes) => {
  setDoneRecipes((prevState) => [...prevState, 'teste']);
  console.log(doneRecipes);
  window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  history.push('/done-recipes');
};
