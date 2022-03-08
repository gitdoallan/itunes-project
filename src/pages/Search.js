import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

const INIT_STATE = {
  btnDisabled: true,
  inputValue: '',
  loading: false,
  redirect: false,
  goTo: '',
};

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INIT_STATE,
      showR: false,
      searchTerm: '',
      data: [],
    };
    this.submitFormSearch = this.submitFormSearch.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  checkInput(e) {
    this.setState({ inputValue: e.target.value });
    const loginMin = 2;
    if (e.target.value.length >= loginMin) {
      this.setState({ btnDisabled: false });
    }
  }

  async submitFormSearch(e) {
    e.preventDefault();
    const { inputValue } = this.state;
    this.setState({ loading: true });
    const results = await searchAlbumsAPI(inputValue);
    this.setState({ ...INIT_STATE, showR: true, searchTerm: inputValue, data: results });
  }

  render() {
    const { btnDisabled, inputValue, loading, showR, searchTerm, data } = this.state;
    return (
      <div data-testid="page-search">
        <span>Página: Search.</span>
        { loading
          ? (<Loading { ...this.state } />)
          : (
            <>
              <form onSubmit={ this.submitFormSearch }>
                <input
                  onChange={ this.checkInput }
                  value={ inputValue }
                  id="input-search"
                  data-testid="search-artist-input"
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
              {showR
              && (
                <div className="results">
                  <span>
                    {`Resultado de álbuns de: ${searchTerm}`}
                  </span>
                  {data[0]
                    ? (
                      data.map((element) => (
                        <div key={ element.collectionId }>
                          <Link
                            data-testid={ `link-to-album-${element.collectionId}` }
                            to={ `/album/${element.collectionId}` }
                          >
                            {element.collectionName}
                          </Link>
                        </div>
                      )))
                    : (
                      <div>
                        <span>
                          Nenhum álbum foi encontrado
                        </span>
                      </div>
                    )}
                  )
                </div>
              )}
            </>)}
      </div>
    );
  }
}
