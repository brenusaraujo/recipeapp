import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setFavoriteRecipes, getFavoriteRecipes } from '../services/localStorage';

function FavoriteButton({ isFavorite, setIsFavorite, id, favoriteDependencies }) {
  const handleFavorite = () => {
    if (!isFavorite) {
      const newFavorite = favoriteDependencies;
      setFavoriteRecipes([...getFavoriteRecipes(), newFavorite]);
      return setIsFavorite(!isFavorite);
    }

    const deleteFavorite = getFavoriteRecipes().filter(
      (recipe) => recipe.id !== id,
    );
    setFavoriteRecipes(deleteFavorite);
    return setIsFavorite(!isFavorite);
  };
  return (
    <button className="details__favorite" type="button" onClick={ handleFavorite }>
      <img
        className="details__icon"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="heart"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  favoriteDependencies: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteButton;
