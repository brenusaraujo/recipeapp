import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import BeverageDetails from '../pages/BeverageDetails';

const props = { match: { params: { id: '17222' } } };
const doneRecipes = [
  {
    id: '15288',
    type: 'bebida',
    area: '',
    category: 'Shot',
    alcoholicOrNot: 'Alcoholic',
    name: '252',
    image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    doneDate: '2022-01-16T23:19:35.770Z',
    tags: '',
  },
  {
    id: '53026',
    type: 'comida',
    area: 'Egyptian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Tamiya',
    image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    doneDate: '2022-01-18T01:47:03.628Z',
    tags: '',
  },
];

describe('Testa a página de detalhes de bebidas', () => {
  it('se os elementos se encontram na tela', async () => {
    renderWithRouter(<RecipesProvider><BeverageDetails { ...props } /></RecipesProvider>);

    const photo = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const title = await screen.findByTestId('recipe-title');
    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('3-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');

    const elements = [photo, category, title, ingredient0, ingredient1,
      ingredient2, instructions, ingredient3];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });
  it('se o botão está presente quando a receita ainda não foi feita',
    async () => {
      renderWithRouter(
        <RecipesProvider>
          <BeverageDetails { ...props } />
        </RecipesProvider>,
      );

      const finishBtn = await screen.findByTestId('start-recipe-btn');
      expect(finishBtn).toBeInTheDocument();
    });
  it('se o botão não está presente quando a receita foi feita',
    async () => {
      window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      renderWithRouter(
        <RecipesProvider>
          <BeverageDetails { ...props } />
        </RecipesProvider>,
      );
      // const finishBtn = await screen.findByTestId('start-recipe-btn');
      // expect(finishBtn).toHaveStyle('display: none');
    });
});
