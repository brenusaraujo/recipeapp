import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from '../services/helpers/renderWithRouter';

jest.mock('clipboard-copy');

const PROFILE_BUTTON = 'profile-top-btn';
const ALL_FILTER_BUTTON = 'filter-by-all-btn';
const FOOD_FILTER_BUTTON = 'filter-by-food-btn';
const DRINK_FILTER_BUTTON = 'filter-by-drink-btn';
const HORIZONTAL_IMAGE = '0-horizontal-image';

const MockStorage = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Verificando a page RecipeDetails', () => {
  it('Verifica se os componentes são renderizados sem storage em "/favorite-recipes"',
    async () => {
      localStorage.clear();
      renderWithRouter(<FavoriteRecipes />);

      const profileIcon = screen.getByTestId(PROFILE_BUTTON);
      const pageTitle = screen.getByTestId('page-title');
      const filterAll = screen.getByTestId(ALL_FILTER_BUTTON);
      const filterFood = screen.getByTestId(FOOD_FILTER_BUTTON);
      const filterDrink = screen.getByTestId(DRINK_FILTER_BUTTON);

      expect(profileIcon).toBeInTheDocument();
      expect(pageTitle).toBeInTheDocument();
      expect(filterAll).toBeInTheDocument();
      expect(filterFood).toBeInTheDocument();
      expect(filterDrink).toBeInTheDocument();
    });

  it('Verifica se os componentes são renderizados com storage em "/favorite-recipes"',
    async () => {
      localStorage.clear();
      localStorage.setItem('favoriteRecipes', JSON.stringify(MockStorage));

      renderWithRouter(<FavoriteRecipes />);

      const profileIcon = screen.getByTestId(PROFILE_BUTTON);
      const pageTitle = screen.getByTestId('page-title');
      const filterAll = screen.getByTestId(ALL_FILTER_BUTTON);
      const filterFood = screen.getByTestId(FOOD_FILTER_BUTTON);
      const filterDrink = screen.getByTestId(DRINK_FILTER_BUTTON);
      const firstElementImage = screen.getByTestId(HORIZONTAL_IMAGE);
      const firstElementTitle = screen.getByTestId('0-horizontal-name');
      const firstElementCategory = screen.getByTestId('0-horizontal-top-text');
      const firstElementShareBtn = screen.getByTestId('0-horizontal-share-btn');
      const firstElementFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

      expect(profileIcon).toBeInTheDocument();
      expect(pageTitle).toBeInTheDocument();
      expect(filterAll).toBeInTheDocument();
      expect(filterFood).toBeInTheDocument();
      expect(filterDrink).toBeInTheDocument();
      expect(firstElementImage).toBeInTheDocument();
      expect(firstElementTitle).toBeInTheDocument();
      expect(firstElementCategory).toBeInTheDocument();
      expect(firstElementShareBtn).toBeInTheDocument();
      expect(firstElementFavoriteBtn).toBeInTheDocument();
    });

  it('Verifica as funcionalidades dos botões de profile,'
    + 'compartilhar e favoritar em "/favorite-recipes"',
  async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockStorage));

    const { history } = renderWithRouter(<FavoriteRecipes />);

    const profileIcon = screen.getByTestId(PROFILE_BUTTON);
    const firstElementShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const SecondElementFavoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');

    userEvent.click(firstElementShareBtn);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(SecondElementFavoriteBtn);
    expect(SecondElementFavoriteBtn).not.toBeInTheDocument();

    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica as funcionalidades dos botões filtrar e'
   + 'de redirecionamento em "/favorite-recipes"',
  async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockStorage));

    const { history } = renderWithRouter(<FavoriteRecipes />);

    const filterAll = screen.getByTestId(ALL_FILTER_BUTTON);
    const filterFood = screen.getByTestId(FOOD_FILTER_BUTTON);
    const filterDrink = screen.getByTestId(DRINK_FILTER_BUTTON);
    const firstElementImage = screen.getByTestId(HORIZONTAL_IMAGE);
    const secondElementImage = screen.getByTestId('1-horizontal-image');

    userEvent.click(filterFood);
    expect(firstElementImage).toBeInTheDocument();
    expect(secondElementImage).not.toBeInTheDocument();

    userEvent.click(filterAll);

    const NewsecondElementImage = screen.getByTestId('1-horizontal-image');

    expect(firstElementImage).toBeInTheDocument();
    expect(NewsecondElementImage).toBeInTheDocument();

    userEvent.click(filterDrink);

    const NewfirstElementImage = screen.getByTestId(HORIZONTAL_IMAGE);

    expect(NewfirstElementImage).toBeInTheDocument();
    expect(NewsecondElementImage).not.toBeInTheDocument();

    userEvent.click(NewfirstElementImage);

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
