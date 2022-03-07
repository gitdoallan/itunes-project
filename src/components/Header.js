import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingHeader: true,
      redirect: false,
      goTo: '',
      userName: '',
    };
    this.initialRender = this.initialRender.bind(this);
  }

  async initialRender() {
    const result = await getUser();
    this.setState({ loadingHeader: false, userName: result.name });
  }

  render() {
    this.initialRender();
    const { loadingHeader, userName } = this.state;
    return (
      <div>
        { loadingHeader
          ? <Loading { ...this.state } />
          : (
            <div data-testid="header-component">
              <span data-testid="header-user-name">
                Olá @
                { userName }
              </span>
            </div>
          ) }
      </div>
    );
  }
}
