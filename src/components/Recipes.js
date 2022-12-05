import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMeals, foodsCategoriesAPI, searchFoods } from '../services/foodAPI';
import { fetchDrinks, fetchDrinksCategories } from '../services/drinkAPI';
import Card from './Card';

function Recipes({ type }) {
  const MAX_RECIPES = 11;
  const MAX_CATEGORIES = 4;

  const teste = document.title;

  const [firstMealRecipes, setFirtsMealRecipes] = useState([]);
  const [firstDrinkRecipes, setFirstDrinkRecipes] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [globalRecipes] = useState({});
  let categories = [];

  async function fetchMealsAPI() {
    const receitas = await fetchMeals();
    setFirtsMealRecipes(receitas.filter((meal, index) => index <= MAX_RECIPES));
    const { meals } = await foodsCategoriesAPI();
    setMealsCategories(meals
      .filter((meal, index) => index <= MAX_CATEGORIES));
  }

  async function fetchDrinksAPI() {
    const drinks = await fetchDrinks();
    setFirstDrinkRecipes(drinks.filter((meal, index) => index <= MAX_RECIPES));
    const drinksCategories1 = await fetchDrinksCategories();
    setDrinksCategories(drinksCategories1
      .filter((meal, index) => index <= MAX_CATEGORIES));
  }

  function resetFilters() {
    if (Object.keys(globalRecipes).length === 0) {
      fetchDrinksAPI();

      fetchMealsAPI();
    } else {
      const { myRecipes } = globalRecipes;
      setFirstRecipes(myRecipes.filter((meal, index) => index <= MAX_CATEGORIES));
    }
  }

  useEffect(() => {
    resetFilters();
  }, []);

  function mealsMap(meal, index) {
    return (
      <Card
        key={ index }
        name={ meal.strMeal }
        thumb={ meal.strMealThumb }
        index={ index }
        id={ meal.idMeal }
        type="foods"
      />
    );
  }

  function drinksMap(drink, index) {
    return (
      <Card
        key={ index }
        name={ drink.strDrink }
        thumb={ drink.strDrinkThumb }
        index={ index }
        id={ drink.idDrink }
        type="drinks"
      />
    );
  }

  async function setFilter(value) {
    const filteredFoods = await searchFoods(type, value);
    if (type === 'foods') {
      const { meals } = filteredFoods;
      setFirtsMealRecipes(meals.filter((meal, index) => index <= MAX_RECIPES));
    } else {
      const { drinks } = filteredFoods;
      setFirstDrinkRecipes(drinks.filter((meal, index) => index <= MAX_RECIPES));
    }
  }

  function filter(value) {
    if (selectedFilter === value) {
      setSelectedFilter('');
      resetFilters();
    } else {
      setSelectedFilter(value);
      setFilter(value);
    }
  }

  function validation() {
    if (teste === 'Drinks') {
      categories = drinksCategories;
    } else {
      categories = mealsCategories;
    }
  }
  validation();

  return (
    <div>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ resetFilters }
        >
          All
        </button>
        { categories.map((category, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => { filter(category.strCategory); } }
          >
            {category.strCategory}
          </button>))}
      </section>
      {
        type === 'foods'
          ? firstMealRecipes.map((meal, index) => mealsMap(meal, index))
          : firstDrinkRecipes.map((drink, index) => drinksMap(drink, index))
      }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recipes;
