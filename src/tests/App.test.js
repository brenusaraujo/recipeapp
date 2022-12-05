import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App', () => {
  it('testa rota Login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
