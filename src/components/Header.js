import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchForm from './SearchForm';
import '../css/Header.css';

function Header({ name, search = false }) {
  const history = useHistory();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  return (
    <header className="header">
      <div className="header__main">
        <button
          className="header__btn"
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <img
            className="header__icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt=""
          />
        </button>
        <h2
          className={ search ? 'header__title' : 'header__title--marker' }
          data-testid="page-title"
        >
          {name}
        </h2>
        {search && (
          <button
            className={ isSearchVisible ? 'header__btn-active' : 'header__btn' }
            type="button"
            onClick={ () => setIsSearchVisible(!isSearchVisible) }
          >
            <img
              className="header__icon"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt=""
            />
          </button>
        )}
      </div>
      {isSearchVisible && <SearchForm />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: false,
};

export default Header;
