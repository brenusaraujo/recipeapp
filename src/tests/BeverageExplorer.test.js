import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BeverageExplorer from '../pages/BeverageExplorer';
import renderWithRouter from './renderWithRouter';

const response = {
  drinks:
    [{ idDrink: 17203 }],
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(response),
    }));
};

describe('Explorar bebidas', () => {
  beforeEach(() => mockFetch);
  it('se tem os data-testid certos', () => {
    renderWithRouter(<BeverageExplorer />);

    const byIngredients = screen.getByTestId('explore-by-ingredient');
    const surprise = screen.getByTestId('explore-surprise');

    const buttons = [byIngredients, surprise];

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  it('se ao clicar em Por Ingredientes redireciona para a página certa', () => {
    const { history } = renderWithRouter(<BeverageExplorer />);

    const byIngredients = screen.getByTestId('explore-by-ingredient');

    userEvent.click(byIngredients);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
  it('se ao clicar em me surpreenda redireciona para a página certa', () => {
    // const { history } =
    renderWithRouter(<BeverageExplorer />);
    const surprise = screen.getByTestId('explore-surprise');

    userEvent.click(surprise);
    // const { pathname } = history.location;
    // expect(pathname).toBe('/explorar/bebidas/17203');
  });
});
