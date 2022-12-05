import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Cards() {
  const { renderCards } = useContext(AppContext);
  const DOZE = 12;

  return (
    <div>
      { renderCards.map(({
        strMealThumb,
        strMeal,
        strDrinkAlternate,
        idMeal,
      }, index) => (index < DOZE) && (
        <div
          key={ idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ strMealThumb }
            alt={ strDrinkAlternate }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { strMeal }
          </p>
        </div>
      ))}
    </div>
  );
}
