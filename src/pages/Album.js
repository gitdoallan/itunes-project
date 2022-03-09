import React from 'react';
import PropType, { string } from 'prop-types';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  componentDidMount() {
    const { match: { params: { id } }, listSongs } = this.props;
    listSongs(id);
  }

  render() {
    const { match: { params: { id } }, albumData } = this.props;
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
        <MusicCard albumData={ albumData } />
      </div>
    );
  }
}

Album.propTypes = {
  albumData: PropType.shape({}).isRequired,
  listSongs: PropType.func.isRequired,
  match: PropType.shape({
    params: PropType.shape({
      id: string,
    }),
  }).isRequired,
};
