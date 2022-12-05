import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/helpers/renderWithRouter';
import App from '../App';
import mockLocalStorageDoneRecipe from '../services/helpers/mocks/mockIngredientSearch';

jest.mock('clipboard-copy');

const DONE_RECIPES = '/done-recipes';
const HORIZONTAL_NAME = '0-horizontal-name';
const SPICY_PENNE = 'Spicy Arrabiata Penne';

describe('Testando componente Done Recipes', () => {
  it('Verificando se os elementos são renderizados', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
    const { history } = renderWithRouter(<App />);
    history.push(DONE_RECIPES);

    const foodName = await screen.findByTestId(HORIZONTAL_NAME);
    const drinkName = screen.getByTestId('1-horizontal-name');

    expect(foodName).toHaveTextContent(SPICY_PENNE);
    expect(drinkName).toHaveTextContent('Margarita');
  });

  it('Verificando se o botão de compartilhar tem o comportamento esperado', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const foodName = await screen.findByTestId(HORIZONTAL_NAME);
    const buttonShare = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(buttonShare);

    const copyText = screen.getByText('Link copied!');

    expect(foodName).toHaveTextContent(SPICY_PENNE);
    expect(buttonShare).toBeInTheDocument();
    expect(copyText).toBeInTheDocument();
  });

  it('Verificando se os filtros tem o comportamento esperado', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
    const { history } = renderWithRouter(<App />);
    history.push(DONE_RECIPES);

    const foodName = await screen.findByTestId(HORIZONTAL_NAME);
    const buttonDrinkFilter = screen.getByTestId('filter-by-drink-btn');

    expect(foodName).toHaveTextContent(SPICY_PENNE);

    userEvent.click(buttonDrinkFilter);

    const drinkName = screen.getByTestId(HORIZONTAL_NAME);
    expect(drinkName).toHaveTextContent('Margarita');

    const buttonAllFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(buttonAllFilter);

    const newFoodName = screen.getByTestId(HORIZONTAL_NAME);
    expect(newFoodName).toHaveTextContent(SPICY_PENNE);

    const buttonFoodFilter = screen.getByTestId('filter-by-food-btn');
    userEvent.click(buttonFoodFilter);

    const newDrinkName = screen.queryByText(/Margarita/i);
    expect(newDrinkName).toBeNull();
  });

  it('Verificando se o site não quebra com a falta de algo no localStorage', async () => {
    localStorage.removeItem('doneRecipes');

    const { history } = renderWithRouter(<App />);
    history.push(DONE_RECIPES);

    const foodName = screen.queryByTestId(HORIZONTAL_NAME);
    const buttonDrinkFilter = screen.getByTestId('filter-by-drink-btn');

    expect(buttonDrinkFilter).toBeInTheDocument();
    expect(foodName).toBeNull();
  });
});
