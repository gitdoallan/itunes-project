import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Loading from './components/Loading';
import Header from './components/Header';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

const INIT_STATE = {
  btnDisabled: true,
  inputValue: '',
  loading: false,
  redirect: false,
  goTo: '',
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { ...INIT_STATE };
    this.checkInput = this.checkInput.bind(this);
    this.submitFormLogin = this.submitFormLogin.bind(this);
  }

  checkInput(e) {
    this.setState({ inputValue: e.target.value });
    const loginMin = 3;
    const minInput = loginMin;
    if (e.target.value.length >= minInput) {
      this.setState({ btnDisabled: false });
    }
  }

  async submitFormLogin(e) {
    this.setState({ loading: true, redirect: true, goTo: '/search' });
    e.preventDefault();
    const { inputValue } = this.state;
    await createUser({ name: inputValue });
    this.setState({ ...INIT_STATE });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h1>TrybeTunes</h1>
        <BrowserRouter>
          { loading
            ? <Loading { ...this.state } />
            : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={ () => (
                    <Login
                      { ...this.state }
                      checkInput={ this.checkInput }
                      submitFormLogin={ this.submitFormLogin }
                    />
                  ) }
                />
                <Route
                  exact
                  path="/search"
                  render={ () => (
                    <>
                      <Header
                        { ...this.state }
                        renderUser={ this.renderUser }
                      />
                      <Search { ...this.state } />
                    </>
                  ) }
                />
                <Route
                  path="/album/:id"
                  render={ (props) => (
                    <>
                      <Header
                        { ...this.state }
                      />
                      <Album { ...props } />
                    </>
                  ) }
                />
                <Route
                  exact
                  path="/favorites"
                  render={ () => (
                    <>
                      <Header
                        { ...this.state }
                      />
                      <Favorites />
                    </>
                  ) }
                />
                <Route
                  exact
                  path="/profile"
                  render={ () => (
                    <>
                      <Header
                        { ...this.state }
                      />
                      <Profile />
                    </>
                  ) }
                />
                <Route
                  exact
                  path="/profile/edit"
                  render={ () => (
                    <>
                      <Header
                        { ...this.state }
                      />
                      <ProfileEdit />
                    </>
                  ) }
                />
                <Route component={ NotFound } />
              </Switch>
            ) }
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
