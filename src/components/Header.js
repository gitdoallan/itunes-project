import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
      goTo: '',
      userName: '',
    };
    this.initialRender = this.initialRender.bind(this);
  }

  async initialRender() {
    const result = await getUser();
    this.setState({ loading: false, userName: result.name });
  }

  render() {
    this.initialRender();
    const { loading, userName } = this.state;
    return (
      <div>
        { loading
          ? <Loading { ...this.state } />
          : (
            <div data-testid="header-component">
              <span data-testid="header-user-name">
                Olá @
                { userName }
              </span>
              <Link data-testid="link-to-search" to="/search">Busca</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </div>
          ) }
      </div>
    );
  }
}
