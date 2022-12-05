import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchAPIRandomFoodOrDrink } from '../services/fetchAPIs';

function BeverageExplorer() {
  const history = useHistory();

  const handleSurprise = async () => {
    const { drinks } = await fetchAPIRandomFoodOrDrink('drink');
    const id = drinks[0].idDrink;
    history.push(`/bebidas/${id}`);
  };
  return (
    <div className="page-container-gradient">
      <Header name="Explorar Bebidas" />
      <div className="explore">
        <button
          className="explore__btn"
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
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

export default BeverageExplorer;
