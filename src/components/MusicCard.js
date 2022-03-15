import React from 'react';
import PropType from 'prop-types';

export default class MusicCard extends React.Component {
  componentDidMount() {
    const { getFavSong } = this.props;
    getFavSong();
  }

  render() {
    const { trackInfo, loadingCheck, favSong, checkFav } = this.props;
    return (
      loadingCheck
        ? <span>Carregando...</span>
        : (
          <div>
            {
              trackInfo?.map((element) => (
                <div key={ element.trackId } className="song">
                  <p>{element.trackName}</p>
                  <audio
                    data-testid="audio-component"
                    src={ element.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ element.trackId }>
                    Favorita
                    <input
                      data-testid={`checkbox-music-${element.trackId}`}
                      type="checkbox"
                      onChange={ () => favSong(element.trackId) }
                      checked={ checkFav(element.trackId) }
                    />
                  </label>
                </div>
              ))
            }
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  checkFav: PropType.func.isRequired,
  getFavSong: PropType.func.isRequired,
  favSong: PropType.func.isRequired,
  trackInfo: PropType.arrayOf(PropType.any).isRequired,
  loadingCheck: PropType.bool.isRequired,
};
