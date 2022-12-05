import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinkDetails from './pages/DrinkDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/foods/:id" component={ FoodDetails } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id" component={ DrinkDetails } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/" component={ Login } />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
