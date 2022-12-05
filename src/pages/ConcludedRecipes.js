import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';
import ConcludedCard from '../components/ConcludedCard';
import '../css/ConcludedRecipes.css';

const copy = require('clipboard-copy');

function ConcludedRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);
  useEffect(() => {
    if (filteredRecipes.length) return setRenderRecipes(filteredRecipes);
    return setRenderRecipes(doneRecipes);
  }, [filteredRecipes, doneRecipes]);

  const handleShare = async ({ target: { id } }) => {
    await copy(`http://localhost:3000/${id}`);
    setIsCopied(true);
  };

  const handleFilter = ({ target: { id } }) => {
    setSelectedCategory(id);
    const type = id === 'Food' ? 'comida' : 'bebida';
    const filterDone = doneRecipes.filter((recipe) => recipe.type === type);
    setFilteredRecipes(filterDone);
  };
  const handleAll = () => {
    setSelectedCategory('All');
    setFilteredRecipes([]);
  };
  return (
    <div className="page-container">
      <Header name="Receitas Feitas" />
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
        { renderRecipes && renderRecipes.map((recipe, index) => {
          if (recipe.type === 'comida') {
            return (
              <li key={ recipe.name }>
                <ConcludedCard
                  image={ recipe.image }
                  name={ recipe.name }
                  type="comidas"
                  mainIndex={ index }
                  topText={ `${recipe.area} - ${recipe.category}` }
                  id={ recipe.id }
                  tags={ recipe.tags }
                  handleShare={ handleShare }
                  isCopied={ isCopied }
                  doneDate={ recipe.doneDate }
                />
              </li>
            );
          }
          return (
            <li key={ recipe.name }>
              <ConcludedCard
                type="bebidas"
                image={ recipe.image }
                name={ recipe.name }
                id={ recipe.id }
                tags={ recipe.tags }
                mainIndex={ index }
                topText={ recipe.alcoholicOrNot }
                handleShare={ handleShare }
                isCopied={ isCopied }
                doneDate={ recipe.doneDate }
              />
            </li>
          );
        }) }
      </ul>
    </div>
  );
}

export default ConcludedRecipes;
