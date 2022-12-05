import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export const MAX_MAP_LENGTH = 12;

function RecipesProvider({ children }) {
  const [filteredFood, setFilteredFood] = useState([]);
  const [filteredBeverage, setFilteredBeverage] = useState([]);

  function sliceIngredients(obj) {
    return Object.entries(obj)
      .filter(
        (ingredients) => ingredients[0].includes('strIngredient')
        && ingredients[1] !== null
        && ingredients[1] !== '',
      )
      .map((item) => item[1]);
  }

  function sliceMeasures(obj) {
    return Object.entries(obj)
      .filter(
        (measure) => measure[0].includes('strMeasure')
        && measure[1] !== null
        && measure[1] !== '',
      )
      .map((item) => item[1]);
  }

  const contextValue = { filteredFood,
    setFilteredFood,
    filteredBeverage,
    setFilteredBeverage,
    sliceIngredients,
    sliceMeasures,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
