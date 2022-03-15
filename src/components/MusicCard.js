import React from 'react';
import PropType from 'prop-types';

export default class MusicCard extends React.Component {
  componentDidMount() {
    const { getFavSong } = this.props;
    getFavSong();
  }

  render() {
    const { favSong,
      checkFav, trackId, trackName, previewUrl } = this.props;
    return (
      <div>
        <div className="song">
          <p>{ trackName }</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onChange={ () => favSong(trackId) }
              checked={ checkFav(trackId) }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropType.number.isRequired,
  trackName: PropType.string.isRequired,
  previewUrl: PropType.string.isRequired,
  checkFav: PropType.func.isRequired,
  getFavSong: PropType.func.isRequired,
  favSong: PropType.func.isRequired,
};
