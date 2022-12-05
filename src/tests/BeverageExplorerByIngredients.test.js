import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import BeverageExplorerByIngredients from '../pages/BeverageExplorerByIngredients';

describe('testa a pagina de explorar bebidas por ingrediente', () => {
  it('Testa se os cards são renderizados', async () => {
    renderWithRouter(<BeverageExplorerByIngredients />);
    const card0 = await screen.findByTestId('0-ingredient-card');
    const card1 = await screen.findByTestId('1-ingredient-card');
    const card2 = await screen.findByTestId('2-ingredient-card');
    const card3 = await screen.findByTestId('3-ingredient-card');
    const card4 = await screen.findByTestId('4-ingredient-card');
    const card5 = await screen.findByTestId('5-ingredient-card');
    const card6 = await screen.findByTestId('6-ingredient-card');
    const card7 = await screen.findByTestId('7-ingredient-card');
    const card8 = await screen.findByTestId('8-ingredient-card');
    const card9 = await screen.findByTestId('9-ingredient-card');
    const card10 = await screen.findByTestId('10-ingredient-card');
    const card11 = await screen.findByTestId('11-ingredient-card');

    const cards = [card0, card1, card2, card3, card4, card5,
      card6, card7, card8, card9, card10, card11];

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(/Info receita/i);
    });
  });
});
