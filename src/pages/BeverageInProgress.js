import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import ProgressCard from '../components/ProgressCard';
import { requestRecipesById } from '../services/fetchAPIs';

function BeverageInProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);
  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
    strCategory,
    strTags,
  } = recipeInfo;

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

  useEffect(() => {
    requestRecipesById(id, 'thecocktaildb')
      .then(({ drinks }) => setRecipeInfo(drinks[0]));
  }, [id]);

  return (
    <ProgressCard
      photo={ strDrinkThumb }
      title={ strDrink }
      alcoholic={ strAlcoholic }
      category={ strCategory }
      ingredients={ ingredientsList }
      measures={ measuresList }
      instructions={ strInstructions }
      type="cocktails"
      id={ id }
      area=""
      tags={ strTags === null ? '' : strTags }
    />
  );
}

BeverageInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BeverageInProgress;
