import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import Recipes from '../components/Recipes';

describe('Testa a página de receitas', () => {
  it('Deve mostrar o resultado apropriado ao clicar nos filtros', async () => {
    render(<AppProvider><Recipes type="foods" /></AppProvider>);

    // Categoria Beef
    await waitFor(() => {
      userEvent.click(screen.getByTestId('All-category-filter'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    });

    // Categoria All
    userEvent.click(screen.getByTestId('All-category-filter'));
    await waitFor(() => {
      expect(screen.getByText(/Corba/i)).toBeInTheDocument();
      expect(screen.getByText(/Burek/i)).toBeInTheDocument();
      expect(screen.getByText(/Kumpir/i)).toBeInTheDocument();
    });

    // Categoria Breakfast
    userEvent.click(screen.getByTestId('Breakfast-category-filter'));
    await waitFor(() => {
      expect(screen.getByText(/Breakfast Potatoes/i)).toBeInTheDocument();
      expect(screen.getByText(/Smoked Haddock Kedgeree/i)).toBeInTheDocument();
      expect(screen.getByText(/Fruit and Cream Cheese Breakfast Pastries/i))
        .toBeInTheDocument();
    });

    // Deve retornar as receitas da categoria All caso clique duas vezes em um filtro
  });

  it('Testa os filtros da página de bebidas', async () => {
    render(
      <AppProvider>
        <Recipes />
      </AppProvider>,
    );

    // Categoria Shake
  });
});
