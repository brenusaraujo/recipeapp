import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Redirect } from 'react-router-dom';
import DetailCards from './DetailCard';
import { drinkDetailAPI } from '../services/drinkAPI';
import { foodDetailAPI } from '../services/foodAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails({ url, id }) {
  const [food, setFood] = useState();
  const [drink, setDrink] = useState();
  const [nextPage, setNextPage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [renderButton, setRenderButton] = useState(true);

  const handleClickFavorite = () => {
    setFavorite(!favorite);
    const favRecipes = {
      id,
      type: food ? 'food' : 'drink',
      nationality: food ? food[0].strArea : '',
      category: food ? food[0].strCategory : drink[0].strCategory,
      alcoholicOrNot: drink ? drink[0].strAlcoholic : '',
      name: food ? food[0].strMeal : drink[0].strDrink,
      image: food ? food[0].strMealThumb : drink[0].strDrinkThumb,
    };

    const getLocalFav = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getLocalFav) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...getLocalFav, favRecipes]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favRecipes]));
    }
  };

  const verifyFavorites = () => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs) {
      const isFav = localFavs.some((fav) => fav.id === id);
      setFavorite(isFav);
    }
  };

  const doneRecipes = () => {
    const getLocalDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalDone) {
      const local = getLocalDone.some((recipe) => recipe.id === id);
      if (local) { setRenderButton(false); }
    }
  };

  const copyToClipBoard = () => {
    clipboardCopy(`http://localhost:3000${url}`);
    setCopied(true);
  };

  const fetchIds = async () => {
    if (url.includes('foods')) {
      const meal = await foodDetailAPI(id);
      setFood(meal.meals);
    }
    if (url.includes('drinks')) {
      const drinks = await drinkDetailAPI(id);
      setDrink(drinks.drinks);
    }
  };
  useEffect(() => fetchIds(), []);
  useEffect(() => { doneRecipes(); verifyFavorites(); }, []);

  const ingredientsDrink = drink
    && Object.keys(drink[0]).filter((ingredient) => ingredient.includes('strIngredient'));
  const measuresDrink = drink
    && Object.keys(drink[0]).filter((measure) => measure.includes('strMeasure'));

  const ingredientsFood = food
    && Object.keys(food[0]).filter((ingredient) => ingredient.includes('strIngredient'));
  const measuresFood = food
    && Object.keys(food[0]).filter((measure) => measure.includes('strMeasure'));

  return (
    <section>
      {drink
        && drink.map((e, index) => (
          <section key={ index }>
            <h1 data-testid="recipe-title">{e.strDrink}</h1>
            <img
              data-testid="recipe-photo"
              width="400px"
              height="300px"
              src={ `${e.strDrinkThumb}` }
              alt="Bebida"
            />
            <p data-testid="recipe-category">
              {`Category: ${e.strCategory} ${e.strAlcoholic}`}
            </p>

            {ingredientsDrink.map((ingredient, indexs) => (
              <div key={ indexs }>
                <p data-testid={ `${indexs}-ingredient-name-and-measure` }>
                  {`Ingredients: ${drink[0][ingredient]}
                ${drink[0][measuresDrink[indexs]]}`}
                </p>
              </div>
            ))}

            <p data-testid="instructions">{`Instructions: ${e.strInstructions}`}</p>
            <DetailCards typeOf="drinks" />

            {/* {recomend
              && recomend.map((item, ind) => (
                <div key={ ind } data-testid={ `${ind}-recomendation-card` }>
                  <p data-testid={ `${ind}-recomendation-title` }>
                    {item.strMeal}
                  </p>
                </div>
              ))} */}
          </section>
        ))}

      {food
        && food.map((e, index) => (
          <section key={ index }>
            <h1 data-testid="recipe-title">{e.strMeal}</h1>

            <img
              width="400px"
              height="300px"
              data-testid="recipe-photo"
              src={ `${e.strMealThumb}` }
              alt="Bebida"
            />
            <p data-testid="recipe-category">
              {`Category: ${e.strCategory} ${e.strAlcoholic}`}
            </p>

            {ingredientsFood.map((inFood, indexx) => (
              <div key={ indexx }>
                <p data-testid={ `${indexx}-ingredient-name-and-measure` }>
                  {`Ingredients: ${food[0][inFood]} - ${
                    food[0][measuresFood[indexx]]
                  }`}
                </p>
              </div>
            ))}

            <p data-testid="instructions">{`Instructions: ${e.strInstructions}`}</p>

            <div>
              <iframe
                data-testid="video"
                src={ `${e.strYoutube.replace('watch?v=', 'embed/')}` }
                title="Vídeo"
                allowFullScreen
              />
            </div>
            <DetailCards typeOf="foods" />
          </section>
        ))}

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyToClipBoard() }
        style={ { position: 'fixed', bottom: '0px', marginLeft: '0px' } }
      >
        <img src={ shareIcon } alt="Button Share" />
      </button>

      {copied && <span>Link copied!</span>}

      {favorite ? (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => handleClickFavorite() }
          src={ blackHeartIcon }
          style={ { position: 'fixed', bottom: '0px', marginLeft: '150px' } }
        >
          <img src={ blackHeartIcon } alt="blackFavoriteIcon" />
        </button>
      ) : (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => handleClickFavorite() }
          src={ whiteHeartIcon }
          style={ { position: 'fixed', bottom: '0px', marginLeft: '150px' } }
        >
          <img src={ whiteHeartIcon } alt="whiteFavoriteIcon" />
        </button>
      )}

      {renderButton && (
        <button
          className="btnStart"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => setNextPage(true) }
          style={ { position: 'fixed', bottom: '0px', marginLeft: '300px' } }
        >
          Continue Recipe
        </button>
      )}

      {nextPage && <Redirect to={ `${id}/in-progress` } />}
    </section>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default RecipeDetails;
