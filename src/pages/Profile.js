import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const {
    setTitle,
  } = useContext(AppContext);

  const [user, setUser] = useState('');

  useEffect(() => {
    document.title = 'Profile';
    setTitle(document.title);
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setUser(userEmail);
    } else {
      setUser({ email: 'email@mail.com' });
    }
  }, []);

  const handleLogoutClick = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <>
      <Header />
      <div>
        <h3 data-testid="profile-email">
          email:
          {user.email}
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogoutClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
