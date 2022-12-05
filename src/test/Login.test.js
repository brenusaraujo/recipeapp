import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import AppProvider from '../context/AppProvider';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';

describe('testes da aplicação', () => {
  test('verifica se os elementos são renderizados na tela de login', () => {
    render(<AppProvider><App /></AppProvider>);
    const history = createMemoryHistory();

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByTestId(LOGIN_BUTTON);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  test('verifica se ao preencher corretamente os campos o botão é habilitado', () => {
    render(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByTestId(LOGIN_BUTTON);

    expect(buttonSubmit).toBeDisabled();
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    expect(buttonSubmit).not.toBeDisabled();
  });

  test('testa se ao clicar no botão entrar a página é redirecionada', async () => {
    render(<AppProvider><App /></AppProvider>);

    const history = createMemoryHistory();
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const buttonSubmit = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(buttonSubmit);

    waitFor(() => {
      expect(history.location.pathname).toBe('/foods');
    });
  });
});
