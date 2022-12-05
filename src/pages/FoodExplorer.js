import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchAPIRandomFoodOrDrink } from '../services/fetchAPIs';

function FoodExplorer() {
  const history = useHistory();

  const handleSurprise = async () => {
    const { meals } = await fetchAPIRandomFoodOrDrink('food');
    const id = meals[0].idMeal;
    history.push(`/comidas/${id}`);
  };

  return (
    <div className="page-container-gradient">
      <Header name="Explorar Comidas" />
      <div className="explore">
        <button
          className="explore__btn"
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          className="explore__btn"
          data-testid="explore-by-area"
          type="button"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          className="explore__btn"
          data-testid="explore-surprise"
          type="button"
          onClick={ handleSurprise }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default FoodExplorer;
