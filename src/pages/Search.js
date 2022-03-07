import React from 'react';
import PropType from 'prop-types';

export default class Search extends React.Component {
  render() {
    const { checkInput, btnDisabled, inputValue } = this.props;
    return (
      <div data-testid="page-search">
        <span>Página: Search!!!!</span>
        <form>
          <input
            value={ inputValue }
            id="input-search"
            data-testid="search-artist-input"
            onChange={ checkInput }
            type="text"
          />
          <button
            disabled={ btnDisabled }
            data-testid="search-artist-button"
            type="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  checkInput: PropType.func.isRequired,
  btnDisabled: PropType.bool.isRequired,
  inputValue: PropType.string.isRequired,
};
