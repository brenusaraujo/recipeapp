import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppContext from '../context/AppContext';
import RecipeDetails from '../components/RecipeDetails';

function DrinkDetails({ location, match }) {
  const {
    setTitle,
    // idProgress,
    // setidProgress,
  } = useContext(AppContext);

  // const history = useHistory();
  // const { pathname } = history.location;
  // const id = pathname.replace(/\D/g, '');

  useEffect(() => {
    document.title = 'Drink Details';
    setTitle(document.title);
    // const id = pathname.replace(/\D/g, '');
    // setidProgress(id);
  }, []);

  return (
    <div>
      <h1>{ document.title }</h1>
      <RecipeDetails url={ location.pathname } id={ match.params.id } />
      {' '}

    </div>
  );
}

DrinkDetails.propTypes = {
  location: PropTypes.shape({}),
  match: PropTypes.shape({}),
}.isRequired;

export default DrinkDetails;
