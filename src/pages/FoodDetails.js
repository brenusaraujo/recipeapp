import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  requestFoodsOrDrinks,
  requestRecipesById,
} from '../services/fetchAPIs';
import Card from '../components/Card';
import {
  getFavoriteRecipes,
  setFavoriteRecipes,
  getDoneRecipes,
  getRecipeProgress,
} from '../services/localStorage';
import '../css/RecipeDetails.css';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

const currentURL = window.location.href;

const MAX_RECOMENDATION_CARDS = 6;

function FoodDetails(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const history = useHistory();

  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = recipeInfo;
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgressDone] = useState(false);
  const [renderRecomendations, setRecomendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);

  useEffect(() => {
    if (getDoneRecipes()) {
      const currentRecipeIsDone = getDoneRecipes().find((recipe) => recipe.id === id);
      return setIsDone(currentRecipeIsDone);
    }
    return setIsDone(false);
  }, [id]);

  useEffect(() => {
    if (getRecipeProgress()) {
      const currentRecipeIsInProgress = !!getRecipeProgress().meals[id];
      return setIsInProgressDone(currentRecipeIsInProgress);
    }
    return setIsInProgressDone(false);
  }, [id]);

  useEffect(() => {
    requestRecipesById(id, 'themealdb').then(({ meals }) => setRecipeInfo(meals[0]));
  }, [id]);

  useEffect(() => {
    requestFoodsOrDrinks('thecocktaildb')
      .then(({ drinks }) => setRecomendations(drinks.slice(0, MAX_RECOMENDATION_CARDS)));
  }, []);

  useEffect(() => {
    if (getFavoriteRecipes()) {
      return setIsFavorite(
        getFavoriteRecipes().find((recipe) => recipe.id === id),
      );
    }
    setFavoriteRecipes([]);
  }, [id]);

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

  const url = strYoutube ? strYoutube.split('=')[1] : strYoutube;

  const handleFavoriteDependencies = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  return (
    <div className="page-container">
      <img
        className="details__image"
        src={ strMealThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <div className="title-container">
        <div className="titles">
          <h2 className="details__category" data-testid="recipe-category">
            {strCategory}
          </h2>
          <h1 className="details__title" data-testid="recipe-title">
            {strMeal}
          </h1>
        </div>
        <div className="details">
          <ShareButton
            textToCopy={ currentURL }
            setIsCopied={ setIsCopied }
            isCopied={ isCopied }
          />
          <FavoriteButton
            isFavorite={ isFavorite }
            setIsFavorite={ setIsFavorite }
            id={ id }
            favoriteDependencies={ handleFavoriteDependencies }
          />
        </div>
      </div>
      <p className="details__description margin-left">Ingredientes:</p>
      <ul className="ingredient-list">
        {ingredientsList.map((ingredient, index) => (
          <li
            className="details__ingredient"
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <span className="details__ingredient-name">{`${ingredient}: `}</span>
            {measuresList[index] ? (
              <span className="details__measure">{measuresList[index]}</span>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
      <p className="details__description--instructions">Instruções:</p>
      <p className="details__instructions" data-testid="instructions">
        {strInstructions}
      </p>
      <iframe
        className="details__video"
        width="360"
        height="315"
        src={ `https://youtube.com/embed/${url}` }
        title={ strMeal }
        data-testid="video"
      />
      <div className="recomended">
        <p className="details__description center-this">Ótimos acompanhamentos:</p>
        <div className="carousel">
          {renderRecomendations
            && renderRecomendations.map((beverage, index) => (
              <Card
                id="idDrink"
                itemId={ beverage.idDrink }
                header={ beverage.strDrink }
                img={ beverage.strDrinkThumb }
                index={ index }
                key={ beverage.idDrink }
                testId={ `${index}-recomendation-card` }
              />
            ))}
        </div>
      </div>
      <button
        className={ isDone ? 'hidden-start-recipe-btn' : 'login__btn start-recipe' }
        type="button"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        data-testid="start-recipe-btn"
      >
        {isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
