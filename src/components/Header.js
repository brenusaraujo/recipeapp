import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const { title, setSearchInput } = useContext(AppContext);
  const [showElement, setShowElement] = useState(false);
  const showOrHide = () => setShowElement(!showElement);

  const handleChange = ({ target }) => {
    setSearchInput(target.value);
  };

  return (
    <div>
      <h1 data-testid="page-title">
        {document.title}
      </h1>
      { (title !== 'Done Recipes' && title !== 'Favorite Recipes' && title !== 'Profile')
       && (
         <button
           type="button"
           onClick={ showOrHide }
         >
           <img
             src={ searchIcon }
             alt="Search Icon"
             data-testid="search-top-btn"
           />
         </button>
       )}
      { showElement
        ? (
          <div>
            <input
              type="text"
              data-testid="search-input"
              onChange={ handleChange }
            />
            <SearchBar />
          </div>
        )
        : null }
      <Link
        to="/profile"
        href="teste"
      >
        <img
          src={ profileIcon }
          alt="Profile button"
          data-testid="profile-top-btn"
        />
      </Link>
    </div>
  );
}
