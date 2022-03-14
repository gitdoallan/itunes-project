import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createUser } from './services/userAPI';
import getMusics from './services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';
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
    this.state = { ...INIT_STATE,
      albumData: [],
      loadingAlbum: false,
      loadingCheck: false,
      favoritesId: [],
    };
    this.checkInput = this.checkInput.bind(this);
    this.submitFormLogin = this.submitFormLogin.bind(this);
    this.listSongs = this.listSongs.bind(this);
    this.favSong = this.favSong.bind(this);
    this.getFavSong = this.getFavSong.bind(this);
    this.checkFav = this.checkFav.bind(this);
  }

  async getFavSong() {
    this.setState({ loadingCheck: true });
    const result = await getFavoriteSongs();
    this.setState({ favoritesId: [...new Set(result)] });
    this.setState({ loadingCheck: false });
  }

  async favSong(id) {
    const { favoritesId } = this.state;
    this.setState({ loadingCheck: true });
    const isFaved = favoritesId.some((e) => e === id);
    if (!isFaved) {
      await addSong(id);
      this.setState((acc) => ({
        favoritesId: [...acc.favoritesId, id], loadingCheck: false }));
    } else {
      await removeSong(id);
      const removeFav = favoritesId.filter((e) => e !== id);
      this.setState({ favoritesId: removeFav, loadingCheck: false });
    }
  }

  checkInput(e) {
    this.setState({ inputValue: e.target.value });
    const loginMin = 3;
    const minInput = loginMin;
    if (e.target.value.length >= minInput) {
      this.setState({ btnDisabled: false });
    }
  }

  checkFav(id) {
    const { favoritesId } = this.state;
    const isChecked = favoritesId.some((e) => e === id);
    return isChecked;
  }

  async submitFormLogin(e) {
    this.setState({ loading: true, redirect: true, goTo: '/search' });
    e.preventDefault();
    const { inputValue } = this.state;
    await createUser({ name: inputValue });
    this.setState({ ...INIT_STATE });
  }

  async listSongs(id) {
    this.setState({ loadingAlbum: true });
    const results = await getMusics(id);
    this.setState({ albumData: results, loadingAlbum: false });
  }

  render() {
    const { loading, albumData } = this.state;
    const trackInfo = [...albumData]; trackInfo.shift();
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
                      <Album
                        { ...props }
                        { ...this.state }
                        trackInfo={ trackInfo }
                        listSongs={ this.listSongs }
                        favSong={ this.favSong }
                        getFavSong={ this.getFavSong }
                        checkFav={ this.checkFav }
                      />
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
