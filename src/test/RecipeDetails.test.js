import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/helpers/renderWithRouter';

const routeDrink = 'drinks/178319';
describe('Testes no componente RecepisDetails', () => {
  it('Testa se a página foods foi renderizada', async () => {
    waitFor(() => {
      const { history } = renderWithRouter(<App />);
      history.push('foods/52771');
    });

    const text = await screen.findByText(/arrabiata/i);
    expect(text).toBeInTheDocument();
  });
  it('Testa se a página drinks foi renderizada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(routeDrink);

    const text = await screen.findByText(/aquamarine/i);
    expect(text).toBeInTheDocument();

    const recomend = await screen.findByTestId('0-recomendation-card');
    expect(recomend).toBeInTheDocument();
  });
  it('Testa se ao clicar em next a página é redirecionada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('drinks/178319');

    const buttonStart = await screen.findByTestId('start-recipe-btn');
    userEvent.click(buttonStart);
  });
  it.skip('Testa o clique do favorite', async () => {
    const initialState = [{

      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }];

    const { history } = renderWithRouter(<App />, initialState);
    history.push(routeDrink);

    const btnFavorite = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite);

    const blackIcon = await screen.findByAltText('blackFavoriteIcon');
    expect(blackIcon).toBeInTheDocument();
    userEvent.click(btnFavorite);

    const whiteIcon = await screen.findByAltText('whiteFavoriteIcon');
    expect(whiteIcon).toBeInTheDocument();
  });
  it('Testa se as recomendações foram renderizadas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(routeDrink);

    const recomendation = await screen.findByTestId('0-recomendation-card');
    const p = await screen.findByTestId('0-recomendation-title');
    expect(recomendation).toBeInTheDocument();
    expect(p).toBeInTheDocument();

    expect(await screen.findByText('Corba')).toBeInTheDocument();
  });
  it('Testa se ao carregar, o favorito esta marcado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(routeDrink);

    const favoriteRecipes = [{
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const btnFav = await screen.findByAltText('blackFavoriteIcon');
    expect(btnFav).toBeInTheDocument();
  });
});
