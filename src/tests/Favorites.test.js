import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Receitas Favoritas', () => {
  const recipes = [
    {
      id: 17203,
      type: 'bebida',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'Kir',
      image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    },
    {
      id: 53026,
      type: 'comida',
      area: 'Egyptian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Tamiya',
      image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    },
    {
      id: 15288,
      type: 'bebida',
      area: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 252,
      image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    }];

  beforeEach(() => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  });
  afterEach(() => window.localStorage.clear());

  it('se todos os botões de filtro estão na página', () => {
    renderWithRouter(<FavoriteRecipes />);

    const filterFood = screen.getByTestId('filter-by-food-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    const filterAll = screen.getByTestId('filter-by-all-btn');

    expect(filterFood).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();
    expect(filterAll).toBeInTheDocument();
  });
  it('se aparecem todas as receitas favoritas', () => {
    renderWithRouter(<FavoriteRecipes />);

    const recipesImg = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-image`)
    ));
    const recipesName = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-name`)
    ));
    recipesImg.forEach((img) => expect(img).toBeInTheDocument());
    recipesName.forEach((name) => expect(name).toBeInTheDocument());
    expect(screen.queryByTestId('3-horizontal-image')).not.toBeInTheDocument();
  });
  it('se ao desfavoritar a receita some', async () => {
    renderWithRouter(<FavoriteRecipes />);

    const favoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    const secondRecipe = screen.getByTestId('1-horizontal-image');

    expect(secondRecipe).toBeInTheDocument();

    fireEvent.click(favoriteBtn);

    expect(secondRecipe).not.toBeInTheDocument();
  });
  it('se os filtros funcionam corretamente', () => {
    renderWithRouter(<FavoriteRecipes />);

    const filterFood = screen.getByTestId('filter-by-food-btn');
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const kir = screen.queryByAltText('Kir');
    const tamiya = screen.queryByAltText('Tamiya');

    expect(tamiya).toBeInTheDocument();
    expect(kir).toBeInTheDocument();

    fireEvent.click(filterFood);
    expect(kir).not.toBeInTheDocument();
    expect(tamiya).toBeInTheDocument();

    fireEvent.click(filterAll);
    expect(tamiya).toBeInTheDocument();
  });
  // it('se aparece a mensagem de link copiado', async () => {
  //   renderWithRouter(<FavoriteRecipes />);

  //   const message = screen.queryByText('Link copiado!');
  //   const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

  //   expect(message).not.toBeInTheDocument();
  //   // fireEvent.click(shareBtn);
  //   // expect(message).toBeInTheDocument();
  // });
});
