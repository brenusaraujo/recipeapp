import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import {
  requestFilteredFoods,
  requestFilteredDrinks,
} from '../services/fetchAPIs';
import '../css/SearchForm.css';

function SearchForm() {
  const { setFilteredFood, setFilteredBeverage } = useContext(RecipesContext);
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const history = useHistory();

  const handleRadio = ({ target: { value } }) => {
    setSelectedRadio(value);
  };

  const alertLetter = () => {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  };

  const redirectByLength = (result, category) => {
    if (result.length === 1) {
      const id = category === 'comidas' ? 'idMeal' : 'idDrink';
      history.push(`/${category}/${result[0][id]}`);
    } else {
      return category === 'comidas'
        ? setFilteredFood(result)
        : setFilteredBeverage(result);
    }
  };

  const handleClick = async () => {
    if (selectedRadio === 'letter' && searchText.length > 1) {
      return alertLetter();
    }

    const { pathname } = history.location;

    try {
      if (pathname === '/bebidas' || pathname === '/bebidas/') {
        const result = await requestFilteredDrinks(searchText, selectedRadio);
        redirectByLength(result.drinks, 'bebidas');
      } else {
        const result = await requestFilteredFoods(searchText, selectedRadio);
        redirectByLength(result.meals, 'comidas');
      }
    } catch (error) {
      global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
      return error;
    }
  };

  return (
    <form className="search">
      <div className="search__main">
        <input
          placeholder="Pesquisar"
          className="search__input"
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setSearchText(value) }
        />
        <button
          className="login__btn search__btn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Busca
        </button>
      </div>
      <div className="search__filter">
        <label className="search__label" htmlFor="ingredient">
          <input
            className="search__checkbox"
            id="ingredient"
            name="searchType"
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
          Ingrediente
        </label>
        <label className="search__label" htmlFor="name">
          <input
            className="search__checkbox"
            id="name"
            name="searchType"
            type="radio"
            value="name"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
          Nome
        </label>
        <label className="search__label" htmlFor="letter">
          <input
            className="search__checkbox"
            id="letter"
            name="searchType"
            type="radio"
            value="letter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
          Letra
        </label>
      </div>
    </form>
  );
}

export default SearchForm;
