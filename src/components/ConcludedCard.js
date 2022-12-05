import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../css/ConcludedRecipes.css';

function ConcludedCard({
  type,
  mainIndex,
  id,
  topText,
  handleShare,
  isCopied,
  name,
  image,
  doneDate,
  tags,
}) {
  const [arrayTags, setArrayTags] = useState([]);
  useEffect(() => {
    if (tags) {
      const array = tags !== '' ? tags.toString().split(',').slice(0, 2) : [];
      return setArrayTags(array);
    }
  }, [tags]);
  return (
    <div className="recipe-container">
      <Link to={ `/${type}/${id}` }>
        <img
          className="favorites__img"
          data-testid={ `${mainIndex}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>
      <div className="text">
        <Link to={ `/${type}/${id}` }>
          <h3
            className="favorites__title"
            data-testid={ `${mainIndex}-horizontal-name` }
          >
            {name}
          </h3>
        </Link>
        <h4
          className="favorites__category"
          data-testid={ `${mainIndex}-horizontal-top-text` }
        >
          {topText}
        </h4>
        <p
          className="favorites__date"
          data-testid={ `${mainIndex}-horizontal-done-date` }
        >
          {doneDate}
        </p>
        <button className="favorites__btn" type="button" onClick={ handleShare }>
          <img
            className="favorites__icon"
            src={ shareIcon }
            alt="share"
            id={ `${type}/${id}` }
            data-testid={ `${mainIndex}-horizontal-share-btn` }
          />
        </button>
        {isCopied && <p className="link-favorite">Link copiado!</p>}
      </div>
      <ul className="tag-container">
        {arrayTags.map((tag) => (
          <li
            className="favorites__tag"
            key={ tag }
            data-testid={ `${mainIndex}-${tag}-horizontal-tag` }
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

ConcludedCard.propTypes = {
  type: PropTypes.string.isRequired,
  mainIndex: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  topText: PropTypes.string.isRequired,
  handleShare: PropTypes.func.isRequired,
  isCopied: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ConcludedCard;
