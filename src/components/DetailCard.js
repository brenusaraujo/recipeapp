import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Carousel from 'nuka-carousel/lib/carousel'; // https://github.com/leandrowd/react-responsive-carousel
import { fetchFoodsList } from '../services/foodAPI';
import 'react-multi-carousel/lib/styles.css';

const SIX = 6;

function DetailCards({ typeOf }) {
  const [recomended, setRecomended] = useState(undefined);

  const typeInverted = (typeOf === 'foods') ? 'drinks' : 'foods';

  useEffect(() => {
    const getRecomended = async () => {
      const currRecomended = await fetchFoodsList(typeInverted);
      setRecomended(currRecomended);
    };
    getRecomended();
  }, []);

  const recomendedRenderer = (typeR, data) => {
    if (typeR === 'foods') {
      const { meals } = data;
      const sliced = meals.slice(0, SIX);
      console.log(sliced);
      const returnArray = sliced.map((recipe, index) => (
        <button
          key={ recipe.idMeal }
          type="button"
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            {recipe.strMeal}
          </p>
        </button>
      ));

      return (
        <Carousel swiping autoplay>
          {returnArray}
        </Carousel>
      );
    } if (typeR === 'drinks') {
      const { drinks } = data;
      const sliced = drinks.slice(0, SIX);
      const returnArray = sliced.map((recipe, index) => (
        <button
          key={ recipe.idDrink }
          type="button"
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            {recipe.strDrink}
          </p>
        </button>
      ));

      return (
        <Carousel swiping autoplay>
          {returnArray}
        </Carousel>
      );
    }
  };
  return (
    <div>
      {recomended === undefined
        ? <p>loading</p>
        : recomendedRenderer(typeInverted, recomended)}
    </div>

  );
}

DetailCards.propTypes = {
  typeOf: propTypes.string,
};

DetailCards.defaultProps = {
  typeOf: '',
};

export default DetailCards;
