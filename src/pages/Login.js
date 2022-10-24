import React from 'react';

export default function Login() {
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
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Enter
          </button>
        </fieldset>
      </form>
    </div>
  );
}
