import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Login() {
  const {
    email,
    setEmail, password, setPassword, btnDisable, setBtnDisable } = useContext(MyContext);

  const validateInput = () => {
    const regex = /\S+@\S+\.\S+/;
    const passwordLength = 6;
    const verifyEmail = email && regex.test(email);
    const verifyName = password.length > passwordLength;
    setBtnDisable(!(verifyEmail && verifyName));
  };

  useEffect(() => {
    validateInput();
  });

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <fieldset>
          <legend>
            Digite e-mail e senha
          </legend>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              value={ email }
              onChange={ (({ target }) => setEmail(target.value)) }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              data-testid="password-input"
              value={ password }
              onChange={ (({ target }) => setPassword(target.value)) }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ btnDisable }
            onClick={ handleClick }
          >
            Enter
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
