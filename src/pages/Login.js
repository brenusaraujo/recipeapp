import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import '../css/Login.css';

const MIN_PASSWORD_LENGTH = 6;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(true);

  const handleChange = async ({ target: { id, value } }) => {
    if (id === 'email') setEmail(value);
    else setPassword(value);
  };

  useEffect(() => {
    if (password.length > MIN_PASSWORD_LENGTH && /\S+@\S+\.\S+/
      .test(email)) { setButtonState(false); } else setButtonState(true);
  }, [email, password]);

  const saveAndRedirect = (e) => {
    e.preventDefault();
    const objEmail = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(objEmail));
    history.push('/comidas');
  };

  return (
    <div className="login-container">
      <h1 className="login__header">Trybe Food</h1>
      <div className="text-container">
        <p className="login__text">Bem vindo!</p>
        <p className="login__text--sub">Sentimos sua falta!</p>
      </div>
      <form onSubmit={ (e) => saveAndRedirect(e) } className="login__form">
        <input
          placeholder="Email"
          className="login__input"
          onChange={ handleChange }
          data-testid="email-input"
          id="email"
          type="email"
        />
        <input
          placeholder="Senha"
          className="login__input"
          onChange={ handleChange }
          data-testid="password-input"
          id="password"
          type="password"
        />
        <button
          className={ !buttonState ? 'login__btn' : 'login__btn-disabled' }
          disabled={ buttonState }
          type="submit"
          onClick={ saveAndRedirect }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
        <svg>
          <use href={ `${profileIcon}` } />
        </svg>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Login);
