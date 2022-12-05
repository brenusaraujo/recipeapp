import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import App from '../App';
import AppProvider from '../context/AppProvider';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const PROFILE_BUTTON = 'profile-top-btn';
const PROFILE_EMAIL = 'profile-email';
const PROFILE_DONE = 'profile-done-btn';
const PROFILE_FAVORITE = 'profile-favorite-btn';
const LOGOUT_BUTTON = 'profile-logout-btn';
const EMAIL_TEST = 'teste@teste.com';

describe('Testes do componente Profile', () => {
  test('Verifica se os elementos são renderizados', () => {
    render(<AppProvider><App /></AppProvider>);
    const history = createMemoryHistory();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, EMAIL_TEST);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '1234567');

    const buttonSubmit = screen.getByTestId(LOGIN_BUTTON);
    userEvent.click(buttonSubmit);

    const profileBtn = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileBtn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });

    const profileEmail = screen.getByTestId(PROFILE_EMAIL);
    expect(profileEmail).toBeInTheDocument();

    const profileDoneBtn = screen.getByTestId(PROFILE_DONE);
    expect(profileDoneBtn).toBeInTheDocument();

    const profileFavoriteBtn = screen.getByTestId(PROFILE_FAVORITE);
    expect(profileFavoriteBtn).toBeInTheDocument();

    const profileLogoutBtn = screen.getByTestId(LOGOUT_BUTTON);
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  test('Verifica o funcionamento do botão "Recipes Done"', () => {
    render(<AppProvider><App /></AppProvider>);
    const history = createMemoryHistory();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, EMAIL_TEST);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '1234567');
    const buttonSubmit = screen.getByTestId(LOGIN_BUTTON);
    userEvent.click(buttonSubmit);

    const profileDoneBtn = screen.getByTestId(PROFILE_DONE);
    userEvent.click(profileDoneBtn);

    const doneTitle = screen.getByText('/Recipes Done/i');
    expect(doneTitle).toBeInTheDocument();

    waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });

  test('Verifica o funcionamento do botão "Favorite"', () => {
    render(<AppProvider><App /></AppProvider>);
    const history = createMemoryHistory();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, EMAIL_TEST);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(passwordInput, '1234567');
    const buttonSubmit = screen.getByTestId(LOGIN_BUTTON);
    userEvent.click(buttonSubmit);

    const profileDoneBtn = screen.getByTestId(PROFILE_DONE);
    userEvent.click(profileDoneBtn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });
  });

  // test('Verifica o funcionamento do botão "Logout"', () => {
  //   render(<AppProvider><App /></AppProvider>);

  //   const profileEmail = screen.getByTestId(PROFILE_EMAIL);
  //   expect(profileEmail).toBeInTheDocument();

  //   const logoutBtn = screen.getByTestId(LOGOUT_BUTTON);
  //   userEvent.click(logoutBtn);

  //   const userStorage = window.localStorage.getItem('email');
  //   expect(userStorage).toBe(null);

  //   const emailInput = screen.getByTestId(EMAIL_INPUT);
  //   expect(emailInput).toBeInTheDocument();

  //   const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  //   expect(passwordInput).toBeInTheDocument();
  // });
});
