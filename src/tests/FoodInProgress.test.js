import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FoodInProgress from '../pages/FoodInProgress';
import RecipesProvider from '../context/RecipesProvider';

const props = { match: { params: { id: '53026' } } };

describe('Receita de comida em progresso', () => {
  it('se a foto, nome da receita, categoria aparecem, ingredientes e instruções aparecem',
    async () => {
      renderWithRouter(
        <RecipesProvider><FoodInProgress { ...props } /></RecipesProvider>,
      );
      const photo = await screen.findByTestId('recipe-photo');
      const category = await screen.findByTestId('recipe-category');
      const title = await screen.findByTestId('recipe-title');
      const ingredient0 = await screen.findByTestId('0-ingredient-step');
      const ingredient1 = await screen.findByTestId('1-ingredient-step');
      const ingredient2 = await screen.findByTestId('2-ingredient-step');
      const ingredient3 = await screen.findByTestId('3-ingredient-step');
      const ingredient4 = await screen.findByTestId('4-ingredient-step');
      const ingredient5 = await screen.findByTestId('5-ingredient-step');
      const ingredient6 = await screen.findByTestId('6-ingredient-step');
      const ingredient7 = await screen.findByTestId('7-ingredient-step');
      const ingredient8 = await screen.findByTestId('8-ingredient-step');
      const instructions = await screen.findByTestId('instructions');

      const elements = [photo, category, title, ingredient0, ingredient1,
        ingredient2, instructions, ingredient3, ingredient4, ingredient5,
        ingredient6, ingredient7, ingredient8];

      elements.forEach((element) => expect(element).toBeInTheDocument());
    });
  it('habilita o botão de finalizar e redireciona para receitas feitas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider><FoodInProgress { ...props } /></RecipesProvider>,
    );
    const submitBtn = await screen.findByTestId('finish-recipe-btn');
    const checks = await screen.findAllByRole('checkbox');

    expect(submitBtn).toHaveAttribute('disabled');
    checks.forEach((check) => userEvent.click(check));
    expect(submitBtn).not.toHaveAttribute('disabled');

    userEvent.click(submitBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });
});
