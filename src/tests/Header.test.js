import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './renderWithRouter';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesProvider from '../context/RecipesProvider';

const TÍTULO_HEADER = 'nome da página';
const BOTAO_PERFIL = 'profile-top-btn';

describe('Componente Header', () => {
  it('se aparece o ícone de perfil e o título', () => {
    renderWithRouter(<Header name={ TÍTULO_HEADER } />);

    const titulo = screen.getByRole('heading', {
      name: TÍTULO_HEADER,
    });
    const btnPerfil = screen.getByTestId(BOTAO_PERFIL);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(1);

    expect(titulo).toBeInTheDocument();
    expect(titulo).toHaveTextContent(TÍTULO_HEADER);
    expect(titulo).toHaveAttribute('data-testid', 'page-title');

    expect(btnPerfil).toBeInTheDocument();
    expect(btnPerfil).toHaveAttribute('src', profileIcon);
  });
  it('se aparece o ícone de perfil, o título e o ícone de busca', () => {
    renderWithRouter(<Header name={ TÍTULO_HEADER } search />);

    const titulo = screen.getByRole('heading', {
      name: TÍTULO_HEADER,
    });
    const btnPerfil = screen.getByTestId(BOTAO_PERFIL);
    const btnSearch = screen.getByTestId('search-top-btn');
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);

    expect(titulo).toBeInTheDocument();
    expect(btnPerfil).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
    expect(btnSearch).toHaveAttribute('src', searchIcon);
  });
  it('se o botão de perfil redireciona para a página de perfil quando clicado', () => {
    const { history } = renderWithRouter(<Header name={ TÍTULO_HEADER } />);

    const btnPerfil = screen.getByTestId(BOTAO_PERFIL);

    userEvent.click(btnPerfil);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
  it('se ao clicar no botão de search aparece o forms de busca', () => {
    renderWithRouter(
      <RecipesProvider>
        <Header name={ TÍTULO_HEADER } search />
      </RecipesProvider>,
    );

    const btnSearch = screen.getByTestId('search-top-btn');

    userEvent.click(btnSearch);
    const inputSearchBar = screen.getByTestId('search-input');
    const btnSearchBar = screen.getByTestId('exec-search-btn');

    expect(inputSearchBar).toBeInTheDocument();
    expect(btnSearchBar).toBeInTheDocument();
  });
});
