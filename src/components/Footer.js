import React from 'react';
import { useHistory, useLocation } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  const history = useHistory();
  const { pathname } = useLocation();
  const selected = 'footer__btn selected';

  return (
    <footer
      data-testid="footer"
      className="footer"
      style={ { position: 'fixed', bottom: 0 } }
    >
      <button
        className={
          pathname.includes('bebidas') ? selected : 'footer__btn'
        }
        src={ drinkIcon }
        onClick={ () => history.push('/bebidas') }
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img className="footer__icon" src={ drinkIcon } alt="drinks icon" />
      </button>
      <button
        className={
          pathname.includes('explorar') ? selected : 'footer__btn'
        }
        src={ exploreIcon }
        onClick={ () => history.push('/explorar') }
        type="button"
        data-testid="explore-bottom-btn"
      >
        <img className="footer__icon" src={ exploreIcon } alt="explore icon" />
      </button>
      <button
        className={
          pathname.includes('comidas') ? selected : 'footer__btn'
        }
        src={ mealIcon }
        onClick={ () => history.push('/comidas') }
        type="button"
        data-testid="food-bottom-btn"
      >
        <img className="footer__icon" src={ mealIcon } alt="meal icon" />
      </button>
    </footer>
  );
}

export default Footer;
