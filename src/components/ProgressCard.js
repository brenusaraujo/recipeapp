import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  setRecipeProgress,
  getRecipeProgress,
  setFavoriteRecipes,
  getFavoriteRecipes,
  getDoneRecipes,
  setDoneRecipes,
} from '../services/localStorage';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { checkIngredientChange, loadProgressPage } from '../helpers';

function ProgressCard({
  photo,
  title,
  category,
  ingredients,
  measures,
  instructions,
  type,
  id,
  area,
  alcoholic,
  tags,
}) {
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!getRecipeProgress()) {
      return setRecipeProgress({
        cocktails: {},
        meals: {},
      });
    }
  }, []);

  useEffect(() => loadProgressPage(type, id, photo), [photo, id, type]);

  useEffect(() => {
    if (getFavoriteRecipes()) {
      return setIsFavorite(
        getFavoriteRecipes().find((recipe) => recipe.id === id),
      );
    }
    setFavoriteRecipes([]);
  }, [id]);

  const handleFinishButton = () => {
    if (ingredients.length === getRecipeProgress()[type][id].length) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  };

  const handleCheck = ({ target: { checked } }, index) => {
    const liSearch = document.querySelectorAll('li')[index];
    const parameters = [checked, index, type, id, liSearch];
    checkIngredientChange(parameters);
    return handleFinishButton();
  };

  const handleFavoriteDependencies = {
    id,
    type: type === 'meals' ? 'comida' : 'bebida',
    area,
    category,
    alcoholicOrNot: type === 'meals' ? '' : alcoholic,
    name: title,
    image: photo,
  };

  const handleFinish = () => {
    if (!getDoneRecipes()) {
      setDoneRecipes([
        { ...handleFavoriteDependencies, doneDate: new Date(), tags },
      ]);
    } else {
      setDoneRecipes([
        ...getDoneRecipes(),
        { ...handleFavoriteDependencies, doneDate: new Date(), tags },
      ]);
    }
    history.push('/receitas-feitas');
  };

  return (
    <div className="page-container">
      <img
        className="details__image"
        data-testid="recipe-photo"
        src={ photo }
        alt="meal info"
      />
      <div className="title-container">
        <div className="titles">
          <p className="details__category" data-testid="recipe-category">
            {type === 'meals' ? category : alcoholic}
          </p>
          <h1 className="details__title" data-testid="recipe-title">
            {title}
          </h1>
        </div>
        <div className="details">
          <ShareButton
            textToCopy={ `http://localhost:3000/${
              type === 'meals' ? 'comidas' : 'bebidas'
            }/${id}` }
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
        {ingredients.map((item, index) => (
          <li
            className="details__ingredient"
            key={ item }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              className="ingredient__checkbox"
              onChange={ (e) => handleCheck(e, index) }
              type="checkbox"
            />
            <span className="details__ingredient-name">{`${item}: `}</span>
            <span className="details__measure">{measures[index]}</span>
          </li>
        ))}
      </ul>
      <p className="details__description--instructions">Instruções:</p>
      <p className="details__instructions" data-testid="instructions">
        {instructions}
      </p>
      <button
        className={
          isDisabled ? 'login__btn disabled' : 'login__btn start-recipe'
        }
        onClick={ handleFinish }
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
      >
        Finalizar receita
      </button>
    </div>
  );
}

ProgressCard.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  instructions: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  area: PropTypes.string,
  alcoholic: PropTypes.string,
  tags: PropTypes.string,
};

ProgressCard.defaultProps = {
  photo: '',
  title: '',
  category: '',
  ingredients: [],
  measures: [],
  instructions: '',
  type: '',
  id: '',
  area: '',
  alcoholic: '',
  tags: '',
};

export default ProgressCard;
