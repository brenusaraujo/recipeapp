import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

const EMAIL_CORRETO = 'usuario@email.com';
const SENHA_CORRETA = '1234567';
const EMAIL_ERRADO = 'algo';
const SENHA_ERRADA = '1234';
const EMAIL = 'email-input';
const SENHA = 'password-input';
const BTN_LOGIN = 'login-submit-btn';

describe('Página de Login', () => {
  it('se há input de email e senha e botão de login', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL);
    const inputSenha = screen.getByTestId(SENHA);
    const btnEntrar = screen.getByTestId(BTN_LOGIN);

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btnEntrar).toBeInTheDocument();
  });
  it('se os inputs podem ser preenchidos', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL);
    const inputSenha = screen.getByTestId(SENHA);

    userEvent.type(inputEmail, EMAIL_CORRETO);
    expect(inputEmail.value).toBe(EMAIL_CORRETO);

    userEvent.type(inputSenha, SENHA_CORRETA);
    expect(inputSenha.value).toBe(SENHA_CORRETA);
  });
  it('se o botão só é habilitado com os inputs preenchidos corretamente', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL);
    const inputSenha = screen.getByTestId(SENHA);
    const btnEntrar = screen.getByTestId(BTN_LOGIN);

    expect(btnEntrar).toHaveAttribute('disabled');

    userEvent.type(inputEmail, EMAIL_ERRADO);
    userEvent.type(inputSenha, SENHA_ERRADA);
    expect(btnEntrar).toHaveAttribute('disabled');

    userEvent.type(inputEmail, EMAIL_CORRETO);
    userEvent.type(inputSenha, SENHA_CORRETA);
    expect(btnEntrar).not.toHaveAttribute('disabled');
  });
  it('se a pessoa é redirecionada para a página de comidas', () => {
    const { history } = renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(EMAIL);
    const inputSenha = screen.getByTestId(SENHA);
    const btnEntrar = screen.getByTestId(BTN_LOGIN);
    expect(window.localStorage.getItem('user')).toBe(null);
    expect(window.localStorage.getItem('mealsToken')).toBe(null);
    expect(window.localStorage.getItem('cocktailsToken')).toBe(null);

    userEvent.type(inputEmail, EMAIL_CORRETO);
    userEvent.type(inputSenha, SENHA_CORRETA);
    userEvent.click(btnEntrar);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
    const user = JSON.parse(window.localStorage.getItem('user'));
    expect(user).toEqual({ email: 'usuario@email.com' });
    expect(window.localStorage.getItem('mealsToken')).toBe('1');
    expect(window.localStorage.getItem('cocktailsToken')).toBe('1');
  });
});
