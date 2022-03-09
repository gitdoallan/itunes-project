import React from 'react';
import PropType, { string } from 'prop-types';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  componentDidMount() {
    const { match: { params: { id } }, listSongs } = this.props;
    listSongs(id);
  }

  render() {
    const { match: { params: { id } },
      albumData, addSong, favorites, loadingChecked } = this.props;
    const albumInfo = albumData[0];
    return (
      <div data-testid="page-album">
        <img alt={ albumInfo?.collectionName } src={ albumInfo?.artworkUrl100 } />
        <h3>
          <span data-testid="artist-name">{`${albumInfo?.artistName}`}</span>
          <span data-testid="album-name">
            {` - ${albumInfo?.collectionName} (ID: ${id})`}
          </span>
        </h3>
        <MusicCard
          albumData={ albumData }
          addSong={ addSong }
          favorites={ favorites }
          loadingChecked={ loadingChecked }
        />
      </div>
    );
  }
}

Album.propTypes = {
  albumData: PropType.arrayOf(PropType.object).isRequired,
  favorites: PropType.arrayOf(PropType.object).isRequired,
  listSongs: PropType.func.isRequired,
  addSong: PropType.func.isRequired,
  loadingChecked: PropType.bool.isRequired,
  match: PropType.shape({
    params: PropType.shape({
      id: string,
    }),
  }).isRequired,
};
