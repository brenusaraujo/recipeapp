import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteCard({
  type,
  recipe,
  handleFavorite,
  handleShare,
  index,
  topText,
  isCopied,
}) {
  return (
    <div className="recipe-container">
      <Link to={ `/${type}/${recipe.id}` }>
        <img
          className="favorites__img"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <div className="text align-favorite">
        <Link to={ `/${type}/${recipe.id}` }>
          <h3
            className="favorites__title"
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </h3>
        </Link>
        <h4
          className="favorites__category"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {topText}
        </h4>
      </div>
      <div className="details__btns position-favorite">
        <button className="details__share" type="button" onClick={ handleShare }>
          <img
            className="details__icon"
            src={ shareIcon }
            alt="share"
            id={ `${type}/${recipe.id}` }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {isCopied && <p>Link copiado!</p>}
        <button className="details__favorite" type="button" onClick={ handleFavorite }>
          <img
            className="details__icon"
            src={ blackHeartIcon }
            alt="heart"
            data-testid={ `${index}-horizontal-favorite-btn` }
            id={ recipe.name }
          />
        </button>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  topText: PropTypes.string.isRequired,
  isCopied: PropTypes.bool.isRequired,
};

export default FavoriteCard;
