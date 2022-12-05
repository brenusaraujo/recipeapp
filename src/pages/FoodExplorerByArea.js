import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MAX_MAP_LENGTH } from '../context/RecipesProvider';
import { requestRecipesByArea, requestAreas } from '../services/fetchAPIs';

function FoodExplorerByArea() {
  const [areaSelected, setAreaSelected] = useState('All');
  const [mealsByArea, setMealsByArea] = useState([]);
  const [mealsOptions, setMealsOptions] = useState([]);

  useEffect(() => {
    requestAreas().then(({ meals }) => setMealsOptions(meals));
  }, []);

  useEffect(() => {
    requestRecipesByArea(areaSelected).then(({ meals }) => setMealsByArea(meals));
  }, [areaSelected]);

  const handleSelectedOption = (area) => {
    setAreaSelected(area);
  };

  return (
    <div className="page-container">
      <Header name="Explorar Origem" search />
      <select
        className="select"
        onChange={ ({ target }) => handleSelectedOption(target.value) }
        data-testid="explore-by-area-dropdown"
      >
        <option className="options" data-testid="All-option" value="All">
          All
        </option>
        {mealsOptions.map(({ strArea }) => (
          <option
            value={ strArea }
            className="options"
            data-testid={ `${strArea}-option` }
            key={ strArea }
          >
            {strArea}
          </option>
        ))}
      </select>
      <div className="recipes">
        {mealsByArea.slice(0, MAX_MAP_LENGTH).map((meal, index) => (
          <Card
            id="idMeal"
            itemId={ meal.idMeal }
            header={ meal.strMeal }
            img={ meal.strMealThumb }
            index={ index }
            key={ meal.idMeal }
            testId={ `${index}-recipe-card` }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodExplorerByArea;
