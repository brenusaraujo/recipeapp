import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';
import {
  fetchIngredients,
  fetchNames,
  fetchFirstLetter,
} from '../services/foodAPI';

import {
  fetchDrinkIngredients,
  fetchDrinkNames,
  fetchDrinkFirstLetter,
} from '../services/drinkAPI';

export default function SearchBar() {
  const history = useHistory();
  const [searchId, setSearchId] = useState('');
  const { searchInput, title, setRenderCards } = useContext(AppContext);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (title === 'Foods') {
      if (searchResult === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (searchResult.length === 1) {
        history.push(`/foods/${searchResult[0].idMeal}`);
      } else {
        setRenderCards(searchResult);
      }
    }
  }, [searchResult]);

  useEffect(() => {
    if (title === 'Drinks') {
      if (searchResult === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (searchResult.length === 1) {
        history.push(`/drinks/${searchResult[0].idDrink}`);
      } else {
        setRenderCards(searchResult);
      }
    }
  }, [searchResult]);

  const handleFood = async () => {
    if (searchId === 'ingredient') {
      const isFetch = await fetchIngredients(searchInput);
      return setSearchResult(isFetch.meals);
    } if (searchId === 'name') {
      const isFetch = await fetchNames(searchInput);
      return setSearchResult(isFetch.meals);
    } if (searchId === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const isFetch = await fetchFirstLetter(searchInput);
      return setSearchResult(isFetch.meals);
    }
  };

  const handleDrink = async () => {
    if (searchId === 'ingredient') {
      const isFetch = await fetchDrinkIngredients(searchInput);
      return setSearchResult(isFetch.drinks);
    } if (searchId === 'name') {
      const isFetch = await fetchDrinkNames(searchInput);
      return setSearchResult(isFetch.drinks);
    } if (searchId === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const isFetch = await fetchDrinkFirstLetter(searchInput);
      return setSearchResult(isFetch.drinks);
    }
  };

  const handleChange = ({ target }) => {
    setSearchId(target.id);
  };

  return (
    <div>
      <label htmlFor="search-radio">
        Ingredient
        <input
          type="radio"
          name="search-radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="search-radio">
        Name
        <input
          type="radio"
          name="search-radio"
          id="name"
          onChange={ handleChange }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="search-radio">
        First letter
        <input
          type="radio"
          name="search-radio"
          onChange={ handleChange }
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ title === 'Foods' ? handleFood : handleDrink }
      >
        Buscar
      </button>
    </div>
  );
}
