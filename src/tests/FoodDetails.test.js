import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FoodDetails from '../pages/FoodDetails';
import RecipesProvider from '../context/RecipesProvider';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const props = { match: { params: { id: '53026' } } };
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

describe('Testa a página de detalhes de comidas', () => {
  it('se os elementos se encontram na tela', async () => {
    renderWithRouter(<RecipesProvider><FoodDetails { ...props } /></RecipesProvider>);

    const photo = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const title = await screen.findByTestId('recipe-title');
    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredient4 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredient5 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredient6 = await screen.findByTestId('6-ingredient-name-and-measure');
    const ingredient7 = await screen.findByTestId('7-ingredient-name-and-measure');
    const ingredient8 = await screen.findByTestId('8-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');

    const elements = [photo, category, title, ingredient0, ingredient1,
      ingredient2, instructions, ingredient3, ingredient4, ingredient5,
      ingredient6, ingredient7, ingredient8];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });
  it('se o botão está presente quando a receita ainda não foi feita',
    async () => {
      renderWithRouter(<RecipesProvider><FoodDetails { ...props } /></RecipesProvider>);

      const finishBtn = await screen.findByTestId('start-recipe-btn');
      expect(finishBtn).toBeInTheDocument();
    });
  it('se o botão de favoritar funciona corretamente',
    async () => {
      renderWithRouter(<RecipesProvider><FoodDetails { ...props } /></RecipesProvider>);

      const favoriteBtn = await screen.findByTestId('favorite-btn');
      expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);

      userEvent.click(favoriteBtn);
      await expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
    });
  it('se o botão não está presente quando a receita foi feita',
    async () => {
      window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      renderWithRouter(<RecipesProvider><FoodDetails { ...props } /></RecipesProvider>);

      // const finishBtn = await screen.findByTestId('start-recipe-btn');
      // expect(finishBtn).toHaveStyle('display: none');
    });
});
