import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getFavoriteRecipes, setFavoriteRecipes } from '../services/localStorage';
import FavoriteCard from '../components/FavoriteCard';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [renderFavorites, setRenderFavorites] = useState([]);
  useEffect(() => {
    setFavorites(getFavoriteRecipes());
  }, []);

  useEffect(() => {
    if (filteredRecipes.length) return setRenderFavorites(filteredRecipes);
    return setRenderFavorites(favorites);
  }, [favorites, filteredRecipes]);

  const handleShare = async ({ target: { id } }) => {
    await copy(`http://localhost:3000/${id}`);
    setIsCopied(true);
  };

  const handleFavorite = ({ target: { id } }) => {
    const deleteFavorite = getFavoriteRecipes().filter(
      (recipe) => recipe.name !== id,
    );
    setFavoriteRecipes(deleteFavorite);
    setFavorites(deleteFavorite);
  };

  const handleFilter = ({ target: { id } }) => {
    setSelectedCategory(id);
    const type = id === 'Food' ? 'comida' : 'bebida';
    const filterFavorites = favorites.filter((recipe) => recipe.type === type);
    setFilteredRecipes(filterFavorites);
  };

  const handleAll = () => {
    setSelectedCategory('All');
    setFilteredRecipes([]);
  };

  return (
    <div className="page-container">
      <Header name="Receitas Favoritas" />
      <div className="filters">
        <button
          className={ selectedCategory === 'All' ? 'selected' : 'filters__btn' }
          id="All"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleAll }
        >
          All
        </button>
        <button
          className={ selectedCategory === 'Food' ? 'selected' : 'filters__btn' }
          id="Food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          className={ selectedCategory === 'Drink' ? 'selected' : 'filters__btn' }
          id="Drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drink
        </button>
      </div>
      <ul className="recipe-list">
        { renderFavorites && renderFavorites.map((recipe, index) => {
          if (recipe.type === 'comida') {
            return (
              <li key={ recipe.name }>
                <FavoriteCard
                  type="comidas"
                  recipe={ recipe }
                  index={ index }
                  topText={ `${recipe.area} - ${recipe.category}` }
                  handleFavorite={ handleFavorite }
                  handleShare={ handleShare }
                  isCopied={ isCopied }
                />
              </li>
            );
          }
          return (
            <li key={ recipe.name }>
              <FavoriteCard
                type="bebidas"
                recipe={ recipe }
                index={ index }
                topText={ recipe.alcoholicOrNot }
                handleFavorite={ handleFavorite }
                handleShare={ handleShare }
                isCopied={ isCopied }
              />
            </li>
          );
        }) }
      </ul>

    </div>
  );
}

export default FavoriteRecipes;
