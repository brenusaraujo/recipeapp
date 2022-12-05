import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Food from './pages/Food';
import Beverage from './pages/Beverage';
import FoodDetails from './pages/FoodDetails';
import BeverageDetails from './pages/BeverageDetails';
import FoodInProgress from './pages/FoodInProgress';
import BeverageInProgress from './pages/BeverageInProgress';
import Explorer from './pages/Explorer';
import FoodExplorer from './pages/FoodExplorer';
import BeverageExplorer from './pages/BeverageExplorer';
import FoodExplorerByIngredients from './pages/FoodExplorerByIngredients';
import BeverageExplorerByIngredients from './pages/BeverageExplorerByIngredients';
import FoodExplorerByArea from './pages/FoodExplorerByArea';
import Profile from './pages/Profile';
import ConcludedRecipes from './pages/ConcludedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './components/NotFound';

import './css/App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Beverage } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ BeverageDetails } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodInProgress }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ BeverageInProgress }
      />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/comidas" component={ FoodExplorer } />
      <Route exact path="/explorar/bebidas" component={ BeverageExplorer } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodExplorerByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ BeverageExplorerByIngredients }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ FoodExplorerByArea }
      />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ ConcludedRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
