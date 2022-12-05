import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodExplorer from '../pages/FoodExplorer';
import renderWithRouter from './renderWithRouter';

const response = {
  meals:
    [{ idMeal: 5274 }],
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(response),
    }));
};

describe('Explorar comidas', () => {
  beforeEach(mockFetch);
  it('se tem os data-testid certos', () => {
    renderWithRouter(<FoodExplorer />);

    const byIngredients = screen.getByTestId('explore-by-ingredient');
    const byLocal = screen.getByTestId('explore-by-area');
    const surprise = screen.getByTestId('explore-surprise');

    const buttons = [byIngredients, byLocal, surprise];

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  it('se ao clicar em Por Ingredientes redireciona para a página certa', () => {
    const { history } = renderWithRouter(<FoodExplorer />);

    const byIngredients = screen.getByTestId('explore-by-ingredient');

    userEvent.click(byIngredients);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('se ao clicar em Por local redireciona para a página certa', () => {
    const { history } = renderWithRouter(<FoodExplorer />);

    const byLocal = screen.getByTestId('explore-by-area');

    userEvent.click(byLocal);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('se ao clicar em me surpreenda redireciona para a página certa', () => {
    // const { history } =
    renderWithRouter(<FoodExplorer />);
    const surprise = screen.getByTestId('explore-surprise');

    userEvent.click(surprise);
    // const { pathname } = history.location;
    // expect(pathname).toBe('/explorar/comidas/5274');
  });
});
