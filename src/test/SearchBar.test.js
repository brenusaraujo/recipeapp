import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockMeals from '../../cypress/mocks/meals';
import mockDrinks from '../../cypress/mocks/drinks';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import renderWithRouter from '../services/helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';

const SEARCH_TOP_BTN = 'search-top-btn';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const SEARCH_INPUT = 'search-input';

afterEach(() => jest.clearAllMocks());

describe('testes do componente SearchBar', () => {
  test('verifica requisição a API - Foods', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);

    global.alert = jest.fn();

    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonSubmit = screen.getByTestId('login-submit-btn');

    expect(buttonSubmit).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');

    expect(buttonSubmit).toBeEnabled();

    userEvent.click(buttonSubmit);

    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchExecButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchExecButton).toBeInTheDocument();

    userEvent.type(searchInput, 'c');
    userEvent.click(ingredientRadio);
    userEvent.click(searchExecButton);
    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'c');
    userEvent.click(nameRadio);
    userEvent.click(searchExecButton);
    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'c');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchExecButton);
    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'chi');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchExecButton);
    expect(global.alert).toBeCalled();

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    userEvent.click(drinksButton);
  });

  test('verifica requisição a API - Drinks', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);

    global.alert = jest.fn();

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinks),
    });

    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    userEvent.click(drinksButton);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Drinks');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchExecButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchExecButton).toBeInTheDocument();

    userEvent.type(searchInput, 'a');
    userEvent.click(ingredientRadio);
    userEvent.click(searchExecButton);
    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.click(nameRadio);
    userEvent.click(searchExecButton);
    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.click(firstLetterRadio);
    userEvent.click(searchExecButton);
    await waitFor(() => expect(global.fetch).toBeCalled());

    userEvent.type(searchInput, 'aaa');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchExecButton);
    expect(global.alert).toBeCalled();
  });

  test('verifica se vai pra pagina de detalhes', async () => {
    renderWithRouter(<AppProvider><Foods /></AppProvider>);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const title = screen.getByText(/foods/i);
    expect(title).toBeInTheDocument();

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchExecButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(nameRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Spicy Arrabiata Penne');
    await waitFor(() => {
      userEvent.click(searchExecButton);
    });
  });

  test('verifica se vai pra pagina de detalhes', async () => {
    renderWithRouter(<AppProvider><Drinks /></AppProvider>);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const title = screen.getByText(/drinks/i);
    expect(title).toBeInTheDocument();

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchExecButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(nameRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Aquamarine');
    await waitFor(() => {
      userEvent.click(searchExecButton);
    });
  });

  test('verifica global alert - Drinks', async () => {
    renderWithRouter(<AppProvider><Drinks /></AppProvider>);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(emptyDrinks),
    }));

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchExecButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'xablau');
    await waitFor(() => {
      userEvent.click(searchExecButton);
    });
    expect(alertMock).toBeCalled();
  });

  test('verifica global alert - Foods', async () => {
    renderWithRouter(<AppProvider><Foods /></AppProvider>);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(emptyMeals),
    }));

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchExecButton = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'xablau');
    await waitFor(() => {
      userEvent.click(searchExecButton);
    });
    expect(alertMock).toBeCalled();
  });
});
