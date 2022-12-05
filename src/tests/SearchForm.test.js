import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import Food from '../pages/Food';
import Beverage from '../pages/Beverage';

const SEARCH_BTN = 'search-top-btn';
const EXEC_BTN = 'exec-search-btn';
const INPUT = 'search-input';

describe('Testa o Search Form', () => {
  it('Testa a renderização do Search Form em Foods', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Food />
      </RecipesProvider>,
    );
    history.push('/comidas');
    const searchBtn = await screen.findByTestId(SEARCH_BTN);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const header = screen.getByTestId('page-title');
    const searchBar = await screen.findByTestId(INPUT);
    const executeBtn = await screen.findByTestId(EXEC_BTN);
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    const nameRadio = await screen.findByTestId('name-search-radio');
    const letterRadio = await screen.findByTestId('first-letter-search-radio');

    expect(header).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(executeBtn).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();

    userEvent.click(nameRadio);

    userEvent.type(searchBar, 'Jamaican');
    userEvent.click(executeBtn);
    const corba = screen.queryByRole('heading', { level: 3, name: 'Corba' });
    const jamaican = await screen.findByRole('heading',
      { level: 3, name: 'Jamaican Beef Patties' });

    await expect(corba).not.toBeInTheDocument();
    await expect(jamaican).toBeInTheDocument();
  });
  it('se está na página de comidas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Food />
      </RecipesProvider>,
    );
    history.push('/comidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    const corba = await screen.findByRole('heading', { level: 3, name: 'Corba' });

    expect(corba).toBeInTheDocument();
  });
  it('se está na página de bebidas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Beverage />
      </RecipesProvider>,
    );
    history.push('/bebidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');

    const GG = await screen.findByRole('heading', { level: 3, name: 'GG' });

    expect(GG).toBeInTheDocument();
    const searchBtn = await screen.findByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);

    const searchBar = await screen.findByTestId(INPUT);
    const executeBtn = await screen.findByTestId(EXEC_BTN);
    const letterRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(letterRadio);
    userEvent.type(searchBar, 'f');
    userEvent.click(executeBtn);

    const frose = await screen.findByRole('heading', { level: 3, name: 'Frosé' });

    expect(frose).toBeInTheDocument();
  });
  it('se achar só uma receita encaminha para página de detalhes', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Beverage />
      </RecipesProvider>,
    );
    history.push('/bebidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');

    const searchBtn = await screen.findByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);

    const searchBar = await screen.findByTestId(INPUT);
    const executeBtn = await screen.findByTestId(EXEC_BTN);
    const nameRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameRadio);
    userEvent.type(searchBar, 'frosé');
    userEvent.click(executeBtn);

    // await expect(history.location.pathname).toBe('/bebidas/178352');
  });
});
