import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButton';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const {
    setTitle,
  } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [list, setList] = useState([]);
  const [share, setShare] = useState('');

  useEffect(() => {
    const storage = localStorage.getItem('doneRecipes');
    const data = storage ? JSON.parse(storage) : [];
    setRecipes(data);
    setList(data);
  }, []);

  const handleClick = ({ type, id, name }) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShare(name);
  };

  const filterRecipes = (param) => {
    const result = recipes.filter(({ type }) => type.includes(param));
    setList(result);
  };

  useEffect(() => {
    document.title = 'Done Recipes';
    setTitle(document.title); // ?
  }, []);
  return (
    <div>
      <Header />
      <FilterButtons filterRecipes={ filterRecipes } />
      { list[0] && list.map((item, index) => (
        <div key={ index }>
          <Link to={ `/${item.type}s/${item.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
              style={ { width: '150px', padding: '0 10px' } }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { item.type === 'food'
                ? `${item.nationality} - ${item.category}`
                : `${item.alcoholicOrNot}` }
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
          <button
            type="button"
            onClick={ () => handleClick(item) }
          >
            <img
              src={ shareIcon }
              alt="Ícone de compartilhamento"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { share === item.name && <span>Link copied!</span> }
          { item.tags.map((tag, i2) => (
            <p
              key={ i2 }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          )) }
        </div>
      )) }
    </div>
  );
}

export default DoneRecipes;
