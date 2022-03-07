import React from 'react';
import PropType from 'prop-types';

export default class Login extends React.Component {
  render() {
    const { btnDisabled, inputValue, inputTrack, submitForm } = this.props;

    return (
      <div data-testid="page-login">
        <span>Página: Login!</span>
        <form onSubmit={ submitForm }>
          <input
            value={ inputValue }
            onChange={ inputTrack }
            data-testid="login-name-input"
            type="text"
          />
          <button
            disabled={ btnDisabled }
            type="submit"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  btnDisabled: PropType.bool.isRequired,
  inputValue: PropType.string.isRequired,
  inputTrack: PropType.func.isRequired,
  submitForm: PropType.func.isRequired,
};
