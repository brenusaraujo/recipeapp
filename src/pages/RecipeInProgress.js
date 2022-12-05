import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { foodDetailAPI } from '../services/foodAPI';
import { drinkDetailAPI } from '../services/drinkAPI';
import DetailCards from '../components/DetailCard';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { handleFavorite, handleShare, handleHeart,
  handleDoneRecipe } from '../services/helpers/functions/handles';

function FoodInProgress() {
  const { setCheck, idProgress, setidProgress, tipo, detail, ingredientsList,
    setTipo, setDetail, alert, setAlert, favorites, setFavorites, doneRecipes, finished,
    setDoneRecipes, setFinished, setIngredientsList } = useContext(AppContext);
  const objImg = { black: blackHeartIcon, white: whiteHeartIcon };
  const history = useHistory();
  const { pathname } = history.location;
  async function getFoodDetails() {
    const id = pathname.replace(/\D/g, '');
    const { meals } = await foodDetailAPI(id);
    setDetail(meals);
    setidProgress(id);
  }
  async function getDrinkDetails() {
    const id = pathname.replace(/\D/g, '');
    const { drinks } = await drinkDetailAPI(id);
    setidProgress(id);
    setDetail(drinks);
  }
  const createInProgressRecipesStorage = () => {
    const id = pathname.replace(/\D/g, '');
    const inProgressRecipesObject = {
      meals: { [id]: [] },
      cocktails: { [id]: [] },
    };
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(inProgressRecipesObject));
    }
  };
  useEffect(() => {
    createInProgressRecipesStorage();
    if (pathname.includes('foods')) {
      setTipo('foods');
      getFoodDetails();
    } else if (pathname.includes('drinks')) {
      setTipo('drinks');
      getDrinkDetails();
    }
  }, []);
  const CheckinFoods = (index) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const id = pathname.replace(/\D/g, '');
    if (inProgressRecipes.meals[id] === undefined) {
      return false;
    }
    if (inProgressRecipes.meals[id].includes(index)) {
      setCheck(true);
      return true;
    }
    if (!inProgressRecipes.meals[id].includes(index)) {
      setCheck(false);
      return false;
    }
  };
  const CheckinDrinks = (index) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const id = pathname.replace(/\D/g, '');
    if (inProgressRecipes.cocktails[id] === undefined) {
      return false;
    }
    if (inProgressRecipes.cocktails[id].includes(index)) {
      setCheck(true);
      return true;
    }
    if (!inProgressRecipes.cocktails[id].includes(index)) {
      setCheck(false);
      return false;
    }
  };
  const Finished = () => {
    const inProgressReci = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const id = pathname.replace(/\D/g, '');
    if (tipo === 'foods') {
      if (ingredientsList === inProgressReci.meals[id].length) { setFinished(false); }
      if (ingredientsList !== inProgressReci.meals[id].length) { setFinished(true); }
    }
    if (tipo === 'drinks') {
      if (ingredientsList === inProgressReci.cocktails[id].length) { setFinished(false); }
      if (ingredientsList !== inProgressReci.cocktails[id].length) { setFinished(true); }
    }
  };
  const handleCheckbox = (index) => {
    const id = pathname.replace(/\D/g, '');
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = inProgressRecipes;
    if (tipo === 'foods') {
      const obj = { meals: {
        ...meals, [id]: [...meals[id], index] },
      cocktails: { ...cocktails } };
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(obj));
      CheckinFoods(index);
    } else {
      const obj = {
        meals: { ...meals },
        cocktails: { ...cocktails, [id]: [...cocktails[id], index] } };
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(obj));
      CheckinDrinks(index);
    }
    Finished();
  };
  const handleIngMeaDrink = (data) => {
    const filteredIngredients = data.filter((key) => key[0]
      .includes('strIngredient') && (key[1] !== null && key[1] !== ''));
    const ingArray = filteredIngredients.reduce((acc, value) => [...acc, value[1]], []);
    const filteredMeasures = data.filter((key) => key[0]
      .includes('strMeasure') && (key[1] !== null && key[1] !== ' '));
    const meaArray = filteredMeasures.reduce((acc, value) => [...acc, value[1]], []);
    const arrayToMap = ingArray.map((ing, index) => `${ing} - ${meaArray[index]}`);
    setIngredientsList(arrayToMap.length);
    return (
      arrayToMap.map((string, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            key={ index }
            id={ index }
            type="checkbox"
            onChange={ () => handleCheckbox(index) }
            checked={ tipo === 'foods' ? CheckinFoods(index) : CheckinDrinks(index) }
          />
          {string}
        </li>
      )));
  };
  if (pathname.includes('foods')) {
    return (
      <div>
        {detail.map((item, index) => (
          <div key={ index }>
            <h1 data-testid="recipe-title">{item.strMeal}</h1>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
              width="420"
              height="345"
            />
            <h4>Category</h4>
            <p data-testid="recipe-category">
              {item.strCategory}
            </p>
            {alert && <p>Link copied!</p>}
            <h4> Intructions </h4>
            <p data-testid="instructions">{item.strInstructions}</p>
            <h4>Ingridients</h4>
            <ul>{handleIngMeaDrink(Object.entries(item))}</ul>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => handleShare(pathname, setAlert) }
            >
              Share
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              id="favorite-btn"
              src={ handleHeart(idProgress, favorites, whiteHeartIcon, blackHeartIcon) }
              onClick={ () => handleFavorite(tipo, detail, setFavorites, objImg) }
            >
              Favorite
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => handleDoneRecipe(history, setDoneRecipes, doneRecipes) }
              disabled={ finished }
            >
              Finish recipe
            </button>
            <h4>Recomended Drinks</h4>
            <DetailCards typeOf={ tipo } />
          </div>
        ))}
      </div>
    );
  }
  if (pathname.includes('drinks')) {
    return (
      <div>
        {detail.map((item, index) => (
          <div key={ index }>
            <h1 data-testid="recipe-title">{item.strDrink}</h1>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="recipe-photo"
              width="420"
              height="345"
            />
            {alert && <p>Link copied!</p>}
            <h4>Is alcoholic?</h4>
            <p>{item.strAlcoholic}</p>
            <h4>Category</h4>
            <p data-testid="recipe-category">{item.strCategory}</p>
            <h4> Intructions </h4>
            <p data-testid="instructions">{item.strInstructions}</p>
            <h4>Ingridients</h4>
            <ul>{handleIngMeaDrink(Object.entries(item))}</ul>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => handleShare(pathname, setAlert) }
            >
              Share
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              id="favorite-btn"
              src={ handleHeart(idProgress, favorites, whiteHeartIcon, blackHeartIcon) }
              onClick={ () => handleFavorite(tipo, detail, setFavorites, objImg) }
            >
              Favorite
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => handleDoneRecipe(history, setDoneRecipes, doneRecipes) }
              disabled={ finished }
            >
              Finish recipe
            </button>
            <DetailCards typeOf={ tipo } />
          </div>
        ))}
      </div>
    );
  }
}
export default FoodInProgress;
