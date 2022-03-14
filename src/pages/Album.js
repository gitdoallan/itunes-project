import React from 'react';
import PropType, { string } from 'prop-types';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  componentDidMount() {
    const { match: { params: { id } }, listSongs } = this.props;
    listSongs(id);
  }

  render() {
    const { match: { params: { id } }, favoritesId, checkFav, trackInfo,
      albumData, loadingAlbum, favSong, loadingCheck, getFavSong } = this.props;
    return (
      loadingAlbum
        ? <span>Carregando...</span>
        : (
          <div data-testid="page-album">
            <img
              alt={ albumData[0]?.collectionName }
              src={ albumData[0]?.artworkUrl100 }
            />
            <h3>
              <span data-testid="artist-name">{`${albumData[0]?.artistName}`}</span>
              <span data-testid="album-name">
                {` - ${albumData[0]?.collectionName} (ID: ${id})`}
              </span>
            </h3>
            <MusicCard
              trackInfo={ trackInfo }
              loadingCheck={ loadingCheck }
              favSong={ favSong }
              getFavSong={ getFavSong }
              favoritesId={ favoritesId }
              checkFav={ checkFav }
            />
          </div>
        )
    );
  }
}

Album.propTypes = {
  favoritesId: PropType.arrayOf(PropType.any).isRequired,
  trackInfo: PropType.arrayOf(PropType.any).isRequired,
  getFavSong: PropType.func.isRequired,
  checkFav: PropType.func.isRequired,
  favSong: PropType.func.isRequired,
  loadingCheck: PropType.bool.isRequired,
  albumData: PropType.arrayOf(PropType.object).isRequired,
  listSongs: PropType.func.isRequired,
  loadingAlbum: PropType.bool.isRequired,
  match: PropType.shape({
    params: PropType.shape({
      id: string,
    }),
  }).isRequired,
};
