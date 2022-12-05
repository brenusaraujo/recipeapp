import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodExplorerByArea from '../pages/FoodExplorerByArea';

describe('testa a pagina de explorar bebidas por ingrediente', () => {
  it('Testa se os cards são renderizados', async () => {
    renderWithRouter(<FoodExplorerByArea />);
    const card0 = await screen.findByTestId('0-recipe-card');
    const card1 = await screen.findByTestId('1-recipe-card');
    const card2 = await screen.findByTestId('2-recipe-card');
    const card3 = await screen.findByTestId('3-recipe-card');
    const card4 = await screen.findByTestId('4-recipe-card');
    const card5 = await screen.findByTestId('5-recipe-card');
    const card6 = await screen.findByTestId('6-recipe-card');
    const card7 = await screen.findByTestId('7-recipe-card');
    const card8 = await screen.findByTestId('8-recipe-card');
    const card9 = await screen.findByTestId('9-recipe-card');
    const card10 = await screen.findByTestId('10-recipe-card');
    const card11 = await screen.findByTestId('11-recipe-card');

    const cards = [card0, card1, card2, card3, card4, card5,
      card6, card7, card8, card9, card10, card11];

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(/Info receita/i);
    });
  });

  it('Testa o select', async () => {
    renderWithRouter(<FoodExplorerByArea />);
    const select = await screen.findByTestId('explore-by-area-dropdown');
    expect(select).toBeInTheDocument();

    const optionAll = await screen.findByTestId('All-option');
    const optionAmerican = await screen.findByTestId('American-option');

    userEvent.selectOptions(select, 'American');

    expect(optionAll.selected).toBeFalsy();
    expect(optionAmerican.selected).toBeTruthy();
  });
});
