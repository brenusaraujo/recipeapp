import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  const {
    setTitle,
  } = useContext(AppContext);
  useEffect(() => {
    document.title = 'Favorite Recipes';
    setTitle(document.title); // ?
  }, []);

  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [elementCopied, setElementCopied] = useState('');
  const [filter, setFilter] = useState('all');

  const handleClickShare = (type, id) => {
    setElementCopied(id);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  const handleFavoriteStorage = (currentId) => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteStorage.filter(({ id }) => id !== currentId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteFoods(newFavorites);
  };

  useEffect(() => {
    const getLocalStorage = () => {
      const storage = localStorage.getItem('favoriteRecipes');
      const favoriteRecipes = storage ? JSON.parse(storage) : [];
      setFavoriteFoods(favoriteRecipes);
    };
    getLocalStorage();
  }, []);

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          style={ { cursor: 'pointer' } }
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          style={ { cursor: 'pointer' } }
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          style={ { cursor: 'pointer' } }
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      { !!favoriteFoods.length && (
        <section>
          {
            favoriteFoods.filter(({ type }) => filter === 'all' || type === filter)
              .map(({
                id,
                image,
                name,
                type,
                category,
                alcoholicOrNot,
                nationality,
              }, index) => (
                <div
                  key={ `${id}-${index}` }
                >
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ image }
                      alt={ `${name}` }
                      style={ { width: '250px' } }
                    />
                  </Link>
                  <Link to={ `/${type}s/${id}` }>
                    <h3
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {name}
                    </h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
                  </p>
                  <button
                    type="button"
                    onClick={ () => handleClickShare(type, id) }
                    style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Ícone de compartilhamento"
                    />
                  </button>
                  {elementCopied === id
                  && (
                    <span>
                      Link copied!
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={ () => handleFavoriteStorage(id) }
                    style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="Ícone de favoritar"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              ))
          }
        </section>
      )}
    </>
  );
}

export default FavoriteRecipes;
