import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import FoodCards from '../components/FoodCards';

function Foods() {
  const {
    setTitle,
  } = useContext(AppContext);
  useEffect(() => {
    document.title = 'Foods';
    setTitle(document.title);
  }, []);

  return (
    <>
      <Header />
      <FoodCards />
      <Recipes type="foods" />
      <Footer />
    </>
  );
}

export default Foods;
