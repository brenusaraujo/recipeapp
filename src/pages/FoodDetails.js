import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import RecipeDetails from '../components/RecipeDetails';

function FoodDetails({ location, match }) {
  const {
    setTitle,
  } = useContext(AppContext);

  // const history = useHistory();
  // const { pathname } = history.location;
  // const id = pathname.replace(/\D/g, '');

  useEffect(() => {
    document.title = 'Food Details';
    setTitle(document.title);
  }, []);

  return (
    <div>
      <h1>{ document.title }</h1>
      <RecipeDetails url={ location.pathname } id={ match.params.id } />
    </div>
  );
}

FoodDetails.propTypes = {
  location: PropTypes.shape({}),
  match: PropTypes.shape({}),
}.isRequired;

export default FoodDetails;
