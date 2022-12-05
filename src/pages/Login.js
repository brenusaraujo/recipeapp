import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Login() {
  const history = useHistory();
  const { setTitle } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  useEffect(() => {
    const minPasswordLength = 6;
    const validEmail = (/\S+@\S+\.\S+/i);
    if (
      password.length > minPasswordLength
      && validEmail.test(email)
      && email.includes('.com')
    ) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }, [email, password]);

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const handleClick = () => {
    const obj = { email };
    localStorage.setItem('user', JSON.stringify(obj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  useEffect(() => {
    document.title = 'Login';
    setTitle(document.title);
  }, []);

  return (
    <main>

      <label htmlFor="email">
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="email"
          onChange={ handleChange }
        />

      </label>
      <label htmlFor="password">
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="password"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonIsDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </main>
  );
}

export default Login;
