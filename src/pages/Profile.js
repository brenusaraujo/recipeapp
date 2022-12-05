import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email : '';
  const history = useHistory();

  const redirect = (redirectTo) => {
    if (redirectTo === 'done-recipes') return history.push('/receitas-feitas');
    if (redirectTo === 'favorite-recipes') return history.push('/receitas-favoritas');
    history.push('/');
    localStorage.clear();
  };

  return (
    <div className="page-container-gradient">
      <Header name="Perfil" />
      <div className="profile">
        <p className="email" data-testid="profile-email">{email}</p>
        <div className="explore">
          <button
            className="explore__btn"
            onClick={ () => redirect('done-recipes') }
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
          <button
            className="explore__btn"
            onClick={ () => redirect('favorite-recipes') }
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
          <button
            className="explore__btn"
            onClick={ () => redirect('login') }
            type="button"
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
