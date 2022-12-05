import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Cards() {
  const { renderCards } = useContext(AppContext);
  const DOZE = 12;

  return (
    <div>
      { renderCards.map(({
        strDrinkThumb,
        strDrink,
        strDrinkAlternate,
        idDrink,
      }, index) => (index < DOZE) && (
        <div
          key={ idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ strDrinkThumb }
            alt={ strDrinkAlternate }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { strDrink }
          </p>
        </div>
      ))}
    </div>
  );
}
