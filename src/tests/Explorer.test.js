import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explorer from '../pages/Explorer';
import renderWithRouter from './renderWithRouter';

describe('Explorar', () => {
  it('se tem os data-testid certos', () => {
    renderWithRouter(<Explorer />);

    expect(screen.getByTestId('explore-food')).toBeInTheDocument();
    expect(screen.getByTestId('explore-drinks')).toBeInTheDocument();
  });
  it('se ao clicar em Explorar comidas redireciona para a página certa', () => {
    const { history } = renderWithRouter(<Explorer />);

    const food = screen.getByTestId('explore-food');

    userEvent.click(food);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });
  it('se ao clicar em Explorar bebidas redireciona para a página certa', () => {
    const { history } = renderWithRouter(<Explorer />);

    const drinks = screen.getByTestId('explore-drinks');

    userEvent.click(drinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
