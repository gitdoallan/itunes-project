import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Loading from './pages/Loading';
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
    };
    this.inputTrack = this.inputTrack.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  inputTrack(e) {
    this.setState({ inputValue: e.target.value });
    const minInput = 3;
    if (e.target.value.length >= minInput) {
      this.setState({ btnDisabled: false });
    }
  }

  async submitForm(e) {
    this.setState({ loading: true });
    e.preventDefault();
    const { inputValue } = this.state;
    await createUser({ name: inputValue });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h1>TrybeTunes</h1>
        <BrowserRouter>
          { loading
            ? <Loading />
            : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={ () => (
                    <Login
                      { ...this.state }
                      inputTrack={ this.inputTrack }
                      submitForm={ this.submitForm }
                    />
                  ) }
                />
                <Route exact path="/search" component={ Search } />
                <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
                <Route exact path="/favorites" component={ Favorites } />
                <Route exact path="/profile" component={ Profile } />
                <Route exact path="/profile/edit" component={ ProfileEdit } />
                <Route component={ NotFound } />
              </Switch>
            ) }
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
