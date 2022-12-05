import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Página Not Found', () => {
  renderWithRouter(<NotFound />);

  it('Se possui texto NotFound', () => {
    const title = screen.getByText(/not found/i);
    expect(title).toBeInTheDocument();
  });
});
