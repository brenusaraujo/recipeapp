import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Explore.css';

function Explorer() {
  const history = useHistory();
  return (
    <div className="page-container-gradient">
      <Header name="Explorar" />
      <div className="explore">
        <button
          className="explore__btn"
          data-testid="explore-food"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          className="explore__btn"
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
