import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { requestIngredients } from '../services/fetchAPIs';

const NUMBER_OF_INGREDIENTS = 12;

function FoodExplorerByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    requestIngredients('themealdb')
      .then(({ meals }) => meals.map(({ strIngredient }) => strIngredient))
      .then((result) => setIngredients(result.slice(0, NUMBER_OF_INGREDIENTS)));
  }, []);

  return (
    <div className="page-container">
      <Header name="Explorar Ingredientes" />
      <div className="recipes">
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient }
            ingredient={ ingredient }
            type="comidas"
            img={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodExplorerByIngredients;
