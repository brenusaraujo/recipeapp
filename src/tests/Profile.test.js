import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Profile from '../pages/Profile';

const EMAIL = 'usuario@mail.com';

describe('Página de perfil', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', '{ "email": "usuario@mail.com" }');
  });
  it('se o email do usuário aparece na tela', () => {
    renderWithRouter(<Profile />);
    const userEmail = screen.getByTestId('profile-email');
    const userStorage = JSON.parse(window.localStorage.getItem('user'));

    expect(userEmail.textContent).toBe(EMAIL);
    expect(userStorage.email).toBe(EMAIL);
  });
  it('se os três botões: feitas, favoritas e sair, aparecem na tela', () => {
    renderWithRouter(<Profile />);

    const favoritas = screen.getByTestId('profile-favorite-btn');
    const feitas = screen.getByTestId('profile-done-btn');
    const sair = screen.getByTestId('profile-logout-btn');

    expect(favoritas).toBeInTheDocument();
    expect(favoritas.textContent).toBe('Receitas Favoritas');
    expect(feitas).toBeInTheDocument();
    expect(feitas.textContent).toBe('Receitas Feitas');
    expect(sair).toBeInTheDocument();
    expect(sair.textContent).toBe('Sair');
  });
  it('se ao clicar em receitas favoritas redireciona para página de favoritos', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoritas = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoritas);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });
  it('se ao clicar em receitas feitas redireciona para página de concluídas', () => {
    const { history } = renderWithRouter(<Profile />);

    const feitas = screen.getByTestId('profile-done-btn');

    userEvent.click(feitas);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });
  it('se ao clicar em sair redireciona para o login e limpa o localStorage', () => {
    const { history } = renderWithRouter(<Profile />);

    const sair = screen.getByTestId('profile-logout-btn');

    userEvent.click(sair);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    expect(window.localStorage.getItem('email')).toBe(null);
    expect(window.localStorage.getItem('mealsToken')).toBe(null);
    expect(window.localStorage.getItem('cocktailsToken')).toBe(null);
    expect(window.localStorage.getItem('doneRecipes')).toBe(null);
    expect(window.localStorage.getItem('favoriteRecipes')).toBe(null);
    expect(window.localStorage.getItem('inProgressRecipes')).toBe(null);
  });
});
