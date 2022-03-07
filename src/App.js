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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      inputValue: '',
      loading: false,
      redirect: false,
      goTo: '',
    };
    this.checkInput = this.checkInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderUser = this.renderUser.bind(this);
  }

  checkInput(e) {
    this.setState({ inputValue: e.target.value });
    const loginMin = 3;
    const minInput = e.target.id === 'input-search' ? 2 : loginMin;
    if (e.target.value.length >= minInput) {
      this.setState({ btnDisabled: false });
    }
  }

  async submitForm(e) {
    this.setState({ loading: true, redirect: true, goTo: '/search' });
    e.preventDefault();
    const { inputValue } = this.state;
    await createUser({ name: inputValue });
    this.setState({ loading: false, inputValue: '', btnDisabled: true });
  }

  async renderUser() {
    return 'hello';
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
                      submitForm={ this.submitForm }
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
                      <Search
                        { ...this.state }
                        checkInput={ this.checkInput }
                      />
                    </>
                  ) }
                />
                <Route
                  path="/album/:id"
                  render={ (props) => (
                    <>
                      <Header
                        { ...this.state }
                        renderUser={ this.renderUser }
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
                        renderUser={ this.renderUser }
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
                        renderUser={ this.renderUser }
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
                        renderUser={ this.renderUser }
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
