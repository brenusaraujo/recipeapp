import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Food from '../pages/Food';
import RecipesProvider from '../context/RecipesProvider';

const propAvocado = { location: { ingredient: 'Avocado' } };

describe('Página principal de comidas', () => {
  it('A tela possui os 12 data-testids dos cards', async () => {
    renderWithRouter(<RecipesProvider><Food /></RecipesProvider>);

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

  it('Testa botões de filtro', async () => {
    renderWithRouter(<RecipesProvider><Food /></RecipesProvider>);
    const filter0 = await screen.findByTestId('All-category-filter');
    const filter1 = await screen.findByTestId('Beef-category-filter');
    const filter2 = await screen.findByTestId('Breakfast-category-filter');
    const filter3 = await screen.findByTestId('Chicken-category-filter');
    const filter4 = await screen.findByTestId('Dessert-category-filter');
    const filter5 = await screen.findByTestId('Goat-category-filter');

    const filterButtons = [filter0, filter1, filter2, filter3, filter4, filter5];

    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
  it('Testa se renderiza as receitas de acordo com o ingrediente escolhido', async () => {
    renderWithRouter(<RecipesProvider><Food { ...propAvocado } /></RecipesProvider>);
    await expect(screen.queryByText('Burek')).not.toBeInTheDocument();

    const avocadoRecipe = await screen.findByText('Chocolate Avocado Mousse');
    expect(avocadoRecipe).toBeInTheDocument();
  });
});
