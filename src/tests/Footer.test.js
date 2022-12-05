import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import Food from '../pages/Food';
import FoodExplorer from '../pages/FoodExplorer';
import BeverageExplorer from '../pages/BeverageExplorer';
import RecipesProvider from '../context/RecipesProvider';
import FoodExplorerByIngredients from '../pages/FoodExplorerByIngredients';
import BeverageExplorerByIngredients from '../pages/BeverageExplorerByIngredients';
import FoodExplorerByArea from '../pages/FoodExplorerByArea';
import Profile from '../pages/Profile';
import ConcludedRecipes from '../pages/ConcludedRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Explorer from '../pages/Explorer';

const drinksBtn = 'drinks-bottom-btn';
const exploreBtn = 'explore-bottom-btn';
const foodBtn = 'food-bottom-btn';
const testPhrase = 'Redireciona para a rota correta';

describe('19 - Verifica se tem os data-testids '
+ 'footer, drinks-bottom-btn, explore-bottom-btn e food-bottom-btn', () => {
  it('Verifica o data-testid footer', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Verifica o drinks-bottom-btn', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId(drinksBtn)).toBeInTheDocument();
  });
  it('Verifica o explore-bottom-btn', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId(exploreBtn)).toBeInTheDocument();
  });
  it('Verifica o food-bottom-btn', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId(foodBtn)).toBeInTheDocument();
  });
});

describe('20 - Verifica se o menu inferior está de forma fixa e apresenta 3 ícones, '
+ 'um para comidas, um para bebidas e outro para exploração', () => {
  it('Verifica se o menu inferior está fixado sempre ao final da página', async () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId('footer')).toHaveStyle('position: fixed');
    expect(screen.getByTestId('footer')).toHaveStyle('bottom: 0');
  });
  it('Verifica se apresenta os ícones corretos', () => {
    renderWithRouter(<Footer />);
    const elementDrinksBtn = screen.getByTestId(drinksBtn);
    const elementExploreBtn = screen.getByTestId(exploreBtn);
    const elementFoodBtn = screen.getByTestId(foodBtn);
    expect(elementDrinksBtn).toHaveAttribute('src', 'drinkIcon.svg');
    expect(elementExploreBtn).toHaveAttribute('src', 'exploreIcon.svg');
    expect(elementFoodBtn).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('21 - Verifica se o menu inferior é exibido apenas nas telas '
  + 'indicadas pelo protótipo', () => {
  it('Não tem footer na tela de login', () => {
    renderWithRouter(<RecipesProvider><Login /></RecipesProvider>);
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Tem footer na tela de principal de receitas de comidas', () => {
    renderWithRouter(<RecipesProvider><Food /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar', () => {
    renderWithRouter(<RecipesProvider><Explorer /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas', () => {
    renderWithRouter(<RecipesProvider><FoodExplorer /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar bebidas', () => {
    renderWithRouter(<RecipesProvider><BeverageExplorer /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    renderWithRouter(<RecipesProvider><FoodExplorerByIngredients /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    renderWithRouter(
      <RecipesProvider>
        <BeverageExplorerByIngredients />
      </RecipesProvider>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas por local', () => {
    renderWithRouter(<RecipesProvider><FoodExplorerByArea /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de perfil', () => {
    renderWithRouter(<RecipesProvider><Profile /></RecipesProvider>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Não tem footer na tela de receitas feitas', () => {
    renderWithRouter(<RecipesProvider><ConcludedRecipes /></RecipesProvider>);
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receitas favoritas', () => {
    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>);
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
});

describe('22 - Verifica se redireciona a pessoa usuária para uma lista de cooktails'
  + ' ao clicar no ícone de bebidas', () => {
  it(testPhrase, () => {
    const { history } = renderWithRouter(<Footer />);
    const bebidasLink = screen.getByTestId(drinksBtn);
    userEvent.click(bebidasLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});

describe('23 - Verifica se redireciona a pessoa usuária para a tela'
  + ' de  explorar ao clicar no ícone de exploração', () => {
  it(testPhrase, () => {
    const { history } = renderWithRouter(<Footer />);
    const explorerLink = screen.getByTestId(exploreBtn);
    userEvent.click(explorerLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});

describe('24 - Verifica se redireciona a pessoa usuária para uma lista de comidas'
  + ' ao clicar no ícone de comidas', () => {
  it(testPhrase, () => {
    const { history } = renderWithRouter(<Footer />);
    const comidasLink = screen.getByTestId(foodBtn);
    userEvent.click(comidasLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
