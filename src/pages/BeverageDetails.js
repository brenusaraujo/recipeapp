import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Card from '../components/Card';
import {
  getDoneRecipes,
  getFavoriteRecipes,
  getRecipeProgress,
  setFavoriteRecipes,
} from '../services/localStorage';
import '../css/RecipeDetails.css';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { requestFoodsOrDrinks, requestRecipesById } from '../services/fetchAPIs';

const currentURL = window.location.href;

const MAX_RECOMENDATION_CARDS = 6;

function BeverageDetails(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const history = useHistory();
  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
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
      const currentRecipeIsInProgress = !!getRecipeProgress().cocktails[id];
      return setIsInProgressDone(currentRecipeIsInProgress);
    }
    return setIsInProgressDone(false);
  }, [id]);

  useEffect(() => {
    requestRecipesById(id, 'thecocktaildb')
      .then(({ drinks }) => setRecipeInfo(drinks[0]));
  }, [id]);

  useEffect(() => {
    requestFoodsOrDrinks('themealdb')
      .then(({ meals }) => setRecomendations(meals.slice(0, MAX_RECOMENDATION_CARDS)));
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

  const handleFavoriteDependencies = {
    id,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  return (
    <div className="page-container">
      <img
        className="details__image"
        src={ strDrinkThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <div className="title-container">
        <div className="titles">
          <h2 className="details__category" data-testid="recipe-category">
            {strAlcoholic}
          </h2>
          <h1 className="details__title" data-testid="recipe-title">
            {strDrink}
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
      <div className="recomended">
        <p className="details__description center-this">Ótimos acompanhamentos:</p>
        <div className="carousel">
          {renderRecomendations
            && renderRecomendations.map((food, index) => (
              <Card
                id="idMeal"
                itemId={ food.idMeal }
                header={ food.strMeal }
                img={ food.strMealThumb }
                index={ index }
                key={ food.idMeal }
                testId={ `${index}-recomendation-card` }
              />
            ))}
        </div>
      </div>
      <button
        className={ isDone ? 'hidden-start-recipe-btn' : 'login__btn start-recipe' }
        type="button"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        data-testid="start-recipe-btn"
      >
        {isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </div>
  );
}

BeverageDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BeverageDetails;
